export type DriverStatus =
  | "Available"
  | "On Trip"
  | "On Leave";

export interface Driver {
  id: string;
  name: string;
  licenseNumber: string;
  phone: string;
  experience: number;
  status: DriverStatus;
}