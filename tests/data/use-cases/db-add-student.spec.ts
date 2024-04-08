import { DbAddStudent } from "../../../src/data/use-cases";
import { AddStudentRepository } from "../../../src/data/protocols";

const makeAddStudentRepositoryStub = (): AddStudentRepository => {
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
	return new AddStudentRepositoryStub();
};

interface SutTypes {
	sut: DbAddStudent;
	addStudentRepositoryStub: AddStudentRepository;
}

const makeSut = (): SutTypes => {
	const addStudentRepositoryStub = makeAddStudentRepositoryStub();
	const sut = new DbAddStudent(addStudentRepositoryStub);
	return {
		sut,
		addStudentRepositoryStub
	};
};

const makeFakeStudentData = () => ({
	name: "any_name",
	cpf: "any_cpf",
	responsible: "any_responsible"
});

describe("DbAddStudent", () => {
	it("Should call AddStudentRepository with correct values", async () => {
		const { sut, addStudentRepositoryStub } = makeSut();
		const addSpy = jest.spyOn(addStudentRepositoryStub, "add");
		await sut.add(makeFakeStudentData());
		expect(addSpy).toHaveBeenCalledWith(makeFakeStudentData());
	});

	it("Should throw if AddStudentRepository throws", async () => {
		const { sut, addStudentRepositoryStub } = makeSut();
		jest.spyOn(addStudentRepositoryStub, "add").mockRejectedValueOnce(new Error());
		const promise = sut.add(makeFakeStudentData());
		await expect(promise).rejects.toThrow();
	});

	it("Should return a student on success", async () => {
		const { sut } = makeSut();
		const student = await sut.add(makeFakeStudentData());
		expect(student).toEqual({
			id: 1,
			...makeFakeStudentData()
		});
	});
});
