import { catchAsyncError } from "../middlewares/catchAsyncError";
import mysqlPool from "../database/db.js";

export const createMedicalRecord = catchAsyncError(
  async (req, res, next) => {}
);

export const getAllMedicalRecord = catchAsyncError(
  async (req, res, next) => {}
);

export const getMedicalRecordByID = catchAsyncError(
  async (req, res, next) => {}
);

export const getMedicalRecordByPatientID = catchAsyncError(
  async (req, res, next) => {}
);

export const getMedicalRecordByDoctorID = catchAsyncError(
  async (req, res, next) => {}
);

export const getMedicalRecordByAppointmentID = catchAsyncError(
  async (req, res, next) => {}
);

export const updateMedicalRecord = catchAsyncError(
  async (req, res, next) => {}
);

export const deleteMedicalRecord = catchAsyncError(
  async (req, res, next) => {}
);
