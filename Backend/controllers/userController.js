import { catchAsyncError } from "../middlewares/catchAsyncError.js";
import ErrorHandler from "../middlewares/error.js";
import Patients from "../models/patientModel.js";
import Doctors from "../models/doctorModel.js";
import bcrypt from "bcrypt";
import { sendToken } from "../utils/jwtToken.js";
import Admins from "../models/adminModel.js";

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

    console.log("Patient inserted successfully:", user.toJSON());
    sendToken(user, 200, res, "Patient Registered Successfully");
  } catch (error) {
    console.error("Error adding patient:", error);
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

    console.log("Doctor inserted successfully:", user.toJSON());
    sendToken(user, 200, res, "Doctor Registered Successfully");
  } catch (error) {
    console.error("Error adding doctor:", error);
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
      sendToken(user, 200, res, "Patient Login Successfully");
    } catch (error) {
      return next(new ErrorHandler("Error logging in", 500));
    }
  } else if (UserRole === "Admin") {
    try {
      const user = await Admins.findOne({
        where: { Email: Email } && { Passwordd: Passwordd },
      });
      if (!user) {
        return next(new ErrorHandler("Invalid email or password", 401));
      }

      //const passwordMatch = bcrypt.compareSync(Passwordd, user.Passwordd);

      // if (!passwordMatch) {
      //   return next(new ErrorHandler("Invalid email or password", 401));
      // }
      sendToken(user, 200, res, "Admin Login Successfully");
    } catch (error) {
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
      sendToken(user, 200, res, "Doctor Login Successfully");
    } catch (error) {
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

    console.log("Admin inserted successfully:", user.toJSON());
    sendToken(user, 200, res, "Admin Registered Successfully");
  } catch (error) {
    console.error("Error adding Admin:", error);
  }
});
