import express from "express";
import convert_controller from "../controllers/convert_controller";
const convertRouter = express.Router();

convertRouter.post("/quote", convert_controller.getQuote);
convertRouter.get("/history", convert_controller.getHistory);
convertRouter.post("/execute", convert_controller.executeQuote);
export default convertRouter;
