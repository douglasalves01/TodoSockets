import express from "express";
import { LisController } from "../controllers/ListController.js";

export const listRouter = express.Router();

listRouter.post("/list/create", LisController.create);
listRouter.get("/list", LisController.getAllByUser);
