import { LoadStudents } from "../../domain/use-cases";
import { badRequest } from "../helpers/http";
import { Controller, HttpRequest, HttpResponse, Validation } from "../protocols";

export class LoadStudentsController implements Controller {
	constructor(
		private readonly validation: Validation,
		private readonly loadStudents: LoadStudents
	) {}

	async handle(httpRequest: HttpRequest): Promise<HttpResponse> {
		const error = this.validation.validate(httpRequest.params);
		if (error) {
			return badRequest(error);
		}

		const { page, limit } = httpRequest.params;
		await this.loadStudents.load(parseInt(page), parseInt(limit));

		return {
			statusCode: 200,
			body: {}
		};
	}
}
