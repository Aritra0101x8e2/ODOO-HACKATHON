import { Router } from "express";
import { driverController } from "./driver.controller.js";

export const driversRouter = Router();

driversRouter.get("/", driverController.list);
driversRouter.get("/:id", driverController.get);
driversRouter.post("/", driverController.create);
driversRouter.put("/:id", driverController.update);
driversRouter.delete("/:id", driverController.delete);
