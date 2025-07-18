import { Request, Response } from "express";
import { responseHandler } from "../utils/responseHandler";
import Convert from "../models/convert";
import Token from "../models/token";
import { ADMIN, TOKEN } from "../utils/global";
import raydium from "../lib/quote_provider/raydium";
import Decimal from "decimal.js";
import { deci } from "../utils/decimal";
import { logger } from "../utils/logger";
import UserBalance from "../models/user_balance";
import { sequelize } from "../database/connection";
import BalanceFlow from "../models/balance_flow";
import { getCacheData, setCacheData } from "../config/redis";
import { CacheKey } from "../types/cache_keys";
import { PriceProvider } from "../types/Provider";
import { PairPrice } from "../types/PairPrice";
import { LOCK } from "sequelize";
import { BalanceFlowType } from "../enums/BalanceFlowType";
//is run when module is first loaded into memory
const getQuote = async (
  from: Token,
  to: Token,
  amount: Decimal,
  threshouldSeconds: number | null = null
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
    let priceData = await PriceProvider.getTokenPrice(
      isSourceUSDT ? to.symbol : from.symbol
    );
    if (!priceData) {
      throw "Price Data Unavailable";
    }
    let syncedAgoSeconds = (Date.now() - priceData.syncedAt) / 1000;
    if (threshouldSeconds && syncedAgoSeconds > threshouldSeconds) {
      throw "Price not available in threshould range";
    }
    let price = priceData.price;

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
      amount = deci(amount).toFixed(from.decimals);
      let parsedAmount = deci(amount);
      //2 second threshould for price data
      ///todo : improve the timewindow calculation accuracy
      let quote = await getQuote(from, to, parsedAmount, 2);
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
        lock: tx.LOCK.UPDATE,
      }))!;

      if (deci(inputBalance.amount).lessThan(amount)) {
        throw "Insufficient Balance";
      }
      let outputBalance = (await UserBalance.findOne({
        where: {
          tokenId: toId,
          userId: req.userId,
        },
        transaction: tx,
        lock: tx.LOCK.UPDATE,
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

      let adminBalance = (await UserBalance.findOne({
        where: {
          userId: ADMIN.USER_ID,
          tokenId: toId,
        },
        lock: tx.LOCK.UPDATE,
        transaction: tx,
      }))!;

      await UserBalance.update(
        {
          amount: deci(adminBalance.amount).add(quote.data.fee).toString(),
          sequence_no: adminBalance.sequence_no + 1,
        },
        {
          where: {
            id: adminBalance.id,
          },
          transaction: tx,
        }
      );

      let convert = await Convert.create(
        {
          from_amount: amount,
          from_balance_id: inputBalance.id,
          from_token_id: fromId,
          to_amount: quote.data.outputAmount,
          to_balance_id: outputBalance.id,
          to_token_id: toId,
          user_id: req.userId,
        },
        {
          transaction: tx,
        }
      );

      await BalanceFlow.create(
        {
          balance_id: inputBalance.id,
          balance_seq_no: inputBalance.sequence_no,
          change_amount: quote.data.inputAmount,
          prev_amount: inputBalance.amount,
          ref_type_id: convert.id,
          type: BalanceFlowType.Convert,
        },
        {
          transaction: tx,
        }
      );

      await BalanceFlow.create(
        {
          balance_id: outputBalance.id,
          balance_seq_no: outputBalance.sequence_no,
          change_amount: quote.data.outputAmount,
          prev_amount: outputBalance.amount,
          ref_type_id: convert.id,
          type: BalanceFlowType.Convert,
        },
        {
          transaction: tx,
        }
      );

      await BalanceFlow.create(
        {
          balance_id: adminBalance.id,
          balance_seq_no: adminBalance.sequence_no,
          change_amount: quote.data.fee.toString(),
          prev_amount: adminBalance.amount,
          ref_type_id: convert.id,
          type: BalanceFlowType.Convert,
          isAdminUser: true,
        },
        {
          transaction: tx,
        }
      );

      await tx.commit();
      responseHandler.success(res);
    } catch (error) {
      await tx.rollback();
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
