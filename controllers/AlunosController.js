import Model from "../models/Alunos.js";

class AlunosController {
   static getAlunos(req, res) {
      Model.getAlunos(res);
   }

   static getAlunoById(req, res) {
      const { id } = req.params;
      Model.getAlunoById(res, id);
   }

   static createAluno(req, res) {
      const data = req.body;
      Model.createAluno(res, data);
   }

   static deleteAluno(req, res) {
      const { id } = req.params;
      Model.deleteAluno(res, id);
   }
}

export default AlunosController;