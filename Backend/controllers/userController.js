import { catchAsyncError } from "../middlewares/catchAsyncError.js";
import ErrorHandler from "../middlewares/error.js";
import { sendToken } from "../utils/jwtToken.js";

export const register = catchAsyncError(async (req, res, next) => {});

export const login = catchAsyncError(async (req, res, next) => {});

export const logout = catchAsyncError(async (req, res, next) => {});
