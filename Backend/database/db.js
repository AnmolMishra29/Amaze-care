import mysql from "mysql2";
import { Sequelize } from "sequelize";
//import dotenv from "dotenv";
//dotenv.config();

// const mysqlPool = mysql.createPool({
//   host: "localhost",
//   user: "root",
//   password: "admin",
//   database: "amazecare",
//   // host: process.env.HOST,
//   // user: process.env.USER,
//   // password: process.env.PASSWORD,
//   // database: process.env.DATABASE,
// });
const sequelize = new Sequelize("amazecare", "root", "admin", {
  dialect: "mysql",
  host: "localhost",
});

export default sequelize;
