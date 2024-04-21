import { Sequelize } from "sequelize";
import sequelize from "../database/db.js";

const Records = sequelize.define(
  "Records",
  {
    RecordId: {
      type: Sequelize.INTEGER,
      primaryKey: true,
      autoIncrement: true,
    },
    CurrentSymptoms: { type: Sequelize.STRING, allowNull: false },
    PhysicalExamination: { type: Sequelize.STRING, allowNull: false },
    TreatmentPlan: { type: Sequelize.STRING, allowNull: false },
    RecommendedTests: { type: Sequelize.STRING, allowNull: false },
    AppointmentID: { type: Sequelize.INTEGER, allowNull: false },
  },
  {
    tableName: "medicalrecords",
    timestamps: false,
  }
);

export default Records;
