import { LoadStudentsController } from "../../../src/presentation/controllers";
import { Validation } from "../../../src/presentation/protocols";

describe("LoadStudentsController", () => {
	it("Should call Validation with correct values", async () => {
		class ValidationStub implements Validation {
			validate(input: any): Error | null {
				return null;
			}
		}
		const validationStub = new ValidationStub();
		const sut = new LoadStudentsController(validationStub);
		const validationSpy = jest.spyOn(validationStub, "validate");
		const httpRequest = {
			body: {},
			params: {
				page: 1,
				limit: 6
			}
		};
		await sut.handle(httpRequest);
		expect(validationSpy).toHaveBeenCalledWith(httpRequest.params);
	});
});
