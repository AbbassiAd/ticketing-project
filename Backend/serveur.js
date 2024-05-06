import express from "express";
import dotenv from "dotenv";
import connectDB from "./config/db.js";
import userRouter from "./routes/userRoutes.js";
import cors from "cors";
connectDB();

const app = express();
dotenv.config()
const port = process.env.PORT || 5000;
app.use(cors());
app.use(express.json());
app.use("/api/users/",userRouter);
app.listen(5000, console.log("server started on port " +port));