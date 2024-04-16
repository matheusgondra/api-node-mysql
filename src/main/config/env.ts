import dotenv from "dotenv";

const envFile = process.env.NODE_ENV?.trim() === "test" ? ".env.test.local" : ".env";
dotenv.config({ path: [envFile] });

export const env = {
	db: {
		host: process.env.DB_HOST || "localhost",
		user: process.env.DB_USER,
		password: process.env.DB_PASSWORD,
		name: process.env.DB_NAME,
		port: Number(process.env.DB_PORT) || 3306
	}
};
