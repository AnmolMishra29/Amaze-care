import { catchAsyncError } from "./catchAsyncError.js";
import jwt from "jsonwebtoken";

export const isAuthorized = catchAsyncError(async (req, res, next) => {
  // const { token } = req.cookies;
  // if (!token) {
  //   return next(new ErrorHandler("User not authorized", 400));
  // }
  // const decoded = jwt.verify(token, process.env.JWT_SECRET_KEY);

  // req.user = await User.findById(decoded.id);

  // next();
  const { token } = req.cookies;

  if (!token) {
    return res.status(400).json({ error: "User not authorized" });
  }

  jwt.verify(token, process.env.JWT_SECRET_KEY, (err, decoded) => {
    if (err) {
      console.error("Error verifying token:", err);
      return res.status(401).json({ error: "Invalid token" });
    }
    if (decoded.hasOwnProperty("PatientID")) {
      req.userId = decoded.PatientID;
    }
    if (decoded.hasOwnProperty("DoctorID")) {
      req.userId = decoded.DoctorID;
    }

    next();
  });
});
