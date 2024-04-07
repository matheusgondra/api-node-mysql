import customApp from "./config/customApp";
import connection from "./config/connection";
import Tables from "./models/Tables";

connection.connect(error => {
   if (error) {
      console.error(error);
   } else {
      console.log("Conectado com sucesso!");
		
		const tables = new Tables(connection);
      
      const app = customApp();

      app.listen(3000, () => console.log("Servidor rodando na porta 3000"));
   }
});

