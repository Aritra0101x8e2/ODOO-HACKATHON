import type { Request, Response, NextFunction } from "express";
import jwt from "jsonwebtoken";
import { env } from "../config/env.js";
import type { UserRole } from "../modules/auth/auth.types.js";

export interface AuthenticatedRequest extends Request {
	user?: {
		id: string;
		role: UserRole;
		email: string;
	};
}

export const authMiddleware = (
	req: AuthenticatedRequest,
	res: Response,
	next: NextFunction
): void => {
	const headerValue = Array.isArray(req.headers.authorization)
		? req.headers.authorization[0]
		: req.headers.authorization;
	const fallbackToken = Array.isArray(req.headers["x-access-token"])
		? req.headers["x-access-token"][0]
		: req.headers["x-access-token"];

	const authHeader = headerValue ?? fallbackToken;
	const bearerMatch = authHeader?.match(/^Bearer\s+(.+)$/i);
	const token = bearerMatch?.[1] ?? authHeader;

	if (!token) {
		res.status(401).json({ success: false, error: "Authentication required" });
		return;
	}

	try {
		const decoded = jwt.verify(token, env.JWT_SECRET) as unknown as {
			sub?: string;
			id?: string;
			role: UserRole;
			email?: string;
		};
		req.user = {
			id: decoded.sub ?? decoded.id ?? "",
			role: decoded.role,
			email: decoded.email ?? ""
		};
		next();
	} catch {
		res.status(401).json({ success: false, error: "Invalid or expired token" });
	}
};
