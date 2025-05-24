import express from "express";
import { createServer } from "http";
import bodyParser from "body-parser";
const app = express();
app.use(bodyParser.json());
const server = createServer(app);
export { app };
export default server;
