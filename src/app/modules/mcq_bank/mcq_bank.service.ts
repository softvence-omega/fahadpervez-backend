import { Request } from "express";
import { excelConverter } from "../../utils/excel_converter";
import { isAccountExist } from "../../utils/isAccountExist";
import { TMcqBank } from "./mcq_bank.interface";
import { McqBankModel } from "./mcq_bank.schema";

type TRawMcqRow = {
    category: string;
    difficulty: "Easy" | "Medium" | "Hard";
    question: string;
    imageDescription?: string;
    optionA: string;
    optionB: string;
    optionC: string;
    optionD: string;
    explanationA?: string;
    explanationB?: string;
    explanationC?: string;
    explanationD?: string;
    correctOption: "A" | "B" | "C" | "D";
};

const upload_bulk_mcq_bank_into_db = async (req: Request) => {
    const user = req?.user;
    const isUserExist: any = await isAccountExist(user?.email as string, "profile_id");

    // Parse Excel data if file exists
    const excelData: any = req.file ? excelConverter.parseFile(req.file.path) || [] : [];

    const refineData = excelData.map((item: TRawMcqRow) => ({
        category: item.category || "",
        difficulty: item.difficulty || "Easy", // Default if missing
        question: item.question || "",
        imageDescription: item.imageDescription || undefined, // optional
        options: [
            { option: "A" as const, optionText: item.optionA || "", explanation: item.explanationA || undefined },
            { option: "B" as const, optionText: item.optionB || "", explanation: item.explanationB || undefined },
            { option: "C" as const, optionText: item.optionC || "", explanation: item.explanationC || undefined },
            { option: "D" as const, optionText: item.optionD || "", explanation: item.explanationD || undefined },
        ],
        correctOption: (item.correctOption?.toUpperCase() as "A" | "B" | "C" | "D") || "A",
    }));


    const uploadedBy = [
        isUserExist?.profile_id?.firstName,
        isUserExist?.profile_id?.lastName,
    ]
        .filter(Boolean)
        .join(" ");

    const payload: TMcqBank = {
        subjectName: req.body?.subjectName || "",
        mcqBankTitle: req.body?.mcqBankTitle || "",
        uploadedBy,
        mcqSets: refineData,
        totalMcq: refineData.length
    };

    const result = await McqBankModel.create(payload);
    return Array.isArray(result) ? result.length : 1; //
};

const get_all_mcq_banks = async (req: Request) => {
    const {
        page = "1",
        limit = "10",
        searchTerm = "",
    } = req.query as { page?: string; limit?: string; searchTerm?: string };

    const pageNumber = parseInt(page, 10);
    const limitNumber = parseInt(limit, 10);
    const skip = (pageNumber - 1) * limitNumber;

    // Build search filter
    const searchFilter = searchTerm
        ? {
            $or: [
                { mcqBankTitle: { $regex: searchTerm, $options: "i" } },
                { subjectName: { $regex: searchTerm, $options: "i" } },
            ],
        }
        : {};

    // Fetch paginated and filtered results (excluding mcqSets for performance)
    const result = await McqBankModel.find(searchFilter)
        .select("-mcqSets")
        .skip(skip)
        .limit(limitNumber)
        .sort({ createdAt: -1 })
        .lean();

    const total = await McqBankModel.countDocuments(searchFilter);
    const totalPages = Math.ceil(total / limitNumber);

    return {
        meta: {
            page: pageNumber,
            limit: limitNumber,
            total,
            totalPages,
        },
        data: result,
    };
};

const get_single_mcq_bank = async (id: string) => {
    const result = await McqBankModel.findById(id).select("-__v").lean();
    if (!result) throw new Error("MCQ Bank not found");
    return result;
};

const delete_mcq_bank = async (id: string) => {
    const result = await McqBankModel.findByIdAndDelete(id);
    if (!result) throw new Error("MCQ Bank not found");
    return { message: "MCQ Bank deleted successfully" };
};

// Update a specific question by its array index
const update_specific_question = async (
    mcqBankId: string,
    questionIndex: number,
    updatedQuestionData: Partial<TRawMcqRow>
) => {
    const mcqBank = await McqBankModel.findById(mcqBankId);
    if (!mcqBank) throw new Error("MCQ Bank not found");

    if (!mcqBank.mcqSets || questionIndex < 0 || questionIndex >= mcqBank.mcqSets.length) {
        throw new Error("Invalid question index");
    }

    const existingQuestion = mcqBank.mcqSets[questionIndex];

    // Merge updates
    mcqBank.mcqSets[questionIndex] = {
        ...existingQuestion,
        category: updatedQuestionData.category ?? existingQuestion.category,
        difficulty: updatedQuestionData.difficulty ?? existingQuestion.difficulty,
        question: updatedQuestionData.question ?? existingQuestion.question,
        imageDescription: updatedQuestionData.imageDescription ?? existingQuestion.imageDescription,
        options: [
            {
                option: "A",
                optionText: updatedQuestionData.optionA ?? existingQuestion.options[0].optionText,
                explanation: updatedQuestionData.explanationA ?? existingQuestion.options[0].explanation,
            },
            {
                option: "B",
                optionText: updatedQuestionData.optionB ?? existingQuestion.options[1].optionText,
                explanation: updatedQuestionData.explanationB ?? existingQuestion.options[1].explanation,
            },
            {
                option: "C",
                optionText: updatedQuestionData.optionC ?? existingQuestion.options[2].optionText,
                explanation: updatedQuestionData.explanationC ?? existingQuestion.options[2].explanation,
            },
            {
                option: "D",
                optionText: updatedQuestionData.optionD ?? existingQuestion.options[3].optionText,
                explanation: updatedQuestionData.explanationD ?? existingQuestion.options[3].explanation,
            },
        ],
        correctOption: (updatedQuestionData.correctOption as "A" | "B" | "C" | "D") ?? existingQuestion.correctOption,
    };

    await mcqBank.save();
    return { message: "Question updated successfully" };
};

export const mcq_bank_service = {
    upload_bulk_mcq_bank_into_db,
    get_all_mcq_banks,
    delete_mcq_bank,
    get_single_mcq_bank,
    update_specific_question
};
