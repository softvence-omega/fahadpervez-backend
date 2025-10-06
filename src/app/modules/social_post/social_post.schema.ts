import { model, Schema, Types } from "mongoose";
import { profileTypeEnum } from "../../common/constant";
import { TSocialPost } from "./social_post.interface";

const commentSchema = new Schema({
    commentedBy: {
        name: { type: String, required: true },
        profileImage: { type: String, required: true },
        email: { type: String, required: true },
    },
    comment: { type: String, required: true }
}, { _id: false, versionKey: false, timestamps: true });

const socialPostSchema = new Schema<TSocialPost>({
    postedBy: { type: Schema.ObjectId, required: false, refPath: "profileType", },
    profileType: {
        type: String,
        required: true,
        enum: profileTypeEnum,
    },
    topic: { type: String, required: true },
    postImage: { type: String, required: false },
    content: { type: String, required: true },
    reaction: { type: [String], required: false },
    comments: { type: [commentSchema], required: false },
    share: { type: Number, required: false, default: 0 },
    isDeleted: { type: Boolean, default: false },
}, { timestamps: true, versionKey: false });


const AnswerSchema = new Schema({
    answer: { type: String, required: true },
    name: { type: String, required: true },
    photo: { type: String, required: false },
});

const QuestionSocialSchema = new Schema({
    question: { type: String, required: true },
    postedBy: { type: Types.ObjectId, required: true, refPath: "profileType" },
    profileType: { type: String, enum: profileTypeEnum, required: true },
    answers: { type: [AnswerSchema], default: [] },
}, { timestamps: true });


const CommentSchema = new Schema(
    {
        name: { type: String, required: true },
        photo: { type: String },
        studentType: { type: String },
        comment: { type: String, required: true },
    },
    { _id: false, timestamps: true, versionKey: false }
);

const ForumPostSchema = new Schema(
    {
        title: { type: String, required: true },
        category: { type: String, required: true },
        content: { type: String, required: true },
        postedBy: { type: Schema.Types.ObjectId, refPath: "profileType", required: true },
        profileType: { type: String, enum: profileTypeEnum, required: true },
        tags: [{ type: String }],
        comments: [CommentSchema],
    },
    { timestamps: true, versionKey: false }
);


export const SocialPostModel = model("social_post", socialPostSchema);
export const QuestionSocialModel = model("question_social", QuestionSocialSchema);
export const ForumPostModel = model("forum_post", ForumPostSchema);
