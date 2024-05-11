import { MySQLHelper } from "../../../src/infra/db/mysql/helpers/mysql-helper";
import { StudentRepository } from "../../../src/infra/db/mysql/repositories/student-repository";

const makeSut = (): StudentRepository => {
	const sut = new StudentRepository();
	return sut;
};

const makeFakeStudentData = () => ({
	name: "any_name",
	cpf: "any_cpf",
	responsible: "any_responsible"
});

describe("StudentRepository", () => {
	beforeAll(async () => {
		await MySQLHelper.connect();
	});

	beforeEach(async () => {
		await MySQLHelper.clearStudents();
	});

	afterAll(async () => {
		await MySQLHelper.disconnect();
	});

	describe("add()", () => {
		it("Should return a student on success", async () => {
			const sut = makeSut();
			const student = await sut.add(makeFakeStudentData());
			expect(student).toEqual({
				id: expect.any(Number),
				name: "any_name",
				cpf: "any_cpf",
				responsible: "any_responsible"
			});
		});
	});

	describe("load()", () => {
		it("Should return a list of students on success", async () => {
			const sut = makeSut();
			const student = await sut.add(makeFakeStudentData());
			const students = await sut.load(1, 6);
			expect(students).toEqual([student]);
		});

		it("Should return an empty list if there are no students", async () => {
			const sut = makeSut();
			const students = await sut.load(1, 6);
			expect(students).toEqual([]);
		});
	});
});
