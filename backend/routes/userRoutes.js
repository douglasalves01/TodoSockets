import express from "express";
import { UserController } from "../controllers/UserController.js";

export const userRouter = express.Router();

userRouter.post("/users/register", UserController.register);
userRouter.post("/users/login", UserController.login);
