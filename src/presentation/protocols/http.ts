export interface HttpRequest {
	body?: any;
	query?: any;
}

export interface HttpResponse {
	statusCode: number;
	body: any;
}
