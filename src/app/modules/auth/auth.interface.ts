import { Types } from "mongoose";
import { TProfileType } from "../../types/common";

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
    profile_type: TProfileType;
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