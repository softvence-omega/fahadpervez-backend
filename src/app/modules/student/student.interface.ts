import { Types } from "mongoose"

export type TStudent = {
    accountId: Types.ObjectId,
    firstName?: string,
    lastName?: string,
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
}

