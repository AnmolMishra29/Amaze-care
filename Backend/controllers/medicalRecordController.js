import { catchAsyncError } from "../middlewares/catchAsyncError.js";
import Records from "../models/medicalRecordModel.js";
import Appointments from "../models/appointmentModel.js";

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

    console.log("Medical Record created successfully:", newRecord.toJSON());
    res.status(200).json({
      success: true,
      message: "Medical Record created successfully",
      newRecord,
    });
  } catch (error) {
    console.error("Error inserting medical record:", error);
  }
});

export const getAllMedicalRecord = catchAsyncError(async (req, res, next) => {
  try {
    const allRecords = await Records.findAll();

    res.status(200).json({ success: true, MedicalRecords: allRecords });
  } catch (error) {
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
      return res
        .status(404)
        .json({ success: false, error: "Record not found" });
    }
    res.status(200).json({ success: true, record });
  } catch (error) {
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
        return res
          .status(404)
          .json({ success: false, error: "Medical Record not found" });
      }
      res.status(200).json({ success: true, AllRecords: record });
    } catch (error) {
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
        return res
          .status(404)
          .json({ success: false, error: "Medical Record not found" });
      }

      res.status(200).json({ success: true, AllRecords: record });
    } catch (error) {
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
        return res
          .status(404)
          .json({ success: false, error: "Medical Record not found" });
      }
      res.status(200).json({ success: true, AllRecords: record });
    } catch (error) {
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
      return res.status(404).json({ error: "Record not found" });
    }

    record.CurrentSymptoms = CurrentSymptoms;
    record.PhysicalExamination = PhysicalExamination;
    record.TreatmentPlan = TreatmentPlan;
    record.RecommendedTests = RecommendedTests;

    await record.save();

    res.status(200).json({ success: true, record });
  } catch (error) {
    res.status(500).json({ error: "Internal Server Error" });
  }
});

export const deleteMedicalRecordbyId = catchAsyncError(
  async (req, res, next) => {
    const recordId = req.params.id;

    try {
      const record = await Records.findByPk(recordId);

      if (!record) {
        return res
          .status(404)
          .json({ success: false, error: "Medical Record not found" });
      }

      await record.destroy();
      res
        .status(200)
        .json({ success: true, message: "Medical Record deleted succesfully" });
    } catch (error) {
      console.log(error);
      res.status(500).json({ success: false, error: "Internal Server Error" });
    }
  }
);
