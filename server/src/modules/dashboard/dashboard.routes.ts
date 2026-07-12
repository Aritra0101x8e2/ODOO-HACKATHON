import { Router } from "express";

export const dashboardRouter = Router();

dashboardRouter.get("/", (_req, res) => {
	res.json({
		success: true,
		data: {
			fleetUtilization: 78,
			fuelEfficiency: 9.2,
			operationalCost: 18250,
			vehicleRoi: 34.7,
			activeTrips: 5,
			vehiclesInShop: 2
		}
	});
});
