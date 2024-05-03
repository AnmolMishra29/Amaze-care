import express from "express";
import {
  createAppointment,
  cancelAppointment,
  getAllAppointments,
  getAppointmentByID,
  getAllAppointmentsByDoctorID,
  getAllAppointmentsByPatientID,
  updateAppointment,
  updateAppointmentStatus,
  updateAppointmentDateandTime,
} from "../controllers/appointmentController.js";

import { isAuthorized, isDoctor, isPatient } from "../middlewares/auth.js";
import { appointmentDataValidate } from "../middlewares/validation.js";

const router = express.Router();

router.post(
  "/createappointment",
  isPatient,
  appointmentDataValidate,
  createAppointment
);
router.get("/getallappointment", isAuthorized, getAllAppointments);
router.get(
  "/getappointmentbydoctorid/:id",
  isAuthorized,
  getAllAppointmentsByDoctorID
);
router.get(
  "/getappointmentbypatientid/:id",
  isAuthorized,
  getAllAppointmentsByPatientID
);
router.get("/getappointmentbyid/:id", isAuthorized, getAppointmentByID);
router.put("/updateappointment/:id", isPatient, updateAppointment);
router.put("/updateappointmentstatus/:id", isPatient, updateAppointmentStatus);
router.put(
  "/updateappointmentdate/:id",
  isPatient,
  updateAppointmentDateandTime
);
router.delete("/cancelappointment/:id", isPatient, cancelAppointment);

export default router;
