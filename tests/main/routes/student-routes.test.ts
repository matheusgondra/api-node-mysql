import request from "supertest";
import app from "../../../src/main/config/app";
import { MySQLHelper } from "../../../src/infra/db/mysql/helpers/mysql-helper";

describe("Student Routes", () => {
	beforeAll(async () => {
		await MySQLHelper.connect();
	});

	afterAll(async () => {
		await MySQLHelper.disconnect();
	});

	it("Should return 201 on create student", async () => {
		await request(app)
			.post("/students")
			.send({
				name: "any_name",
				cpf: "any_cpf",
				responsible: "any_responsible"
			})
			.expect(201);
	});
});
