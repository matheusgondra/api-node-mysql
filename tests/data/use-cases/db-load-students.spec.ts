import { StudentModel } from "../../../src/domain/models";
import { LoadStudentsRepository } from "../../../src/data/protocols";
import { DbLoadStudents } from "../../../src/data/use-cases";

describe("DbLoadStudents", () => {
	it("Should call LoadStudentsRepository with correct values", async () => {
		class LoadStudentsRepositoryStub implements LoadStudentsRepository {
			async load(): Promise<StudentModel[]> {
				return [
					{
						id: 1,
						name: "any_name",
						cpf: "any_cpf",
						responsible: "any_responsible"
					},
					{
						id: 2,
						name: "any_name",
						cpf: "any_cpf",
						responsible: "any_responsible"
					}
				];
			}
		}
		const loadStudentsRepositoryStub = new LoadStudentsRepositoryStub();
		const sut = new DbLoadStudents(loadStudentsRepositoryStub);
		const loadSpy = jest.spyOn(loadStudentsRepositoryStub, "load");
		await sut.load(1, 6);
		expect(loadSpy).toHaveBeenCalledWith(1, 6);
	});
});
