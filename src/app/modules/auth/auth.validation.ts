import { z } from "zod";
import { commonPreferenceValidationSchema } from "../../common/common.validation";
import { AUTH_CONSTANTS } from "./auth.constant";

// Zod schema matching TAccount / authSchema
const register_validation = z.object({
    email: z.string({ message: "Email is required" }).email(),
    password: z.string({ message: "Password is required" }).min(6, "Password must be at least 6 characters long"),
});

const login_validation = z.object({
    email: z.string({ message: "Email is required" }),
    password: z.string({ message: "Email is required" })
})
const sign_in_with_google = z.object({
    email: z.string({ message: "Email is required" }),
    name: z.string().optional(),
    photo: z.string().optional(),
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
    role: z.string({ message: "Role is required" }),
    student: z.object({
        firstName: z.string({ message: "First Name is required" }),
        lastName: z.string({ message: "Last Name is required" }),
        university: z.string({ message: "University is required" }),
        country: z.string({ message: "Country is required" }),
        year_of_study: z.string({ message: "Year of Study is required" }),
        studentType: z.enum(Object.values(AUTH_CONSTANTS.STUDENT_TYPES), { message: "Student Type is required" }),
        preparingFor: z.string({ message: "Preparing For is required" }),
    }).optional(),
    preference: commonPreferenceValidationSchema.optional(),
    bio: z.string().optional(),
    professional: z.object({
        firstName: { type: String, required: true },
        lastName: { type: String, required: true },
        profile_photo: { type: String, required: true },
        institution: { type: String, required: true },
        country: { type: String, required: true },
        post_graduate: { type: String, required: true },
        experience: { type: String, required: true },
    }).optional()
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
    change_profile_status,
    sign_in_with_google
}