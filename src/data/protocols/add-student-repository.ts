import { StudentModel } from "../../domain/models/student";

export interface AddStudentRepository {
	add(studentData: AddStudentRepository.Params): Promise<AddStudentRepository.Result>;
}

export namespace AddStudentRepository {
	export type Params = Omit<StudentModel, "id">;

	export type Result = StudentModel;
}
