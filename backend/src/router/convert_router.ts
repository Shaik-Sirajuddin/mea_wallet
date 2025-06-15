import express from "express";
import convert_controller from "../controllers/convert_controller";
const convertRouter = express.Router();

convertRouter.post("/quote", convert_controller.getQuote);
