import { Request } from "express";
import { isAccountExist } from "../../utils/isAccountExist";
import { TFlashCard } from "./flash_card.interface";
import uploadCloud from "../../utils/cloudinary";
import { FlashcardModel } from "./flash_card.schema";


const create_new_flash_card_in_db = async (req: Request) => {
    const user = req?.user;
    const isUserExist = await isAccountExist(user?.email as string);
    const payload: TFlashCard = req?.body;
    payload.postedBy = isUserExist.profile_id;
 
    if (req?.file) {
        const cloudRes = await uploadCloud(req?.file)
        payload.uploadMedia = cloudRes?.secure_url
    }
    const result = await FlashcardModel.create(payload);
    return result
}

const get_all_flash_cards_from_db = async (query: any) => {
    const { page = 1, limit = 10 } = query;
    const skip = (page - 1) * limit;

    const [result, total] = await Promise.all([

export const flash_card_services = {
    create_new_flash_card_in_db,
}