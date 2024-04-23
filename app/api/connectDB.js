import mysql from "mysql2/promise";

const connectDB = async () => {
  const connection = await mysql.createConnection({
    host: "localhost",
    user: "root",
    password: "12345678",
    database: "mydb",
  });
  return connection;
};

export default connectDB;
