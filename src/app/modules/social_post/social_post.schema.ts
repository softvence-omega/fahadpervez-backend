// make social post mongoose schema
import { model, Schema } from "mongoose";
import { TSocialPost } from "./social_post.interface";

const socialPostSchema = new Schema<TSocialPost>({
    postedBy: { type: Schema.ObjectId, required: true, refPath: "profileType" },
    profileType: {
        type: String,
        required: true,
        enum: ["student_profile", "admin_profile", "mentor_profile"],
    },
    topic: { type: String, required: true },
    postImage: { type: String, required: false },
    content: { type: String, required: true },
    reaction: { type: [String], required: false},
    share: { type: Number, required: false, default: 0 },
    isDeleted: { type: Boolean, default: false },
}, { timestamps: true, versionKey: false });

export const SocialPostModel = model("social_post", socialPostSchema);