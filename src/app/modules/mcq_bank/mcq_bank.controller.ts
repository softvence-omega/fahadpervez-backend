import catchAsync from "../../utils/catch_async";
import manageResponse from "../../utils/manage_response";
import { mcq_bank_service } from "./mcq_bank.service";

// Upload Bulk MCQ Bank
const upload_bulk_mcq_bank = catchAsync(async (req, res) => {
    const result = await mcq_bank_service.upload_bulk_mcq_bank_into_db(req);
    manageResponse(res, {
        statusCode: 201,
        success: true,
        message: "MCQ bank uploaded successfully",
        data: result,
    });
});

// Get All MCQ Banks
const get_all_mcq_banks = catchAsync(async (req, res) => {
    const result = await mcq_bank_service.get_all_mcq_banks(req);
    manageResponse(res, {
        statusCode: 200,
        success: true,
        message: "All MCQ banks fetched successfully",
        data: result?.data,
        meta: result?.meta,
    });
});

// Get Single MCQ Bank by ID
const get_single_mcq_bank = catchAsync(async (req, res) => {
    const result = await mcq_bank_service.get_single_mcq_bank(req);
    manageResponse(res, {
        statusCode: 200,
        success: true,
        message: "MCQ bank fetched successfully",
        data: result?.data,
        meta: result?.meta,
    });
});

// Delete MCQ Bank by ID
const delete_mcq_bank = catchAsync(async (req, res) => {
    const { id } = req.params;
    const result = await mcq_bank_service.delete_mcq_bank(id);
    manageResponse(res, {
        statusCode: 200,
        success: true,
        message: "MCQ bank deleted successfully",
        data: result,
    });
});

// Update specific question in MCQ Bank by index
const update_specific_question = catchAsync(async (req, res) => {
    const { id, mcqId } = req.params;
    const updatedQuestionData = req.body;
    const result = await mcq_bank_service.update_specific_question(
        id,
        mcqId,
        updatedQuestionData
    );

    manageResponse(res, {
        statusCode: 200,
        success: true,
        message: "Question updated successfully",
        data: result,
    });
});
const save_report_for_mcq = catchAsync(async (req, res) => {
    const result = await mcq_bank_service.save_report_for_mcq_on_db(req);
    manageResponse(res, {
        statusCode: 200,
        success: true,
        message: "Report saved successfully",
        data: result,
    });
});
const save_manual_mcq_upload = catchAsync(async (req, res) => {
    const result = await mcq_bank_service.save_manual_mcq_upload_into_db(req);
    manageResponse(res, {
        statusCode: 200,
        success: true,
        message: "MCQ saved successfully",
        data: result,
    });
});

export const mcq_bank_controller = {
    upload_bulk_mcq_bank,
    get_all_mcq_banks,
    get_single_mcq_bank,
    delete_mcq_bank,
    update_specific_question,
    save_report_for_mcq,
    save_manual_mcq_upload
};
