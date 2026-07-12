export type UserRole = "Admin" | "FleetManager" | "Dispatcher";

export interface AuthUser {
	id: string;
	name: string;
	email: string;
	password: string;
	role: UserRole;
	active: boolean;
}

export interface LoginPayload {
	email: string;
	password: string;
}

export interface AuthTokenPayload {
	sub: string;
	role: UserRole;
}
