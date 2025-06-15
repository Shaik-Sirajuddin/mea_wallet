//load env in begining
import dotenv from "dotenv";
dotenv.config();
import server, { app } from "./config/server";
import Decimal from "decimal.js";
import { makeConnection } from "./database/connection";
import BirdEyeProvider from "./lib/chart_provider/birdeye";
import bingx from "./lib/price_provider/bingx";
import coinstore from "./lib/price_provider/coinstore";
Decimal.set({
  precision: 32,
});
const PORT = process.env.PORT || 8080;
// Serve a basic HTML file for
app.get("/", (req, res) => {
  res.send("Hi");
});

server.listen(PORT, async () => {
  console.log(`Server is running on port ${PORT}`);
  makeConnection();
  // test();
});
