import { LoadStudents } from "../../domain/use-cases";
import { badRequest, noContent, ok, serverError } from "../helpers/http";
import { Controller, HttpRequest, HttpResponse, Validation } from "../protocols";

export class LoadStudentsController implements Controller {
	constructor(
		private readonly validation: Validation,
		private readonly loadStudents: LoadStudents
	) {}

	async handle(httpRequest: HttpRequest): Promise<HttpResponse> {
		try {
			const error = this.validation.validate(httpRequest.query);
			if (error) {
				return badRequest(error);
			}

			const page = httpRequest.query.page ? parseInt(httpRequest.query.page) : 1;
			const limit = httpRequest.query.limit ? parseInt(httpRequest.query.limit) : 6;
			const students = await this.loadStudents.load(page, limit);
			return students.length ? ok(students) : noContent();
		} catch (error) {
			return serverError(error as Error);
		}
	}
}
