import { Request, Response } from "express";
import { responseHandler } from "../utils/responseHandler";
import Convert from "../models/convert";
import Token from "../models/token";
import { TOKEN } from "../utils/global";
import raydium from "../lib/quote_provider/raydium";
import Decimal from "decimal.js";
import { deci } from "../utils/decimal";
import bingx from "../lib/price_provider/bingx";
import coinstore from "../lib/price_provider/coinstore";
import { logger } from "../utils/logger";
import UserBalance from "../models/user_balance";
import { sequelize } from "../database/connection";
import { transformTxToBase64 } from "@raydium-io/raydium-sdk-v2";
const getQuote = async (
  from: Token,
  to: Token,
  amount: Decimal
): Promise<QuoteResponse> => {
  /**
   * All tokens
   */
  if (from.symbol === TOKEN.USDT || to.symbol === TOKEN.USDT) {
    //direct route custom token <> usdt
    let isSourceUSDT = from.symbol === TOKEN.USDT;
    if (from.symbol === TOKEN.FOX9 || to.symbol === TOKEN.FOX9) {
      //use quote route
      //todo : use a default price , in case of non availability
      return await raydium.getQuote(
        from.symbol,
        to.symbol,
        deci(amount.mul(10 ** from.decimals).toFixed(0)),
        from.decimals,
        to.decimals
      );
    }

    //todo : change to provider implentation from database
    //todo : use intermediate cache for price
    let price: number = 0;

    if (from.symbol === TOKEN.MEA || to.symbol === TOKEN.MEA) {
      price = await bingx.getPrice("MEA_USDT");
    }

    if (from.symbol === TOKEN.SOL || to.symbol === TOKEN.SOL) {
      price = await bingx.getPrice("SOL_USDT");
    }

    if (from.symbol === TOKEN.RECON || to.symbol === TOKEN.RECON) {
      price = await coinstore.getPrice("RECONUSDT");
    }

    if (isSourceUSDT) {
      price = deci(1).div(price).toNumber();
    }
    return {
      routeAvailable: true,
      data: {
        inputAmount: amount.toString(),
        outputAmount: amount.mul(price).toFixed(to.decimals),
        fee: 0,
        priceImpactPct: 0,
      },
    };
  }

  // from -> usdt -> to

  let usdt = (await Token.findOne({
    where: {
      symbol: TOKEN.USDT,
    },
  }))!;

  let intermediateQuote = await getQuote(from, usdt, amount);

  if (!intermediateQuote.routeAvailable) {
    return intermediateQuote;
  }
  let processedQuote = await getQuote(
    usdt,
    to,
    deci(intermediateQuote.data!.outputAmount)
  );
  return processedQuote;
};

export default {
  getPrice: async (req: Request, res: Response) => {
    try {
      /**
       * MEA , RECON , FOX9 , SOL
       * cex , cex , dex , cex,
       * MEA <-> RECON
       */
    } catch (error) {
      responseHandler.error(res, error);
    }
  },
  getHistory: async (req: Request, res: Response) => {
    try {
      let convertHistory = await Convert.findAll({
        attributes: {
          exclude: ["from_balance_id", "to_balance_id"],
        },
        where: {
          user_id: req.userId,
        },
      });
      responseHandler.success(res, convertHistory);
    } catch (error) {
      responseHandler.error(res, error);
    }
  },
  getQuote: async (req: Request, res: Response) => {
    try {
      let { fromId, toId, amount } = req.body;
      let from = await Token.findOne({
        where: {
          id: fromId,
        },
      });
      if (!from) {
        throw "Invalid Id";
      }
      let to = await Token.findOne({
        where: {
          id: toId,
        },
      });

      if (!to) {
        throw "Invalid Id";
      }
      let parsedAmount = deci(deci(amount).toFixed(from.decimals));
      let quote = await getQuote(from, to, parsedAmount);
      //todo : send fee
      responseHandler.success(res, quote);
    } catch (error) {
      logger.error(error);
      responseHandler.error(res, error);
    }
  },

  executeQuote: async (req: Request, res: Response) => {
    const tx = await sequelize.transaction();
    try {
      let { fromId, toId, amount, expectedAmount, slippage } = req.body;
      let from = await Token.findOne({
        where: {
          id: fromId,
        },
        transaction: tx,
      });
      if (!from) {
        throw "Invalid Id";
      }
      let to = await Token.findOne({
        where: {
          id: toId,
        },
        transaction: tx,
      });

      if (!to) {
        throw "Invalid Id";
      }

      expectedAmount = deci(expectedAmount).toFixed(to.decimals);
      let parsedAmount = deci(deci(amount).toFixed(from.decimals));
      let quote = await getQuote(from, to, parsedAmount);
      if (!quote.routeAvailable || !quote.data) {
        throw "Quote not available";
      }

      let difference = deci(expectedAmount)
        .sub(quote.data!.outputAmount)
        .mul(100)
        .div(expectedAmount);

      if (difference.gt(slippage)) {
        throw "Slippage exceeded";
      }

      let inputBalance = (await UserBalance.findOne({
        where: {
          tokenId: fromId,
          userId: req.userId,
        },
        transaction: tx,
      }))!;

      let outputBalance = (await UserBalance.findOne({
        where: {
          tokenId: toId,
          userId: req.userId,
        },
        transaction: tx,
      }))!;

      await UserBalance.update(
        {
          amount: deci(inputBalance.amount)
            .sub(quote.data.inputAmount)
            .toString(),
          sequence_no: inputBalance.sequence_no + 1,
        },
        {
          where: {
            id: inputBalance.id,
          },
          transaction: tx,
        }
      );

      await UserBalance.update(
        {
          amount: deci(outputBalance.amount)
            .add(quote.data.outputAmount)
            .toString(),
          sequence_no: outputBalance.sequence_no + 1,
        },
        {
          where: {
            id: outputBalance.id,
          },
          transaction: tx,
        }
      );
      
    } catch (error) {
      logger.error(error);
      responseHandler.error(res, error);
    }
  },
};

/**
 * App -> chart data
 * Live Price -> backend sync
 *
 */
/**
 * Price Fetching
 * fetch price
 * perform swap
 * fetch history
 */
