import { Types } from "mongoose";

export type ProfileType = "student_profile" | "mentor_profile" | "admin_profile";
export type TStatus = "ACTIVE" | "INACTIVE" | "SUSPENDED"

export type TAccount = {
    email: string;
    role: "ADMIN" | "STUDENT" | "MENTOR" | "PROFESSIONAL"
    password: string;
    profile_id: Types.ObjectId;
    isDeleted?: boolean;
    accountStatus?: TStatus;
    isSubscribed?: boolean;
    lastOTP?: string;
    isVerified?: boolean,
    profile_type: ProfileType;
    authType?: "GOOGLE" | "CUSTOM"
}


export type TRegisterPayload = {
    email: string;
    password: string
}

export type TLoginPayload = {
    email: string;
    password: string
}

export type TJwtUser = {
    email: string,
    role?: "USER" | "ADMIN",
}