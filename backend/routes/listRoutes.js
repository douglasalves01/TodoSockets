import express from "express";
import { LisController } from "../controllers/ListController.js";

export const listRouter = express.Router();

listRouter.post("/list/create", LisController.create);
listRouter.get("/list", LisController.getAllByUser);
listRouter.delete("/list/delete/:id", LisController.removeList);
listRouter.patch("/list/edit/:id", LisController.updateListMember);
