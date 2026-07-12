import { Router, type Request, type Response } from "express";
import { vehicleService } from "../vehicles/vehicle.service.js";
import { driverService } from "../drivers/driver.service.js";
import { tripService } from "../trips/trip.service.js";
import { maintenanceService } from "../maintenance/maintenance.service.js";
import { fuelService } from "../fuel/fuel.service.js";
import type { Vehicle } from "../vehicles/vehicle.types.js";

const normalizeFilterValue = (value: unknown): string | undefined => {
	if (typeof value !== "string") {
		return undefined;
	}

	const trimmed = value.trim();
	return trimmed ? trimmed : undefined;
};

const applyVehicleFilters = (
	vehicles: Vehicle[],
	filters: { vehicleType?: string; status?: string; region?: string }
): Vehicle[] => {
	const vehicleType = filters.vehicleType?.toLowerCase();
	const status = filters.status?.toLowerCase();
	const region = filters.region?.toLowerCase();

	return vehicles.filter((vehicle) => {
		return (
			(!vehicleType || vehicle.type.toLowerCase() === vehicleType) &&
			(!status || vehicle.status.toLowerCase() === status) &&
			(!region || vehicle.region.toLowerCase() === region)
		);
	});
};

const calculateFleetUtilization = (
	activeTrips: number,
	activeVehicles: number
) => {
	if (activeVehicles === 0) {
		return 0;
	}

	return Number(((activeTrips / activeVehicles) * 100).toFixed(2));
};

export const dashboardRouter = Router();

dashboardRouter.get("/", async (req: Request, res: Response): Promise<void> => {
	// 1. Fallback to null immediately so the types are clean and predictable
	const filters = {
		vehicleType: normalizeFilterValue(req.query.vehicleType) ?? null,
		status: normalizeFilterValue(req.query.status) ?? null,
		region: normalizeFilterValue(req.query.region) ?? null
	};

	const [vehicles, drivers, trips, maintenance, fuel] = await Promise.all([
		vehicleService.list(),
		driverService.list(),
		tripService.list(),
		maintenanceService.list(),
		fuelService.list()
	]);

	const filteredVehicles = applyVehicleFilters(vehicles, filters);

	const filteredVehicleIds = new Set(
		filteredVehicles.map((vehicle) => vehicle.id)
	);
	const filteredTrips = trips.filter((trip) =>
		filteredVehicleIds.has(trip.vehicleId)
	);
	const filteredTripDriverIds = new Set(
		filteredTrips.map((trip) => trip.driverId)
	);
	const filteredMaintenance = maintenance.filter((entry) =>
		filteredVehicleIds.has(entry.vehicleId)
	);
	const filteredFuel = fuel.filter((entry) =>
		filteredVehicleIds.has(entry.vehicleId)
	);

	const activeVehicles = filteredVehicles.filter(
		(vehicle) => vehicle.status !== "Retired"
	).length;
	const availableVehicles = filteredVehicles.filter(
		(vehicle) => vehicle.status === "Available"
	).length;
	const vehiclesInMaintenance = filteredVehicles.filter(
		(vehicle) => vehicle.status === "In Shop"
	).length;
	const activeTrips = filteredTrips.filter(
		(trip) => trip.status === "Dispatched"
	).length;
	const pendingTrips = filteredTrips.filter(
		(trip) => trip.status === "Draft"
	).length;

	const driversOnDuty = drivers.filter((driver) => {
		if (!["Available", "On Trip"].includes(driver.status)) return false;
		if (filteredTrips.length === 0) return true;
		return filteredTripDriverIds.has(driver.id);
	}).length;

	const fleetUtilization = calculateFleetUtilization(
		activeTrips,
		activeVehicles
	);

	res.json({
		success: true,
		data: {
			kpis: {
				activeVehicles,
				availableVehicles,
				vehiclesInMaintenance,
				activeTrips,
				pendingTrips,
				driversOnDuty,
				fleetUtilization
			},
			vehiclesInShop: vehiclesInMaintenance,
			fleetUtilization,
			fuelEfficiency: 0,
			operationalCost:
				filteredMaintenance.reduce((sum, entry) => sum + entry.cost, 0) +
				filteredFuel.reduce((sum, entry) => sum + entry.cost, 0),
			vehicleRoi: 0,
			filters: {
				// 2. Beautifully clean and error-free reference here
				vehicleType: filters.vehicleType,
				status: filters.status,
				region: filters.region,
				vehicleTypes: Array.from(
					new Set(vehicles.map((vehicle) => vehicle.type))
				).sort(),
				statuses: Array.from(
					new Set(vehicles.map((vehicle) => vehicle.status))
				).sort(),
				regions: Array.from(
					new Set(vehicles.map((vehicle) => vehicle.region))
				).sort()
			},
			counts: {
				vehicles: filteredVehicles.length,
				drivers: drivers.length,
				trips: filteredTrips.length,
				maintenance: filteredMaintenance.length,
				fuelLogs: filteredFuel.length
			}
		}
	});
});
