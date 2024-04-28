import express from "express";
import {
  createPrescription,
  deletePrescription,
  getAllPrescription,
  getAllPrescriptionByID,
  getAllPrescriptionByRecordID,
  updatePrescription,
} from "../controllers/prescriptionController.js";

import { isAuthorized, isDoctor } from "../middlewares/auth.js";
import { prescriptionDataValidate } from "../middlewares/validation.js";

const router = express.Router();

router.post(
  "/createprescription",
  isDoctor,
  prescriptionDataValidate,
  createPrescription
);
router.get("/getallprescription", isAuthorized, getAllPrescription);
router.get("/getprescription/:id", isAuthorized, getAllPrescriptionByID);
router.get(
  "/getallprescriptionbyrecord/:id",
  isAuthorized,
  getAllPrescriptionByRecordID
);
router.put("/updateprescription", isDoctor, updatePrescription);
router.delete("/deleteprescription/:id", isDoctor, deletePrescription);

export default router;
