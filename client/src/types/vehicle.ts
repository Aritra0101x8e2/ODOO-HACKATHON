export type VehicleStatus =
  | "Available"
  | "On Trip"
  | "In Shop"
  | "Retired";


export interface Vehicle {

  id: string;

  registrationNumber: string;

  vehicleName: string;

  type: string;

  maxLoadCapacity: number;

  odometer: number;

  acquisitionCost: number;

  status: VehicleStatus;

  createdAt?: string;

}