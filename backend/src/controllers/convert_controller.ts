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
      let parsedAmount = deci(amount);
      let quote = getQuote(from, to, parsedAmount);
      responseHandler.success(res, quote);
    } catch (error) {
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
