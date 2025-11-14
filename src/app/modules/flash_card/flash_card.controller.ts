import catchAsync from "../../utils/catch_async";
import manageResponse from "../../utils/manage_response";
import { flash_card_services } from "./flash_card.service";

const create_flash_card_post = catchAsync(async (req, res) => {
  const result = await flash_card_services.create_new_flash_card_in_db(req);
  manageResponse(res, {
    statusCode: 201,
    message: "flash card post created success!",
    success: true,
    data: result,
  });
});
const get_all_flash_cards = catchAsync(async (req, res) => {
  const result = await flash_card_services.get_all_flash_cards_from_db(req);
  manageResponse(res, {
    statusCode: 200,
    message: "Flash card fetch  success!",
    success: true,
    data: result?.data,
    meta: result?.meta
  });
});



export const flash_card_controller = {
  create_flash_card_post,
  get_all_flash_cards

};
