import { Request, Response } from "express";
import StakingPlan from "../models/staking_plan";
import { responseHandler } from "../utils/responseHandler";
import StakingDeposit from "../models/staking_deposit";
import UserBalance from "../models/user_balance";
import { deci } from "../utils/decimal";
import { sequelize } from "../database/connection";
import { ADMIN } from "../utils/global";

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
      responseHandler.success(res, "Fetched", plans);
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
          },
        ],
      });
      //TODO : associate stakingdeposit , staking plan models
      responseHandler.success(res, "Fetched", stakingDeposits);
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
      //TODO : implment transaction
      let userBalance = await UserBalance.findOne({
        where: {
          userId: req.userId,
          tokenId: plan.tokenId,
        },
        transaction: tx,
      });

      if (deci(userBalance.amount).lessThan(amount)) {
        throw "Insufficient balance";
      }

      let enrollTime = new Date();

      await UserBalance.decrement("amount", {
        by: amount,
        where: {
          id: userBalance.id,
        },
        transaction: tx,
      });

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

      //increase admin balance
      await UserBalance.increment("amount", {
        by: amount,
        where: {
          userId: ADMIN.USER_ID,
          tokenId: plan.tokenId,
        },
        transaction: tx,
      });
      await tx.commit();
      responseHandler.success(res, "Staking Successful", {
        id: deposit.id,
      });
    } catch (error) {
      responseHandler.error(res, error);
    }
  },
  closeStaking: async (req: Request, res: Response) => {
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
      });
      if (!staking) {
        throw "A Deposit doesn't exist with given id";
      }

      if (staking.dataValues.close_time !== null) {
        throw "Deposit already claimed";
      }
      //TODO : find names for staking deposit

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

      let interestFactor = deci(eligibleStakePeriodMs).div(fullPeriodMs);

      let interestAccumulated = deci(staking.amount)
        .mul(stakingPlan.apy)
        .mul(interestFactor)
        .div(100);

      //todoo continue
    } catch (error) {
      responseHandler.error(res, error);
    }
  },
};
