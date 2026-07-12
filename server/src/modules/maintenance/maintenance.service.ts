import {
	MaintenanceModel,
	VehicleModel,
	toApiDocument
} from "../../models/fleet.js";
import type { MaintenanceLog } from "./maintenance.types.js";

export const maintenanceService = {
	async list(): Promise<MaintenanceLog[]> {
		const records = await MaintenanceModel.find().sort({ createdAt: -1 }).lean();
		return records.map(
			(record) => toApiDocument(record) as unknown as MaintenanceLog
		);
	},

	async create(
		payload: Omit<MaintenanceLog, "id" | "createdAt" | "updatedAt">
	): Promise<MaintenanceLog> {
		const vehicle = await VehicleModel.findById(payload.vehicleId).lean();
		if (!vehicle) {
			throw new Error("Vehicle not found");
		}

		const record = await MaintenanceModel.create({
			...payload,
			status: payload.status ?? "Active"
		});
		await VehicleModel.findByIdAndUpdate(payload.vehicleId, {
			status: "In Shop",
			updatedAt: new Date()
		});
		return toApiDocument(record.toObject()) as unknown as MaintenanceLog;
	},

	async close(id: string): Promise<MaintenanceLog | undefined> {
		const record = await MaintenanceModel.findById(id).lean();
		if (!record) {
			return undefined;
		}

		const vehicle = await VehicleModel.findById(record.vehicleId).lean();
		const updated = await MaintenanceModel.findByIdAndUpdate(
			id,
			{
				status: "Closed",
				endDate: new Date().toISOString(),
				updatedAt: new Date()
			},
			{ new: true }
		).lean();

		if (vehicle && vehicle.status === "In Shop") {
			await VehicleModel.findByIdAndUpdate(record.vehicleId, {
				status: "Available",
				updatedAt: new Date()
			});
		}

		return updated
			? (toApiDocument(updated) as unknown as MaintenanceLog)
			: undefined;
	}
};
