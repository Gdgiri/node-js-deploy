// index.js
import express from "express";
import cors from "cors";
import dotenv from "dotenv";
import { MongoDB } from "./Database/config.js";
import empRouter from "./Routers/employeeRouter.js";

dotenv.config();

const app = express();
const PORT = process.env.PORT || 4000; // Fallback to port 4000 if .env is missing or incorrect

app.use(cors());
app.use(express.json());

MongoDB();

app.get("/", (req, res) => {
  res.status(200).send("Welcome back");
});

app.use("/api", empRouter);

app.listen(PORT, () => {
  console.log(`App is running on port ${PORT}`);
});
