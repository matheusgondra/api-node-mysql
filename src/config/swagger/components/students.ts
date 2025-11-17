import { OpenAPIV3 } from "openapi-types";
import { Refs } from "../refs.js";

export const StudentsSchema: OpenAPIV3.SchemaObject = {
  type: "array",
  items: Refs.student
}