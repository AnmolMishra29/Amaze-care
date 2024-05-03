import { catchAsyncError } from "../middlewares/catchAsyncError.js";
import Appointments from "../models/appointmentModel.js";
import logger from "../utils/logger.js";

export const createAppointment = catchAsyncError(async (req, res, next) => {
  const { DoctorID, PatientID, AppointmentDate, Symptoms, AppointmentStatus } =
    req.body;

  try {
    await Appointments.sync();
    const newAppointment = await Appointments.create({
      DoctorID: DoctorID,
      PatientID: PatientID,
      AppointmentDate: AppointmentDate,
      Symptoms: Symptoms,
      AppointmentStatus: AppointmentStatus,
    });
    logger.info("Appointments created successfully  :", newAppointment);
    res.status(200).json({
      success: true,
      message: "Appointment created successfully",
      newAppointment,
    });
  } catch (error) {
    logger.error("Error in creating appointment :", error);
    res.status(500).json({ success: false, error: "Internal Server Error" });
  }
});

export const getAllAppointments = catchAsyncError(async (req, res, next) => {
  try {
    const allAppointments = await Appointments.findAll();

    if (!allAppointments) {
      logger.info("No Appointment found");
      return res
        .status(404)
        .json({ success: false, error: "appointment not found" });
    }

    logger.info("Get all Appointments:", allAppointments);
    res.status(200).json({ success: true, Appointments: allAppointments });
  } catch (error) {
    logger.error("Error in fetching all appointment s:", error);
    res
      .status(500)
      .json({ success: false, error: "Error fetching Appointments ", error });
  }
});

export const getAppointmentByID = catchAsyncError(async (req, res, next) => {
  const appointmentId = req.params.id;

  try {
    const appointment = await Appointments.findByPk(appointmentId);

    if (!appointment) {
      logger.info("No Appointment found");
      return res
        .status(404)
        .json({ success: false, error: "appointment not found" });
    }
    logger.info("Get Appointment by ID:", appointment);
    res.status(200).json({ success: true, Appointments: appointment });
  } catch (error) {
    logger.error("Error in fetching appointment by ID :", error);
    res.status(500).json({ success: false, error: "Internal Server Error" });
  }
});

export const getAllAppointmentsByDoctorID = catchAsyncError(
  async (req, res, next) => {
    const doctorId = req.params.id;

    try {
      const appointment = await Appointments.findAll({
        where: { DoctorID: doctorId },
      });

      if (!appointment) {
        logger.info("No Appointment found");
        return res
          .status(404)
          .json({ success: false, error: "appointment not found" });
      }
      logger.info("Get Appointment by DoctorID:", appointment);
      res.status(200).json({ success: true, appointment });
    } catch (error) {
      logger.error("Error in fetching appointment by DoctorID:", error);
      res.status(500).json({ success: false, error: "Internal Server Error" });
    }
  }
);

export const getAllAppointmentsByPatientID = catchAsyncError(
  async (req, res, next) => {
    const patientId = req.params.id;

    try {
      const appointment = await Appointments.findAll({
        where: { PatientID: patientId },
      });

      if (!appointment) {
        logger.info("No Appointment found");
        return res
          .status(404)
          .json({ success: false, error: "appointment not found" });
      }
      logger.info("Get Appointment by PatientID:", appointment);
      res.status(200).json({ success: true, appointment });
    } catch (error) {
      logger.error("Error in fetching appointment by PatientID:", error);
      res.status(500).json({ success: false, error: "Internal Server Error" });
    }
  }
);

export const updateAppointment = catchAsyncError(async (req, res, next) => {
  try {
    const { id } = req.params;
    const { AppointmentDate, Symptoms, AppointmentStatus } = req.body;

    const appointment = await Appointments.findByPk(id);
    if (!appointment) {
      logger.info("No Appointment found");
      return res.status(404).json({ error: "Appointment not found" });
    }

    appointment.AppointmentDate = AppointmentDate;
    appointment.Symptoms = Symptoms;
    appointment.AppointmentStatus = AppointmentStatus;

    await appointment.save();
    logger.info("Appointment updated successfully:", appointment);
    res.status(200).json({ success: true, appointment });
  } catch (error) {
    logger.error("Error in updating appointment:", error);
    res.status(500).json({ error: "Internal Server Error" });
  }
});

export const updateAppointmentDateandTime = catchAsyncError(
  async (req, res, next) => {
    try {
      const { id } = req.params;
      const { AppointmentDate } = req.body;

      const appointment = await Appointments.findByPk(id);
      if (!appointment) {
        logger.info("No Appointment found");
        return res.status(404).json({ error: "Appointment not found" });
      }

      appointment.AppointmentDate = AppointmentDate;

      await appointment.save();
      logger.info(
        "Appointment date and time updated successfully:",
        appointment
      );
      res.status(200).json({ success: true, appointment });
    } catch (error) {
      logger.error("Error in updating appointment date and time:", error);
      res.status(500).json({ error: "Internal Server Error" });
    }
  }
);

export const updateAppointmentStatus = catchAsyncError(
  async (req, res, next) => {
    try {
      const { id } = req.params;
      const { AppointmentStatus } = req.body;

      const appointment = await Appointments.findByPk(id);
      if (!appointment) {
        logger.info("No Appointment found");
        return res.status(404).json({ error: "Appointment not found" });
      }

      appointment.AppointmentStatus = AppointmentStatus;

      await appointment.save();
      logger.info("Appointment status updated successfully:", appointment);
      res.status(200).json({ success: true, appointment });
    } catch (error) {
      logger.error("Error in updating appointment status:", error);
      res.status(500).json({ error: "Internal Server Error" });
    }
  }
);

export const cancelAppointment = catchAsyncError(async (req, res, next) => {
  const appointmentId = req.params.id;

  try {
    const appointment = await Appointments.findByPk(appointmentId);

    if (!appointment) {
      logger.info("No Appointment found");
      return res
        .status(404)
        .json({ success: false, error: "Appointment not found" });
    }

    await appointment.destroy();
    logger.info("Appointment cancelled successfully:", appointment);
    res
      .status(200)
      .json({ success: true, message: "Appointment canceled successfully" });
  } catch (error) {
    logger.error("Error in cancelling appointment :", error);
    res.status(500).json({ success: false, error: "Internal Server Error" });
  }
});
