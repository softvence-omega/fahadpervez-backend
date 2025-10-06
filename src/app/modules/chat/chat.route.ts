import { Router } from "express";
import auth from "../../middlewares/auth";
import RequestValidator from "../../middlewares/request_validator";
import { chat_controllers } from "./chat.controller";
import { chat_validation } from "./chat.validation";
const chatRouter = Router();

chatRouter.post('/save-chat', auth("ADMIN", "MENTOR", "STUDENT", "PROFESSIONAL"), RequestValidator(chat_validation.create), chat_controllers.create_new_clinical_case)



export default chatRouter