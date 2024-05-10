import { StudentModel } from "../../domain/models";
import { LoadStudents } from "../../domain/use-cases";
import { LoadStudentsRepository } from "../protocols";

export class DbLoadStudents implements LoadStudents {
	constructor(private readonly loadStudentsRepository: LoadStudentsRepository) {}

	async load(page: number, limit: number): Promise<StudentModel[]> {
		return await this.loadStudentsRepository.load(page, limit);
	}
}
