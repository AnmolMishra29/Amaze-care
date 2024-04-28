import express from "express";
import {
  getPatientByName,
  getAllPatients,
  getPatientById,
  updatePatientDetails,
} from "../controllers/patientController.js";

import { isAuthorized, isDoctor, isPatient } from "../middlewares/auth.js";

const router = express.Router();

router.get("/getallpatients", isAuthorized, getAllPatients);
router.get("/getpatientbyid/:id", isAuthorized, getPatientById);
router.get("/getpatientbyname", isAuthorized, getPatientByName);
router.patch("/updatepatient/:id", isPatient, updatePatientDetails);

export default router;
