import "reflect-metadata";
import express from "express";
import cors from "cors";
import dotenv from "dotenv";
import cookieParser from 'cookie-parser';
import { pool } from "./config/database";

dotenv.config();

const app = express();
app.use(cors({ credentials: true, origin: process.env.FRONTEND_URL || "http://localhost:5173" }));
app.use(cookieParser());
app.use(express.json());


app.listen(5000, async () => {
  try {
    const connection = await pool.getConnection();
    console.log("Connected to MySQL");
    connection.release();
    console.log("Server running on port 5000");
  } catch (err) {
    console.error("Failed to connect to MySQL:", err);
    process.exit(1);
  }
});
