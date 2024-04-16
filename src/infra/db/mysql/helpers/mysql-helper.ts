import { createConnection, Connection, ConnectionOptions } from "mysql2/promise";
import { env } from "../../../../main/config";

const connectionOptions: ConnectionOptions = {
	host: env.db.host,
	user: env.db.user,
	password: env.db.password,
	database: env.db.name,
	port: env.db.port
};

export class MySQLHelper {
	private static client: Connection | null = null;

	private constructor() {}

	static async connect(): Promise<Connection> {
		if (!this.client) {
			this.client = await createConnection(connectionOptions);
			MySQLHelper.startDb();
		}
		return this.client;
	}

	static async disconnect(): Promise<void> {
		if (!this.client) {
			return;
		}
		this.client.destroy();
		this.client = null;
	}

	private static async startDb(): Promise<void> {
		this.client?.query(
			"CREATE TABLE IF NOT EXISTS alunos (matricula INT NOT NULL AUTO_INCREMENT, nome VARCHAR(255) NOT NULL, cpf VARCHAR(11) NOT NULL, responsavel VARCHAR(255) NOT NULL, PRIMARY KEY(matricula));"
		);
	}
}
