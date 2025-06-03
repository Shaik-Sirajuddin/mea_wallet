import { Request, Response } from "express";

/**
 *  Implment use of http codes for better error differentiation
 */
const success = function (res: Response, body = {}) {
  return res.status(200).json(body);
};

const error = function (res: Response, err: any) {
  let code = 500;
  if (typeof err === "string") {
    // message from server regarding input
    code = 400;
  }

  let message =
    typeof err === "object" ? (err.message ? err.message : "") : err;

  return res.status(code).json({
    error: message,
  });
};

export const responseHandler = {
  success,
  error,
};
