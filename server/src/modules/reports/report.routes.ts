import { Router } from "express";
import { reportController } from "./report.controller.js";

export const reportsRouter = Router();

reportsRouter.get("/", reportController.list);
reportsRouter.get("/csv", reportController.csv);
