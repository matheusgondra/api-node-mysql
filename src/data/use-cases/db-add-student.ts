import { AddStudent } from "../../domain/use-cases";
import { AddStudentRepository } from "../protocols";

export class DbAddStudent implements AddStudent {
	constructor(private readonly addStudentRepository: AddStudentRepository) {}

	async add(data: AddStudent.Params): Promise<AddStudent.Result> {
		return await this.addStudentRepository.add(data);
	}
}
