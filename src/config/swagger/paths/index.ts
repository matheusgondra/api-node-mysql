import { OpenAPIV3 } from "openapi-types";
import { alunosPaths } from "./alunos.js";

export const paths: OpenAPIV3.PathsObject = {
  ...alunosPaths.reduce((acc, path) => ({ ...acc, ...path }), {})
}