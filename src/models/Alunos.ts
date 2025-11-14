import connection from "../config/connection.js";
import { Response } from "express";
import { logger } from "../utils/logger.js";

interface IAlunos {
	nome: string;
	cpf: string;
	responsavel: string;
}

class Alunos {
   private static logger = logger.child({ name: `api:${Alunos.name}` });

   static getAlunos(res: Response) {
      const sql = `SELECT * FROM alunos`;

      connection.query(sql, (err, resul) => {
         if (err) {
            this.logger.error(err);
            return res.status(500).json({ message: err });
         } else {
            return res.status(200).json(resul);
         }
      });
   }

   static getAlunoById(res: Response, id: string) {
      const sql = `SELECT * FROM alunos WHERE matricula = ${id}`;

      connection.query(sql, (err, resul) => {
         if (err) {
            this.logger.error(err);
            return res.status(500).json({ message: err });
         } else {
            return res.status(200).json(resul);
         }
      });
   }

   static createAluno(res: Response, data: IAlunos) {
      const sql = `INSERT INTO alunos SET ?`;
      connection.query(sql, data, (err, _resul) => {
         if (err) {
            this.logger.error(err);
            return res.status(500).json({ message: err });
         } else {
            return res.status(201).json({ message: "Aluno adicionado com sucesso!"});
         }
      });
   }

	static updateAluno(res: Response, id: number, data: IAlunos) {
		const sql = `UPDATE alunos SET nome = ?, cpf = ?, responsavel = ? WHERE matricula = ${id};`;

		connection.query(sql, [data.nome, data.cpf, data.responsavel], (err, _result, _fields) => {
			if(err) {
				this.logger.error(err);
				return res.status(500).json({ message: err });
			} else {
				return res.status(201).json({ message: "Dados Alterados com sucesso!" });
			}
		});
	}

   static deleteAluno(res: Response, id: string) {
      const sql = `DELETE FROM alunos WHERE matricula = ${id}`;

      connection.query(sql, (err, _resul) => {
         if (err) {
            this.logger.error(err);
            return res.status(500).json({ message: err });
         } else {
            return res.status(200).json({message: "Deletado com sucesso!"});
         }
      });
   }
}

export default Alunos;