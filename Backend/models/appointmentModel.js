import { Sequelize } from "sequelize";
import sequelize from "../database/db.js";

const Appointments = sequelize.define(
  "Appointments",
  {
    AppointmentID: {
      type: Sequelize.INTEGER,
      primaryKey: true,
      autoIncrement: true,
    },
    DoctorID: { type: Sequelize.INTEGER, allowNull: false },
    PatientID: { type: Sequelize.INTEGER, allowNull: false },
    AppointmentDate: { type: Sequelize.DATE, allowNull: false },
    Symptoms: { type: Sequelize.STRING, allowNull: false },
    AppointmentStatus: {
      type: Sequelize.ENUM,
      allowNull: false,
      values: ["Completed", "Pending", "Cancelled"],
    },
  },
  {
    tableName: "appointments",
    timestamps: true,
  }
);

export default Appointments;
