import { conn } from "../db/conn.js";
import { getToken } from "../helpers/get-token.js";
import { getUserByToken } from "../helpers/get-user-by-token.js";

export class TodoController {
  static async create(req, res) {
    const { title, description, member } = req.body;
    let idMember = [];
    const status = "to do";
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
    //verificar se o email de member digitado está cadastrado no sistema
    if (member.length != 0) {
      const sqlMember = "select * from users where email=$1";
      const memberExists = await conn.query(sqlMember, [member[0]]);
      if (memberExists.rows.length === 0) {
        res.status(422).json({
          message:
            "Email de membro não está cadastrado no sistema! Por favor, escolha outro",
        });
        return;
      }
      idMember.push(memberExists.rows[0].id);
    }
    console.log(idMember);
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
  static async updateTodo(req, res) {
    const id = req.params.id;
    const { title, description, status, idMemeber } = req.body;

    //verificar se existe o todo
    const sqlTodo = "select * from todo where id=$1";
    const todoExists = await conn.query(sqlTodo, [id]);
    if (todoExists.rows[0].length === 0) {
      res.status(422).jso({ message: "Nota não foi encontrada!" });
    }

    //verificar se a todo a ser
  }
  static async removeTodoById(req, res) {}
}
