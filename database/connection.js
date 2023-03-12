const mongoose = require("mongoose");
const ENV = process.env.NODE_ENV || "dev";

require("dotenv").config({
  path: `${__dirname}/../.env.${ENV}`,
});

if (!process.env.DATABASE_URL) {
  throw new Error("DATABASE_URL not set");
}
//
const connectDB = async () => {
  try {
    const conn = await mongoose.connect(process.env.DATABASE_URL);
    console.log(`MongoDB Connected: ${conn.connection.host}`);
  } catch (error) {
    console.log(error);
    process.exit(1);
  }
}

module.exports = connectDB;
