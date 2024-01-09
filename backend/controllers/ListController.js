import { getToken } from "../helpers/get-token.js";
import { getUserByToken } from "../helpers/get-user-by-token.js";
import { conn } from "../db/conn.js";

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
      res.status(200).json({ message: "Lista cadastrada com sucesso!" });
    } catch (error) {
      res.status(500).json({ message: error.message });
    }
  }
}
