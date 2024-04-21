import express from "express";
import {
  patientregister,
  doctorregister,
  login,
  logout,
} from "../controllers/userController.js";
import { isAuthorized } from "../middlewares/auth.js";

const router = express.Router();

router.post("/doctorregister", doctorregister);
router.post("/patientregister", patientregister);
router.post("/login", login);
router.get("/logout", isAuthorized, logout);

export default router;
