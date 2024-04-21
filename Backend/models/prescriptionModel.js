import { Sequelize } from "sequelize";
import sequelize from "../database/db.js";

const Prescriptions = sequelize.define(
  "Prescriptions",
  {
    PrescriptionID: {
      type: Sequelize.INTEGER,
      primaryKey: true,
      autoIncrement: true,
    },
    RecordID: { type: Sequelize.INTEGER, allowNull: false },
    Medicine: { type: Sequelize.STRING, allowNull: false },
    Instructions: { type: Sequelize.STRING, allowNull: false },
    Dosage: { type: Sequelize.STRING, allowNull: false },
  },
  {
    tableName: "prescriptions",
    timestamps: true,
  }
);

export default Prescriptions;
