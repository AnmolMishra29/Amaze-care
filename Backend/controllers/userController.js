import { catchAsyncError } from "../middlewares/catchAsyncError.js";
import ErrorHandler from "../middlewares/error.js";
import Patients from "../models/patientModel.js";
import Doctors from "../models/doctorModel.js";
import bcrypt from "bcrypt";
import { sendToken } from "../utils/jwtToken.js";
import Admins from "../models/adminModel.js";
import logger from "../utils/logger.js";

export const patientregister = catchAsyncError(async (req, res, next) => {
  const {
    PatientName,
    Age,
    Gender,
    ContactNumber,
    Email,
    Passwordd,
    UserRole,
  } = req.body;
  const hashedPassword = bcrypt.hashSync(Passwordd, 10);

  try {
    const user = await Patients.create({
      PatientName: PatientName,
      Age: Age,
      Gender: Gender,
      ContactNumber: ContactNumber,
      Email: Email,
      Passwordd: hashedPassword,
      UserRole: UserRole,
    });
    logger.info("Patient inserted:", user);
    sendToken(user, 200, res, "Patient Registered Successfully");
  } catch (error) {
    logger.error("Error inserting patient :", error);
    //console.error("Error adding patient:", error);
    res.status(500).json({ error: "Internal Server Error" });
  }
});

export const doctorregister = catchAsyncError(async (req, res, next) => {
  const {
    DoctorName,
    Speciality,
    Experience,
    Qualification,
    Designation,
    Email,
    UserRole,
    Passwordd,
  } = req.body;
  const hashedPassword = bcrypt.hashSync(Passwordd, 10);

  try {
    const user = await Doctors.create({
      DoctorName: DoctorName,
      Speciality: Speciality,
      Experience: Experience,
      Qualification: Qualification,
      Designation: Designation,
      Email: Email,
      UserRole: UserRole,
      Passwordd: hashedPassword,
    });
    logger.info("Doctor inserted:", user);
    sendToken(user, 200, res, "Doctor Registered Successfully");
  } catch (error) {
    logger.error("Error inserting doctor", error);
    res.status(500).json({ error: "Internal Server Error" });
  }
});

export const login = catchAsyncError(async (req, res, next) => {
  const { UserRole, Email, Passwordd } = req.body;
  if (UserRole === "Patient") {
    try {
      const user = await Patients.findOne({ where: { Email: Email } });
      if (!user) {
        return next(new ErrorHandler("Invalid email or password", 401));
      }

      const passwordMatch = bcrypt.compareSync(Passwordd, user.Passwordd);

      if (!passwordMatch) {
        return next(new ErrorHandler("Invalid email or password", 401));
      }
      logger.info("Patient Login successfully:", user);
      sendToken(user, 200, res, "Patient Login Successfully");
    } catch (error) {
      logger.error("Error in login of patient :", error);
      return next(new ErrorHandler("Error logging in", 500));
    }
  } else if (UserRole === "Admin") {
    try {
      const user = await Admins.findOne({
        where: { Email: Email },
      });
      if (!user) {
        return next(new ErrorHandler("Invalid email or password", 401));
      }

      const passwordMatch = bcrypt.compareSync(Passwordd, user.Passwordd);

      if (!passwordMatch) {
        return next(new ErrorHandler("Invalid email or password", 401));
      }
      logger.info("Admin Login successfully:", user);
      sendToken(user, 200, res, "Admin Login Successfully");
    } catch (error) {
      logger.error("Error in login of Admin :", error);
      return next(new ErrorHandler("Error logging in", 500));
    }
  } else {
    try {
      const user = await Doctors.findOne({ where: { Email: Email } });
      if (!user) {
        return next(new ErrorHandler("Invalid email or password", 401));
      }

      const passwordMatch = bcrypt.compareSync(Passwordd, user.Passwordd);

      if (!passwordMatch) {
        return next(new ErrorHandler("Invalid email or password", 401));
      }
      logger.info("Doctor Login successfully:", user);
      sendToken(user, 200, res, "Doctor Login Successfully");
    } catch (error) {
      logger.error("Error in login of Doctor :", error);
      return next(new ErrorHandler("Error logging in", 500));
    }
  }
});

export const logout = catchAsyncError(async (req, res, next) => {
  res
    .status(201)
    .cookie("token", "", {
      httpOnly: true,
      expires: new Date(Date.now()),
    })
    .json({
      success: true,
      message: "User Logged Out Successfully",
    });
});

export const adminregister = catchAsyncError(async (req, res, next) => {
  const { AdminName, Email, UserRole, Passwordd } = req.body;
  const hashedPassword = bcrypt.hashSync(Passwordd, 10);

  try {
    const user = await Admins.create({
      AdminName: AdminName,
      Email: Email,
      UserRole: UserRole,
      Passwordd: hashedPassword,
    });

    logger.info("Admin inserted successfully:", user);
    sendToken(user, 200, res, "Admin Registered Successfully");
  } catch (error) {
    logger.error("Error in regstering  admin:", error);
    res.status(500).json({ error: "Internal Server Error" });
  }
});
