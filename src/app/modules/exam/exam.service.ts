import { Request } from "express";
import { AppError } from "../../utils/app_error";
import { exam_model } from "./exam.schema";

const create_new_exam_into_db = async (req: Request) => {
  const isExamExist = await exam_model.findOne({ examName: req?.body?.examName });
  if (isExamExist) {
    throw new AppError("This exam is already exist", 403);
  }
  const result = await exam_model.create(req?.body);
  return result;
};
const get_all_exams_from_db = async () => {
  const result = await exam_model.find().lean();
  return result;
}
const update_exam_into_db = async (req: Request) => {
  const { examId } = req?.params;
  const payload = req?.body;
  const isExamExist = await exam_model.findById(examId);
  if (!isExamExist) {
    throw new AppError("Exam not found", 400);
  }
  if (isExamExist?.examName == payload?.examName) {
    throw new AppError("This exam is already exist", 403);
  }
  const result = await exam_model.findByIdAndUpdate(examId, payload, { new: true });
  return result
}
const delete_exam_from_db = async (req: Request) => {
  const { examId } = req?.params;
  const result = await exam_model.findByIdAndDelete(examId);
  return result
}

export const exam_service = {
  create_new_exam_into_db,
  get_all_exams_from_db,
  update_exam_into_db,
  delete_exam_from_db
};
