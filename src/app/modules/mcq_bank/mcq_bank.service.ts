import { Request } from "express";
import { excelConverter } from "../../utils/excel_converter";
import { isAccountExist } from "../../utils/isAccountExist";
import { report_model } from "../report/report.schema";
import { TMcqBank } from "./mcq_bank.interface";
import { McqBankModel } from "./mcq_bank.schema";
import { mcq_validation } from "./mcq_bank.validation";

type TRawMcqRow = {
    difficulty: "Basics" | "Intermediate" | "Advance";
    question: string;
    imageDescription?: string;
    optionA: string;
    optionB: string;
    optionC: string;
    optionD: string;
    optionE: string;
    optionF: string;
    explanationA?: string;
    explanationB?: string;
    explanationC?: string;
    explanationD?: string;
    explanationE?: string;
    explanationF?: string;
    correctOption: "A" | "B" | "C" | "D" | "E" | "F";
};

const upload_bulk_mcq_bank_into_db = async (req: Request) => {
    const user = req?.user;
    const isUserExist: any = await isAccountExist(user?.email as string, "profile_id");
    const body = req?.body as TMcqBank;
    // Parse Excel data if file exists
    const excelData: any = req.file ? excelConverter.parseFile(req.file.path) || [] : [];

    const refineData = excelData.map((item: TRawMcqRow) => {
        const options = [
            { option: "A" as const, optionText: item.optionA || "", explanation: item.explanationA || undefined },
            { option: "B" as const, optionText: item.optionB || "", explanation: item.explanationB || undefined },
            { option: "C" as const, optionText: item.optionC || "", explanation: item.explanationC || undefined },
            { option: "D" as const, optionText: item.optionD || "", explanation: item.explanationD || undefined },
            { option: "E" as const, optionText: item.optionE || "", explanation: item.explanationE || undefined },
            { option: "F" as const, optionText: item.optionF || "", explanation: item.explanationF || undefined },
        ].filter(opt => opt.optionText?.trim() !== ""); // 🧹 remove empty options

        return {
            difficulty: item?.difficulty,
            question: item?.question,
            imageDescription: item.imageDescription || undefined,
            options,
            correctOption: (item.correctOption?.toUpperCase() as "A" | "B" | "C" | "D" | "E" | "F"),
        };
    });


    const uploadedBy = [
        isUserExist?.profile_id?.firstName,
        isUserExist?.profile_id?.lastName,
    ]
        .filter(Boolean)
        .join(" ");

    const payload: TMcqBank = {
        title: body?.title,
        uploadedBy,
        mcqs: refineData,
        subject: body?.subject,
        system: body?.system,
        topic: body?.topic,
        subtopic: body?.subtopic,
        slug: (body?.subject + body?.system + body?.topic + body?.subtopic).toLowerCase(),
        type: body?.type,
    };

    // type checking for all ok
    await mcq_validation.create.parseAsync(payload);

    const result = await McqBankModel.create(payload);
    return Array.isArray(result) ? result.length : 1;
};

const get_all_mcq_banks = async (req: Request) => {
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

    const result = await McqBankModel.find(searchFilter)
        .skip(skip)
        .limit(limitNumber)
        .sort({ createdAt: -1 })
        .lean();

    const total = await McqBankModel.countDocuments(searchFilter);
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
        totalMcq: item.mcqs?.length || 0,
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
};

const get_single_mcq_bank = async (req: Request): Promise<any> => {
    const { id } = req.params;
    const page = parseInt(req.query.page as string) || 1;
    const limit = parseInt(req.query.limit as string) || 10;

    const result = await McqBankModel.findById(id).select("-__v").lean<TMcqBank>();
    if (!result) throw new Error("MCQ Bank not found");

    const total = result.mcqs.length;
    const skip = (page - 1) * limit;

    const paginatedMcqs = result.mcqs.slice(skip, skip + limit);

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
            mcqs: paginatedMcqs,
        },
        meta,
    };
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

    if (!mcqBank?.mcqs || questionIndex < 0 || questionIndex >= mcqBank?.mcqs.length) {
        throw new Error("Invalid question index");
    }

    const existingQuestion = mcqBank?.mcqs[questionIndex];

    // Merge updates
    mcqBank.mcqs[questionIndex] = {
        ...existingQuestion,
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
            }
        ],
        correctOption: (updatedQuestionData.correctOption as "A" | "B" | "C" | "D") ?? existingQuestion.correctOption,
    };

    await mcqBank.save();
    return { message: "Question updated successfully" };
};

const save_report_for_mcq_on_db = async (req: Request) => {
    const user = req?.user;
    const studentExist = await isAccountExist(user?.email as string, "profile_id") as any;
    const payload = {
        accountId: studentExist?._id,
        name: studentExist?.profile_id?.firstName + " " + studentExist?.profile_id?.lastName,
        profile_photo: studentExist?.profile_id?.profile_photo,
        report: {
            questionBankId: req?.body?.questionBankId,
            questionIndex: req?.body?.questionIndex,
            text: req?.body?.text
        }
    }
    const res = await report_model.create(payload)
    return res
}

export const mcq_bank_service = {
    upload_bulk_mcq_bank_into_db,
    get_all_mcq_banks,
    delete_mcq_bank,
    get_single_mcq_bank,
    update_specific_question,
    save_report_for_mcq_on_db
};



// Upload Note ---> Select Template ---> Auto Generate an Inspection ----> Recommendation