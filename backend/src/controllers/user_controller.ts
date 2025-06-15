import { Request, Response } from "express";
import { responseHandler } from "../utils/responseHandler";
import User from "../models/user";
import UserBalance from "../models/user_balance";
import Token from "../models/token";
import { logger } from "../utils/logger";
import { decryptSym } from "../lib/encryption";
import OTPAuth, { Secret } from "otpauth";
import { decode, encode } from "hi-base32";
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
      logger.error(error);
      responseHandler.error(res, error);
    }
  },

  get2FASecret: async (req: Request, res: Response) => {
    try {
      let user = (await User.findByPk(req.userId, {
        attributes: ["totp_secret", "user_iv", "twofa_completed"],
      }))!;

      if (user.twofa_completed) {
        throw "2FA already completed";
      }

      let decodedSecret = decryptSym(user.totp_secret, user.user_iv);
      let totp = new OTPAuth.TOTP({
        issuer: "meccain.wallet",
        label: "2fa",
        algorithm: "SHA1",
        digits: 6,
        secret: decodedSecret,
      });
      const otpauth_url = totp.toString();
      responseHandler.success(res, {
        otpUrl: otpauth_url,
      });
    } catch (error) {
      logger.error(error);
      responseHandler.error(res, error);
    }
  },

  initiate2FASetup: async (req: Request, res: Response) => {
    try {
      let { otp } = req.body;
      let user = (await User.findOne({
        where: {
          id: req.userId,
        },
      }))!;

      if (user.twofa_completed) {
        throw "2FA already completed";
      }

      let result = OTPAuth.TOTP.validate({
        token: otp,
        secret: Secret.fromBase32(decryptSym(user.totp_secret, user.user_iv)),
        algorithm: "SHA1",
        digits: 6,
      });

      if (result) {
        // await User.update(
        //   {
        //     twofa_completed: true,
        //   },
        //   {
        //     where: {
        //       id: req.userId,
        //     },
        //   }
        // );
      }

      responseHandler.success(res, {
        sucess: result !== null,
      });
    } catch (error) {
      logger.error(error);
      responseHandler.error(res, error);
    }
  },
};
