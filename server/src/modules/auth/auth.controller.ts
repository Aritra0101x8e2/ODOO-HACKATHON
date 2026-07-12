import type { Response, NextFunction } from "express";
import type { AuthenticatedRequest } from "../../middleware/auth.middleware.js";
import { authService } from "./auth.service.js";
import { env } from "../../config/env.js";

const COOKIE_MAX_AGE_MS = 24 * 60 * 60 * 1000; // keep in sync with env.JWT_EXPIRES_IN

export const authController = {
	login: async (
		req: AuthenticatedRequest,
		res: Response,
		next: NextFunction
	): Promise<void> => {
		try {
			const result = await authService.login(req.body);

			res.cookie("token", result.token, {
				httpOnly: true,
				secure: env.NODE_ENV === "production",
				sameSite: "strict",
				maxAge: COOKIE_MAX_AGE_MS
			});

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
					hypothesisId: "A",
					location: "auth.controller.ts:login",
					message: "Login succeeded",
					data: {
						hasTokenInBody: Boolean(result.token),
						cookieSet: true
					},
					timestamp: Date.now()
				})
			}).catch(() => {});
			// #endregion

			res.json(result);
		} catch (error) {
			console.error(error);
			res.status(401).json({
				success: false,
				error: error instanceof Error ? error.message : "Authentication failed"
			});
		}
	},

	logout: async (
		req: AuthenticatedRequest,
		res: Response,
		next: NextFunction
	): Promise<void> => {
		try {
			res.clearCookie("token");
			res.json({ success: true });
		} catch (error) {
			next(error);
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
