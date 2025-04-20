import express from "express";
import dotenv from "dotenv";
import morgan from "morgan";
import { errorHandler } from "./middlewares/error.middleware.js";

dotenv.config();

const app = express();

app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(morgan("dev"));

app.get("/", (req, res) => {
  res.send("hello world");
});

app.use(errorHandler);

export default app;
