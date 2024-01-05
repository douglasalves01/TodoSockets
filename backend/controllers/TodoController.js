import { conn } from "../db/conn.js";
import { getToken } from "../helpers/get-token.js";
import { getUserByToken } from "../helpers/get-user-by-token.js";

export class TodoController {
  static async create(req, res) {
    const { title, description, status, idMember } = req.body;

    if (!title) {
      res.status(422).json({ message: "O título é obrigatório" });
      return;
    }
    if (!description) {
      res.status(422).json({ message: "A descrição é obrigatório" });
      return;
    }
    if (!status) {
      res.status(422).json({ message: "O status é obrigatório" });
      return;
    }
    const token = await getToken(req);
    const user = await getUserByToken(token);

    const todoSql = `INSERT INTO todo (title, description, status, idUser,idMember) VALUES ($1, $2, $3, $4, $5)`;
    const todoData = [title, description, status, user.id, idMember];
    try {
      await conn.query(todoSql, todoData);
      res.status(201).json({ message: "Notas cadastrada com sucesso!" });
    } catch (error) {
      res.status(500).json({ message: error.message });
    }
  }
}
