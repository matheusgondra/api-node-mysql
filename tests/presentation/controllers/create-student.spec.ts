import { CreateStudentController } from "../../../src/presentation/controllers/create-student";
import { badRequest } from "../../../src/presentation/helpers/http";
import { HttpRequest, Validation } from "../../../src/presentation/protocols";

const makeValidationStub = (): Validation => {
	class ValidationStub implements Validation {
		validate(input: any): Error | null {
			return null;
		}
	}
	return new ValidationStub();
};

interface SutTypes {
	sut: CreateStudentController;
	validationStub: Validation;
}

const makeSut = (): SutTypes => {
	const validationStub = makeValidationStub();
	const sut = new CreateStudentController(validationStub);
	return {
		sut,
		validationStub
	};
};

const makeFakeRequest = (): HttpRequest => ({
	body: {
		name: "any_name",
		cpf: "any_cpf",
		responsible: "any_responsible"
	}
});

describe("CreateStudentController", () => {
	it("Should call Validation with correct values", async () => {
		const { sut, validationStub } = makeSut();
		const validationSpy = jest.spyOn(validationStub, "validate");
		await sut.handle(makeFakeRequest());
		expect(validationSpy).toHaveBeenCalledWith(makeFakeRequest().body);
	});

	it("Should return 400 if Validation returns an error", async () => {
		const { sut, validationStub } = makeSut();
		jest.spyOn(validationStub, "validate").mockReturnValueOnce(new Error());
		const httpResponse = await sut.handle(makeFakeRequest());
		expect(httpResponse).toEqual(badRequest(new Error()));
	});
});
