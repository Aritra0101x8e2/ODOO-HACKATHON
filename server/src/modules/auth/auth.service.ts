import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";
import { env } from "../../config/env.js";
import { UserModel, toApiDocument } from "../../models/fleet.js";
import type { AuthTokenPayload, AuthUser, LoginPayload } from "./auth.types.js";

const seedUsers = async (): Promise<void> => {
	const count = await UserModel.countDocuments();
	if (count > 0) {
		return;
	}

	await UserModel.create([
		{
			name: "System Admin",
			email: "admin@fleet.com",
			password: bcrypt.hashSync("admin123", 10),
			role: "Admin",
			active: true
		},
		{
			name: "Fleet Manager",
			email: "manager@fleet.com",
			password: bcrypt.hashSync("manager123", 10),
			role: "FleetManager",
			active: true
		},
		{
			name: "Dispatcher",
			email: "dispatcher@fleet.com",
			password: bcrypt.hashSync("dispatcher123", 10),
			role: "Dispatcher",
			active: true
		}
	]);
};

void seedUsers();

export const authService = {
	async login(payload: LoginPayload) {
		await seedUsers();
		const user = await UserModel.findOne({ email: payload.email }).lean();
		if (!user || !user.active) {
			throw new Error("Invalid credentials");
		}

		const isPasswordValid = await bcrypt.compare(payload.password, user.password);
		if (!isPasswordValid) {
			throw new Error("Invalid credentials");
		}

		const tokenPayload: AuthTokenPayload = {
			sub: String(user._id),
			role: user.role as AuthTokenPayload["role"]
		};

		const token = jwt.sign(tokenPayload, env.JWT_SECRET, {
			expiresIn: env.JWT_EXPIRES_IN
		} as any);

		return {
			success: true,
			token,
			user: {
				id: String(user._id),
				name: user.name,
				email: user.email,
				role: user.role,
				active: user.active
			}
		};
	},

	async me(userId: string) {
		const user = await UserModel.findById(userId).lean();
		if (!user) {
			throw new Error("User not found");
		}

		return {
			success: true,
			user: {
				id: String(user._id),
				name: user.name,
				email: user.email,
				role: user.role,
				active: user.active
			}
		};
	}
};
