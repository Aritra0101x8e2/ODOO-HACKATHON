import type { Request, Response, NextFunction } from "express";
import { tripService } from "./trip.service.js";

export const tripController = {
	list: async (_req: Request, res: Response): Promise<void> => {
		const data = await tripService.list();
		res.json({ success: true, data });
	},

	create: async (
		req: Request,
		res: Response,
		next: NextFunction
	): Promise<void> => {
		try {
			const trip = await tripService.create(req.body);
			res.status(201).json({ success: true, data: trip });
		} catch (error) {
			next(error);
		}
	},

	dispatch: async (
		req: Request,
		res: Response,
		next: NextFunction
	): Promise<void> => {
		try {
			const id = Array.isArray(req.params.id) ? req.params.id[0] : req.params.id;
			if (!id) {
				res.status(400).json({ success: false, error: "Trip id is required" });
				return;
			}

			const trip = await tripService.dispatch(id);
			if (!trip) {
				res.status(404).json({ success: false, error: "Trip not found" });
				return;
			}

			res.json({ success: true, data: trip });
		} catch (error) {
			next(error);
		}
	},

	complete: async (
		req: Request,
		res: Response,
		next: NextFunction
	): Promise<void> => {
		try {
			const id = Array.isArray(req.params.id) ? req.params.id[0] : req.params.id;
			if (!id) {
				res.status(400).json({ success: false, error: "Trip id is required" });
				return;
			}

			const trip = await tripService.complete(id);
			if (!trip) {
				res.status(404).json({ success: false, error: "Trip not found" });
				return;
			}

			res.json({ success: true, data: trip });
		} catch (error) {
			next(error);
		}
	},

	cancel: async (
		req: Request,
		res: Response,
		next: NextFunction
	): Promise<void> => {
		try {
			const id = Array.isArray(req.params.id) ? req.params.id[0] : req.params.id;
			if (!id) {
				res.status(400).json({ success: false, error: "Trip id is required" });
				return;
			}

			const trip = await tripService.cancel(id);
			if (!trip) {
				res.status(404).json({ success: false, error: "Trip not found" });
				return;
			}

			res.json({ success: true, data: trip });
		} catch (error) {
			next(error);
		}
	}
};
