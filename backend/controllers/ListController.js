import { getToken } from "../helpers/get-token.js";
import { getUserByToken } from "../helpers/get-user-by-token.js";
import { conn } from "../db/conn.js";
import { pusher } from "../app.js";

export class LisController {
  static async create(req, res) {
    const { title, description, member } = req.body;
    let idmember = [];
    if (!title) {
      res.status(422).json({ message: "O título é obrigatório" });
      return;
    }
    if (!description) {
      res.status(422).json({ message: "A descrição é obrigatório" });
      return;
    }
    //pegando id pelo email do member
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
      idmember.push(memberExists.rows[0].id);
    }
    const token = await getToken(req);
    const user = await getUserByToken(token);
    const sqllist =
      "insert into list(description,idmember,title,iduser) values($1,$2,$3,$4)";
    const sqlData = [description, idmember, title, user.id];
    try {
      await conn.query(sqllist, sqlData);
      pusher.trigger("my-channel", "list", {
        message: "nova lista!",
      });
      res.status(200).json({ message: "Lista cadastrada com sucesso!" });
    } catch (error) {
      res.status(500).json({ message: error.message });
    }
  }
  static async getAllByUser(req, res) {
    const token = await getToken(req);
    const user = await getUserByToken(token);
    const sqllist =
      "SELECT * FROM list WHERE iduser = $1 OR $1 = ANY(idmember);";
    const sqlData = [user.id];

    try {
      const data = await conn.query(sqllist, sqlData);
      res.status(200).json({ message: "Busca concluída", data: data.rows });
    } catch (error) {
      res.status(500).json({ message: error.message });
    }
  }
  static async removeList(req, res) {
    const id = req.params.id;

    //verificar se a todo a ser removida foi tem o iduser do usuario logado
    const token = getToken(req);
    const user = await getUserByToken(token);

    const deleteTodoFromList = "delete from todo where idlist=$1 and iduser=$2";
    const deleteList = "delete from list where id=$1 and iduser=$2";
    try {
      await conn.query(deleteTodoFromList, [id, user.id]);
      await conn.query(deleteList, [id, user.id]);
      pusher.trigger("my-channel", "list", {
        message: "Lista excluida!",
      });
      res.status(200).json({ message: "Lista deletada com sucesso!" });
    } catch (error) {
      res.status(422).json({ message: error.message });
    }
  }
  static async updateListMember(req, res) {
    const id = req.body.idList;
    const member = req.body.member;
    const retornoIdMember = "select id from users where email=$1";
    const memberData = [member];
    const idmember = await conn.query(retornoIdMember, memberData);
    if (idmember.rows.length === 0) {
      res.status(422).json({ message: "Membro não encontrado!" });
      return;
    }
    const updateSql =
      "UPDATE list SET idmember = array_append(idmember, $1) WHERE id = $2";
    try {
      const updateData = [idmember.rows[0].id, id];
      await conn.query(updateSql, updateData);
      res.status(200).json({ message: "Membro adicionado com sucesso!" });
    } catch (error) {
      res.status(500).json({ message: error.message });
    }
  }
}
