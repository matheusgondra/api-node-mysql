import { Controller, HttpRequest, HttpResponse } from "../../presentation/protocols";

export class PaginationDecorator implements Controller {
	constructor(private readonly controller: Controller) {}

	async handle(httpRequest: HttpRequest): Promise<HttpResponse> {
		const page = httpRequest.query.page ? parseInt(httpRequest.query.page) : 1;
		const httpResponse = await this.controller.handle(httpRequest);
		if (httpResponse.statusCode === 200) {
			const decoratedResponse: HttpResponse = {
				body: {
					page,
					data: [...httpResponse.body]
				},
				statusCode: httpResponse.statusCode
			};
			return decoratedResponse;
		}

		return httpResponse;
	}
}
