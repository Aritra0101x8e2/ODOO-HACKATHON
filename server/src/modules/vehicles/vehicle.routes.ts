import { Router } from "express";
import { vehicleController } from "./vehicle.controller.js";

export const vehiclesRouter = Router();

vehiclesRouter.get("/", vehicleController.list);
vehiclesRouter.get("/:id", vehicleController.get);
vehiclesRouter.post("/", vehicleController.create);
vehiclesRouter.put("/:id", vehicleController.update);
vehiclesRouter.delete("/:id", vehicleController.delete);
