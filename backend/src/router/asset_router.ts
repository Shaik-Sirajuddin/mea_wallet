import express from "express";
import asset_controller from "../controllers/asset_controller";
const assetRouter = express.Router();

assetRouter.post("/deposit", asset_controller.deposit);
assetRouter.post("/initiate-withdrawl", asset_controller.withdraw);
assetRouter.post("/confirm-withdrawl", asset_controller.verifyWithdrawlRequest);
assetRouter.post("/cancel-withdrawl", asset_controller.cancelWithdrawlRequest);
assetRouter.post("/transfer", asset_controller.transfer);

export default assetRouter;
