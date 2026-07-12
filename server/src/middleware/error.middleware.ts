import type { ErrorRequestHandler } from "express";

export const errorMiddleware: ErrorRequestHandler = (err, _req, res, _next) => {
	console.error(err);
	const message = err instanceof Error ? err.message : "Internal server error";
	res.status(500).json({ success: false, error: message });
};
