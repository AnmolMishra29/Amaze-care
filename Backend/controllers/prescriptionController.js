import mysqlPool from "../database/db.js";
import { catchAsyncError } from "../middlewares/catchAsyncError.js";

export const createPrescription = catchAsyncError(async (req, res, next) => {});

export const getAllPrescription = catchAsyncError(async (req, res, next) => {});

export const getAllPrescriptionID = catchAsyncError(
  async (req, res, next) => {}
);

export const getAllPrescriptionRecordID = catchAsyncError(
  async (req, res, next) => {}
);

export const updatePrescription = catchAsyncError(async (req, res, next) => {});

export const deletePrescription = catchAsyncError(async (req, res, next) => {});
