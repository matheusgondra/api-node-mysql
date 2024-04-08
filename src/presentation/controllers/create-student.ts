import { AddStudent } from "../../domain/use-cases/add-student";
import { badRequest, created, serverError } from "../helpers/http";
import { Controller, HttpRequest, HttpResponse, Validation } from "../protocols";

export class CreateStudentController implements Controller {
	constructor(
		private readonly validation: Validation,
		private readonly addStudent: AddStudent
	) {}

	async handle(httpRequest: HttpRequest): Promise<HttpResponse> {
		try {
			const error = this.validation.validate(httpRequest.body);
			if (error) {
				return badRequest(error);
			}

			const student = await this.addStudent.add(httpRequest.body);

			return created(student);
		} catch (error) {
			return serverError(error as Error);
		}
	}
}
