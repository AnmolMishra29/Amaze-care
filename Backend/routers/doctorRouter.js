import express from "express";
import {
  getDoctorByName,
  getAllDoctors,
  getDoctorById,
  updateDoctorDetails,
} from "../controllers/doctorController.js";

import { isAuthorized, isDoctor, isPatient } from "../middlewares/auth.js";

const router = express.Router();

router.get("/getalldoctors", isAuthorized, getAllDoctors);
router.get("/getdoctorbyid/:id", isAuthorized, getDoctorById);
router.get("/getdoctorbyname", isAuthorized, getDoctorByName);
router.put("/updatedoctor/:id", isDoctor, updateDoctorDetails);

export default router;
