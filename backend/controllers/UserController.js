import { conn } from "../db/conn.js";

export class UserController {
  static async register(req, res) {
    const { name, email, password, confirmPassword } = req.body;

    if (!name) {
      res.status(422).json({ message: "O nome é obrigatório" });
      return;
    }
    if (!email) {
      res.status(422).json({ message: "O email é obrigatório" });
      return;
    }
    if (!password) {
      res.status(422).json({ message: "A senha é obrigatório" });
      return;
    }
    if (!confirmPassword) {
      res.status(422).json({ message: "A confirmação de senha é obrigatório" });
      return;
    }

    if (password != confirmPassword) {
      res.status(422).json({
        message: "A senha e a confirmação de senha precisam ser iguais",
      });
      return;
    }
    //checar se o usuário já existe
    const sql = "SELECT * FROM users WHERE email = $1"; // Utilizando um placeholder ($1) para o email
    const userExists = await conn.query(sql, [email]); // Passando o email como um parâmetro
    if (userExists.rows.length === 0) {
      console.log("Usuário já existe");
    }
  }
}
