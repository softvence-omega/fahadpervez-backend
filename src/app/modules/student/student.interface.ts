import { Types } from "mongoose"
import { TCommonPreference } from "../../types/common"
import { AUTH_CONSTANTS } from "../auth/auth.constant"

export type TStudent = {
    accountId: Types.ObjectId,
    firstName?: string,
    lastName?: string,
    studentType?: keyof typeof AUTH_CONSTANTS.STUDENT_TYPES,
    phone?: string,
    country?: string,
    university?: string,
    preparingFor?: string,
    bio?: string,
    year_of_study?: string,
    profile_photo?: string,
    dailyStreak?: number,
    point?: number,
    completedQuiz?: Types.ObjectId[],
    completedFlashCard?: Types.ObjectId[],
    completedCase?: Types.ObjectId[],
    badges?: Types.ObjectId[],
    connectedMentor?: Types.ObjectId[],
    preference?: TCommonPreference
}

