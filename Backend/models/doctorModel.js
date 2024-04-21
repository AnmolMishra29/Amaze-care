import { Sequelize } from "sequelize";
import sequelize from "../database/db.js";

const Doctors = sequelize.define(
  "Doctors",
  {
    DoctorID: {
      type: Sequelize.INTEGER,
      primaryKey: true,
      autoIncrement: true,
    },
    DoctorName: { type: Sequelize.STRING, allowNull: false },
    Speciality: { type: Sequelize.STRING, allowNull: false },
    Experience: { type: Sequelize.INTEGER, allowNull: false },
    Qualification: { type: Sequelize.STRING, allowNull: false },
    Designation: { type: Sequelize.STRING, allowNull: false },

    UserRole: {
      type: Sequelize.ENUM,
      allowNull: false,
      values: ["Patient", "Doctor", "Admin"],
    },
    Passwordd: { type: Sequelize.STRING, allowNull: false },
    Email: { type: Sequelize.STRING, allowNull: false },
  },
  {
    tableName: "doctors",
    timestamps: false,
  }
);

export default Doctors;
