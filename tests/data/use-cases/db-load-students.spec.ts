import { StudentModel } from "../../../src/domain/models";
import { LoadStudentsRepository } from "../../../src/data/protocols";
import { DbLoadStudents } from "../../../src/data/use-cases";

const makeLoadStudentsRepositoryStub = (): LoadStudentsRepository => {
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
	return new LoadStudentsRepositoryStub();
};

interface SutTypes {
	sut: DbLoadStudents;
	loadStudentsRepositoryStub: LoadStudentsRepository;
}

const makeSut = (): SutTypes => {
	const loadStudentsRepositoryStub = makeLoadStudentsRepositoryStub();
	const sut = new DbLoadStudents(loadStudentsRepositoryStub);
	return {
		sut,
		loadStudentsRepositoryStub
	};
};

describe("DbLoadStudents", () => {
	it("Should call LoadStudentsRepository with correct values", async () => {
		const { sut, loadStudentsRepositoryStub } = makeSut();
		const loadSpy = jest.spyOn(loadStudentsRepositoryStub, "load");
		await sut.load(1, 6);
		expect(loadSpy).toHaveBeenCalledWith(1, 6);
	});
});
