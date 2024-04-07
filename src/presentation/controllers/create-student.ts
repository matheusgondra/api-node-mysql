import { Controller, HttpRequest, HttpResponse, Validation } from "../protocols";

export class CreateStudentController implements Controller {
	constructor(private readonly validation: Validation) {}

	async handle(httpRequest: HttpRequest): Promise<HttpResponse> {
		this.validation.validate(httpRequest.body);
		return {
			statusCode: 201,
			body: null
		};
	}
}
