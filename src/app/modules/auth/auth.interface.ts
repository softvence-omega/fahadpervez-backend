import { Types } from "mongoose";

type ProfileType = "student_profile" | "mentor_profile" | "admin_profile";

export type TAccount = {
    email: string;
    role: "ADMIN" | "STUDENT" | "MENTOR"
    password: string;
    profile_id: Types.ObjectId;
    isDeleted?: boolean;
    accountStatus?: "ACTIVE" | "BLOCK" | "SUSPENDED";
    studentType?: "MEDICAL_STUDENT" | "NURSING_STUDENT" | "DENTAL_STUDENT",
    isSubscribed?: boolean;
    lastOTP?: string;
    isVerified?: boolean,
    profile_type: ProfileType;
    authType?: "GOOGLE" | "CUSTOM"
}


export type TRegisterPayload = {
    email: string;
}

export type TLoginPayload = {
    email: string;
    password: string
}

export type TJwtUser = {
    email: string,
    role?: "USER" | "ADMIN",
}