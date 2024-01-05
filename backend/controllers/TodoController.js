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
    const { title, description, status } = req.body;

    //verificar se existe o todo
    const sqlTodo = "select * from todo where id=$1";
    const todoExists = await conn.query(sqlTodo, [id]);

    if (todoExists.rows.length === 0) {
      res.status(422).jso({ message: "Nota não foi encontrada!" });
    }
    //resgatando dados do usuario logado
    const token = await getToken(req);
    const user = await getUserByToken(token);

    //verificar se a todo a ser atualizado tem como idUser ou idMember o usuario logado
    const sqlUser =
      "SELECT * FROM todo WHERE id = $1 AND ($2 = iduser OR $2 = ANY(idmember))";
    try {
      const userContentTodo = await conn.query(sqlUser, [id, user.id]);
      if (userContentTodo.rows.length === 0) {
        res.status(422).json({
          message:
            "Houve um problema na atualização da nota! Tente novamente mais tarde!",
        });
        return;
      }
    } catch (error) {
      res.status(500).json({ message: error.message });
    }
    const updateSql =
      "update todo set title=$1, description=$2, status = $3 where id= $4";
    const updateData = [title, description, status, id];
    try {
      await conn.query(updateSql, updateData);
      res.status(200).json({ message: "Nota atualizada com sucesso!" });
    } catch (error) {
      res.status(500).json({ message: error.message });
    }
  }
  static async removeTodoById(req, res) {
    const id = req.params.id;

    //verificar se a todo a ser removida foi tem o iduser do usuario logado
    const token = getToken(req);
    const user = await getUserByToken(token);

    const todoSql = "select * from todo where id=$1 and iduser=$2";
    const todoUserExists = await conn.query(todoSql, [id, user.id]);

    if (todoUserExists.rows.length === 0) {
      res.status(500).json({
        message:
          "Houve um problema ao deletar a nota! Tente novamente mais tarde!",
      });
      return;
    }
    const deleteSql = "delete from todo where id=$1";
    try {
      await conn.query(deleteSql, [id]);
      res.status(200).json({ message: "Nota deletada com sucesso!" });
    } catch (error) {
      res.status(422).json({ message: error.message });
    }
  }
}
