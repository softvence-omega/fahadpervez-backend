import { Types } from "mongoose";
import { TProfileType } from "../../types/common";

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
    profileType: TProfileType;
    topic: string;
    content: string;
    postImage?: string;
    reaction?: string[];
    share?: number;
    isDeleted: boolean;
    comments: TComments[]
}


export type TQuestionSocial = {
    question: string;
    postedBy: Types.ObjectId;
    profileType: TProfileType;
    answers: {
        answer: string;
        name: string;
        photo?: string;
    }[];
}