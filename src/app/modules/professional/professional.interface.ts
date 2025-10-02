import { Types } from "mongoose";
import { TCommonPreference } from "../../types/common";

export type TProfessional = {
    accountId: Types.ObjectId;
    firstName: string;
    lastName: string;
    profile_photo: string;
    institution: string;
    country: string;
    post_graduate: string;
    experience: string;
    bio: string;
    preference?: TCommonPreference
}