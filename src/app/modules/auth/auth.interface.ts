import { Types } from "mongoose";

type ProfileType = "student_profile" | "teacher_profile" | "guard_profile";

export type TAccount = {
    email: string;
    password: string;
    lastPasswordChange?: Date;
    isDeleted?: boolean;
    status?: "ACTIVE" | "BLOCK";
    role: "ADMIN" | "MENTOR" | "MEDICAL_STUDENT" | "NURSING_STUDENT",
    isVerified?: boolean,
    profile_type: ProfileType;
    profile_id: Types.ObjectId;
}


export interface TRegisterPayload extends TAccount {
    name: string
}

export type TLoginPayload = {
    email: string;
    password: string
}

export type TJwtUser = {
    email: string,
    role?: "USER" | "ADMIN",
}