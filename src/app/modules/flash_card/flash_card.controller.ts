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

const get_all_flash_card_in_db = catchAsync(async (req, res) => {
  const result = await flash_card_services.get_all_flash_card_in_db();
  manageResponse(res, {
    statusCode: 200,
    message: "flash card post fetched success!",
    success: true,
    data: result,
  });
});

const get_single_flash_card_in_db = catchAsync(async (req, res) => {
  const { id } = req?.params;
  const result = await flash_card_services.get_single_flash_card_in_db(id);
  manageResponse(res, {
    statusCode: 200,
    message: "flash card post fetched success!",
    success: true,
    data: result,
  });
});

const update_flash_card_in_db = catchAsync(async (req, res) => {
  const { id } = req?.params;
  const result = await flash_card_services.update_flash_card_in_db(req, id);
  manageResponse(res, {
    statusCode: 200,
    message: "flash card post updated success!",
    success: true,
    data: result,
  });
});

const delete_flash_card_in_db = catchAsync(async (req, res) => {
  const { id } = req?.params;
  const result = await flash_card_services.delete_flash_card_in_db(id);
  manageResponse(res, {
    statusCode: 200,
    message: "flash card post deleted success!",
    success: true,
    data: result,
  });
});

export const flash_card_controller = {
  create_flash_card_post,
  get_all_flash_card_in_db,
  get_single_flash_card_in_db,
  update_flash_card_in_db,
  delete_flash_card_in_db,
};
