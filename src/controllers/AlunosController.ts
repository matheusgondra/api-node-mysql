import Model from "../models/Alunos.js";
import { Request, Response } from "express";

class AlunosController {
   static getAlunos(req: Request, res: Response) {
      Model.getAlunos(res);
   }

   static getAlunoById(req: Request, res: Response) {
      const { id } = req.params;
      Model.getAlunoById(res, id);
   }

   static createAluno(req: Request, res: Response) {
      const data = req.body;
      Model.createAluno(res, data);
   }

   static deleteAluno(req: Request, res: Response) {
      const { id } = req.params;
      Model.deleteAluno(res, id);
   }
}

export default AlunosController;