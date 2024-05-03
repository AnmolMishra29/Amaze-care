import { catchAsyncError } from "../middlewares/catchAsyncError.js";
import Doctors from "../models/doctorModel.js";
import logger from "../utils/logger.js";

export const getAllDoctors = catchAsyncError(async (req, res, next) => {
  try {
    const allDoctors = await Doctors.findAll();
    if (!allDoctors) {
      logger.info("No Doctors found");
      return res
        .status(404)
        .json({ success: false, error: "Doctor not found" });
    }
    logger.info("All Doctors  :", allDoctors);
    res.status(200).json({ success: true, Doctors: allDoctors });
  } catch (error) {
    logger.error("Error in fetching all doctors :", error);
    res
      .status(500)
      .json({ success: false, error: "Error fetching Doctors", error });
  }
});

export const getDoctorById = catchAsyncError(async (req, res, next) => {
  const doctorId = req.params.id;

  try {
    const doctor = await Doctors.findByPk(doctorId);

    if (!doctor) {
      logger.info("No Doctors found");
      return res
        .status(404)
        .json({ success: false, error: "Doctor not found" });
    }
    logger.info("Doctor by ID :", doctor);
    res.status(200).json({ success: true, record });
  } catch (error) {
    logger.error("Error in fetching doctor by ID :", error);
    res.status(500).json({ success: false, error: "Internal Server Error" });
  }
});

export const getDoctorByName = catchAsyncError(async (req, res, next) => {});

export const updateDoctorDetails = catchAsyncError(async (req, res, next) => {
  try {
    const { id } = req.params;
    const { Experience, Designation } = req.body;

    const doctor = await Doctors.findByPk(id);
    if (!doctor) {
      logger.info("No Doctors found");
      return res.status(404).json({ error: "Doctor not found" });
    }

    doctor.Experience = Experience;
    doctor.Designation = Designation;

    await doctor.save();
    logger.info("Doctor updated successfuly :", doctor);
    res.status(200).json({ success: true, doctor });
  } catch (error) {
    logger.error("Error in updating doctor :", error);
    res.status(500).json({ error: "Internal Server Error" });
  }
});
