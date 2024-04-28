import jwt from "jsonwebtoken";

export const sendToken = (user, statusCode, res, message) => {
  let token = "";
  if (user.UserRole === "Patient") {
    token = getJWTTokenforPatient(user.PatientID, user.Email);
  } else if (user.UserRole === "Doctor") {
    token = getJWTTokenforDoctor(user.DoctorID, user.Email);
  } else {
    token = getJWTTokenforAdmin(user.AdminID, user.Email);
  }
  //const token = getJWTToken(user.DoctorID, user.Email);
  //const token = user.getJWTToken();
  const options = {
    expires: new Date(
      Date.now() + process.env.COOKIE_EXPRIRE * 24 * 60 * 60 * 1000
    ),
    httpOnly: true,
  };
  res.status(statusCode).cookie("token", token, options).json({
    success: true,
    user,
    message,
    token,
  });
};

const getJWTTokenforDoctor = (DoctorID, Email) => {
  return jwt.sign(
    //{ id: user.DoctorID, email: user.Email },
    { id: DoctorID, email: Email, UserRole: "Doctor" },
    process.env.JWT_SECRET_KEY,
    {
      expiresIn: process.env.JWT_EXPIRE,
    }
  );
};

const getJWTTokenforPatient = (PatientID, Email) => {
  return jwt.sign(
    { id: PatientID, email: Email, UserRole: "Patient" },
    process.env.JWT_SECRET_KEY,
    {
      expiresIn: process.env.JWT_EXPIRE,
    }
  );
};

const getJWTTokenforAdmin = (AdminID, Email) => {
  return jwt.sign(
    { id: AdminID, email: Email, UserRole: "Admin" },
    process.env.JWT_SECRET_KEY,
    {
      expiresIn: process.env.JWT_EXPIRE,
    }
  );
};
