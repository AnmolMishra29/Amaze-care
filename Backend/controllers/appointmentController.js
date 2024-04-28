import { catchAsyncError } from "../middlewares/catchAsyncError.js";
import Appointments from "../models/appointmentModel.js";

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

    res.status(200).json({
      success: true,
      message: "Appointment created successfully",
      newAppointment,
    });
  } catch (error) {
    console.error("Error inserting Appointment:", error);
  }
});

export const getAllAppointments = catchAsyncError(async (req, res, next) => {
  try {
    const allAppointments = await Appointments.findAll();

    res.status(200).json({ success: true, Appointments: allAppointments });
  } catch (error) {
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
      return res
        .status(404)
        .json({ success: false, error: "appointment not found" });
    }
    res.status(200).json({ success: true, Appointments: appointment });
  } catch (error) {
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
        return res
          .status(404)
          .json({ success: false, error: "appointment not found" });
      }
      res.status(200).json({ success: true, appointment });
    } catch (error) {
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
        return res
          .status(404)
          .json({ success: false, error: "appointment not found" });
      }
      res.status(200).json({ success: true, appointment });
    } catch (error) {
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
      return res.status(404).json({ error: "Appointment not found" });
    }

    appointment.AppointmentDate = AppointmentDate;
    appointment.Symptoms = Symptoms;
    appointment.AppointmentStatus = AppointmentStatus;

    await appointment.save();

    res.status(200).json({ success: true, appointment });
  } catch (error) {
    res.status(500).json({ error: "Internal Server Error" });
  }
});

export const cancelAppointment = catchAsyncError(async (req, res, next) => {
  const appointmentId = req.params.id;

  try {
    const appointment = await Appointments.findByPk(appointmentId);

    if (!appointment) {
      return res
        .status(404)
        .json({ success: false, error: "Appointment not found" });
    }

    await appointment.destroy();
    res
      .status(200)
      .json({ success: true, message: "Appointment canceled succesfully" });
  } catch (error) {
    console.log(error);
    res.status(500).json({ success: false, error: "Internal Server Error" });
  }
});
