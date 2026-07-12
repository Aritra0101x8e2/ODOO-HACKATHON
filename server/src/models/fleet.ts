import { Schema, model, type Types } from "mongoose";
import type { DriverStatus } from "../modules/drivers/driver.types.js";
import type { MaintenanceStatus } from "../modules/maintenance/maintenance.types.js";
import type { TripStatus } from "../modules/trips/trip.types.js";
import type { VehicleStatus } from "../modules/vehicles/vehicle.types.js";

export interface VehicleDoc {
	registrationNumber: string;
	vehicleName: string;
	model: string;
	type: string;
	maxLoadCapacity: number;
	odometer: number;
	acquisitionCost: number;
	status: VehicleStatus;
	region: string;
	createdAt: Date;
	updatedAt: Date;
}

export interface DriverDoc {
	name: string;
	licenseNumber: string;
	licenseCategory: string;
	licenseExpiry: string;
	contactNumber: string;
	safetyScore: number;
	status: DriverStatus;
	createdAt: Date;
	updatedAt: Date;
}

export interface TripDoc {
	source: string;
	destination: string;
	vehicleId: string;
	driverId: string;
	cargoWeight: number;
	plannedDistance: number;
	actualDistance: number;
	fuelUsed: number;
	status: TripStatus;
	dispatchTime?: Date;
	completionTime?: Date;
	createdAt: Date;
	updatedAt: Date;
}

export interface MaintenanceDoc {
	vehicleId: string;
	description: string;
	cost: number;
	startDate: string;
	endDate?: string;
	status: MaintenanceStatus;
	createdAt: Date;
	updatedAt: Date;
}

export interface FuelDoc {
	vehicleId: string;
	liters: number;
	cost: number;
	date: string;
	createdAt: Date;
	updatedAt: Date;
}

export interface UserDoc {
	name: string;
	email: string;
	password: string;
	role: string;
	active: boolean;
	createdAt: Date;
	updatedAt: Date;
}

const baseOptions = {
	versionKey: false as const,
	timestamps: true
};

const vehicleSchema = new Schema<VehicleDoc>(
	{
		registrationNumber: {
			type: String,
			required: true,
			unique: true,
			trim: true
		},
		vehicleName: { type: String, required: true, trim: true },
		model: { type: String, required: true, trim: true },
		type: { type: String, required: true, trim: true },
		maxLoadCapacity: { type: Number, required: true },
		odometer: { type: Number, required: true },
		acquisitionCost: { type: Number, required: true },
		status: {
			type: String,
			required: true,
			enum: ["Available", "On Trip", "In Shop", "Retired"]
		},
		region: { type: String, required: true, trim: true }
	},
	baseOptions
);

const driverSchema = new Schema<DriverDoc>(
	{
		name: { type: String, required: true, trim: true },
		licenseNumber: { type: String, required: true, trim: true, unique: true },
		licenseCategory: { type: String, required: true, trim: true },
		licenseExpiry: { type: String, required: true },
		contactNumber: { type: String, required: true, trim: true },
		safetyScore: { type: Number, required: true },
		status: {
			type: String,
			required: true,
			enum: ["Available", "On Trip", "Off Duty", "Suspended"]
		}
	},
	baseOptions
);

const tripSchema = new Schema<TripDoc>(
	{
		source: { type: String, required: true, trim: true },
		destination: { type: String, required: true, trim: true },
		vehicleId: { type: String, required: true, trim: true },
		driverId: { type: String, required: true, trim: true },
		cargoWeight: { type: Number, required: true },
		plannedDistance: { type: Number, required: true },
		actualDistance: { type: Number, required: true },
		fuelUsed: { type: Number, required: true },
		status: {
			type: String,
			required: true,
			enum: ["Draft", "Dispatched", "Completed", "Cancelled"]
		},
		dispatchTime: { type: Date },
		completionTime: { type: Date }
	},
	baseOptions
);

const maintenanceSchema = new Schema<MaintenanceDoc>(
	{
		vehicleId: { type: String, required: true, trim: true },
		description: { type: String, required: true, trim: true },
		cost: { type: Number, required: true },
		startDate: { type: String, required: true },
		endDate: { type: String },
		status: { type: String, required: true, enum: ["Active", "Closed"] }
	},
	baseOptions
);

const fuelSchema = new Schema<FuelDoc>(
	{
		vehicleId: { type: String, required: true, trim: true },
		liters: { type: Number, required: true },
		cost: { type: Number, required: true },
		date: { type: String, required: true }
	},
	baseOptions
);

const userSchema = new Schema<UserDoc>(
	{
		name: { type: String, required: true, trim: true },
		email: { type: String, required: true, trim: true, unique: true },
		password: { type: String, required: true },
		role: { type: String, required: true, trim: true },
		active: { type: Boolean, default: true }
	},
	baseOptions
);

export const VehicleModel = model<VehicleDoc>("Vehicle", vehicleSchema);
export const DriverModel = model<DriverDoc>("Driver", driverSchema);
export const TripModel = model<TripDoc>("Trip", tripSchema);
export const MaintenanceModel = model<MaintenanceDoc>(
	"Maintenance",
	maintenanceSchema
);
export const FuelModel = model<FuelDoc>("FuelLog", fuelSchema);
export const UserModel = model<UserDoc>("User", userSchema);

export const toApiDocument = <T extends object>(
	doc: T
): Record<string, unknown> => {
	const source = doc as Record<string, unknown> & {
		_id?: Types.ObjectId | string;
		__v?: number;
		createdAt?: Date | string;
		updatedAt?: Date | string;
	};
	const { _id, __v, ...rest } = source;
	const createdAt =
		rest.createdAt instanceof Date
			? rest.createdAt.toISOString()
			: rest.createdAt;
	const updatedAt =
		rest.updatedAt instanceof Date
			? rest.updatedAt.toISOString()
			: rest.updatedAt;

	return {
		...rest,
		id: _id ? String(_id) : undefined,
		createdAt,
		updatedAt
	};
};
