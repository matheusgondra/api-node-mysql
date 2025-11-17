import connection from "../config/connection.js";
import { Response } from "express";
import { logger } from "../utils/logger.js";
import Joi from "joi";

interface IAlunos {
	nome: string;
	cpf: string;
	responsavel: string;
}

const createAlunoSchema = Joi.object<IAlunos>({
   nome: Joi.string().min(3).max(100).required(),
   cpf: Joi.string().min(11).max(11).required(),
   responsavel: Joi.string().min(3).max(100).required()
});

const updateAlunoSchema = Joi.object({
   id: Joi.number().integer().positive().required(),
   nome: Joi.string().min(3).max(100).required(),
   cpf: Joi.string().min(11).max(11).required(),
   responsavel: Joi.string().min(3).max(100).required()
});

const idSchema = Joi.number().integer().positive().required();

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
      const { error } = idSchema.validate(Number(id));
      if (error) {
         this.logger.error(JSON.stringify(error.details));
         return res.status(400).json({ message: error.details[0].message });
      }

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
      const { error } = createAlunoSchema.validate(data);
      if (error) {
         this.logger.error(JSON.stringify(error.details));
         return res.status(400).json({ message: error.details[0].message });
      }

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
      const { error } = updateAlunoSchema.validate({ id, ...data });
      if (error) {
         this.logger.error(JSON.stringify(error.details));
         return res.status(400).json({ message: error.details[0].message });
      }

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
      const { error } = idSchema.validate(Number(id));
      if (error) {
         this.logger.error(JSON.stringify(error.details));
         return res.status(400).json({ message: error.details[0].message });
      }
      
      const sql = `DELETE FROM alunos WHERE matricula = ${id}`;

      connection.query(sql, (err, _resul) => {
         if (err) {
            this.logger.error(err);
            return res.status(500).json({ message: err });
         } else {
            return res.status(200).json({ message: "Deletado com sucesso!" });
         }
      });
   }
}

export default Alunos;