import customApp from "./config/customApp.js";
import connection from "./config/connection.js";
import Tables from "./models/Tables.js";
import { logger } from "./utils/logger.js";

connection.connect(error => {
   if (error) {
      console.error(error);
   } else {
      console.log("Conectado com sucesso!");
		
		const tables = new Tables(connection);
      
      const app = customApp();

      app.listen(3000, () => logger.info("Servidor rodando na porta 3000"));
   }
});

