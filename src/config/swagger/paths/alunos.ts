import { OpenAPIV3 } from "openapi-types";
import { Tags } from "../tags.js";
import { Refs } from "../refs.js";

const idParameter: OpenAPIV3.ParameterObject = {
  name: "id",
  in: "path",
  required: true,
  schema: {
    type: "integer"
  }
};

export const alunosPaths: OpenAPIV3.PathsObject[] = [
  {
    "/alunos": {
      get: {
        tags: [Tags.STUDENTS],
        summary: "Obter todos os alunos",
        responses: {
          "200": {
            description: "Lista de alunos obtida com sucesso",
            content: {
              "application/json": {
                schema: Refs.student
              }
            }
          }
        }
      },
      post: {
        tags: [Tags.STUDENTS],
        summary: "Criar um novo aluno",
        requestBody: {
          required: true,
          content: {
            "application/json": {
              schema: Refs.student
            }
          }
        },
        responses: {
          "201": {
            description: "Aluno criado com sucesso",
            content: {
              "application/json": {
                schema: {
                  type: "object",
                  properties: {
                    message: {
                      type: "string",
                      example: "Aluno criado com sucesso!"
                    }
                  }
                }
              }
            }
          }
        }
      }
    }
  },
  {
    "/alunos/{id}": {
      get: {
        tags: [Tags.STUDENTS],
        summary: "Obter um aluno por ID",
        parameters: [idParameter],
        responses: {
          "200": {
            description: "Aluno obtido com sucesso",
            content: {
              "application/json": {
                schema: Refs.students
              }
            }
          }
        }
      },
      put: {
        tags: [Tags.STUDENTS],
        summary: "Atualizar um aluno por ID",
        parameters: [idParameter],
        requestBody: {
          required: true,
          content: {
            "application/json": {
              schema: Refs.student
            }
          }
        },
        responses: {
          "200": {
            description: "Aluno atualizado com sucesso",
            content: {
              "application/json": {
                schema: {
                  type: "object",
                  properties: {
                    message: {
                      type: "string",
                      example: "Dados Alterados com sucesso!"
                    }
                  }
                }
              }
            }
          }
        }
      },
      delete: {
        tags: [Tags.STUDENTS],
        summary: "Deletar um aluno por ID",
        parameters: [idParameter],
        responses: {
          "200": {
            description: "Aluno deletado com sucesso",
            content: {
              "application/json": {
                schema: {
                  type: "object",
                  properties: {
                    message: {
                      type: "string",
                      example: "Deletado com sucesso!"
                    }
                  }
                }
              }
            }
          }
        }
      }
    }
  }
];