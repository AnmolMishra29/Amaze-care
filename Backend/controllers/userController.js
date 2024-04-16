import { catchAsyncError } from "../middlewares/catchAsyncError.js";
import ErrorHandler from "../middlewares/error.js";
import mysqlPool from "../database/db.js";
import { sendToken } from "../utils/jwtToken.js";
import bcrypt from "bcrypt";

export const patientregister = catchAsyncError(async (req, res, next) => {
  const {
    PatientName,
    Age,
    Gender,
    ContactNumber,
    Email,
    PatientPassword,
    UserRole,
  } = req.body;
  const hashedPassword = bcrypt.hashSync(PatientPassword, 10);

  try {
    const sql =
      "INSERT INTO patients (PatientName, Age,Gender,ContactNumber,Email,PatientPassword,UserRole) VALUES (?, ?, ?,? ,? ,?, ? )";
    mysqlPool.query(
      sql,
      [
        PatientName,
        Age,
        Gender,
        ContactNumber,
        Email,
        hashedPassword,
        UserRole,
      ],
      (err, result) => {
        if (err) {
          res.status(500).json({ message: "Error registering patient" });
        }
        //const user = result[0];
        //res.status(200).json({ message: "Patient registered successfully" });
        sendToken(user, 200, res, "Patient Registered Successfully");
      }
    );
  } catch (error) {
    return next(new ErrorHandler(error, 500));
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
    DoctorPassword,
  } = req.body;
  const hashedPassword = bcrypt.hashSync(DoctorPassword, 10);

  try {
    const sql =
      "INSERT INTO doctors (DoctorName, Speciality,Experience,Qualification,Designation,Email,UserRole,DoctorPassword) VALUES (?, ?, ?,? ,? ,?, ?,? )";
    mysqlPool.query(
      sql,
      [
        DoctorName,
        Speciality,
        Experience,
        Qualification,
        Designation,
        Email,
        UserRole,
        hashedPassword,
      ],
      (err, result) => {
        if (err) {
          console.log(err);
          res.status(500).json({ message: "Error registering Doctor" });
          //return next(new ErrorHandler("Error registering Doctor", 500));
        }
        const user = result[0];
        //res.status(200).json({ message: "Doctor registered successfully" });
        sendToken(user, 200, res, "Doctor Registered Successfully");
      }
    );
  } catch (error) {
    return next(new ErrorHandler(error, 500));
  }
});

export const patientlogin = catchAsyncError(async (req, res, next) => {
  const { UserRole, Email, PatientPassword } = req.body;
  if (UserRole === "Doctor") {
    return next(new ErrorHandler("User with this role is not allowed", 400));
  }

  const sql = "SELECT * FROM patients WHERE Email = ?";
  mysqlPool.query(sql, [Email], (err, results) => {
    if (err) {
      return next(new ErrorHandler("Error logging in", 500));
    }
    if (results.length === 0) {
      return next(new ErrorHandler("Invalid email or password", 401));
    }
    const user = results[0];
    const passwordMatch = bcrypt.compareSync(
      PatientPassword,
      user.PatientPassword
    );
    if (!passwordMatch) {
      return res.status(401).json({ error: "Invalid email or password" });
    }

    sendToken(user, 200, res, "Patient Login Successfully");
  });
});

export const doctorlogin = catchAsyncError(async (req, res, next) => {
  const { UserRole, Email, DoctorPassword } = req.body;
  if (UserRole === "Patient") {
    return next(new ErrorHandler("User with this role is not allowed", 400));
  }

  const sql = "SELECT * FROM doctors WHERE Email = ?";
  mysqlPool.query(sql, [Email], (err, results) => {
    if (err) {
      return next(new ErrorHandler("Error logging in", 500));
    }
    if (results.length === 0) {
      return next(new ErrorHandler("Invalid email or password", 401));
    }
    const user = results[0];
    const passwordMatch = bcrypt.compareSync(
      DoctorPassword,
      user.DoctorPassword
    );
    if (!passwordMatch) {
      return res.status(401).json({ message: "Invalid email or password" });
    }

    sendToken(user, 200, res, "Doctor Login Successfully");

    // const getJWTToken = () => {
    //   return jwt.sign(
    //     { id: user.DoctorID, email: user.Email },
    //     process.env.JWT_SECRET_KEY,
    //     {
    //       expiresIn: process.env.JWT_EXPIRE,
    //     }
    //   );
    // };
  });
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

export const getAllDoctors = catchAsyncError(async (req, res, next) => {
  const sql =
    "SELECT DoctorID,DoctorName,Speciality,Experience,Qualification,Designation,Email FROM doctors";
  mysqlPool.query(sql, (err, results) => {
    if (err) {
      return res.status(500).json({ error: "Internal Server Error" });
    }
    res.status(200).json({ success: true, patients: results });
  });
});

export const getAllPatients = catchAsyncError(async (req, res, next) => {
  const sql =
    "SELECT PatientID,PatientName, Age, Gender,ContactNumber,Email FROM patients";
  mysqlPool.query(sql, (err, results) => {
    if (err) {
      return res.status(500).json({ error: "Internal Server Error" });
    }
    res.status(200).json({ success: true, patients: results });
  });
});
