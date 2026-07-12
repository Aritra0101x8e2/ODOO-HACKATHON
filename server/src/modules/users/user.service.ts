import { UserModel, toApiDocument } from "../../models/fleet.js";
import type { User } from "./user.types.js";

export const userService = {
	async list(): Promise<User[]> {
		const users = await UserModel.find()
			.sort({ createdAt: -1 })
			.select("-password")
			.lean();

		return users.map((user) => toApiDocument(user) as unknown as User);
	}
};
