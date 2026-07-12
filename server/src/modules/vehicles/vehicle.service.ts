import { VehicleModel, toApiDocument } from "../../models/fleet.js";
import type { Vehicle, VehicleStatus } from "./vehicle.types.js";

export const vehicleService = {
	async list(): Promise<Vehicle[]> {
		const vehicles = await VehicleModel.find().sort({ createdAt: -1 }).lean();
		return vehicles.map(
			(vehicle) => toApiDocument(vehicle) as unknown as Vehicle
		);
	},

	async get(id: string): Promise<Vehicle | undefined> {
		const vehicle = await VehicleModel.findById(id).lean();
		return vehicle ? (toApiDocument(vehicle) as unknown as Vehicle) : undefined;
	},

	async create(
		payload: Omit<Vehicle, "id" | "createdAt" | "updatedAt">
	): Promise<Vehicle> {
		const exists = await VehicleModel.exists({
			registrationNumber: payload.registrationNumber
		});
		if (exists) {
			throw new Error("Registration number must be unique");
		}

		const vehicle = await VehicleModel.create(payload);
		return toApiDocument(vehicle.toObject()) as unknown as Vehicle;
	},

	async update(
		id: string,
		payload: Partial<Vehicle>
	): Promise<Vehicle | undefined> {
		if (payload.registrationNumber) {
			const exists = await VehicleModel.exists({
				registrationNumber: payload.registrationNumber,
				_id: { $ne: id }
			});
			if (exists) {
				throw new Error("Registration number must be unique");
			}
		}

		const vehicle = await VehicleModel.findByIdAndUpdate(
			id,
			{ ...payload, updatedAt: new Date() },
			{ new: true }
		).lean();
		return vehicle ? (toApiDocument(vehicle) as unknown as Vehicle) : undefined;
	},

	async delete(id: string): Promise<boolean> {
		const result = await VehicleModel.findByIdAndDelete(id);
		return Boolean(result);
	},

	async setStatus(
		id: string,
		status: VehicleStatus
	): Promise<Vehicle | undefined> {
		const vehicle = await VehicleModel.findByIdAndUpdate(
			id,
			{ status, updatedAt: new Date() },
			{ new: true }
		).lean();
		return vehicle ? (toApiDocument(vehicle) as unknown as Vehicle) : undefined;
	}
};
