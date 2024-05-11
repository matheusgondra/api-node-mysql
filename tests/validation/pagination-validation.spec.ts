import { PaginationValidation } from "../../src/validation";
import { InvalidParamError } from "../../src/presentation/errors";

const makeSut = (): PaginationValidation => {
	return new PaginationValidation();
};

describe("PaginationValidation", () => {
	it("Should return InvalidParamError if page is not a number", () => {
		const sut = makeSut();
		const error = sut.validate({ page: "invalid_number", limit: 6 });
		expect(error).toEqual(new InvalidParamError("page"));
	});

	it("Should return InvalidParamError if page is less than 1", () => {
		const sut = makeSut();
		const error = sut.validate({ page: 0, limit: 6 });
		expect(error).toEqual(new InvalidParamError("page"));
	});

	it("Should return InvalidParamError if limit is not a number", () => {
		const sut = makeSut();
		const error = sut.validate({ page: 1, limit: "invalid_number" });
		expect(error).toEqual(new InvalidParamError("limit"));
	});

	it("Should return InvalidParamError if limit is less than 1", () => {
		const sut = makeSut();
		const error = sut.validate({ page: 1, limit: 0 });
		expect(error).toEqual(new InvalidParamError("limit"));
	});
});
