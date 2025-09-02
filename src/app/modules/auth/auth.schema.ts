import mongoose, { model, Schema, Types } from "mongoose";
import { TAccount } from "./auth.interface";


const authSchema = new Schema<TAccount>({
    email: { type: String, required: true, unique: true },
    password: { type: String, required: true },
    isDeleted: { type: Boolean, default: false },
    accountStatus: { type: String, default: "ACTIVE" },
    role: { type: String, enum: ["ADMIN", "MENTOR", "STUDENT"], required: true },
    studentType: { type: String, enum: ["MEDICAL_STUDENT", "NURSING_STUDENT", "DENTAL_STUDENT"], required: false },
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
    authType: { type: String, enum: ["GOOGLE", "CUSTOM"], default: "CUSTOM" },
    lastOTP: { type: String, required: false },
    isSubscribed: { type: Boolean, default: false }
}, {
    versionKey: false,
    timestamps: true
});


export const Account_Model = model("account", authSchema)