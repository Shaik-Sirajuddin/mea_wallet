import express from "express";
import { createServer } from "http";
import bodyParser from "body-parser";
import cookieParser from "cookie-parser";
import cors from "cors";
import { authorized } from "../middleware/auth_middleware";
import userRouter from "../router/user_router";
import authRouter from "../router/auth_router";
import stakeRouter from "../router/stake_router";
import assetRouter from "../router/asset_router";

const app = express();
app.use(bodyParser.json());
app.use(cookieParser());
app.use("/user", authorized, userRouter);
app.use("/auth", authRouter);
app.use("/asset", assetRouter);
app.use("/stake", stakeRouter);
const corsOptions = {
  origin: (_origin: any, callback: (arg0: null, arg1: boolean) => void) => {
    // Check if the origin is in the list of allowed origins
    callback(null, true);
  },
  //   origin: "http://localhost:3000", // Change this to the specific domain you want to allow
  methods: "GET,PUT,POST,OPTIONS", // Specify allowed methods
  credentials: true,
  allowedHeaders: "*",
};

app.use(cors(corsOptions));
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
