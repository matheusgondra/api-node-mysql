import { OpenAPIV3 } from "openapi-types";

export const StudentSchema: OpenAPIV3.SchemaObject = {
  type: "object",
  properties: {
    matricula: {
      type: "integer",
      example: 12345,
    },
    nome: {
      type: "string",
      example: "João Silva"
    },
    cpf: {
      type: "string",
      example: "12345678900"
    },
    responsavel: {
      type: "string",
      example: "Maria Silva"
    }
  },
  required: ["matricula", "nome", "cpf", "responsavel"]
}