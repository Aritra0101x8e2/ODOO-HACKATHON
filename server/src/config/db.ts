import mongoose from "mongoose";
import { env } from "./env.js";

const MONGODB_URI =
	process.env.MONGODB_URI ?? "mongodb://127.0.0.1:27017/fleet-management";

export const connectDatabase = async (): Promise<void> => {
	if (mongoose.connection.readyState >= 1) {
		return;
	}

	await mongoose.connect(MONGODB_URI, {
		serverSelectionTimeoutMS: 5000
	});

	console.log(`Connected to MongoDB at ${MONGODB_URI}`);
};
