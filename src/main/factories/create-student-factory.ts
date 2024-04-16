import { DbAddStudent } from "../../data/use-cases";
import { StudentRepository } from "../../infra/db/mysql/repositories/student-repository";
import { CreateStudentController } from "../../presentation/controllers";
import { Controller } from "../../presentation/protocols";
import { RequiredFieldValidation, ValidationComposite } from "../../validation";

export const makeCreateStudentController = (): Controller => {
	const validations = [
		new RequiredFieldValidation("name"),
		new RequiredFieldValidation("cpf"),
		new RequiredFieldValidation("responsible")
	];
	const validation = new ValidationComposite(validations);
	const addStudentRepository = new StudentRepository();
	const addStudent = new DbAddStudent(addStudentRepository);
	return new CreateStudentController(validation, addStudent);
};
