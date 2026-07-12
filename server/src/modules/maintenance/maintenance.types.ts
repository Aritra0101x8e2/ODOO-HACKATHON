export type MaintenanceStatus = "Active" | "Closed";

export interface MaintenanceLog {
	id: string;
	vehicleId: string;
	description: string;
	cost: number;
	startDate: string;
	endDate?: string;
	status: MaintenanceStatus;
	createdAt: string;
	updatedAt: string;
}
