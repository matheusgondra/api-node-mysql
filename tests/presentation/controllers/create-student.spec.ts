import { CreateStudentController } from "../../../src/presentation/controllers/create-student";
import { Validation } from "../../../src/presentation/protocols";

describe("CreateStudentController", () => {
	it("Should call Validation with correct values", async () => {
		class ValidationStub implements Validation {
			validate(input: any): Error | null {
				return null;
			}
		}
		const validationStub = new ValidationStub();
		const sut = new CreateStudentController(validationStub);
		const validationSpy = jest.spyOn(validationStub, "validate");
		const httpRequest = {
			body: {
				name: "any_name",
				cpf: "any_cpf",
				responsible: "any_responsible"
			}
		};
		await sut.handle(httpRequest);
		expect(validationSpy).toHaveBeenCalledWith(httpRequest.body);
	});
});
