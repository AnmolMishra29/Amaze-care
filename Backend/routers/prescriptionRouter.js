import express from "express";
import {
  createPrescription,
  deletePrescription,
  getAllPrescription,
  getAllPrescriptionID,
  getAllPrescriptionRecordID,
  updatePrescription,
} from "../controllers/prescriptionController.js";

import { isAuthorized } from "../middlewares/auth.js";

const router = express.Router();

router.post("/doctorregister", isAuthorized, createPrescription);
router.get("/doctorregister", isAuthorized, getAllPrescription);
router.get("/doctorregister", isAuthorized, getAllPrescriptionID);
router.get("/doctorregister", isAuthorized, getAllPrescriptionRecordID);
router.update("/doctorregister", isAuthorized, updatePrescription);
router.delete("/doctorregister", isAuthorized, deletePrescription);

export default router;
