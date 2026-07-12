export type TripStatus = "Draft" | "Dispatched" | "Completed" | "Cancelled";

export interface Trip {
	id: string;
	source: string;
	destination: string;
	vehicleId: string;
	driverId: string;
	cargoWeight: number;
	plannedDistance: number;
	actualDistance: number;
	fuelUsed: number;
	status: TripStatus;
	dispatchTime?: string;
	completionTime?: string;
	createdAt: string;
	updatedAt: string;
}
