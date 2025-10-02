import { Request } from "express";
import { isAccountExist } from "../../utils/isAccountExist";
import { ClinicalCaseModel } from "./clinical_case.schema";
import { AppError } from "../../utils/app_error";

const create_new_clinical_case_and_save_on_db = async (req: Request) => {
    const user = req?.user;
    const isMentorExist = await isAccountExist(user?.email as string)
    const payload = req?.body;
    payload.publishedBy = isMentorExist?.profile_id;
    payload.profile_type = isMentorExist?.profile_type;

    const result = await ClinicalCaseModel.create(payload);
    return result;
}

const get_all_clinical_case_from_db = async (query: any) => {
    const { page = 1, limit = 10 } = query;
    const skip = (page - 1) * limit;

    const [result, total] = await Promise.all([
        ClinicalCaseModel.find()
            .populate("publishedBy")
            .sort("-createdAt")
            .skip(skip)
            .limit(limit),
        ClinicalCaseModel.countDocuments(),
    ]);

    return {
        data: result,
        meta: {
            page,
            limit,
            skip,
            total,
            totalPages: Math.ceil(total / limit),
        }
    }
}
const get_single_clinical_case_from_db = async (caseId: string) => {
    const isCaseExist = await ClinicalCaseModel.findById(caseId).populate("publishedBy").lean();
    if (!isCaseExist) {
        throw new AppError("Case not found!!", 404)
    }
    return isCaseExist;
}

const update_clinical_case_by_id_into_db = async (req: Request) => {
    const { caseId } = req?.params;
    const payload = req?.body;
    const isCaseExist = await ClinicalCaseModel.findById(caseId).lean();
    if (!isCaseExist) {
        throw new AppError("Case not found!!", 404)
    }
    const result = await ClinicalCaseModel.findByIdAndUpdate(caseId, payload, { new: true })
    return result;
}
const delete_clinical_case_by_id_from_db = async (caseId: string) => {
    const isCaseExist = await ClinicalCaseModel.findById(caseId).lean();
    if (!isCaseExist) {
        throw new AppError("Case not found!!", 404)
    }
    const result = await ClinicalCaseModel.findByIdAndDelete(caseId)
    return result;
}

export const clinical_case_services = {
    create_new_clinical_case_and_save_on_db,
    get_all_clinical_case_from_db,
    get_single_clinical_case_from_db,
    update_clinical_case_by_id_into_db,
    delete_clinical_case_by_id_from_db
}