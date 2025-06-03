import { NextFunction, Request, Response } from "express";
import { responseHandler } from "../utils/responseHandler";
import { COOKIE_ID } from "../utils/global";
import jwt from "jsonwebtoken";
import { JWT_PAYLOAD } from "../types/jwt_payload";

export const authorized = (req: Request, res: Response, next: NextFunction) => {
  try {
    const token = req.cookies[COOKIE_ID.AUTH];
    let user = jwt.verify(token, process.env.JWT_TOKEN!) as JWT_PAYLOAD;
    if (!user.userId) {
      throw "Invalid session";
    }
    req.userId = user.userId;
    next();
  } catch (error) {
    responseHandler.error(res, error);
  }
};
