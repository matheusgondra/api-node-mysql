import { ResultSetHeader, RowDataPacket } from "mysql2/promise";
import { AddStudentRepository, LoadStudentsRepository } from "../../../../data/protocols";
import { MySQLHelper } from "../helpers/mysql-helper";

interface Student extends RowDataPacket {
	matricula: number;
	nome: string;
	cpf: string;
	responsavel: string;
}

export class StudentRepository implements AddStudentRepository, LoadStudentsRepository {
	async add(studentData: AddStudentRepository.Params): Promise<AddStudentRepository.Result> {
		const connection = await MySQLHelper.connect();
		try {
			await connection.beginTransaction();

			const [resultId] = await connection.execute<ResultSetHeader>(
				"INSERT INTO alunos (nome, cpf, responsavel) VALUES (?, ?, ?);",
				[studentData.name, studentData.cpf, studentData.responsible]
			);
			const [result] = await connection.query<Student[]>("SELECT * FROM alunos WHERE matricula = ?", [
				resultId.insertId
			]);

			await connection.commit();
			return { id: result[0].matricula, name: result[0].nome, cpf: result[0].cpf, responsible: result[0].responsavel };
		} catch (error) {
			await connection.rollback();
			throw error;
		}
	}

	async load(page: number, limit: number): Promise<LoadStudentsRepository.Result> {
		const connection = await MySQLHelper.connect();
		const offset = (page - 1) * limit;
		const [result] = await connection.query<Student[]>("SELECT * FROM alunos LIMIT ? OFFSET ?;", [limit, offset]);
		return result.map((student) => ({
			id: student.matricula,
			name: student.nome,
			cpf: student.cpf,
			responsible: student.responsavel
		}));
	}
}
