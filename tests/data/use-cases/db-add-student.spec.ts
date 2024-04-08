import { DbAddStudent } from "../../../src/data/use-cases";
import { AddStudentRepository } from "../../../src/data/protocols";

describe("DbAddStudent", () => {
	it("Should call AddStudentRepository with correct values", async () => {
		class AddStudentRepositoryStub implements AddStudentRepository {
			async add(studentData: AddStudentRepository.Params): Promise<AddStudentRepository.Result> {
				return {
					id: 1,
					name: "any_name",
					cpf: "any_cpf",
					responsible: "any_responsible"
				};
			}
		}
		const addStudentRepositoryStub = new AddStudentRepositoryStub();
		const sut = new DbAddStudent(addStudentRepositoryStub);
		const addSpy = jest.spyOn(addStudentRepositoryStub, "add");
		const studentData = {
			name: "any_name",
			cpf: "any_cpf",
			responsible: "any_responsible"
		};
		await sut.add(studentData);
		expect(addSpy).toHaveBeenCalledWith(studentData);
	});
});
