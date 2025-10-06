import catchAsync from "../../utils/catch_async"
import manageResponse from "../../utils/manage_response"
import { chat_services } from "./chat.service"

const save_chat = catchAsync(async (req, res) => {
    const result = await chat_services.save_chat_into_db(req)
    manageResponse(res, {
        statusCode: 201,
        message: "Chat saved!",
        success: true,
        data: result
    })
})
const get_all_chat = catchAsync(async (req, res) => {
    const result = await chat_services.get_all_chat_from_db(req)
    manageResponse(res, {
        statusCode: 200,
        message: "Chat fetched saved!",
        success: true,
        data: result?.data,
        meta: result?.pagination
    })
})
const get_chat_by_sessionId_chat = catchAsync(async (req, res) => {
    const result = await chat_services.get_chat_by_sessionId_chat_id_from_db(req)
    manageResponse(res, {
        statusCode: 200,
        message: "Chat fetched saved!",
        success: true,
        data: result
    })
})

export const chat_controllers = {
    save_chat,
    get_all_chat,
    get_chat_by_sessionId_chat
}