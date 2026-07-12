import type { NextFunction, Request, Response } from "express";
import { userService } from "./user.service.js";

export const usersController = {
	list: async (
		_req: Request,
		res: Response,
		next: NextFunction
	): Promise<void> => {
		try {
			const users = await userService.list();
			res.json({ success: true, data: users });
		} catch (error) {
			next(error);
		}
	}
};
