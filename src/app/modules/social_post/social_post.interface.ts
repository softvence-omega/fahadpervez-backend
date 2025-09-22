import { Types } from "mongoose"

type TComments = {
    commentedBy: {
        name: string;
        profileImage: string;
        email: string;
    },
    comment: string
}
export type TSocialPost = {
    postedBy: Types.ObjectId;
    profileType: "admin_profile" | "student_profile" | "mentor_profile";
    topic: string;
    content: string;
    postImage?: string;
    reaction?: string[];
    share?: number;
    isDeleted: boolean;
    comments: TComments[]
}