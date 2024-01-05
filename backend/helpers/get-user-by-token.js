import jwt from "jsonwebtoken";
import { conn } from "../db/conn.js";

export const getUserByToken = async (token) => {
  if (!token) {
    return res.status(401).json({ message: "Acesso Negado!" });
  }
  const decoded = jwt.verify(token, "nossosecret");
  const userId = decoded.id;
  const sql = "select * from users where id=$1";
  const user = await conn.query(sql, [userId]);
  return user.rows[0];
};
