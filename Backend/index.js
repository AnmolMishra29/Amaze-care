import express from "express";
import dotenv from "dotenv";
import cors from "cors";
import cookieParser from "cookie-parser";
import userRouter from "./routers/userRouter.js";
import appointmentRouter from "./routers/appointmentRouter.js";
import medicalRecordRouter from "./routers/medicalRecordRouter.js";
import prescriptionRouter from "./routers/prescriptionRouter.js";
import patientRouter from "./routers/patientRouter.js";
import doctorRouter from "./routers/DoctorRouter.js";
import sequelize from "./database/db.js";

const app = express();
dotenv.config({ path: "./config/config.env" });

app.use(
  cors({
    origin: [process.env.FRONTEND_URL],
    methods: ["GET", "POST", "DELETE", "PUT"],
    credentials: true,
  })
);

app.use(cookieParser());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.use("/api/v1/user", userRouter);
app.use("/api/v1/medical", medicalRecordRouter);
app.use("/api/v1/prescription", prescriptionRouter);
app.use("/api/v1/appointment", appointmentRouter);
app.use("/api/v1/patient", patientRouter);
app.use("/api/v1/doctor", doctorRouter);
try {
  sequelize.authenticate();
  console.log("Database connected Successfully");
} catch (error) {
  console.log("Error connecting with the database", error);
}

app.listen(process.env.PORT, () => {
  console.log(`Server is running on PORT ${process.env.PORT}`);
});
