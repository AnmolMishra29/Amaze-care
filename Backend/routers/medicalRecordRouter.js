import express from "express";
import {
  createMedicalRecord,
  deleteMedicalRecord,
  getAllMedicalRecord,
  getMedicalRecordByAppointmentID,
  getMedicalRecordByDoctorID,
  getMedicalRecordByID,
  getMedicalRecordByPatientID,
  updateMedicalRecord,
} from "../controllers/medicalRecordController.js";

import { isAuthorized } from "../middlewares/auth.js";

const router = express.Router();

router.post("/createrecord", isAuthorized, createMedicalRecord);
router.get("/getallrecord", isAuthorized, getAllMedicalRecord);
router.get("/getrecordbyid", isAuthorized, getMedicalRecordByID);
router.get(
  "/getrecordbyappointmentid",
  isAuthorized,
  getMedicalRecordByAppointmentID
);
router.get("/getrecordbypatientid", isAuthorized, getMedicalRecordByPatientID);
router.get("/getrecordbydoctorid", isAuthorized, getMedicalRecordByDoctorID);
router.put("/updaterecord", isAuthorized, updateMedicalRecord);
router.delete("/deleterecord", isAuthorized, deleteMedicalRecord);

export default router;
