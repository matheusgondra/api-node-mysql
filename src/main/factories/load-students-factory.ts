import { DbLoadStudents } from "../../data/use-cases";
import { StudentRepository } from "../../infra/db/mysql/repositories/student-repository";
import { LoadStudentsController } from "../../presentation/controllers";
import { Controller, Validation } from "../../presentation/protocols";
import { PaginationValidation, ValidationComposite } from "../../validation";
import { PaginationDecorator } from "../decorators";

export const makeLoadStudentsController = (): Controller => {
	const loadStudentsRepository = new StudentRepository();
	const loadStudents = new DbLoadStudents(loadStudentsRepository);
	const validations: Validation[] = [new PaginationValidation()];
	const validation = new ValidationComposite(validations);
	const loadStudentsController = new LoadStudentsController(validation, loadStudents);
	return new PaginationDecorator(loadStudentsController);
};
