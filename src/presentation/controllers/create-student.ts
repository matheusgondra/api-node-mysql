import { AddStudent } from "../../domain/use-cases/add-student";
import { badRequest } from "../helpers/http";
import { Controller, HttpRequest, HttpResponse, Validation } from "../protocols";

export class CreateStudentController implements Controller {
	constructor(
		private readonly validation: Validation,
		private readonly addStudent: AddStudent
	) {}

	async handle(httpRequest: HttpRequest): Promise<HttpResponse> {
		const error = this.validation.validate(httpRequest.body);
		if (error) {
			return badRequest(error);
		}

		this.addStudent.add(httpRequest.body);

		return {
			statusCode: 201,
			body: null
		};
	}
}
