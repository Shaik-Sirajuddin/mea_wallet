import { Request, Response } from "express";
import { logger } from "../utils/logger";
import passValidator from "password-validator";
import { encryptPassword } from "../lib/encryption";
import User from "../models/user";
import { getRandomInt } from "../utils/helper";
import { responseHandler } from "../utils/responseHandler";
import jwt from "jsonwebtoken";
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
  let name: string = null;
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
  return name;
};

export default {
  login: async (req: Request, res: Response) => {
    try {
      let { email, password } = req.body;
    } catch (error) {
      responseHandler.error(res, error);
      logger.error(error);
    }
  },
  signUp: async (req: Request, res: Response) => {
    try {
      let { email, password } = req.body;
      //check if user exits
      let user = await User.findOne({
        attributes: ["id"],
        where: {
          email: email,
        },
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
      });
      const token = jwt.sign(
        { userId: user.dataValues.id },
        process.env.JWT_TOKEN,
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
      responseHandler.success(res, "Success", {
        token: token,
      });
    } catch (error) {
      logger.error(error);
      responseHandler.error(res, error);
    }
  },
};
