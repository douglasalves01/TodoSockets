import express from "express";
import { TodoController } from "../controllers/TodoController.js";
import { checkToken } from "../helpers/check-token.js";

export const todoRouter = express.Router();

todoRouter.post("/todo/create", checkToken, TodoController.create);
todoRouter.patch("/todo/edit/:id", checkToken, TodoController.updateTodo);
todoRouter.delete(
  "/todo/delete/:id",
  checkToken,
  TodoController.removeTodoById
);

todoRouter.get("/todo/todo", checkToken, TodoController.getTodouserByTodo);
todoRouter.get("/todo/doing", checkToken, TodoController.getTodouserByDoing);
todoRouter.get("/todo/done", checkToken, TodoController.getTodouserByDone);
