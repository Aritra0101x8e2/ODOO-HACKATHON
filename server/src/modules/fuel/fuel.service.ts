import { FuelModel, toApiDocument } from "../../models/fleet.js";
import type { FuelLog } from "./fuel.types.js";

export const fuelService = {
	async list(): Promise<FuelLog[]> {
		const records = await FuelModel.find().sort({ createdAt: -1 }).lean();
		return records.map((record) => toApiDocument(record) as unknown as FuelLog);
	},

	async create(
		payload: Omit<FuelLog, "id" | "createdAt" | "updatedAt">
	): Promise<FuelLog> {
		const record = await FuelModel.create(payload);
		return toApiDocument(record.toObject()) as unknown as FuelLog;
	}
};
