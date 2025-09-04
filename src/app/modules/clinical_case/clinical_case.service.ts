import { Request } from "express";
import { isAccountExist } from "../../utils/isAccountExist";
import { ClinicalCaseModel } from "./clinical_case.schema";

const create_new_clinical_case_and_save_on_db = async (req: Request) => {
    const user = req?.user;
    const isMentorExist = await isAccountExist(user?.email as string)
    const payload = req?.body;
    payload.publishedBy = isMentorExist?._id;

    const result = await ClinicalCaseModel.create(payload);
    return result;
}
export const clinical_case_services = {
    create_new_clinical_case_and_save_on_db
}