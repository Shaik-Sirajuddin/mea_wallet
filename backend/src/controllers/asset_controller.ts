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
import TokenTransfer from "../models/token_transfer";
import BalanceFlow from "../models/balance_flow";

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
        transaction: tx,
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
        transaction: tx,
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

      amount = deci(amount).toFixed(token.decimals);

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

      await BalanceFlow.create(
        {
          balance_id: userBalance.id,
          balance_seq_no: userBalance.sequence_no,
          change_amount: deci(amount).mul(-1).toString(),
          prev_amount: userBalance.amount,
          ref_type_id: withdrawlRequest.id,
          type: BalanceFlowType.Withdrawl,
        },
        {
          transaction: tx,
        }
      );

      await BalanceFlow.create(
        {
          balance_id: userBalance.id,
          balance_seq_no: userBalance.sequence_no + 1,
          change_amount: amount,
          prev_amount: userBalance.lockedAmount,
          ref_type_id: withdrawlRequest.id,
          type: BalanceFlowType.Withdrawl,
          isLockedBalance: true,
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
        transaction: tx,
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
  cancelWithdrawlRequest: async (req: Request, res: Response) => {
    const tx = await sequelize.transaction();
    try {
      //todo : check if ddos attack can cause any security issues
      let { id } = req.body;

      let withdraw_request = await WithdrawlRequest.findOne({
        where: {
          id,
          user_id: req.userId,
        },
        transaction: tx,
      });
      if (!withdraw_request) {
        throw "Withdrawl request not found";
      }
      if (withdraw_request.status !== WithdrawStatus.PENDING_VERIFICATION) {
        throw "Cannot cancel at current status";
      }

      await WithdrawlRequest.update(
        {
          status: WithdrawStatus.CANCELLED,
        },
        {
          where: {
            id: withdraw_request.id,
          },
          transaction: tx,
        }
      );

      let userBalance = (await UserBalance.findOne({
        where: {
          tokenId: withdraw_request.token_id,
          userId: req.userId,
        },
        transaction: tx,
        lock: LOCK.UPDATE,
      }))!;

      await UserBalance.update(
        {
          amount: deci(userBalance.amount)
            .add(withdraw_request.amount)
            .toString(),
          lockedAmount: deci(userBalance.lockedAmount)
            .sub(withdraw_request.amount)
            .toString(),
          sequence_no: userBalance.sequence_no + 2,
        },
        {
          where: {
            id: userBalance.id,
          },
          transaction: tx,
        }
      );

      await BalanceFlow.create(
        {
          balance_id: userBalance.id,
          balance_seq_no: userBalance.sequence_no,
          change_amount: withdraw_request.amount,
          prev_amount: userBalance.amount,
          ref_type_id: withdraw_request.id,
          type: BalanceFlowType.CANCEL_WITHDRAWL,
        },
        {
          transaction: tx,
        }
      );

      await BalanceFlow.create(
        {
          balance_id: userBalance.id,
          balance_seq_no: userBalance.sequence_no + 1,
          change_amount: deci(withdraw_request.amount).sub(-1).toString(),
          prev_amount: userBalance.lockedAmount,
          ref_type_id: withdraw_request.id,
          type: BalanceFlowType.CANCEL_WITHDRAWL,
          isLockedBalance: true,
        },
        {
          transaction: tx,
        }
      );
      responseHandler.success(res);
    } catch (error) {
      await tx.rollback();
      logger.error(error);
      responseHandler.error(res, error);
    }
  },
  transfer: async (req: Request, res: Response) => {
    const tx = await sequelize.transaction();
    try {
      let { receiver_username, token_id, amount } = req.body;
      let receiver = await User.findOne({
        where: {
          username: receiver_username,
        },
        transaction: tx,
      });
      if (!receiver) {
        throw "Invalid Receiver";
      }
      let sender = (await User.findOne({
        where: {
          id: req.userId,
        },
        transaction: tx,
      }))!;

      if (sender.id === receiver.id) {
        throw "Receiver can't be same as Sender";
      }

      let token = await Token.findOne({
        where: {
          id: token_id,
        },
        transaction: tx,
      });

      if (!token) {
        throw "Invalid Token";
      }

      amount = deci(amount).toFixed(token.decimals).toString();

      let senderBalance = (await UserBalance.findOne({
        where: {
          userId: req.userId,
          tokenId: token_id,
        },
        transaction: tx,
        lock: LOCK.UPDATE,
      }))!;

      if (deci(senderBalance.amount).lessThan(amount)) {
        throw "Insufficient balance";
      }

      let receiverBalance = (await UserBalance.findOne({
        where: {
          userId: receiver.id,
          tokenId: token_id,
        },
        transaction: tx,
        lock: LOCK.UPDATE,
      }))!;

      await UserBalance.update(
        {
          amount: deci(senderBalance.amount).sub(amount).toString(),
          sequence_no: senderBalance.sequence_no + 1,
        },
        {
          where: {
            id: senderBalance.id,
          },
          transaction: tx,
        }
      );

      await UserBalance.update(
        {
          amount: deci(receiverBalance.amount).add(amount).toString(),
          sequence_no: receiverBalance.sequence_no + 1,
        },
        {
          where: {
            id: receiverBalance.id,
          },
          transaction: tx,
        }
      );

      let transfer = await TokenTransfer.create(
        {
          amount: amount,
          fee: 0,
          from_user_id: req.userId,
          to_user_id: receiver.id,
          token_id: token_id,
        },
        {
          transaction: tx,
        }
      );

      //balance flow

      await BalanceFlow.create(
        {
          balance_id: senderBalance.id,
          balance_seq_no: senderBalance.sequence_no,
          change_amount: deci(amount).mul(-1).toString(),
          prev_amount: senderBalance.amount,
          ref_type_id: transfer.id,
          type: BalanceFlowType.Transfer,
        },
        {
          transaction: tx,
        }
      );

      await BalanceFlow.create(
        {
          balance_id: receiverBalance.id,
          balance_seq_no: receiverBalance.sequence_no,
          change_amount: amount,
          prev_amount: receiverBalance.amount,
          ref_type_id: transfer.id,
          type: BalanceFlowType.Transfer,
        },
        {
          transaction: tx,
        }
      );
      await tx.commit();
      responseHandler.success(res, {
        id: transfer.id,
      });
    } catch (error) {
      await tx.rollback();
      logger.error(error);
      responseHandler.error(res, error);
    }
  },
};
