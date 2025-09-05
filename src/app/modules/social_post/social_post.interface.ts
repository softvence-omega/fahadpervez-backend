import { Types } from "mongoose"

export type TSocialPost = {
    postedBy: Types.ObjectId;
    profileType: "admin_profile" | "student_profile" | "mentor_profile";
    topic: string;
    content: string;
    postImage?: string;
    reaction?: string[];
    share?: number;
    isDeleted: boolean;
}