import mysql2 from "mysql2";
import * as dotenv from "dotenv";

dotenv.config();

const connection = mysql2.createConnection({
   uri: process.env.DATABASE_URL
});

export default connection;