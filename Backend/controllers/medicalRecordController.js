import { catchAsyncError } from "../middlewares/catchAsyncError.js";
import Records from "../models/medicalRecordModel.js";
import Appointments from "../models/appointmentModel.js";
import logger from "../utils/logger.js";

export const createMedicalRecord = catchAsyncError(async (req, res, next) => {
  const {
    CurrentSymptoms,
    PhysicalExamination,
    TreatmentPlan,
    RecommendedTests,
    AppointmentID,
  } = req.body;

  try {
    //await Records.sync();
    const newRecord = await Records.create({
      CurrentSymptoms: CurrentSymptoms,
      PhysicalExamination: PhysicalExamination,
      TreatmentPlan: TreatmentPlan,
      RecommendedTests: RecommendedTests,
      AppointmentID: AppointmentID,
    });

    logger.info("Medical Record inserted successfully :", newRecord);
    res.status(200).json({
      success: true,
      message: "Medical Record created successfully",
      newRecord,
    });
  } catch (error) {
    logger.error("Error in inserting new Medical record:", error);
    res.status(500).json({ success: false, error: "Internal Server Error" });
  }
});

export const getAllMedicalRecord = catchAsyncError(async (req, res, next) => {
  try {
    const allRecords = await Records.findAll();

    if (!allRecords) {
      logger.info("No medical record found:");
      return res
        .status(404)
        .json({ success: false, error: "Record not found" });
    }
    logger.info("All medical record :", allRecords);
    res.status(200).json({ success: true, MedicalRecords: allRecords });
  } catch (error) {
    logger.error("Error in fetching all Medical record:", error);
    res
      .status(500)
      .json({ success: false, error: "Error fetching records", error });
  }
});

export const getMedicalRecordByID = catchAsyncError(async (req, res, next) => {
  const recordId = req.params.id;

  try {
    const record = await Records.findByPk(recordId);

    if (!record) {
      logger.info("No medical record found:");
      return res
        .status(404)
        .json({ success: false, error: "Record not found" });
    }
    logger.info("Medical Record By ID :", record);
    res.status(200).json({ success: true, record });
  } catch (error) {
    logger.error("Error in fetching medical record by ID:", error);
    res.status(500).json({ success: false, error: "Internal Server Error" });
  }
});

export const getMedicalRecordByPatientID = catchAsyncError(
  async (req, res, next) => {
    const patientId = req.params.id;

    try {
      const appointments = await Appointments.findAll({
        where: { PatientID: patientId },
      });

      if (!appointments) {
        logger.info("No medical record found:");
        return res
          .status(404)
          .json({ success: false, error: "Medical Record not found" });
      }
      const appointmentIds = appointments.map(
        (appointment) => appointment.AppointmentID
      );

      const record = await Records.findAll({
        where: { AppointmentID: appointmentIds },
      });
      if (!record) {
        logger.info("No medical record found:");
        return res
          .status(404)
          .json({ success: false, error: "Medical Record not found" });
      }
      logger.info("Medical Record By PatientID :", record);
      res.status(200).json({ success: true, AllRecords: record });
    } catch (error) {
      logger.error("Error in fetching  medical record by patientID:", error);
      res.status(500).json({ success: false, error: "Internal Server Error" });
    }
  }
);

export const getMedicalRecordByDoctorID = catchAsyncError(
  async (req, res, next) => {
    const doctorId = req.params.id;

    try {
      const appointments = await Appointments.findAll({
        where: { DoctorID: doctorId },
      });

      if (!appointments) {
        logger.info("No medical record found:");
        return res
          .status(404)
          .json({ success: false, error: "Medical Record not found" });
      }
      const appointmentIds = appointments.map(
        (appointment) => appointment.AppointmentID
      );

      const record = await Records.findAll({
        where: { AppointmentID: appointmentIds },
      });
      if (!record) {
        logger.info("No medical record found:");
        return res
          .status(404)
          .json({ success: false, error: "Medical Record not found" });
      }
      logger.info("Medical Record By DoctorID :", record);
      res.status(200).json({ success: true, AllRecords: record });
    } catch (error) {
      logger.error("Error in fetching  medical record by DoctorID:", error);
      res.status(500).json({ success: false, error: "Internal Server Error" });
    }
  }
);

export const getMedicalRecordByAppointmentID = catchAsyncError(
  async (req, res, next) => {
    const appointmentId = req.params.id;

    try {
      const record = await Records.findAll({
        where: { AppointmentID: appointmentId },
      });

      if (!record) {
        logger.info("No medical record found:");
        return res
          .status(404)
          .json({ success: false, error: "Medical Record not found" });
      }
      logger.info("Medical Record By AppointmentID :", record);
      res.status(200).json({ success: true, AllRecords: record });
    } catch (error) {
      logger.error(
        "Error in fetching  medical record by AppointmentID:",
        error
      );
      res.status(500).json({ success: false, error: "Internal Server Error" });
    }
  }
);

export const updateMedicalRecord = catchAsyncError(async (req, res, next) => {
  try {
    const { id } = req.params;
    const {
      CurrentSymptoms,
      PhysicalExamination,
      TreatmentPlan,
      RecommendedTests,
    } = req.body;

    const record = await Records.findByPk(id);
    if (!record) {
      logger.info("No medical record found :");
      return res.status(404).json({ error: "Record not found" });
    }

    record.CurrentSymptoms = CurrentSymptoms;
    record.PhysicalExamination = PhysicalExamination;
    record.TreatmentPlan = TreatmentPlan;
    record.RecommendedTests = RecommendedTests;

    await record.save();
    logger.info("Medical Record updated successfully :", record);
    res.status(200).json({ success: true, record });
  } catch (error) {
    logger.error("Error in updating medical record :", error);
    res.status(500).json({ error: "Internal Server Error" });
  }
});

export const deleteMedicalRecordbyId = catchAsyncError(
  async (req, res, next) => {
    const recordId = req.params.id;

    try {
      const record = await Records.findByPk(recordId);

      if (!record) {
        logger.info("No medical record found:");
        return res
          .status(404)
          .json({ success: false, error: "Medical Record not found" });
      }

      await record.destroy();
      logger.info("Medical Record deleted successfully :", record);
      res
        .status(200)
        .json({ success: true, message: "Medical Record deleted succesfully" });
    } catch (error) {
      logger.error("Error in deleting  medical record :", error);
      res.status(500).json({ success: false, error: "Internal Server Error" });
    }
  }
);
