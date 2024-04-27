import { Sequelize } from "sequelize";
import sequelize from "../database/db.js";

const Admins = sequelize.define(
  "Admins",
  {
    AdminID: {
      type: Sequelize.INTEGER,
      primaryKey: true,
      autoIncrement: true,
    },
    AdminName: { type: Sequelize.STRING, allowNull: false },
    Email: { type: Sequelize.STRING, allowNull: false },
    UserRole: {
      type: Sequelize.ENUM,
      allowNull: false,
      values: ["Admin"],
    },
    Passwordd: { type: Sequelize.STRING, allowNull: false },
  },
  {
    tableName: "admins",
    timestamps: false,
  }
);

export default Admins;
