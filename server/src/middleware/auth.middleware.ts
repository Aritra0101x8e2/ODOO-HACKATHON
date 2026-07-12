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
	const trimmedHeader =
		typeof authHeader === "string" ? authHeader.trim() : undefined;
	const bearerMatch = trimmedHeader?.match(/^Bearer\s+(\S.+)$/i);
	const headerToken =
		bearerMatch?.[1] ??
		(trimmedHeader && !/^Bearer(\s|$)/i.test(trimmedHeader)
			? trimmedHeader
			: undefined);
	const token = headerToken ?? req.cookies?.token;

	// #region agent log
	fetch("http://127.0.0.1:7523/ingest/41296734-0e3d-4439-a5be-fab51a3fcb13", {
		method: "POST",
		headers: {
			"Content-Type": "application/json",
			"X-Debug-Session-Id": "cc49c3"
		},
		body: JSON.stringify({
			sessionId: "cc49c3",
			runId: "pre-fix",
			hypothesisId: "B",
			location: "auth.middleware.ts:token-resolution",
			message: "Auth token source resolution",
			data: {
				path: req.path,
				hasAuthorizationHeader: Boolean(headerValue),
				hasBearerToken: Boolean(bearerMatch?.[1]),
				hasEmptyBearerHeader: Boolean(
					trimmedHeader && /^Bearer(\s|$)/i.test(trimmedHeader) && !bearerMatch?.[1]
				),
				hasCookieToken: Boolean(req.cookies?.token),
				resolvedFrom: bearerMatch?.[1]
					? "bearer"
					: headerToken
						? "raw-header"
						: req.cookies?.token
							? "cookie"
							: "none"
			},
			timestamp: Date.now()
		})
	}).catch(() => {});
	// #endregion

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