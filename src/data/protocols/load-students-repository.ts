import { StudentModel } from "../../domain/models";

export interface LoadStudentsRepository {
	load(page: number, limit: number): Promise<StudentModel[]>;
}
