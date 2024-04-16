import { MySQLHelper } from "../../../src/infra/db/mysql/helpers/mysql-helper";
import { StudentRepository } from "../../../src/infra/db/mysql/repositories/student-repository";

const makeSut = (): StudentRepository => {
	const sut = new StudentRepository();
	return sut;
};

describe("StudentRepository", () => {
	beforeAll(async () => {
		await MySQLHelper.connect();
	});

	beforeEach(async () => {
		const connection = await MySQLHelper.connect();
		await connection.query("DELETE FROM alunos");
		await connection.query("ALTER TABLE alunos AUTO_INCREMENT = 1");
	});

	afterAll(async () => {
		await MySQLHelper.disconnect();
	});

	it("Should return a student on success", async () => {
		const sut = makeSut();
		const studentData = {
			name: "any_name",
			cpf: "any_cpf",
			responsible: "any_responsible"
		};
		const student = await sut.add(studentData);
		expect(student).toEqual({
			id: expect.any(Number),
			name: "any_name",
			cpf: "any_cpf",
			responsible: "any_responsible"
		});
	});
});
