import { Request } from "express";
import mongoose from "mongoose";
import { AppError } from "../../utils/app_error";
import { excelConverter } from "../../utils/excel_converter";
import { isAccountExist } from "../../utils/isAccountExist";
import { Student_Model } from "../student/student.schema";
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

  let studentType: string | undefined;
  if (req?.user?.role === "STUDENT") {
    const student = await Student_Model.findOne({ accountId: req?.user?.accountId });
    studentType = student?.studentType || undefined;
  }
  const pageNumber = parseInt(page, 10);
  const limitNumber = parseInt(limit, 10);
  const skip = (pageNumber - 1) * limitNumber;

  const filters: any = {};

  // Apply studentType filter (only if exists)
  if (studentType) {
    filters.studentType = studentType;
  }

  // Combine subject/system/topic/subtopic into one slug string for search
  const slugFilter = (subject + system + topic + subtopic).toLowerCase();

  // Apply search filter if provided
  if (searchTerm || slugFilter) {
    filters.$or = [
      { title: { $regex: searchTerm, $options: "i" } },
      { slug: { $regex: slugFilter, $options: "i" } },
    ];
  }

  const result = await FlashcardModel.find(filters)
    .skip(skip)
    .limit(limitNumber)
    .sort({ createdAt: -1 })
    .lean();

  const total = await FlashcardModel.countDocuments(filters);
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
    studentType: item.studentType,
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

const get_single_flash_card_from_db = async (req: Request) => {
  const { flashCardId } = req?.params;
  const page = parseInt(req.query.page as string) || 1;
  const limit = parseInt(req.query.limit as string) || 10;

  const result = await FlashcardModel.findById(flashCardId).select("-__v").lean();
  if (!result) throw new AppError("MCQ Bank not found", 404);

  const total = result.flashCards.length;
  const skip = (page - 1) * limit;

  const paginatedFlashCard = result.flashCards.slice(skip, skip + limit);

  const meta = {
    page,
    limit,
    skip,
    total,
    totalPages: Math.ceil(total / limit),
  };

  return {
    data: {
      ...result,
      flashCards: paginatedFlashCard,
    },
    meta,
  };
}

const get_specific_flashcard_bank_with_index_from_db = async (req: Request): Promise<any> => {
  const { flashCardBankId, flashCardId } = req.params;
  const result = await FlashcardModel.findOne(
    {
      _id: new mongoose.Types.ObjectId(flashCardBankId),
      "flashCards.flashCardId": flashCardId,
    },
    { "flashCards.$": 1 }
  ).lean();
  if (!result) throw new AppError("Flashcard Bank not found", 404);

  return result;
};

const update_specific_flashcard_into_db = async (
  flashCardBankId: string,
  flashCardId: string,
  updatedQuestionData: Partial<any>
) => {
  // 1️⃣ Build the update object dynamically
  const updateFields: Record<string, any> = {};

  if (updatedQuestionData.frontText)
    updateFields["flashCards.$.frontText"] = updatedQuestionData.frontText;

  if (updatedQuestionData.backText)
    updateFields["mcqs.$.backText"] = updatedQuestionData.backText;

  if (updatedQuestionData.explanation)
    updateFields["mcqs.$.explanation"] = updatedQuestionData.explanation;
  if (updatedQuestionData.difficulty)
    updateFields["mcqs.$.difficulty"] = updatedQuestionData.difficulty;


  // 4️⃣ Execute the update directly in MongoDB
  const result = await FlashcardModel.updateOne(
    { _id: flashCardBankId, "flashCards.flashCardId": flashCardId },
    { $set: updateFields }
  );

  if (result.matchedCount === 0) throw new Error("MCQ not found");
  if (result.modifiedCount === 0)
    return { message: "No changes were made (fields may be identical)" };

  return { message: "Flashcard updated successfully", modifiedCount: result.modifiedCount };
};

const delete_flashCard_bank_from_db = async (flashCardBankId: string) => {
  const result = await FlashcardModel.findByIdAndDelete(flashCardBankId);
  if (!result) throw new Error("Flashcard Bank not found");
  return { message: "Flashcard Bank deleted successfully", deleteCount: 1 };
}

const delete_single_flashcard_from_db = async (req: Request) => {
  const { flashCardBankId, flashCardId } = req?.params;
  const result = await FlashcardModel.updateOne(
    { _id: flashCardBankId },
    { $pull: { flashCards: { flashCardId } } }
  );
  return result?.modifiedCount;
}

export const flash_card_services = {
  create_new_flash_card_in_db,
  get_all_flash_cards_from_db,
  get_single_flash_card_from_db,
  get_specific_flashcard_bank_with_index_from_db,
  update_specific_flashcard_into_db,
  delete_flashCard_bank_from_db,
  delete_single_flashcard_from_db
};
