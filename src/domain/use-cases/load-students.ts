import { StudentModel } from "../models";

export interface LoadStudents {
	load(page: number, limit: number): Promise<LoadStudents.Result>;
}

export namespace LoadStudents {
	export type Result = StudentModel[];
}
