import { Request, Response } from "express";
import { logger } from "../utils/logger";
import passValidator from "password-validator";
import {
  comparePassword,
  encryptData,
  encryptPassword,
} from "../lib/encryption";
import User from "../models/user";
import { getRandomInt } from "../utils/helper";
import { responseHandler } from "../utils/responseHandler";
import jwt from "jsonwebtoken";
import Token from "../models/token";
import UserBalance from "../models/user_balance";
import { sequelize } from "../database/connection";
import { Transaction } from "sequelize";
const passwordSchema = new passValidator();
passwordSchema
  .is()
  .min(8) // Minimum length 8
  .is()
  .max(100) // Maximum length 100
  .has()
  .uppercase() // Must have uppercase letters
  .has()
  .lowercase() // Must have lowercase letters
  .has()
  .digits(2) // Must have at least 2 digits
  .has()
  .not()
  .spaces(); // Should not have spaces

const generateUserName = async () => {
  let name: string | null = null;
  let rounds = 0;
  do {
    rounds++;
    let generated_name = "u" + getRandomInt(10000000000, 99999999999);
    let nameTaken = await User.findOne({
      where: {
        username: generated_name,
      },
    });

    if (!nameTaken) {
      name = generated_name;
    }
    //avoiding time taking loops
    if (nameTaken && rounds > 100) {
      break;
    }
  } while (name! == null);
  return name!;
};

/**
 * Validate :
 * Throw error on invalid or expired hash
 */
const validateResetHash = async (hash: string) => {
  if (!hash) {
    throw "Missing or Invalid field";
  }
  let user = await User.findOne({
    attributes: ["id", "email", "resetHashExpiryTime"],
    where: {
      resetHash: hash,
    },
  });
  if (!user) {
    throw "Invalid Token";
  }
  if (
    !user.dataValues.resetHashExpiryTime ||
    user.dataValues.resetHashExpiryTime.getTime() <= Date.now()
  ) {
    throw "Token Expired";
  }
  return user;
};

export default {
  login: async (req: Request, res: Response) => {
    try {
      let { email, password } = req.body;
      //Todo : implement encryption of password midway
      let user = await User.findOne({
        attributes: ["id", "password"],
        where: {
          email: email,
        },
      });
      if (!user) {
        throw "Email not found";
      }

      let validPassword = await comparePassword(
        password,
        user.dataValues.password
      );
      if (!validPassword) {
        throw "Invalid Password";
      }

      const token = jwt.sign(
        { userId: user.dataValues.id },
        process.env.JWT_TOKEN!,
        {
          expiresIn: "30d",
        }
      );
      //TODO : implement passkeys for mobile , for better differentiation of mobile , web sessions
      res.cookie("token", token, {
        httpOnly: true,
        secure: true,
        sameSite: "none",
        maxAge: 3 * 24 * 60 * 60 * 1000,
      });

      //TODO : implement additionaly encryption to be only be decodable via key from mobile app
      responseHandler.success(res, {
        token: token,
      });
    } catch (error) {
      responseHandler.error(res, error);
      logger.error(error);
    }
  },
  signUp: async (req: Request, res: Response) => {
    let tx: Transaction | null = null;
    try {
      tx = await sequelize.transaction();
      let { email, password } = req.body;
      //check if user exits
      let user = await User.findOne({
        attributes: ["id"],
        where: {
          email: email,
        },
        transaction: tx,
      });
      if (user) {
        throw "Email already in use";
      }
      let isSematicallyValid = passwordSchema.validate(password);
      if (!isSematicallyValid) {
        throw "Enter a valid a password";
      }

      let hashedPassword = await encryptPassword(password);
      let username = await generateUserName();

      user = await User.create({
        email,
        password: hashedPassword,
        username,
        totp_secret: "",
      });
      let tokens = await Token.findAll({
        attributes: ["id"],
        where: {},
      });
      //bulk create user balances for user
      await UserBalance.bulkCreate(
        tokens.map((token) => {
          return {
            tokenId: token.dataValues.id,
            userId: user.dataValues.id,
          };
        })
      );
      const token = jwt.sign(
        { userId: user.dataValues.id },
        process.env.JWT_TOKEN!,
        {
          expiresIn: "30d",
        }
      );
      //TODO : implement passkeys for mobile , for better differentiation of mobile , web sessions
      res.cookie("token", token, {
        httpOnly: true,
        secure: true,
        sameSite: "none",
        maxAge: 3 * 24 * 60 * 60 * 1000,
      });

      //TODO : implement additionaly encryption to be only be decodable via key from mobile app
      responseHandler.success(res, {
        token: token,
      });
    } catch (error) {
      await tx?.rollback();
      logger.error(error);
      responseHandler.error(res, error);
    }
  },
  requestPasswordReset: async (req: Request, res: Response) => {
    try {
      const { email } = req.body;
      let user = await User.findOne({
        attributes: ["id", "password"],
        where: {
          email: email,
        },
      });
      if (!user) {
        throw "Email not found";
      }
      let resetHash = await encryptData(user.dataValues.email);
      let expiryTime = new Date(Date.now() + 15 * 60 * 1000); //15 minutes
      await User.update(
        {
          resetHash: resetHash,
          resetHashExpiryTime: expiryTime,
        },
        {
          where: {
            email: email,
          },
        }
      );
      //todo : send email
      responseHandler.success(res);
    } catch (error) {
      logger.error(error);
      responseHandler.error(res, error);
    }
  },
  veiryResetToken: async (req: Request, res: Response) => {
    try {
      let hash = req.query["hash"];
      if (typeof hash !== "string") {
        throw " Invalid Value";
      }
      let user = await validateResetHash(hash);
      responseHandler.success(res, {
        email: user.dataValues.email,
      });
    } catch (error) {
      responseHandler.error(res, error);
    }
  },
  confirmReset: async (req: Request, res: Response) => {
    try {
      let { hash, newPassword } = req.body;
      if (typeof hash !== "string") {
        throw " Invalid Value";
      }
      let user = await validateResetHash(hash);
      let isSematicallyValid = passwordSchema.validate(newPassword);
      if (!isSematicallyValid) {
        throw "Enter a valid a password";
      }

      let hashedPassword = await encryptPassword(newPassword);
      await User.update(
        {
          password: hashedPassword,
          resetHash: null,
          resetHashExpiryTime: null,
        },
        {
          where: {
            id: user.dataValues.id,
          },
        }
      );
      //todo : terminate remaining sessions if password has been reset
      responseHandler.success(res);
    } catch (error) {
      responseHandler.error(res, error);
    }
  },
};
