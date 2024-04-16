import mysql from "mysql2";
//import dotenv from "dotenv";
//dotenv.config();

const mysqlPool = mysql.createPool({
  host: "localhost",
  user: "root",
  password: "admin",
  database: "amazecare",
  // host: process.env.HOST,
  // user: process.env.USER,
  // password: process.env.PASSWORD,
  // database: process.env.DATABASE,
});

// const databaseConnection = () => {
//   try {
//     const connection = mysqlPool.getConnection();
//     console.log("Connected to the database");
//     //connection.release();
//   } catch (err) {
//     console.error("Error connecting to database:");
//   }
// };

export default mysqlPool;
