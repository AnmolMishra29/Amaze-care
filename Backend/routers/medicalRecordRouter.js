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

const router = express.Router();

router.post("/createrecord", isDoctor, createMedicalRecord);
router.get("/getallrecord", isAuthorized, getAllMedicalRecord);
router.get("/getrecordbyid/:id", isAuthorized, getMedicalRecordByID);
router.get(
  "/getrecordbyappointmentid",
  isAuthorized,
  getMedicalRecordByAppointmentID
);
router.get("/getrecordbypatientid", isAuthorized, getMedicalRecordByPatientID);
router.get("/getrecordbydoctorid", isAuthorized, getMedicalRecordByDoctorID);
router.put("/updaterecord", isDoctor, updateMedicalRecord);
router.delete("/deleterecord/:id", isDoctor, deleteMedicalRecordbyId);

export default router;
