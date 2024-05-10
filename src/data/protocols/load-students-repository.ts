import { StudentModel } from "../../domain/models";

export interface LoadStudentsRepository {
	load(page: number, limit: number): Promise<LoadStudentsRepository.Result>;
}

export namespace LoadStudentsRepository {
	export type Result = StudentModel[];
}
