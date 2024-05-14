import { MySQLHelper } from "../../infra/db/mysql/helpers/mysql-helper";
import { Controller, HttpRequest, HttpResponse } from "../../presentation/protocols";

export class TransactionDecorator implements Controller {
	constructor(private readonly controller: Controller) {}

	async handle(httpRequest: HttpRequest): Promise<HttpResponse> {
		const connection = await MySQLHelper.getConnection();

		await connection.beginTransaction();

		const httpResponse = await this.controller.handle(httpRequest);

		if (httpResponse.statusCode >= 400) {
			await connection.rollback();
		}

		await connection.commit();
		return httpResponse;
	}
}
