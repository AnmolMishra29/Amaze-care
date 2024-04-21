import { catchAsyncError } from "../middlewares/catchAsyncError.js";
import Patients from "../models/patientModel.js";

export const getAllPatients = catchAsyncError(async (req, res, next) => {
  try {
    const allPatients = await Patients.findAll();

    res.status(200).json({ success: true, Patients: allPatients });
  } catch (error) {
    res
      .status(500)
      .json({ success: false, error: "Error fetching patients", error });
  }
});

export const getPatientById = catchAsyncError(async (req, res, next) => {
  const patientId = req.params.id;

  try {
    const patient = await Patients.findByPk(patientId);

    if (!patient) {
      return res
        .status(404)
        .json({ success: false, error: "Patient not found" });
    }
    res.status(200).json({ success: true, record });
  } catch (error) {
    res.status(500).json({ success: false, error: "Internal Server Error" });
  }
});

export const getPatientByName = catchAsyncError(async (req, res, next) => {});

export const updatePatientDetails = catchAsyncError(
  async (req, res, next) => {}
);
