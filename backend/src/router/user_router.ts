import express from "express";
import user_controller from "../controllers/user_controller";
const userRouter = express.Router();

/**
 * Fetch user balance
 * user profile
 */

userRouter.get("/profile", user_controller.fetchProfile);
userRouter.get("/assets", user_controller.fetchAssets);
userRouter.get("/totp_secret", user_controller.get2FASecret);
userRouter.post("/initiate-2fa-setup", user_controller.initiate2FASetup);

export default userRouter;
