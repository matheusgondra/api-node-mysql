import connection from "../config/connection.js";

class Alunos {
   static getAlunos(res) {
      const sql = `SELECT * FROM alunos`;

      connection.query(sql, (err, resul) => {
         if (err) {
            res.status(500).json({ message: err });
         } else {
            res.status(200).json(resul);
         }
      });
   }

   static getAlunoById(res, id) {
      const sql = `SELECT * FROM alunos WHERE matricula = ${id}`;

      connection.query(sql, (err, resul) => {
         if (err) {
            res.status(500).json({ message:err });
         } else {
            res.status(200).json(resul);
         }
      });
   }

   static createAluno(res, data) {
      const sql = `INSERT INTO alunos SET ?`;

      connection.query(sql, data, (err, resul) => {
         if (err) {
            res.status(500).json(err);
         } else {
            res.status(201).json(resul);
         }
      });
   }

   static deleteAluno(res, id) {
      const sql = `DELETE FROM alunos WHERE matricula = ${id}`;

      connection.query(sql, (err, resul) => {
         if (err) {
            res.status(500).json(err);
         } else {
            res.status(200).json({message: "Deletado com sucesso!"});
         }
      });
   }
}

export default Alunos;