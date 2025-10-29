import httpStatus from "http-status";
import catchAsync from "../../utils/catch_async";
import manageResponse from "../../utils/manage_response";
import { exam_service } from "./exam.service";

const create_new_exam = catchAsync(async (req, res) => {
  const result = await exam_service.create_new_exam_into_db(req);
  manageResponse(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: "New exam created successfully!",
    data: result,
  });
});
const get_all_exams = catchAsync(async (req, res) => {
  const result = await exam_service.get_all_exams_from_db();
  manageResponse(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: "Exams fetched successfully!",
    data: result,
  });
});
const update_exam = catchAsync(async (req, res) => {
  const result = await exam_service.update_exam_into_db(req);
  manageResponse(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: "Exams update successfully!",
    data: result,
  });
});
const delete_exam = catchAsync(async (req, res) => {
  const result = await exam_service.delete_exam_from_db(req);
  manageResponse(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: "Exams delete successfully!",
    data: result,
  });
});

export const exam_controller = {
  create_new_exam,
  get_all_exams,
  update_exam,
  delete_exam
};
