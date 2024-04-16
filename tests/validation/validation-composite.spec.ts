import { Validation } from "../../src/presentation/protocols";
import { ValidationComposite } from "../../src/validation";

const makeValidationStub = (): Validation => {
	class ValidationStub implements Validation {
		validate(input: any): Error | null {
			return null;
		}
	}
	return new ValidationStub();
};

interface SutTypes {
	sut: ValidationComposite;
	validationsStub: Validation[];
}

const makeSut = (): SutTypes => {
	const validationsStub = [makeValidationStub(), makeValidationStub()];
	const sut = new ValidationComposite(validationsStub);
	return {
		sut,
		validationsStub
	};
};

describe("ValidationComposite", () => {
	it("Should return null if validation succeeds", () => {
		const { sut } = makeSut();
		const error = sut.validate({ name: "any_name" });
		expect(error).toBeNull();
	});

	it("Should return an error if validation fails", () => {
		const { sut, validationsStub } = makeSut();
		jest.spyOn(validationsStub[0], "validate").mockReturnValueOnce(new Error());
		const error = sut.validate({ name: "any_name" });
		expect(error).toEqual(new Error());
	});
});
