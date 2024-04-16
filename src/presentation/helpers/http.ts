import { ServerError } from "../errors";
import { HttpResponse } from "../protocols";

export const badRequest = (error: Error): HttpResponse => ({
	statusCode: 400,
	body: error
});

export const serverError = (error: Error): HttpResponse => ({
	statusCode: 500,
	body: new ServerError(error.stack)
});

export const created = (data: any): HttpResponse => ({
	statusCode: 201,
	body: data
});
