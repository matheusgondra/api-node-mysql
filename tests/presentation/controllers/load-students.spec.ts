import { LoadStudentsController } from "../../../src/presentation/controllers";
import { badRequest } from "../../../src/presentation/helpers/http";
import { Validation } from "../../../src/presentation/protocols";

const makeValidationStub = (): Validation => {
	class ValidationStub implements Validation {
		validate(input: any): Error | null {
			return null;
		}
	}
	return new ValidationStub();
};

interface SutTypes {
	sut: LoadStudentsController;
	validationStub: Validation;
}

const makeSut = (): SutTypes => {
	const validationStub = makeValidationStub();
	const sut = new LoadStudentsController(validationStub);
	return {
		sut,
		validationStub
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
});
