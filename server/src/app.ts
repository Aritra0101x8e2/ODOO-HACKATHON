import express from "express";
import cors from "cors";
import cookieParser from "cookie-parser";

import { authMiddleware } from "./middleware/auth.middleware.js";
import { errorMiddleware } from "./middleware/error.middleware.js";
import { authRouter } from "./modules/auth/auth.routes.js";
import { dashboardRouter } from "./modules/dashboard/dashboard.routes.js";
import { vehiclesRouter } from "./modules/vehicles/vehicle.routes.js";
import { driversRouter } from "./modules/drivers/driver.routes.js";
import { tripsRouter } from "./modules/trips/trip.routes.js";
import { maintenanceRouter } from "./modules/maintenance/maintenance.routes.js";
import { fuelRouter } from "./modules/fuel/fuel.routes.js";
import { reportsRouter } from "./modules/reports/report.routes.js";
import { usersRouter } from "./modules/users/user.routes.js";

export const app = express();

app.use(
	cors({
		origin: true,
		credentials: true
	})
);
app.use(express.json());
app.use(cookieParser())

app.get("/health", (_req, res) => {
	res.json({ success: true, message: "Fleet API is running" });
});

app.use("/api", (req, res, next) => {
	next();
});

app.use("/api/auth", authRouter);
app.use("/api/dashboard", dashboardRouter);
app.use("/api/vehicles", vehiclesRouter);
app.use("/api/drivers", driversRouter);
app.use("/api/trips", tripsRouter);
app.use("/api/maintenance", maintenanceRouter);
app.use("/api/fuel", fuelRouter);
app.use("/api/reports", reportsRouter);
app.use("/api/users", usersRouter);

app.use((_req, res) => {
	res.status(404).json({ success: false, error: "Route not found" });
});

app.use(errorMiddleware);
