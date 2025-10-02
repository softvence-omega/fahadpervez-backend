import { Router } from "express";
import { dummy_services } from "./dummy.service";

const dummy_route = Router()

dummy_route.get("/clinical-case", dummy_services.get_clinical_case_data)


export default dummy_route;