import type { Driver } from "../types/driver";

const drivers: Driver[] = [
  {
    id: crypto.randomUUID(),
    name: "Rahul Sharma",
    licenseNumber: "DL12345678",
    phone: "9876543210",
    experience: 8,
    status: "Available",
  },
  {
    id: crypto.randomUUID(),
    name: "Amit Das",
    licenseNumber: "DL87654321",
    phone: "9123456780",
    experience: 5,
    status: "On Trip",
  },
];

export async function getDrivers(): Promise<Driver[]> {
  return Promise.resolve(drivers);
}