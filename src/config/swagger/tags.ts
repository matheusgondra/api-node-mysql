import { OpenAPIV3 } from "openapi-types";

export enum Tags {
  STUDENTS = "Alunos"
}

export const tags: OpenAPIV3.TagObject[] = [
  {
    name: Tags.STUDENTS,
    description: "Operações relacionadas aos alunos"
  }
]