import { Request } from "express";
import uploadCloud from "../../utils/cloudinary";
import { isAccountExist } from "../../utils/isAccountExist";
import { TFlashCard } from "./flash_card.interface";
import { FlashcardModel } from "./flash_card.schema";
// ------------create new flash card ------------
const create_new_flash_card_in_db = async (req: Request) => {
  const user = req?.user;
  const isUserExist = await isAccountExist(user?.email as string);
  const payload: TFlashCard = req?.body;
  payload.postedBy = isUserExist.profile_id;
  if (req?.file) {
    const cloudRes = await uploadCloud(req?.file);
    payload.uploadMedia = cloudRes?.secure_url;
  }
  const result = await FlashcardModel.create(payload);
  return result;
};
// ------------get all flash cards ------------
const get_all_flash_card_in_db = async () => {
  const result = await FlashcardModel.find({ isDeleted: false });
  return result;
};
// ------------get single flash card ------------
const get_single_flash_card_in_db = async (id: string) => {
  const result = await FlashcardModel.findOne({
    _id: id,
    isDeleted: false,
  });
  return result;
};
//   ------------update flash card ------------ 
const update_flash_card_in_db = async (req: Request, id: string) => {
  const payload: Partial<TFlashCard> = req?.body;
  if (req?.file) {
    const cloudRes = await uploadCloud(req?.file);
    payload.uploadMedia = cloudRes?.secure_url;
  }
  const result = await FlashcardModel.findOneAndUpdate(
    { _id: id, isDeleted: false },
    payload,
    { new: true }
  );
  return result;
};
// ------------delete flash card ------------
const delete_flash_card_in_db = async (id: string) => {
  const result = await FlashcardModel.findOneAndUpdate(
    { _id: id, isDeleted: false },
    { isDeleted: true },
    { new: true }
  );
  return result;
};

export const flash_card_services = {
  create_new_flash_card_in_db,
  get_all_flash_card_in_db,
  get_single_flash_card_in_db,
  update_flash_card_in_db,
  delete_flash_card_in_db,
};
