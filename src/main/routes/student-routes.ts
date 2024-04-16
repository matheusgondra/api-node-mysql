import { Router } from "express";
import { makeCreateStudentController } from "../factories";
import { adaptRoute } from "../adapters";

export default (router: Router): void => {
	router.post("/students", adaptRoute(makeCreateStudentController()));
};
