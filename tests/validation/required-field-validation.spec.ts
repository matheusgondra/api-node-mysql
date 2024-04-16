import { MissingParamError } from "../../src/presentation/errors";
import { RequiredFieldValidation } from "../../src/validation/required-field-validation";

describe("RequiredFieldValidation", () => {
	it("Should return a MissingParamError if validation fails", () => {
		const sut = new RequiredFieldValidation("field");
		const error = sut.validate({ name: "any_name" });
		expect(error).toEqual(new MissingParamError("field"));
	});
});
