import { Router } from "express";
import { tripController } from "./trip.controller.js";

export const tripsRouter = Router();

tripsRouter.get("/", tripController.list);
tripsRouter.post("/", tripController.create);
tripsRouter.patch("/:id/dispatch", tripController.dispatch);
tripsRouter.patch("/:id/complete", tripController.complete);
tripsRouter.patch("/:id/cancel", tripController.cancel);
