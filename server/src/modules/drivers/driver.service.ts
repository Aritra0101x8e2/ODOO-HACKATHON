import { DriverModel, toApiDocument } from "../../models/fleet.js";
import type { Driver } from "./driver.types.js";

export const driverService = {
	async list(): Promise<Driver[]> {
		const drivers = await DriverModel.find().sort({ createdAt: -1 }).lean();
		return drivers.map((driver) => toApiDocument(driver) as unknown as Driver);
	},

	async get(id: string): Promise<Driver | undefined> {
		const driver = await DriverModel.findById(id).lean();
		return driver ? (toApiDocument(driver) as unknown as Driver) : undefined;
	},

	async create(
		payload: Omit<Driver, "id" | "createdAt" | "updatedAt">
	): Promise<Driver> {
		const driver = await DriverModel.create(payload);
		return toApiDocument(driver.toObject()) as unknown as Driver;
	},

	async update(
		id: string,
		payload: Partial<Driver>
	): Promise<Driver | undefined> {
		const driver = await DriverModel.findByIdAndUpdate(
			id,
			{ ...payload, updatedAt: new Date() },
			{ new: true }
		).lean();
		return driver ? (toApiDocument(driver) as unknown as Driver) : undefined;
	},

	async delete(id: string): Promise<boolean> {
		const result = await DriverModel.findByIdAndDelete(id);
		return Boolean(result);
	}
};
