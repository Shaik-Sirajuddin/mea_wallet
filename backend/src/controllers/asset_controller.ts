import { Request, Response } from "express";
import { logger } from "../utils/logger";
import { responseHandler } from "../utils/responseHandler";
import Token from "../models/token";
import DepositRequest from "../models/deposit_request";
import AssetCredit from "../models/asset_credit";
import { sequelize } from "../database/connection";
import web3 from "../utils/web3";
import UserBalance from "../models/user_balance";
import { deci } from "../utils/decimal";
import { LOCK } from "sequelize";
import WithdrawlRequest from "../models/withdrawl_request";
import User from "../models/user";
import OTPAuth, { Secret } from "otpauth";
import { decryptSym } from "../lib/encryption";
import { WithdrawStatus } from "../enums/WithdrawStatus";

export default {
  deposit: async (req: Request, res: Response) => {
    //TODO : should be able to catch acquire error
    const tx = await sequelize.transaction();
    try {
      let { hash, tokenId, amount } = req.body;
      let token = await Token.findOne({
        where: {
          id: tokenId,
        },
      });

      if (!token) {
        throw "Invalid Token Id";
      }

      let depositRequest = await DepositRequest.findOne({
        where: {
          hash: hash,
        },
        transaction: tx,
      });

      if (depositRequest) {
        throw "A request already exists with provided hash";
      }

      let createdRequest = await DepositRequest.create(
        {
          hash: hash,
          user_id: req.userId,
        },
        {
          transaction: tx,
        }
      );

      await AssetCredit.create(
        {
          amount: amount,
          deposit_request_id: createdRequest.id,
          token_id: tokenId,
        },
        {
          transaction: tx,
        }
      );

      await tx.commit();
      responseHandler.success(res, {
        message: "Request sent to admin",
      });
      //TODO : add deposit registry
    } catch (error) {
      await tx.rollback();
      logger.error(error);
      responseHandler.error(res, error);
    }
  },

  withdraw: async (req: Request, res: Response) => {
    const tx = await sequelize.transaction();
    try {
      let user = (await User.findOne({
        where: {
          id: req.userId,
        },
      }))!;

      if (!user.twofa_completed) {
        throw "2fa not completed";
      }

      let { address, token_id, amount } = req.body;
      if (!web3.isValidPublicKey(address)) {
        throw "Invalid address";
      }

      let token = await Token.findOne({
        where: {
          id: token_id,
        },
        transaction: tx,
      });

      if (!token) {
        throw "Invalid Token Id";
      }

      let userBalance = (await UserBalance.findOne({
        where: {
          userId: req.userId,
          tokenId: token_id,
        },
        lock: LOCK.UPDATE,
        transaction: tx,
      }))!;

      if (deci(userBalance.amount).lessThan(amount)) {
        throw "Insufficient balance";
      }

      await UserBalance.update(
        {
          amount: deci(userBalance.amount).sub(amount).toFixed(),
          lockedAmount: deci(userBalance.lockedAmount).add(amount).toFixed(),
        },
        {
          where: {
            id: userBalance.id,
          },
          transaction: tx,
        }
      );

      let withdrawlRequest = await WithdrawlRequest.create(
        {
          amount: amount,
          token_id: token_id,
          user_id: req.userId,
        },
        {
          transaction: tx,
        }
      );

      await tx.commit();
      responseHandler.success(res, { id: withdrawlRequest.id });
    } catch (error) {
      await tx.rollback();
      logger.error(error);
      responseHandler.error(res, error);
    }
  },

  verifyWithdrawlRequest: async (req: Request, res: Response) => {
    const tx = await sequelize.transaction();
    try {
      let { id, otp } = req.body;

      let user = (await User.findOne({
        where: {
          id: req.userId,
        },
      }))!;

      if (!user.twofa_completed) {
        throw "2fa not completed";
      }

      let result = OTPAuth.TOTP.validate({
        token: otp,
        secret: Secret.fromBase32(decryptSym(user.totp_secret, user.user_iv)),
        algorithm: "SHA1",
        digits: 6,
      });

      if (!result) {
        throw "Invalid or Expired OTP";
      }

      let request = await WithdrawlRequest.findOne({
        where: {
          id: id,
          user_id: req.userId,
        },
        transaction: tx,
      });

      if (!request) {
        throw "Invalid Request Id";
      }

      if (request.status !== WithdrawStatus.PENDING_VERIFICATION) {
        throw "Request already approved";
      }

      await WithdrawlRequest.update(
        {
          status: WithdrawStatus.PENDING_PROCESSING,
        },
        {
          where: {
            id,
          },
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
