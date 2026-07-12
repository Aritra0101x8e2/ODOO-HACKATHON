import type { Response, NextFunction } from "express";
import type { AuthenticatedRequest } from "./auth.middleware.js";

export const requireRole = (...allowedRoles: string[]) => {
	return (
		req: AuthenticatedRequest,
		res: Response,
		next: NextFunction
	): void => {
		if (!req.user) {
			res.status(401).json({ success: false, error: "Authentication required" });
			return;
		}

		if (!allowedRoles.includes(req.user.role)) {
			res.status(403).json({ success: false, error: "Forbidden" });
			return;
		}

		next();
	};
};
