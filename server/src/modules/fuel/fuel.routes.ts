import { Router } from "express";
import { fuelController } from "./fuel.controller.js";

export const fuelRouter = Router();

fuelRouter.get("/", fuelController.list);
fuelRouter.post("/", fuelController.create);
