import { Sequelize } from "sequelize";
import sequelize from "../database/db.js";

const Patients = sequelize.define(
  "Patients",
  {
    PatientID: {
      type: Sequelize.INTEGER,
      primaryKey: true,
      autoIncrement: true,
    },
    PatientName: { type: Sequelize.STRING, allowNull: false },
    Age: { type: Sequelize.INTEGER, allowNull: false },
    Gender: {
      type: Sequelize.ENUM,
      allowNull: false,
      values: ["Male", "Female", "Others"],
    },
    ContactNumber: { type: Sequelize.STRING, allowNull: false },
    Email: { type: Sequelize.STRING, allowNull: false },
    UserRole: {
      type: Sequelize.ENUM,
      allowNull: false,
      values: ["Patient", "Doctor", "Admin"],
    },
    Passwordd: { type: Sequelize.STRING, allowNull: false },
  },
  {
    tableName: "patients",
    timestamps: false,
  }
);

export default Patients;
