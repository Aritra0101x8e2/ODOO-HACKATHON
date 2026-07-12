export type DriverStatus = "Available" | "On Trip" | "Off Duty" | "Suspended";

export interface Driver {
	id: string;
	name: string;
	licenseNumber: string;
	licenseCategory: string;
	licenseExpiry: string;
	contactNumber: string;
	safetyScore: number;
	status: DriverStatus;
	createdAt: string;
	updatedAt: string;
}
