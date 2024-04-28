import { catchAsyncError } from "../middlewares/catchAsyncError.js";
import Prescriptions from "../models/prescriptionModel.js";

export const createPrescription = catchAsyncError(async (req, res, next) => {
  const { RecordID, Medicine, Instructions, Dosage } = req.body;

  try {
    await Prescriptions.sync();
    const newPrescription = await Prescriptions.create({
      RecordID: RecordID,
      Medicine: Medicine,
      Instructions: Instructions,
      Dosage: Dosage,
    });

    res.status(200).json({
      success: true,
      message: "Prescription created successfully",
      newPrescription,
    });
  } catch (error) {
    console.error("Error inserting Prescription:", error);
  }
});

export const getAllPrescription = catchAsyncError(async (req, res, next) => {
  try {
    const allPrescriptions = await Prescriptions.findAll();

    res.status(200).json({ success: true, Prescriptions: allPrescriptions });
  } catch (error) {
    res
      .status(500)
      .json({ success: false, error: "Error fetching Prescriptions", error });
  }
});

export const getAllPrescriptionByID = catchAsyncError(
  async (req, res, next) => {
    const prescriptionId = req.params.id;

    try {
      const prescription = await Prescriptions.findByPk(prescriptionId);

      if (!prescription) {
        return res
          .status(404)
          .json({ success: false, error: "prescription not found" });
      }
      res.status(200).json({ success: true, Prescriptions: prescription });
    } catch (error) {
      res.status(500).json({ success: false, error: "Internal Server Error" });
    }
  }
);

export const getAllPrescriptionByRecordID = catchAsyncError(
  async (req, res, next) => {
    const recordId = req.params.id;

    try {
      const prescription = await Prescriptions.findAll({
        where: { RecordID: recordId },
      });

      if (!prescription) {
        return res
          .status(404)
          .json({ success: false, error: "prescription not found" });
      }
      res.status(200).json({ success: true, prescription });
    } catch (error) {
      res.status(500).json({ success: false, error: "Internal Server Error" });
    }
  }
);

export const updatePrescription = catchAsyncError(async (req, res, next) => {
  try {
    const { id } = req.params;
    const { Medicine, Instructions, Dosage } = req.body;

    const prescription = await Prescriptions.findByPk(id);
    if (!prescription) {
      return res.status(404).json({ error: "Prescription not found" });
    }

    prescription.Medicine = Medicine;
    prescription.Instructions = Instructions;
    prescription.Dosage = Dosage;

    await prescription.save();

    res.status(200).json({ success: true, prescription });
  } catch (error) {
    res.status(500).json({ error: "Internal Server Error" });
  }
});

export const deletePrescription = catchAsyncError(async (req, res, next) => {
  const prescriptionId = req.params.id;

  try {
    const prescription = await Prescriptions.findByPk(prescriptionId);

    if (!prescription) {
      return res
        .status(404)
        .json({ success: false, error: "Prescription not found" });
    }

    await prescription.destroy();
    res
      .status(200)
      .json({ success: true, message: "Prescription deleted succesfully" });
  } catch (error) {
    console.log(error);
    res.status(500).json({ success: false, error: "Internal Server Error" });
  }
});
