import express from "express";
import asset_controller from "../controllers/asset_controller";
const assetRouter = express.Router();

assetRouter.post("/deposit", asset_controller.deposit);
assetRouter.get("/initiate-withdrawl", asset_controller.withdraw);
assetRouter.get("/confirm-withdrawl", asset_controller.verifyWithdrawlRequest);

export default assetRouter;
