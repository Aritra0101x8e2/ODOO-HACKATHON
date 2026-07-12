import type { Request, Response } from "express";
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

export const reportController = {
	list: async (req: Request, res: Response): Promise<void> => {
		const filters = {
			vehicleType: normalizeFilterValue(req.query.vehicleType),
			status: normalizeFilterValue(req.query.status),
			region: normalizeFilterValue(req.query.region)
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
		const filteredMaintenance = maintenance.filter((entry) =>
			filteredVehicleIds.has(entry.vehicleId)
		);
		const filteredFuel = fuel.filter((entry) =>
			filteredVehicleIds.has(entry.vehicleId)
		);
		const activeVehicles = filteredVehicles.filter(
			(vehicle) => vehicle.status !== "Retired"
		).length;
		const activeTrips = filteredTrips.filter(
			(trip) => trip.status === "Dispatched"
		).length;
		const totalDistance = filteredTrips.reduce(
			(sum, trip) => sum + trip.actualDistance,
			0
		);
		const totalFuelUsed = filteredTrips.reduce(
			(sum, trip) => sum + trip.fuelUsed,
			0
		);
		const maintenanceCost = filteredMaintenance.reduce(
			(sum, entry) => sum + entry.cost,
			0
		);
		const fuelCost = filteredFuel.reduce((sum, entry) => sum + entry.cost, 0);
		const operationalCost = maintenanceCost + fuelCost;
		const revenue = filteredTrips.reduce(
			(sum, trip) => sum + trip.actualDistance * 100 + trip.cargoWeight * 5,
			0
		);
		const acquisitionCost = filteredVehicles.reduce(
			(sum, vehicle) => sum + vehicle.acquisitionCost,
			0
		);
		const vehicleRoi =
			acquisitionCost > 0
				? Number((((revenue - operationalCost) / acquisitionCost) * 100).toFixed(2))
				: 0;
		const fuelEfficiency =
			totalFuelUsed > 0 ? Number((totalDistance / totalFuelUsed).toFixed(2)) : 0;
		const fleetUtilization = calculateFleetUtilization(
			activeTrips,
			activeVehicles
		);

		res.json({
			success: true,
			data: {
				fleetUtilization,
				fuelEfficiency,
				operationalCost,
				vehicleRoi,
				filters: {
					vehicleType: filters.vehicleType ?? null,
					status: filters.status ?? null,
					region: filters.region ?? null,
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
	},

	csv: async (req: Request, res: Response): Promise<void> => {
		const filters = {
			vehicleType: normalizeFilterValue(req.query.vehicleType),
			status: normalizeFilterValue(req.query.status),
			region: normalizeFilterValue(req.query.region)
		};
		const vehicles = await vehicleService.list();
		const filteredVehicles = applyVehicleFilters(vehicles, filters);
		const rows = filteredVehicles.map((vehicle) => ({
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
