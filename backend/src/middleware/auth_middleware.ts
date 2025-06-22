import { NextFunction, Request, Response } from "express";
import { responseHandler } from "../utils/responseHandler";
import { COOKIE_ID } from "../utils/global";
import jwt from "jsonwebtoken";
import { JWT_PAYLOAD } from "../types/jwt_payload";
import { logger } from "../utils/logger";

export const authorized = (req: Request, res: Response, next: NextFunction) => {
  try {
    //if no cookie , fallbaqk to authorization header
    let authToken = req.cookies[COOKIE_ID.AUTH] ?? req.headers["authorization"];
    let user = jwt.verify(authToken, process.env.JWT_TOKEN!) as JWT_PAYLOAD;
    if (!user.userId) {
      throw "Invalid session";
    }
    req.userId = user.userId;
    next();
  } catch (error) {
    logger.error(error);
    responseHandler.error(res, error);
  }
};
