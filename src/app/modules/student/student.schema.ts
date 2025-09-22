import { model, Schema } from 'mongoose';
import { TStudent } from './student.interface';

const studentSchema = new Schema<TStudent>({
    accountId: { type: Schema.Types.ObjectId, required: true, ref: "account" },
    firstName: { type: String, required: false },
    lastName: { type: String, required: false },
    phone: { type: String, required: false },
    country: { type: String, required: false },
    university: { type: String, required: false },
    preparingFor: { type: String, required: false },
    bio: { type: String, required: false },
    year_of_study: { type: String, required: false },
    profile_photo: { type: String, required: false },
    dailyStreak: { type: Number, required: false, default: 0 },
    point: { type: Number, required: false, default: 0 },
    completedQuiz: [{ type: Schema.Types.ObjectId, ref: 'quiz', required: false }],
    completedFlashCard: [{ type: Schema.Types.ObjectId, ref: 'flashCard', required: false }],
    completedCase: [{ type: Schema.Types.ObjectId, ref: 'case', required: false }],
    badges: [{ type: Schema.Types.ObjectId, ref: 'badge', required: false }],
    connectedMentor: [{ type: Schema.Types.ObjectId, ref: 'mentor', required: false }],
}, { timestamps: true, versionKey: false });

export const Student_Model = model<TStudent>('student_profile', studentSchema);