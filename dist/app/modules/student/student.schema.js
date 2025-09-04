"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Student_Model = void 0;
const mongoose_1 = require("mongoose");
const studentSchema = new mongoose_1.Schema({
    accountId: { type: mongoose_1.Schema.Types.ObjectId, required: true, ref: "account" },
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
    completedQuiz: [{ type: mongoose_1.Schema.Types.ObjectId, ref: 'quiz', required: false }],
    completedFlashCard: [{ type: mongoose_1.Schema.Types.ObjectId, ref: 'flashCard', required: false }],
    completedCase: [{ type: mongoose_1.Schema.Types.ObjectId, ref: 'case', required: false }],
    badges: [{ type: mongoose_1.Schema.Types.ObjectId, ref: 'badge', required: false }],
    connectedMentor: [{ type: mongoose_1.Schema.Types.ObjectId, ref: 'mentor', required: false }],
}, { timestamps: true, versionKey: false });
exports.Student_Model = (0, mongoose_1.model)('student_profile', studentSchema);
