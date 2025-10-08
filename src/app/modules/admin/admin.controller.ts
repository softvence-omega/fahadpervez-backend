import catchAsync from "../../utils/catch_async";
import manageResponse from "../../utils/manage_response";
import { admin_services } from "./admin.service";

const get_all_overview_data = catchAsync(async (req, res) => {
    const result = await admin_services.get_all_overview_data_from_db_fro_admin(req);
    manageResponse(res, {
        statusCode: 200,
        success: true,
        message: "Data fetched successfully",
        data: result,
    });
});
const get_all_student = catchAsync(async (req, res) => {
    const result = await admin_services.get_all_student_from_db_form_admin(req);
    manageResponse(res, {
        statusCode: 200,
        success: true,
        message: "Data fetched successfully",
        data: result?.data,
        meta: result?.meta
    });
});
const get_single_student = catchAsync(async (req, res) => {
    const result = await admin_services.get_single_student_from_db_form_admin(req?.params?.studentId as string);
    manageResponse(res, {
        statusCode: 200,
        success: true,
        message: "Data fetched successfully",
        data: result
    });
});
const delete_student = catchAsync(async (req, res) => {
    const result = await admin_services.delete_student_from_db_form_admin(req?.params?.studentId as string);
    manageResponse(res, {
        statusCode: 200,
        success: true,
        message: "Data fetched successfully",
        data: result
    });
});

export const admin_controller = {
    get_all_overview_data,
    get_all_student,
    get_single_student,
    delete_student
};