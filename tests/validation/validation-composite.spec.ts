import { Validation } from "../../src/presentation/protocols";
import { ValidationComposite } from "../../src/validation";

const mekeValidationStub = (): Validation => {
	class ValidationStub implements Validation {
		validate(input: any): Error | null {
			return null;
		}
	}
	return new ValidationStub();
};

const makeSut = (): ValidationComposite => {
	const validationStubs = [mekeValidationStub(), mekeValidationStub()];
	const sut = new ValidationComposite(validationStubs);
	return sut;
};

describe("ValidationComposite", () => {
	it("Should return null if validation succeeds", () => {
		const sut = makeSut();
		const error = sut.validate({ name: "any_name" });
		expect(error).toBeNull();
	});
});
