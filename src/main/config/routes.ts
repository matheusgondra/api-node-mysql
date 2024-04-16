import { Express, Router } from "express";
import { readdirSync } from "node:fs";
import { join } from "node:path";

export default (app: Express): void => {
	const router = Router();
	app.use(router);
	readdirSync(join(__dirname, "../routes")).map(async (file) => {
		if (!file.includes(".map")) {
			(await import(`../routes/${file}`)).default(router);
		}
	});
};
