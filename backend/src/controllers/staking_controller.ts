import { Request, Response } from "express";
import StakingPlan from "../models/staking_plan";
import { responseHandler } from "../utils/responseHandler";
import StakingDeposit from "../models/staking_deposit";
import UserBalance from "../models/user_balance";
import { deci } from "../utils/decimal";
import { sequelize } from "../database/connection";
import { ADMIN } from "../utils/global";
import BalanceFlow from "../models/balance_flow";
import { LOCK } from "sequelize";
import { BalanceFlowType } from "../enums/BalanceFlowType";

export default {
  fetchPlans: async (req: Request, res: Response) => {
    try {
      let plans = await StakingPlan.findAll({
        attributes: {
          exclude: ["updated_at", "created_at"],
        },
        where: {
          paused: false,
        },
      });
      responseHandler.success(res, plans);
    } catch (error) {
      responseHandler.error(res, error);
    }
  },
  fetchStakingDeposits: async (req: Request, res: Response) => {
    try {
      let stakingDeposits = await StakingDeposit.findAll({
        where: {
          attribute: ["updated_at", "created_at"],
          user_id: req.userId,
        },
        include: [
          {
            model: StakingPlan,
            attributes: {
              exclude: ["created_at", "updated_at"],
            },
            as: "plan",
          },
        ],
      });
      responseHandler.success(res, stakingDeposits);
    } catch (error) {
      responseHandler.error(res, error);
    }
  },
  enrollStaking: async (req: Request, res: Response) => {
    try {
      let { plan_id, amount } = req.body;
      let plan = await StakingPlan.findOne({
        where: {
          id: plan_id,
        },
      });
      if (!plan) {
        throw "Invalid Plan";
      }
      if (plan.paused) {
        throw "Plan is closed for deposits";
      }
      amount = Number(amount);
      if (!amount) {
        throw "Invalid Amount";
      }
      //TODO : condition for amount range based on total deposits by user
      if (amount < plan.min_deposit || amount > plan.max_deposit) {
        throw "Amount is not in plan allowed range";
      }

      let tx = await sequelize.transaction();
      //TODO : implment transaction lock
      let userBalance = (await UserBalance.findOne({
        where: {
          userId: req.userId,
          tokenId: plan.tokenId,
        },
        lock: {
          level: tx.LOCK.UPDATE,
          of: UserBalance,
        },
        transaction: tx,
      }))!;

      if (deci(userBalance.amount).lessThan(amount)) {
        throw "Insufficient balance";
      }

      let enrollTime = new Date();

      //update amount
      await UserBalance.update(
        {
          amount: deci(userBalance.dataValues.amount).sub(amount).toString(),
          lockedAmount: deci(userBalance.dataValues.amount)
            .add(amount)
            .toString(),
          sequence_no: userBalance.sequence_no + 2,
        },
        {
          where: {
            id: userBalance.id,
          },
        }
      );

      let deposit = await StakingDeposit.create(
        {
          amount: amount,
          enroll_time: enrollTime,
          plan_id: plan_id,
          user_id: req.userId,
        },
        { transaction: tx }
      );

      //TODO : add entry into balance flow table
      await BalanceFlow.create(
        {
          balance_id: userBalance.id,
          balance_seq_no: userBalance.dataValues.sequence_no,
          change_amount: deci(amount).mul(-1).toString(),
          isAdminUser: false,
          isLockedBalance: false,
          prev_amount: userBalance.dataValues.amount,
          ref_type_id: deposit.id,
          type: BalanceFlowType.Stake,
        },
        {
          transaction: tx,
        }
      );

      await BalanceFlow.create(
        {
          balance_id: userBalance.id,
          balance_seq_no: userBalance.dataValues.sequence_no + 1,
          change_amount: deci(amount).toString(),
          isAdminUser: false,
          isLockedBalance: true,
          prev_amount: userBalance.dataValues.lockedAmount,
          ref_type_id: deposit.id,
          type: BalanceFlowType.Stake,
        },
        {
          transaction: tx,
        }
      );

      await tx.commit();
      responseHandler.success(res, {
        id: deposit.id,
      });
    } catch (error) {
      responseHandler.error(res, error);
    }
  },
  closeStaking: async (req: Request, res: Response) => {
    const tx = await sequelize.transaction();
    try {
      let { deposit_id } = req.body;

      let staking = await StakingDeposit.findOne({
        where: {
          id: deposit_id,
          user_id: req.userId,
        },
        //TODO : test include , relations
        include: [
          {
            model: StakingPlan,
          },
        ],
        transaction: tx,
      });
      if (!staking) {
        throw "A Deposit doesn't exist with given id";
      }

      if (staking.dataValues.close_time !== null) {
        throw "Deposit already claimed";
      }

      let closeTime = new Date();
      let stakingPlan = staking.plan!;

      let fullPeriodMs =
        new Date(staking.enroll_time).setFullYear(
          staking.enroll_time.getFullYear() + 1
        ) - staking.enroll_time.getTime();

      let maxStakePeriodMs = stakingPlan.lockDays * 86400 * 1000;

      let eligibleStakePeriodMs = Math.min(
        closeTime.getTime() - staking.enroll_time.getTime(),
        maxStakePeriodMs
      );

      //
      let interestFactor = deci(eligibleStakePeriodMs).div(fullPeriodMs);

      let interestAccumulated = deci(staking.amount)
        .mul(stakingPlan.apy)
        .mul(interestFactor)
        .div(100);

      let maturityDate = new Date(
        new Date(staking.enroll_time).getTime() +
          stakingPlan.lockDays * 86400 * 1000
      );

      let isPreMatureWithdrawl = closeTime.getTime() < maturityDate.getTime();
      let totalWithdrawAmount = deci(staking.amount).add(interestAccumulated);

      let earlyPenalty = deci(staking.amount)
        .mul(stakingPlan.earlyPenaltyPercent)
        .div(100);

      if (isPreMatureWithdrawl) {
        interestAccumulated = deci(0);
        totalWithdrawAmount = deci(staking.amount).sub(earlyPenalty);
      }

      await StakingDeposit.update(
        {
          acc_interest: interestAccumulated.toString(),
          close_time: closeTime,
          withdrawn_amount: totalWithdrawAmount.toString(),
        },
        {
          where: {
            id: staking.id,
          },
          transaction: tx,
        }
      );

      let userBalance = (await UserBalance.findOne({
        where: {
          tokenId: stakingPlan.tokenId,
          userId: req.userId,
        },
        lock: {
          level: tx.LOCK.UPDATE,
          of: UserBalance,
        },
        transaction: tx,
      }))!;

      await UserBalance.update(
        {
          amount: deci(userBalance.amount).add(totalWithdrawAmount).toString(),
          lockedAmount: deci(userBalance.lockedAmount)
            .sub(staking.amount)
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
          change_amount: totalWithdrawAmount.toString(),
          isAdminUser: false,
          isLockedBalance: false,
          prev_amount: userBalance.amount,
          ref_type_id: staking.id,
          type: BalanceFlowType.Stake,
        },
        {
          transaction: tx,
        }
      );

      await BalanceFlow.create(
        {
          balance_id: userBalance.id,
          balance_seq_no: userBalance.sequence_no + 1,
          change_amount: deci(staking.amount).mul(-1).toString(),
          isAdminUser: false,
          isLockedBalance: true,
          prev_amount: userBalance.amount,
          ref_type_id: staking.id,
          type: BalanceFlowType.Stake,
        },
        {
          transaction: tx,
        }
      );

      //decrease admin balance for interest interest
      let adminBalanceChange = isPreMatureWithdrawl
        ? earlyPenalty
        : interestAccumulated.mul(-1);

      //TODO : implementing locking for admin balance could limit concurrency
      //i.e slow down api queries
      let adminBalance = (await UserBalance.findOne({
        where: {
          userId: ADMIN.USER_ID,
          tokenId: stakingPlan.tokenId,
        },
        lock: {
          level: tx.LOCK.UPDATE,
          of: UserBalance,
        },
        transaction: tx,
      }))!;

      await UserBalance.update(
        {
          amount: deci(adminBalance.amount).add(adminBalanceChange).toString(),
          sequence_no: adminBalance.sequence_no + 1,
        },
        {
          where: {
            id: adminBalance.id,
          },
          transaction: tx,
        }
      );

      await BalanceFlow.create(
        {
          balance_id: adminBalance.id,
          balance_seq_no: adminBalance.sequence_no + 1,
          change_amount: adminBalanceChange.toString(),
          isAdminUser: true,
          isLockedBalance: false,
          prev_amount: adminBalance.amount,
          ref_type_id: staking.id,
          type: BalanceFlowType.Stake,
        },
        {
          transaction: tx,
        }
      );
      await tx.commit();
      responseHandler.success(res);
    } catch (error) {
      await tx.rollback();
      responseHandler.error(res, error);
    }
  },
};
