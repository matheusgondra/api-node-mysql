import { LoadStudents } from "../../../src/domain/use-cases";
import { LoadStudentsController } from "../../../src/presentation/controllers";
import { badRequest, noContent, ok, serverError } from "../../../src/presentation/helpers/http";
import { Validation } from "../../../src/presentation/protocols";

const makeValidationStub = (): Validation => {
	class ValidationStub implements Validation {
		validate(input: any): Error | null {
			return null;
		}
	}
	return new ValidationStub();
};

const makeLoadStudentsStub = (): LoadStudents => {
	class LoadStudentsStub implements LoadStudents {
		async load(page: number, limit: number): Promise<LoadStudents.Result> {
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
	return new LoadStudentsStub();
};

interface SutTypes {
	sut: LoadStudentsController;
	validationStub: Validation;
	loadStudentsStub: LoadStudents;
}

const makeSut = (): SutTypes => {
	const validationStub = makeValidationStub();
	const loadStudentsStub = makeLoadStudentsStub();
	const sut = new LoadStudentsController(validationStub, loadStudentsStub);
	return {
		sut,
		validationStub,
		loadStudentsStub
	};
};

const makeFakeRequest = () => ({
	body: {},
	params: {
		page: 1,
		limit: 6
	}
});

describe("LoadStudentsController", () => {
	it("Should call Validation with correct values", async () => {
		const { sut, validationStub } = makeSut();
		const validationSpy = jest.spyOn(validationStub, "validate");
		await sut.handle(makeFakeRequest());
		expect(validationSpy).toHaveBeenCalledWith(makeFakeRequest().params);
	});

	it("Should return 400 if Validation returns an error", async () => {
		const { sut, validationStub } = makeSut();
		jest.spyOn(validationStub, "validate").mockReturnValueOnce(new Error());
		const httpResponse = await sut.handle(makeFakeRequest());
		expect(httpResponse).toEqual(badRequest(new Error()));
	});

	it("Should call LoadStudents with correct values", async () => {
		const { sut, loadStudentsStub } = makeSut();
		const loadSpy = jest.spyOn(loadStudentsStub, "load");
		await sut.handle(makeFakeRequest());
		expect(loadSpy).toHaveBeenCalledWith(1, 6);
	});

	it("Should return 500 if LoadStudents throws", async () => {
		const { sut, loadStudentsStub } = makeSut();
		jest.spyOn(loadStudentsStub, "load").mockRejectedValueOnce(new Error());
		const httpResponse = await sut.handle(makeFakeRequest());
		expect(httpResponse).toEqual(serverError(new Error()));
	});

	it("Should return 200 on success", async () => {
		const { sut } = makeSut();
		const httpResponse = await sut.handle(makeFakeRequest());
		expect(httpResponse).toEqual(
			ok([
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
			])
		);
	});

	it("Should return 204 if LoadStudents returns an empty array", async () => {
		const { sut, loadStudentsStub } = makeSut();
		jest.spyOn(loadStudentsStub, "load").mockResolvedValueOnce([]);
		const httpResponse = await sut.handle(makeFakeRequest());
		expect(httpResponse).toEqual(noContent());
	});
});
