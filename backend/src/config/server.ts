import express from "express";
import { createServer } from "http";
import bodyParser from "body-parser";
import cookieParser from "cookie-parser";
import { authorized } from "../middleware/auth_middleware";
import userRouter from "../router/user_router";
import authRouter from "../router/auth_router";
import stakeRouter from "../router/stake_router";
const app = express();
app.use(bodyParser.json());
app.use(cookieParser());
app.use("/user", authorized, userRouter);
app.use("/auth", authRouter);
app.use("/stake", stakeRouter);
/**
 * Convert
 *  - quote
 *  - perform
 *  - history
 * Staking
 *  - plans
 *  - current / past plans
 *  - enroll
 *  - close
 * Transfers
 *  - verify (to)
 *  - perform
 *  - history
 * Token Details
 *   - fetch details
 * Deposit History
 *  - pending / past request
 *  - new-request
 * Withdrawl History
 *  - pending / past
 *  - initiate
 */
const server = createServer(app);
export { app };
export default server;
