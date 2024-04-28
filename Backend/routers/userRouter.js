import express from "express";
import {
  patientregister,
  doctorregister,
  login,
  logout,
  adminregister,
} from "../controllers/userController.js";
import { isAuthorized } from "../middlewares/auth.js";
import {
  doctorDataValidate,
  patientDataValidate,
} from "../middlewares/validation.js";

const router = express.Router();

router.post("/doctorregister", doctorDataValidate, doctorregister);
router.post("/patientregister", patientDataValidate, patientregister);
router.post("/adminregister", adminregister);
router.post("/login", login);
router.get("/logout", isAuthorized, logout);

export default router;
