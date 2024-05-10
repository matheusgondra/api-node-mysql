import { LoadStudents } from "../../domain/use-cases";
import { badRequest, ok, serverError } from "../helpers/http";
import { Controller, HttpRequest, HttpResponse, Validation } from "../protocols";

export class LoadStudentsController implements Controller {
	constructor(
		private readonly validation: Validation,
		private readonly loadStudents: LoadStudents
	) {}

	async handle(httpRequest: HttpRequest): Promise<HttpResponse> {
		try {
			const error = this.validation.validate(httpRequest.params);
			if (error) {
				return badRequest(error);
			}

			const { page, limit } = httpRequest.params;
			const students = await this.loadStudents.load(parseInt(page), parseInt(limit));

			return ok(students);
		} catch (error) {
			return serverError(error as Error);
		}
	}
}
