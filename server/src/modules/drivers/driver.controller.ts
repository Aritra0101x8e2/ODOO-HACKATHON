import type { Request, Response, NextFunction } from "express";
import { driverService } from "./driver.service.js";

export const driverController = {
	list: async (_req: Request, res: Response): Promise<void> => {
		const data = await driverService.list();
		res.json({ success: true, data });
	},

	get: async (req: Request, res: Response): Promise<void> => {
		const id = Array.isArray(req.params.id) ? req.params.id[0] : req.params.id;
		if (!id) {
			res.status(400).json({ success: false, error: "Driver id is required" });
			return;
		}

		const driver = await driverService.get(id);
		if (!driver) {
			res.status(404).json({ success: false, error: "Driver not found" });
			return;
		}

		res.json({ success: true, data: driver });
	},

	create: async (req: Request, res: Response): Promise<void> => {
		const driver = await driverService.create(req.body);
		res.status(201).json({ success: true, data: driver });
	},

	update: async (
		req: Request,
		res: Response,
		next: NextFunction
	): Promise<void> => {
		try {
			const id = Array.isArray(req.params.id) ? req.params.id[0] : req.params.id;
			if (!id) {
				res.status(400).json({ success: false, error: "Driver id is required" });
				return;
			}

			const driver = await driverService.update(id, req.body);
			if (!driver) {
				res.status(404).json({ success: false, error: "Driver not found" });
				return;
			}

			res.json({ success: true, data: driver });
		} catch (error) {
			next(error);
		}
	},

	delete: async (req: Request, res: Response): Promise<void> => {
		const id = Array.isArray(req.params.id) ? req.params.id[0] : req.params.id;
		if (!id) {
			res.status(400).json({ success: false, error: "Driver id is required" });
			return;
		}

		const deleted = await driverService.delete(id);
		if (!deleted) {
			res.status(404).json({ success: false, error: "Driver not found" });
			return;
		}

		res.json({ success: true, message: "Driver deleted" });
	}
};
