import { Request } from "express";
import { excelConverter } from "../../utils/excel_converter";
import { isAccountExist } from "../../utils/isAccountExist";
import { TFlashCard } from "./flash_card.interface";
import { FlashcardModel } from "./flash_card.schema";

const create_new_flash_card_in_db = async (req: Request) => {
  const user = req?.user;
  const body = req?.body;
  const isUserExist = await isAccountExist(user?.email as string, "profile_id") as any;
  const excelData: any = req.file ? excelConverter.parseFile(req.file.path) || [] : [];

  const modifiedData = excelData?.map((item: any, idx: number) => ({
    ...item,
    flashCardId: `FLC-${String(idx + 1).padStart(6, '0')}`
  }))

  const payload: TFlashCard = {
    uploadedBy: isUserExist?.profile_id?.firstName + " " + isUserExist?.profile_id?.lastName,
    ...body,
    flashCards: modifiedData,
    slug: (body?.subject + body?.system + body?.topic + body?.subtopic).toLowerCase()
  }
  const result = await FlashcardModel.create(payload);
  return result;
};


const get_all_flash_cards_from_db = async (req: Request) => {
  const {
    page = "1",
    limit = "10",
    searchTerm = "",
    subject = "",
    system = "",
    topic = "",
    subtopic = "",
  } = req.query as {
    page?: string;
    limit?: string;
    searchTerm?: string;
    subject?: string;
    system?: string;
    topic?: string;
    subtopic?: string;
  };

  const pageNumber = parseInt(page, 10);
  const limitNumber = parseInt(limit, 10);
  const skip = (pageNumber - 1) * limitNumber;

  const slugFilter = (subject + system + topic + subtopic).toLowerCase();

  // 🔍 Build search filter
  const searchFilter =
    searchTerm || slugFilter
      ? {
        $or: [
          { title: { $regex: searchTerm, $options: "i" } },
          { slug: { $regex: slugFilter, $options: "i" } },
        ],
      }
      : {};

  const result = await FlashcardModel.find(searchFilter)
    .skip(skip)
    .limit(limitNumber)
    .sort({ createdAt: -1 })
    .lean();

  const total = await FlashcardModel.countDocuments(searchFilter);
  const totalPages = Math.ceil(total / limitNumber);

  // 🧩 Transform results (map over array)
  const res = result.map((item: any) => ({
    _id: item._id,
    title: item.title,
    subject: item.subject,
    system: item.system,
    topic: item.topic,
    subtopic: item.subtopic,
    slug: item.slug,
    type: item.type,
    uploadedBy: item.uploadedBy,
    totalFlashCards: item.flashCards?.length || 0,
    createdAt: item?.createdAt,
  }));

  return {
    meta: {
      page: pageNumber,
      limit: limitNumber,
      total,
      totalPages,
    },
    data: res,
  };
}

export const flash_card_services = {
  create_new_flash_card_in_db,
  get_all_flash_cards_from_db

};
