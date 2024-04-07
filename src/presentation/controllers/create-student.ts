import { badRequest } from "../helpers/http";
import { Controller, HttpRequest, HttpResponse, Validation } from "../protocols";

export class CreateStudentController implements Controller {
	constructor(private readonly validation: Validation) {}

	async handle(httpRequest: HttpRequest): Promise<HttpResponse> {
		const error = this.validation.validate(httpRequest.body);
		if (error) {
			return badRequest(error);
		}
		return {
			statusCode: 201,
			body: null
		};
	}
}
