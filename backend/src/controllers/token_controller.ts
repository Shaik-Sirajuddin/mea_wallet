import { Request, Response } from "express";
import { responseHandler } from "../utils/responseHandler";
import Token from "../models/token";

export default {
  list: async (req: Request, res: Response) => {
    try {
      let tokens = await Token.findAll({
        where: {},
      });
      responseHandler.success(res, tokens);
    } catch (error) {
      responseHandler.error(res, error);
    }
  },
};
