import express from "express";
import dotenv from "dotenv";
import cors from "cors";
import { userRouter } from "./routers/userRouter.js";
import mysqlPool from "./database/db.js";

const app = express();
dotenv.config({ path: "./config/config.env" });

app.use("/api/v1/user", userRouter);
app.use(
  cors({
    origin: "http://localhost:5173",
    //[process.env.FRONTEND_URL],
    methods: ["GET", "POST", "DELETE", "PUT"],
    credentials: true,
  })
);

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

mysqlPool
  .query("select 1")
  .then(() => {
    console.log("Database connected succesfully");
    app.listen(8080, () => console.log("Server is running at port 8080"));
  })
  .catch((err) => console.log("Database connection failed", err));
