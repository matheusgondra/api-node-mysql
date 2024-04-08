import { StudentModel } from "../models";

export interface AddStudent {
	add(data: AddStudent.Params): Promise<AddStudent.Result>;
}

export namespace AddStudent {
	export type Params = Omit<StudentModel, "id">;

	export type Result = StudentModel;
}
