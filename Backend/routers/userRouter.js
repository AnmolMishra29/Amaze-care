import express from "express";
import {
  patientregister,
  doctorregister,
  patientlogin,
  doctorlogin,
  getAllDoctors,
  getAllPatients,
  logout,
} from "../controllers/userController.js";
import { isAuthorized } from "../middlewares/auth.js";

const router = express.Router();

router.post("/doctorregister", doctorregister);
router.post("/patientregister", patientregister);
router.post("/doctorlogin", doctorlogin);
router.post("/patientlogin", patientlogin);
router.get("/getalldoctors", isAuthorized, getAllDoctors);
router.get("/getallpatients", isAuthorized, getAllPatients);
router.get("/logout", isAuthorized, logout);

export default router;
