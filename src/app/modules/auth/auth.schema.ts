import mongoose, { model, Schema, Types } from "mongoose";
import { TAccount } from "./auth.interface";
import { AUTH_CONSTANTS } from "./auth.constant";


const authSchema = new Schema<TAccount>({
    email: { type: String, required: true, unique: true },
    password: { type: String, required: false },
    isDeleted: { type: Boolean, default: false },
    accountStatus: { type: String, default: "ACTIVE" },
    role: { type: String, enum: ["ADMIN", "MENTOR", "STUDENT"], required: true },
    studentType: { type: String, enum: Object.values(AUTH_CONSTANTS.STUDENT_TYPES), required: false },
    isVerified: { type: Boolean, default: false },
    profile_type: {
        type: String,
        required: true,
        enum: ["student_profile", "admin_profile", "mentor_profile"],
    },
    profile_id: {
        type: mongoose.Schema.Types.ObjectId,
        required: false,
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