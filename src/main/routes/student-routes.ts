import { Router } from "express";
import { makeCreateStudentController, makeLoadStudentsController } from "../factories";
import { adaptRoute } from "../adapters";

export default (router: Router): void => {
	router.post("/students", adaptRoute(makeCreateStudentController()));
	router.get("/students", adaptRoute(makeLoadStudentsController()));
};
