import { app } from "./app.js";
import { connectDatabase } from "./config/db.js";
import { env } from "./config/env.js";

void connectDatabase().catch((error) => {
	console.error("Database initialization failed", error);
});

app.listen(env.PORT, () => {
	console.log(`Fleet API listening on port ${env.PORT}`);
});
