import { conn } from "../db/conn.js";
import { createUserToken } from "../helpers/create-user-token.js";
import bcrypt from "bcrypt";
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
    if (userExists.rows.length != 0) {
      res.status(422).json({ message: "Por favor, utilize outro email!" });
      return;
    }

    //create a password
    const salt = await bcrypt.genSalt(12);
    const passwordHash = await bcrypt.hash(password, salt);

    //create a user
    const userSql = "insert into users (name,email, password) values($1,$2,$3)";
    const userData = [name, email, passwordHash];

    try {
      await conn.query(userSql, userData);
      //buscando id do usuario cadastrado
      const userIdSql = "select * from users where email=$1";
      const userId = await conn.query(userIdSql, [email]);
      const id = userId.rows[0].id;
      //retornando token de acesso
      await createUserToken(name, id, req, res);
    } catch (error) {
      res.status(500).json({ message: error });
    }
  }
  static async login(req, res) {
    const { email, password } = req.body;

    if (!email) {
      res.status(422).json({ message: "O email é obrigatório" });
      return;
    }
    if (!password) {
      res.status(422).json({ message: "A senha é obrigatória" });
      return;
    }
    //checar se o usuário já existe
    const sql = "SELECT * FROM users WHERE email = $1"; // Utilizando um placeholder ($1) para o email
    const userExists = await conn.query(sql, [email]); // Passando o email como um parâmetro
    if (userExists.rows.length === 0) {
      res.status(422).json({ message: "Por favor, utilize outro email!" });
      return;
    }

    //checar senha inserida com senha do banco(hash)
    const checkPassword = await bcrypt.compare(
      password,
      userExists.rows[0].password
    );
    if (!checkPassword) {
      res.status(422).json({ message: "Senha inválida" });
      return;
    }
    await createUserToken(
      userExists.rows[0].name,
      userExists.rows[0].id,
      req,
      res
    );
  }
}
