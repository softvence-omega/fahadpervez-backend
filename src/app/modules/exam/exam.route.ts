import { Router } from "express";
import auth from "../../middlewares/auth";
import RequestValidator from "../../middlewares/request_validator";
import { exam_controller } from "./exam.controller";
import { exam_validations } from "./exam.validation";

const exam_router = Router();

exam_router.post(
  "/create",
  auth("ADMIN"),
  RequestValidator(exam_validations.create),
  exam_controller.create_new_exam
);
exam_router.get("/all", auth("ADMIN"), exam_controller.get_all_exams);
exam_router.patch("/update/:examId", auth("ADMIN"), RequestValidator(exam_validations.create), exam_controller.update_exam);
exam_router.delete("/delete/:examId", auth("ADMIN"), exam_controller.delete_exam);

export default exam_router;
