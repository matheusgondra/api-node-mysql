import { badRequest } from "../helpers/http";
import { Controller, HttpRequest, HttpResponse, Validation } from "../protocols";

export class LoadStudentsController implements Controller {
	constructor(private readonly validation: Validation) {}

	async handle(httpRequest: HttpRequest): Promise<HttpResponse> {
		const error = this.validation.validate(httpRequest.params);
		if (error) {
			return badRequest(error);
		}

		return {
			statusCode: 200,
			body: {}
		};
	}
}
