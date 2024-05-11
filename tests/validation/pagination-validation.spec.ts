import { PaginationValidation } from "../../src/validation";
import { InvalidParamError } from "../../src/presentation/errors";

describe("PaginationValidation", () => {
	it("Should return InvalidParamError if page is not a number", () => {
		const sut = new PaginationValidation();
		const error = sut.validate({ page: "invalid_number", limit: 6 });
		expect(error).toEqual(new InvalidParamError("page"));
	});
});
