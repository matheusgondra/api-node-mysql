import { AddStudent } from "../../../src/domain/use-cases/add-student";
import { CreateStudentController } from "../../../src/presentation/controllers/create-student";
import { badRequest, serverError } from "../../../src/presentation/helpers/http";
import { HttpRequest, Validation } from "../../../src/presentation/protocols";

const makeValidationStub = (): Validation => {
	class ValidationStub implements Validation {
		validate(input: any): Error | null {
			return null;
		}
	}
	return new ValidationStub();
};

const makeAddStudentStub = (): AddStudent => {
	class AddStudentStub implements AddStudent {
		async add(data: AddStudent.Params): Promise<AddStudent.Result> {
			return {
				id: 1,
				name: "any_name",
				cpf: "any_cpf",
				responsible: "any_responsible"
			};
		}
	}
	return new AddStudentStub();
};

interface SutTypes {
	sut: CreateStudentController;
	validationStub: Validation;
	addStudentStub: AddStudent;
}

const makeSut = (): SutTypes => {
	const validationStub = makeValidationStub();
	const addStudentStub = makeAddStudentStub();
	const sut = new CreateStudentController(validationStub, addStudentStub);
	return {
		sut,
		validationStub,
		addStudentStub
	};
};

const makeFakeRequest = (): HttpRequest => ({
	body: {
		name: "any_name",
		cpf: "any_cpf",
		responsible: "any_responsible"
	}
});

describe("CreateStudentController", () => {
	it("Should call Validation with correct values", async () => {
		const { sut, validationStub } = makeSut();
		const validationSpy = jest.spyOn(validationStub, "validate");
		await sut.handle(makeFakeRequest());
		expect(validationSpy).toHaveBeenCalledWith(makeFakeRequest().body);
	});

	it("Should return 400 if Validation returns an error", async () => {
		const { sut, validationStub } = makeSut();
		jest.spyOn(validationStub, "validate").mockReturnValueOnce(new Error());
		const httpResponse = await sut.handle(makeFakeRequest());
		expect(httpResponse).toEqual(badRequest(new Error()));
	});

	it("Should call AddStudent with correct values", async () => {
		const { sut, addStudentStub } = makeSut();
		const addSpy = jest.spyOn(addStudentStub, "add");
		await sut.handle(makeFakeRequest());
		expect(addSpy).toHaveBeenCalledWith(makeFakeRequest().body);
	});

	it("Should return 500 if AddStudent throws", async () => {
		const { sut, addStudentStub } = makeSut();
		jest.spyOn(addStudentStub, "add").mockRejectedValueOnce(new Error());
		const httpResponse = await sut.handle(makeFakeRequest());
		expect(httpResponse).toEqual(serverError(new Error()));
	});
});
