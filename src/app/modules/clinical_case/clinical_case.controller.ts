import catchAsync from "../../utils/catch_async";
import manageResponse from "../../utils/manage_response";
import { clinical_case_services } from "./clinical_case.service";

const create_new_clinical_case = catchAsync(async (req, res) => {
    const result = await clinical_case_services.create_new_clinical_case_and_save_on_db(req)
    manageResponse(res, {
        statusCode: 201,
        message: "Clinical case created!",
        success: true,
        data: result
    })
})


export const clinical_case_controllers = {
    create_new_clinical_case
}