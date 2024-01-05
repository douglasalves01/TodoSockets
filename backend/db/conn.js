import pg from "pg";
import dotenv from "dotenv";

dotenv.config();
export const conn = new pg.Client({
  user: process.env.PGUSER,
  host: "localhost",
  database: process.env.PGDATABASE,
  password: process.env.PGPASSWORD,
  port: 5432,
});
export const connectDb = async () => {
  try {
    await conn.connect();
    console.log("conectado no banco dados");
  } catch (error) {
    console.log(error);
  }
};
