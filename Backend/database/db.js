import mysql from "mysql2";
import { Sequelize } from "sequelize";
import dotenv from "dotenv";
dotenv.config({ path: "../config/config.env" });

const sequelize = new Sequelize("amazecare", "root", "admin", {
  dialect: "mysql",
  host: "localhost",
});

// const sequelize = new Sequelize(
//   process.env.DATABASE,
//   process.env.USER,
//   process.env.PASSWORD,
//   {
//     dialect: "mysql",
//     host: process.env.HOST,
//   }
// );

export default sequelize;
