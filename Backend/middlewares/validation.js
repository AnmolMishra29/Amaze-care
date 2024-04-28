const { body } = require("express-validator");

export const patientDataValidate = [
  body("PatientName")
    .exists({ checkFalsy: true })
    .withMessage("Patient Name is required"),
  body("Age").exists({ checkFalsy: true }).withMessage("Age is required"),
  body("Gender").exists({ checkFalsy: true }).withMessage("Gender is required"),
  body("ContactNumber")
    .exists({ checkFalsy: true })
    .withMessage("Contact Number is required")
    .isMobilePhone("any", { strictMode: false })
    .withMessage("Invalid contact number format"),
  body("Email").trim().isEmail().withMessage("Email is required"),
  body("UserRole")
    .exists({ checkFalsy: true })
    .withMessage("UserRole is required"),
  body("passwordd")
    .exists({ checkFalsy: true })
    .withMessage("Password is required")
    .isLength({ min: 8 })
    .withMessage("Password must be at least 6 characters long")
    .matches(/^(?=.*\d)(?=.*[a-z])(?=.*[A-Z])(?=.*[!@#$%^&*])/, "i")
    .withMessage(
      "Password must contain at least one uppercase letter, one lowercase letter, one number, and one special character"
    ),
];

export const doctorDataValidate = [
  body("DoctorName")
    .exists({ checkFalsy: true })
    .withMessage("Doctor Name is required"),
  body("Speciality")
    .exists({ checkFalsy: true })
    .withMessage("Speciality is required"),
  body("Experience")
    .exists({ checkFalsy: true })
    .withMessage("Experience is required"),
  body("Qualification")
    .exists({ checkFalsy: true })
    .withMessage("Qualification is required"),
  body("Designation")
    .exists({ checkFalsy: true })
    .withMessage("Designation is required"),
  body("UserRole")
    .exists({ checkFalsy: true })
    .withMessage("UserRole is required"),
  body("passwordd")
    .exists({ checkFalsy: true })
    .withMessage("Password is required")
    .isLength({ min: 8 })
    .withMessage("Password must be at least 6 characters long")
    .matches(/^(?=.*\d)(?=.*[a-z])(?=.*[A-Z])(?=.*[!@#$%^&*])/, "i")
    .withMessage(
      "Password must contain at least one uppercase letter, one lowercase letter, one number, and one special character"
    ),
  body("Email").trim().isEmail().withMessage("Email is required"),
];
export const prescriptionDataValidate = [
  body("RecordID")
    .exists({ checkFalsy: true })
    .withMessage("Record ID is required"),
  body("Medicine")
    .exists({ checkFalsy: true })
    .withMessage("Medicine is required"),
  body("Instructions")
    .exists({ checkFalsy: true })
    .withMessage("Instructions is required"),
  body("Dosage").exists({ checkFalsy: true }).withMessage("Dosage is required"),
];
export const medicalRecordDataValidate = [
  body("CurrentSymptoms")
    .exists({ checkFalsy: true })
    .withMessage("CurrentSymptoms is required"),
  body("PhysicalExamination")
    .exists({ checkFalsy: true })
    .withMessage("PhysicalExamination is required"),
  body("TreatmentPlan")
    .exists({ checkFalsy: true })
    .withMessage("TreatmentPlan is required"),
  body("RecommendedTests")
    .exists({ checkFalsy: true })
    .withMessage("RecommendedTests is required"),
  body("AppointmentID")
    .exists({ checkFalsy: true })
    .withMessage("AppointmentID is required"),
];
export const appointmentDataValidate = [
  body("DoctorID")
    .exists({ checkFalsy: true })
    .withMessage("Doctor ID is required"),
  body("PatientID")
    .exists({ checkFalsy: true })
    .withMessage("PatientID is required"),
  body("AppointmentDate")
    .exists({ checkFalsy: true })
    .withMessage("AppointmentDate is required"),
  body("Symptoms")
    .exists({ checkFalsy: true })
    .withMessage("Symptoms is required"),
  body("AppointmentStatus")
    .exists({ checkFalsy: true })
    .withMessage("AppointmentStatus is required"),
];
