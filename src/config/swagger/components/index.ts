import { OpenAPIV3 } from "openapi-types";
import { StudentSchema } from "./student.js";
import { StudentsSchema } from "./students.js";

export const components: OpenAPIV3.ComponentsObject = {
  schemas: {
    Aluno: StudentSchema,
    Alunos: StudentsSchema
  }
}