import { catchAsyncError } from "../middlewares/catchAsyncError.js";
import Doctors from "../models/doctorModel.js";

export const getAllDoctors = catchAsyncError(async (req, res, next) => {
  try {
    const allDoctors = await Doctors.findAll();

    res.status(200).json({ success: true, Doctors: allDoctors });
  } catch (error) {
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
      return res
        .status(404)
        .json({ success: false, error: "Doctor not found" });
    }
    res.status(200).json({ success: true, record });
  } catch (error) {
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
      return res.status(404).json({ error: "Doctor not found" });
    }

    doctor.Experience = Experience;
    doctor.Designation = Designation;

    await doctor.save();

    res.status(200).json({ success: true, doctor });
  } catch (error) {
    res.status(500).json({ error: "Internal Server Error" });
  }
});
