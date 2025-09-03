import { z } from "zod";
import { AUTH_CONSTANTS } from "./auth.constant";

// Zod schema matching TAccount / authSchema
const register_validation = z.object({
    email: z.string({ message: "Email is required" }).email(),
});

const login_validation = z.object({
    email: z.string({ message: "Email is required" }),
    password: z.string({ message: "Email is required" })
})

const changePassword = z.object({
    oldPassword: z.string({ message: "Old Password is required" }),
    newPassword: z.string({ message: "New Password is required" })
})

const forgotPassword = z.object({ email: z.string({ message: "Email is required" }) })
const resetPassword = z.object({
    otp: z.string(),
    newPassword: z.string(),
    email: z.string()
})
const verified_account = z.object({
    email: z.string({ message: "Email is required" }),
    otp: z.string({ message: "OTP is required" })
})
const change_profile_status = z.object({
    email: z.string({ message: "Email is required" }),
    status: z.enum(["ACTIVE", "INACTIVE", "SUSPENDED"])
})

const newVerificationOtp = z.object({
    email: z.string({ message: "Email is required" }),
})

const updateProfile = z.object({
    studentType: z.enum(Object.values(AUTH_CONSTANTS.STUDENT_TYPES)),
    university: z.string(),
    country: z.string(),
    year_of_study: z.string(),
    preparingFor: z.string(),
})


export const auth_validation = {
    register_validation,
    login_validation,
    changePassword,
    forgotPassword,
    resetPassword,
    verified_account,
    newVerificationOtp,
    updateProfile,
    change_profile_status
}