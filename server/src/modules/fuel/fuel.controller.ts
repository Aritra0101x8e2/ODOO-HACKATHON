import type { Request, Response, NextFunction } from "express";
import { fuelService } from "./fuel.service.js";

export const fuelController = {
	list: async (_req: Request, res: Response): Promise<void> => {
		const data = await fuelService.list();
		res.json({ success: true, data });
	},

	create: async (
		req: Request,
		res: Response,
		next: NextFunction
	): Promise<void> => {
		try {
			const record = await fuelService.create(req.body);
			res.status(201).json({ success: true, data: record });
		} catch (error) {
			next(error);
		}
	}
};
