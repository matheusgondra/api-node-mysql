import request from "supertest";
import app from "../../../src/main/config/app";
import { MySQLHelper } from "../../../src/infra/db/mysql/helpers/mysql-helper";

describe("Student Routes", () => {
	beforeAll(async () => {
		await MySQLHelper.connect();
	});

	beforeEach(async () => {
		await MySQLHelper.clearStudents();
	});

	afterAll(async () => {
		await MySQLHelper.disconnect();
	});

	describe("POST /students", () => {
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

	describe("GET /students", () => {
		it("Should return 200 on load students", async () => {
			await request(app).post("/students").send({
				name: "any_name",
				cpf: "any_cpf",
				responsible: "any_responsible"
			});
			await request(app).get("/students").expect(200);
		});

		it("Should return 3 students on load students", async () => {
			for (let i = 0; i <= 3; i++) {
				await request(app).post("/students").send({
					name: "any_name",
					cpf: "any_cpf",
					responsible: "any_responsible"
				});
			}

			const students = await request(app).get("/students").query({ page: 1, limit: 3 });
			expect(students.body.length).toBe(3);
		});

		it("Should return 204 if no content", async () => {
			await request(app).get("/students").expect(204);
		});
	});
});
