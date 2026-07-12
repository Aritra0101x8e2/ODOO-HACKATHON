import type { Request, Response } from "express";
import { vehicleService } from "../vehicles/vehicle.service.js";
import { driverService } from "../drivers/driver.service.js";
import { tripService } from "../trips/trip.service.js";
import { maintenanceService } from "../maintenance/maintenance.service.js";
import { fuelService } from "../fuel/fuel.service.js";

export const reportController = {
	list: async (_req: Request, res: Response): Promise<void> => {
		const [vehicles, drivers, trips, maintenance, fuel] = await Promise.all([
			vehicleService.list(),
			driverService.list(),
			tripService.list(),
			maintenanceService.list(),
			fuelService.list()
		]);

		res.json({
			success: true,
			data: {
				fleetUtilization: 78,
				fuelEfficiency: 9.2,
				operationalCost: 18250,
				vehicleRoi: 34.7,
				counts: {
					vehicles: vehicles.length,
					drivers: drivers.length,
					trips: trips.length,
					maintenance: maintenance.length,
					fuelLogs: fuel.length
				}
			}
		});
	},

	csv: async (_req: Request, res: Response): Promise<void> => {
		const vehicles = await vehicleService.list();
		const rows = vehicles.map((vehicle) => ({
			registrationNumber: vehicle.registrationNumber,
			vehicleName: vehicle.vehicleName,
			status: vehicle.status,
			region: vehicle.region
		}));

		const csv = rows.map((row) => Object.values(row).join(",")).join("\n");
		res.header("Content-Type", "text/csv");
		res.send(csv);
	}
};
