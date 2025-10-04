import catchAsync from "../../utils/catch_async";
import manageResponse from "../../utils/manage_response";
import { flash_card_services } from "./flash_card.service";


const create_flash_card_post = catchAsync(async (req, res) => {
    const result = await flash_card_services.create_new_flash_card_in_db(req);
    manageResponse(res, {
        statusCode: 201,
        message: "flash card post created success!",
        success: true,
        data: result
    })
})



export const flash_card_controller = {
    create_flash_card_post
}