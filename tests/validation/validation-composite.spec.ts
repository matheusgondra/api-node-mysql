import { Validation } from "../../src/presentation/protocols";
import { ValidationComposite } from "../../src/validation";

describe("ValidationComposite", () => {
	it("Should return null if validation succeeds", () => {
		class ValidationStub implements Validation {
			validate(input: any): Error | null {
				return null;
			}
		}
		const validations: Validation[] = [new ValidationStub()];
		const sut = new ValidationComposite(validations);
		const error = sut.validate({ name: "any_name" });
		expect(error).toBeNull();
	});
});
