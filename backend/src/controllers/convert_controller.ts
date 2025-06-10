import { Request, Response } from "express";
import { responseHandler } from "../utils/responseHandler";
import Convert from "../models/convert";
import { sequelize } from "../database/connection";
import UserBalance from "../models/user_balance";
import { Op } from "sequelize";
import Token from "../models/token";

export default {
  getPrice: async (req: Request, res: Response) => {
    try {
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
