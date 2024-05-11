import { InvalidParamError } from "../presentation/errors";
import { Validation } from "../presentation/protocols";

export class PaginationValidation implements Validation {
	validate(input: any): Error | null {
		const { page, limit } = input;
		if (page) {
			const pageNumber = parseInt(page);
			if (isNaN(pageNumber)) {
				return new InvalidParamError("page");
			}
		}

		return null;
	}
}
