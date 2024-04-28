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

export const updatePatientDetails = catchAsyncError(async (req, res, next) => {
  try {
    const { id } = req.params;
    const { Age, ContactNumber } = req.body;

    // Validate request data
    // if (!) {
    //   return res.status(400).json({ error: "Email field is required" });
    // }

    const patient = await Patients.findByPk(id);
    if (!patient) {
      return res.status(404).json({ error: "Patient not found" });
    }

    patient.Age = Age;
    patient.ContactNumber = ContactNumber;

    await patient.save();

    res.status(200).json({ success: true, patient });
  } catch (error) {
    console.error("Error updating patient email:", error);
    res.status(500).json({ error: "Internal Server Error" });
  }
});
