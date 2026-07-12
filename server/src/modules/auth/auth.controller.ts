import type { Response, NextFunction } from "express";
import type { AuthenticatedRequest } from "../../middleware/auth.middleware.js";
import { authService } from "./auth.service.js";

export const authController = {
	login: async (
		req: AuthenticatedRequest,
		res: Response,
		next: NextFunction
	): Promise<void> => {
		try {
			const result = await authService.login(req.body);
			res.json(result);
		} catch (error) {
			console.error(error);
			res.status(401).json({
				success: false,
				error: error instanceof Error ? error.message : "Authentication failed"
			});
		}
	},

	me: async (
		req: AuthenticatedRequest,
		res: Response,
		next: NextFunction
	): Promise<void> => {
		try {
			const userId = req.user?.id;
			if (!userId) {
				res.status(401).json({ success: false, error: "Authentication required" });
				return;
			}

			const result = await authService.me(userId);
			res.json(result);
		} catch (error) {
			next(error);
		}
	}
};
