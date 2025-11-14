import { Connection } from "mysql2";
import { logger } from "../utils/logger.js";

class Tables {
	private connection: Connection;
   private readonly logger = logger.child({ name: `api:${Tables.name}` });

   constructor(connection: Connection) {
      this.connection = connection;
      this.createTableAlunos();
   }

   createTableAlunos() {
      const sql = `CREATE TABLE IF NOT EXISTS alunos (matricula INT NOT NULL AUTO_INCREMENT, nome VARCHAR(255) NOT NULL, cpf VARCHAR(11) NOT NULL, responsavel VARCHAR(255) NOT NULL, PRIMARY KEY(matricula));`;

      this.connection.query(sql, err => {
         if(err) {
            console.error(err);
         } else {
            this.logger.info("Tabela alunos criada com sucesso!");
         }
      });
   }
}

export default Tables;