import express from "express";
import {
  createMedicalRecord,
  deleteMedicalRecordbyId,
  getAllMedicalRecord,
  getMedicalRecordByAppointmentID,
  getMedicalRecordByDoctorID,
  getMedicalRecordByID,
  getMedicalRecordByPatientID,
  updateMedicalRecord,
} from "../controllers/medicalRecordController.js";

import { isAuthorized, isDoctor, isPatient } from "../middlewares/auth.js";
import { medicalRecordDataValidate } from "../middlewares/validation.js";

const router = express.Router();

router.post(
  "/createrecord",
  isDoctor,
  medicalRecordDataValidate,
  createMedicalRecord
);
router.get("/getallrecord", isAuthorized, getAllMedicalRecord);
router.get("/getrecordbyid/:id", isAuthorized, getMedicalRecordByID);
router.get(
  "/getrecordbyappointmentid/:id",
  isAuthorized,
  getMedicalRecordByAppointmentID
);
router.get(
  "/getrecordbypatientid/:id",
  isAuthorized,
  getMedicalRecordByPatientID
);
router.get(
  "/getrecordbydoctorid/:id",
  isAuthorized,
  getMedicalRecordByDoctorID
);
router.put("/updaterecord/:id", isDoctor, updateMedicalRecord);
router.delete("/deleterecord/:id", isDoctor, deleteMedicalRecordbyId);

export default router;
