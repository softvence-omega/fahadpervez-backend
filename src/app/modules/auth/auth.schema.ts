import mongoose, { model, Schema, Types } from "mongoose";
import { TAccount } from "./auth.interface";


const authSchema = new Schema<TAccount>({
    email: { type: String, required: true },
    password: { type: String, required: true },
    lastPasswordChange: { type: String },
    isDeleted: { type: Boolean, default: false },
    status: { type: String, default: "ACTIVE" },
    role: { type: String, enum: ["ADMIN", "MENTOR", "MEDICAL_STUDENT", "NURSING_STUDENT"], required: true },
    isVerified: { type: Boolean, default: false },
    profile_type: {
        type: String,
        required: true,
        enum: ["student_profile", "admin_profile", "mentor_profile"],
    },
    profile_id: {
        type: mongoose.Schema.Types.ObjectId,
        required: true,
        refPath: "profile_type",
    },
}, {
    versionKey: false,
    timestamps: true
});


export const Account_Model = model("account", authSchema)