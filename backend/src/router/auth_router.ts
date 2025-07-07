import express from "express";
import authController from "../controllers/auth_controller";
import rateLimit from "express-rate-limit";
import { authorized } from "../middleware/auth_middleware";
/***
 * TODO :
 * 2fa :
 * verify 2fa account
 * login 2fa complete
 */

const authRouter = express.Router();

authRouter.post("/sign-up", authController.signUp);
authRouter.post("/login", authController.login);
authRouter.get("/validate-session", authorized, authController.validateSession);
authRouter.post("/reset-pass", authController.requestPasswordReset);
authRouter.post("/verify-reset-hash", authController.verifyResetToken);
authRouter.post("/confirm-pass-reset", authController.confirmReset);

export const passwordResetLimiter = rateLimit({
  windowMs: 1 * 60 * 1000, // 1 minute window
  max: 1, // limit 1 request per windowMs
  message: {
    message:
      "Too many password reset requests, please try again after some time",
  },
  keyGenerator: (req) => req.body.email ?? "", // Apply rate limit based on email
});

export default authRouter;
