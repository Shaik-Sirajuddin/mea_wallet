import express from "express";
import staking_controller from "../controllers/staking_controller";
const stakeRouter = express.Router();

/**
 * Fetch user balance
 * user profile
 */

stakeRouter.get("/plans", staking_controller.fetchPlans);
stakeRouter.get("/stakes", staking_controller.fetchStakingDeposits);
stakeRouter.post("/enroll-stake", staking_controller.enrollStaking);
stakeRouter.post("/close-stake", staking_controller.closeStaking);
export default stakeRouter;
