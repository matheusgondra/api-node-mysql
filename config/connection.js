import mysql2 from "mysql2";

const connection = mysql2.createConnection({
   host: "localhost",
   user: "root",
   password: "Mygondra2020",
   database: "teste"
});

export default connection;