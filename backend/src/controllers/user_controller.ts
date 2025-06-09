import { Request, Response } from "express";
import { responseHandler } from "../utils/responseHandler";
import User from "../models/user";
import UserBalance from "../models/user_balance";
import Token from "../models/token";

export default {
  fetchProfile: async (req: Request, res: Response) => {
    try {
      let user = (await User.findByPk(req.userId, {
        attributes: {
          exclude: [
            "id",
            "password",
            "totp_secret",
            "resetHash",
            "resetHashExpiryTime",
            "created_at",
            "updated_at",
          ],
        },
      }))!;
      responseHandler.success(res, user.toJSON());
    } catch (error) {
      responseHandler.error(res, error);
    }
  },
  fetchAssets: async (req: Request, res: Response) => {
    try {
      let userBalance = await UserBalance.findAll({
        attributes: {
          exclude: ["created_at", "updated_at"],
        },
        where: {
          userId: req.userId,
        },
        // include: [
        //   {
        //     model: Token,
        //     attributes: ["id", "name", "symbol", "decimals"],
        //   },
        // ],
      });
      responseHandler.success(res, userBalance);
    } catch (error) {
      responseHandler.error(res, error);
    }
  },
};
