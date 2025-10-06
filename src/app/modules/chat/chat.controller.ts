import catchAsync from "../../utils/catch_async"
import manageResponse from "../../utils/manage_response"
import { chat_services } from "./chat.service"

const create_new_clinical_case = catchAsync(async (req, res) => {
    const result = await chat_services.save_chat_into_db(req)
    manageResponse(res, {
        statusCode: 201,
        message: "Chat saved!",
        success: true,
        data: result
    })
})

export const chat_controllers = {
    create_new_clinical_case
}