import type { Request, Response, NextFunction } from "express";
import { vehicleService } from "./vehicle.service.js";

export const vehicleController = {
	list: async (_req: Request, res: Response): Promise<void> => {
		const data = await vehicleService.list();
		res.json({ success: true, data });
	},

	get: async (req: Request, res: Response): Promise<void> => {
		const id = Array.isArray(req.params.id) ? req.params.id[0] : req.params.id;
		if (!id) {
			res.status(400).json({ success: false, error: "Vehicle id is required" });
			return;
		}

		const vehicle = await vehicleService.get(id);
		if (!vehicle) {
			res.status(404).json({ success: false, error: "Vehicle not found" });
			return;
		}

		res.json({ success: true, data: vehicle });
	},

	create: async (
		req: Request,
		res: Response,
		next: NextFunction
	): Promise<void> => {
		try {
			const vehicle = await vehicleService.create(req.body);
			res.status(201).json({ success: true, data: vehicle });
		} catch (error) {
			next(error);
		}
	},

	update: async (
		req: Request,
		res: Response,
		next: NextFunction
	): Promise<void> => {
		try {
			const id = Array.isArray(req.params.id) ? req.params.id[0] : req.params.id;
			if (!id) {
				res.status(400).json({ success: false, error: "Vehicle id is required" });
				return;
			}

			const vehicle = await vehicleService.update(id, req.body);
			if (!vehicle) {
				res.status(404).json({ success: false, error: "Vehicle not found" });
				return;
			}

			res.json({ success: true, data: vehicle });
		} catch (error) {
			next(error);
		}
	},

	delete: async (req: Request, res: Response): Promise<void> => {
		const id = Array.isArray(req.params.id) ? req.params.id[0] : req.params.id;
		if (!id) {
			res.status(400).json({ success: false, error: "Vehicle id is required" });
			return;
		}

		const deleted = await vehicleService.delete(id);
		if (!deleted) {
			res.status(404).json({ success: false, error: "Vehicle not found" });
			return;
		}

		res.json({ success: true, message: "Vehicle deleted" });
	}
};
