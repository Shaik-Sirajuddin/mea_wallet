import express from "express";
import authController from "../controllers/auth_controller";
import rateLimit from "express-rate-limit";
//login -> 2fa

//sign up

//login 2fa complete
//verify 2fa account
//request withdraw
//....

/***
 *
 */

const authRouter = express.Router();

authRouter.post("/sign-up", authController.signUp);
authRouter.post("/login", authController.login);
authRouter.post("/reset-pass", authController.requestPasswordReset);
authRouter.post("/verify-reset-hash", authController.veiryResetToken);
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
