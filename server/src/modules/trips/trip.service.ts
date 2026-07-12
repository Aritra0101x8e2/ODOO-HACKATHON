import {
	DriverModel,
	TripModel,
	VehicleModel,
	toApiDocument
} from "../../models/fleet.js";
import type { Trip } from "./trip.types.js";

export const tripService = {
	async list(): Promise<Trip[]> {
		const trips = await TripModel.find().sort({ createdAt: -1 }).lean();
		return trips.map((trip) => toApiDocument(trip) as unknown as Trip);
	},

	async create(
		payload: Omit<Trip, "id" | "createdAt" | "updatedAt">
	): Promise<Trip> {
		const vehicle = await VehicleModel.findById(payload.vehicleId).lean();
		const driver = await DriverModel.findById(payload.driverId).lean();

		if (!vehicle) {
			throw new Error("Vehicle not found");
		}

		if (!driver) {
			throw new Error("Driver not found");
		}

		if (payload.cargoWeight > vehicle.maxLoadCapacity) {
			throw new Error("Cargo weight must not exceed vehicle capacity");
		}

		if (vehicle.status !== "Available") {
			throw new Error("Vehicle is not available for assignment");
		}

		if (driver.status !== "Available") {
			throw new Error("Driver is not available for assignment");
		}

		if (new Date(driver.licenseExpiry) < new Date()) {
			throw new Error("Expired license cannot be assigned");
		}

		const trip = await TripModel.create({ ...payload, status: "Draft" });
		return toApiDocument(trip.toObject()) as unknown as Trip;
	},

	async dispatch(id: string): Promise<Trip | undefined> {
		const trip = await TripModel.findById(id).lean();
		if (!trip) {
			return undefined;
		}

		if (trip.status !== "Draft") {
			throw new Error("Only draft trips can be dispatched");
		}

		const vehicle = await VehicleModel.findById(trip.vehicleId).lean();
		const driver = await DriverModel.findById(trip.driverId).lean();

		if (!vehicle || !driver) {
			throw new Error("Vehicle or driver not found");
		}

		if (trip.cargoWeight > vehicle.maxLoadCapacity) {
			throw new Error("Cargo weight must not exceed vehicle capacity");
		}

		await VehicleModel.findByIdAndUpdate(trip.vehicleId, {
			status: "On Trip",
			updatedAt: new Date()
		});
		await DriverModel.findByIdAndUpdate(trip.driverId, {
			status: "On Trip",
			updatedAt: new Date()
		});

		const updated = await TripModel.findByIdAndUpdate(
			id,
			{ status: "Dispatched", dispatchTime: new Date(), updatedAt: new Date() },
			{ new: true }
		).lean();
		return updated ? (toApiDocument(updated) as unknown as Trip) : undefined;
	},

	async complete(id: string): Promise<Trip | undefined> {
		const trip = await TripModel.findById(id).lean();
		if (!trip) {
			return undefined;
		}

		if (trip.status !== "Dispatched") {
			throw new Error("Only dispatched trips can be completed");
		}

		await VehicleModel.findByIdAndUpdate(trip.vehicleId, {
			status: "Available",
			updatedAt: new Date()
		});
		await DriverModel.findByIdAndUpdate(trip.driverId, {
			status: "Available",
			updatedAt: new Date()
		});

		const updated = await TripModel.findByIdAndUpdate(
			id,
			{ status: "Completed", completionTime: new Date(), updatedAt: new Date() },
			{ new: true }
		).lean();
		return updated ? (toApiDocument(updated) as unknown as Trip) : undefined;
	},

	async cancel(id: string): Promise<Trip | undefined> {
		const trip = await TripModel.findById(id).lean();
		if (!trip) {
			return undefined;
		}

		if (trip.status !== "Dispatched") {
			throw new Error("Only dispatched trips can be cancelled");
		}

		await VehicleModel.findByIdAndUpdate(trip.vehicleId, {
			status: "Available",
			updatedAt: new Date()
		});
		await DriverModel.findByIdAndUpdate(trip.driverId, {
			status: "Available",
			updatedAt: new Date()
		});

		const updated = await TripModel.findByIdAndUpdate(
			id,
			{ status: "Cancelled", updatedAt: new Date() },
			{ new: true }
		).lean();
		return updated ? (toApiDocument(updated) as unknown as Trip) : undefined;
	}
};
