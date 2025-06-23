//load env in begining
import dotenv from "dotenv";
dotenv.config();
import server, { app } from "./config/server";
import Decimal from "decimal.js";
import { makeConnection } from "./database/connection";
import { defineAssoiciations } from "./database/associations";
import { setUpCronJobs } from "./services/cronjobs";
import { redisConnect } from "./config/redis";
Decimal.set({
  precision: 32,
});
const PORT = process.env.PORT || 8080;
// Serve a basic HTML file for
app.get("/", (req, res) => {
  res.send("Hi");
});
//todo : database user balance missing handling m

const test = async () => {};
server.listen(PORT, async () => {
  console.log(`Server is running on port ${PORT}`);
  await makeConnection();
  await defineAssoiciations();
  await redisConnect()
  setUpCronJobs();
  test();
});
