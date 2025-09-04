import catchAsync from "../../utils/catch_async"
import manageResponse from "../../utils/manage_response"
import { dummyClinicalCase } from "./dummy.data"

const get_clinical_case_data = catchAsync(async (req, res) => {
    manageResponse(res, {
        success: true,
        message: "We will provide only topic name , and then give me this type of data",
        data: dummyClinicalCase,
        statusCode: 200
    })
})

export const dummy_services = {
    get_clinical_case_data
}
