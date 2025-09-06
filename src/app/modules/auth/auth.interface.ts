import { Types } from "mongoose";
import { AUTH_CONSTANTS } from './auth.constant';

export type ProfileType = "student_profile" | "mentor_profile" | "admin_profile";
export type TStatus = "ACTIVE" | "INACTIVE" | "SUSPENDED"

export type TAccount = {
    email: string;
    role: "ADMIN" | "STUDENT" | "MENTOR"
    password: string;
    profile_id: Types.ObjectId;
    isDeleted?: boolean;
    accountStatus?: TStatus;
    studentType?: keyof typeof AUTH_CONSTANTS.STUDENT_TYPES,
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