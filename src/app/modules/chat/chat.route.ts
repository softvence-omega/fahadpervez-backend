import { Router } from "express";
import auth from "../../middlewares/auth";
import RequestValidator from "../../middlewares/request_validator";
import { chat_controllers } from "./chat.controller";
import { chat_validation } from "./chat.validation";
const chatRouter = Router();

chatRouter.post('/save-chat', auth("ADMIN", "MENTOR", "STUDENT", "PROFESSIONAL"), RequestValidator(chat_validation.create), chat_controllers.save_chat)
chatRouter.get('/get-all', auth("ADMIN", "MENTOR", "STUDENT", "PROFESSIONAL"), chat_controllers.get_all_chat)
chatRouter.get('/get-by-sessionId/:id', auth("ADMIN", "MENTOR", "STUDENT", "PROFESSIONAL"), chat_controllers.get_chat_by_sessionId_chat)



export default chatRouter