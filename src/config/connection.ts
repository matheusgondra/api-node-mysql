import mysql2 from "mysql2";
import "dotenv/config";

const connection = mysql2.createConnection({
	host: process.env.DB_HOST,
	user: process.env.DB_USER,
	password: process.env.DB_PASSWORD,
	database: process.env.DB_NAME
});

export default connection;
