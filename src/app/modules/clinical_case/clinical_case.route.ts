import { Router } from "express";
import auth from "../../middlewares/auth";
import RequestValidator from "../../middlewares/request_validator";
import { clinical_case_validation } from "./clinical_case.validation";
import { clinical_case_controllers } from "./clinical_case.controller";

const clinical_route = Router();

clinical_route.post("/create-new", auth("ADMIN", "MENTOR"), RequestValidator(clinical_case_validation.create), clinical_case_controllers.create_new_clinical_case)


export default clinical_route;