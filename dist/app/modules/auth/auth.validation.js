"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.auth_validation = void 0;
const zod_1 = require("zod");
const auth_constant_1 = require("./auth.constant");
// Zod schema matching TAccount / authSchema
const register_validation = zod_1.z.object({
    email: zod_1.z.string({ message: "Email is required" }).email(),
});
const login_validation = zod_1.z.object({
    email: zod_1.z.string({ message: "Email is required" }),
    password: zod_1.z.string({ message: "Email is required" })
});
const sign_in_with_google = zod_1.z.object({
    email: zod_1.z.string({ message: "Email is required" }),
    name: zod_1.z.string().optional(),
    photo: zod_1.z.string().optional(),
});
const changePassword = zod_1.z.object({
    oldPassword: zod_1.z.string({ message: "Old Password is required" }),
    newPassword: zod_1.z.string({ message: "New Password is required" })
});
const forgotPassword = zod_1.z.object({ email: zod_1.z.string({ message: "Email is required" }) });
const resetPassword = zod_1.z.object({
    otp: zod_1.z.string(),
    newPassword: zod_1.z.string(),
    email: zod_1.z.string()
});
const verified_account = zod_1.z.object({
    email: zod_1.z.string({ message: "Email is required" }),
    otp: zod_1.z.string({ message: "OTP is required" })
});
const change_profile_status = zod_1.z.object({
    email: zod_1.z.string({ message: "Email is required" }),
    status: zod_1.z.enum(["ACTIVE", "INACTIVE", "SUSPENDED"])
});
const newVerificationOtp = zod_1.z.object({
    email: zod_1.z.string({ message: "Email is required" }),
});
const updateProfile = zod_1.z.object({
    studentType: zod_1.z.enum(Object.values(auth_constant_1.AUTH_CONSTANTS.STUDENT_TYPES)),
    university: zod_1.z.string({ message: "University is required!" }),
    country: zod_1.z.string({ message: "Country is required!" }),
    year_of_study: zod_1.z.string({ message: "Studies year is required!" }),
    preparingFor: zod_1.z.string({ message: "Preparing exam type is required!" }),
    firstName: zod_1.z.string({ message: "First name is required!" }),
    lastName: zod_1.z.string({ message: "Last name is required!" }),
});
exports.auth_validation = {
    register_validation,
    login_validation,
    changePassword,
    forgotPassword,
    resetPassword,
    verified_account,
    newVerificationOtp,
    updateProfile,
    change_profile_status,
    sign_in_with_google
};
