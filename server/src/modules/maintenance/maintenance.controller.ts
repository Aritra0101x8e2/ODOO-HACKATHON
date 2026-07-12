import type { Request, Response, NextFunction } from "express";
import { maintenanceService } from "./maintenance.service.js";

export const maintenanceController = {
	list: async (_req: Request, res: Response): Promise<void> => {
		const data = await maintenanceService.list();
		res.json({ success: true, data });
	},

	create: async (
		req: Request,
		res: Response,
		next: NextFunction
	): Promise<void> => {
		try {
			const record = await maintenanceService.create(req.body);
			res.status(201).json({ success: true, data: record });
		} catch (error) {
			next(error);
		}
	},

	close: async (req: Request, res: Response): Promise<void> => {
		const id = Array.isArray(req.params.id) ? req.params.id[0] : req.params.id;
		if (!id) {
			res
				.status(400)
				.json({ success: false, error: "Maintenance id is required" });
			return;
		}

		const record = await maintenanceService.close(id);
		if (!record) {
			res
				.status(404)
				.json({ success: false, error: "Maintenance record not found" });
			return;
		}

		res.json({ success: true, data: record });
	}
};
