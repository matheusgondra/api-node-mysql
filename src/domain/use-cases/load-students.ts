import { StudentModel } from "../models";

export interface LoadStudents {
	load(page: number, limit: number): Promise<StudentModel[]>;
}
