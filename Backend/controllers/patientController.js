import { catchAsyncError } from "../middlewares/catchAsyncError.js";
import Patients from "../models/patientModel.js";
import logger from "../utils/logger.js";

export const getAllPatients = catchAsyncError(async (req, res, next) => {
  try {
    const allPatients = await Patients.findAll();

    if (!allPatients) {
      logger.info("No patients found");
      return res
        .status(404)
        .json({ success: false, error: "Patient not found" });
    }
    logger.info("Get all patients :", allPatients);
    res.status(200).json({ success: true, Patients: allPatients });
  } catch (error) {
    logger.error("Error in fetching all patients :", error);
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
      logger.info("No patients found");
      return res
        .status(404)
        .json({ success: false, error: "Patient not found" });
    }
    logger.info("Get patient by ID :", patient);
    res.status(200).json({ success: true, record });
  } catch (error) {
    logger.error("Error in fetching patient by ID:", error);
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
      logger.info("No patients found");
      return res.status(404).json({ error: "Patient not found" });
    }

    patient.Age = Age;
    patient.ContactNumber = ContactNumber;

    await patient.save();
    logger.info("Patient updated successfully :", patient);
    res.status(200).json({ success: true, patient });
  } catch (error) {
    logger.error("Error in updating patient :", error);
    res.status(500).json({ error: "Internal Server Error" });
  }
});
