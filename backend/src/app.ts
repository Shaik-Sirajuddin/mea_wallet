//load env in begining
import dotenv from "dotenv";
dotenv.config();
import server, { app } from "./config/server";
import Decimal from "decimal.js";
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
  // makeConnection();
});
