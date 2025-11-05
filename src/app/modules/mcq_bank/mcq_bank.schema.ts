import mongoose from "mongoose";
import { TMcqBank } from "./mcq_bank.interface";

const optionSchema = new mongoose.Schema({
    option: {
        type: String,
        enum: ["A", "B", "C", "D", "E", "F"],
        required: true,
    },
    optionText: {
        type: String,
        required: true,
    },
    explanation: {
        type: String,
    },
}, { versionKey: false, timestamps: false, _id: false });

const mcqSchema = new mongoose.Schema({
    mcqId: {
        type: String,
        required: true,
    },
    difficulty: {
        type: String,
        enum: ["Basics", "Intermediate", "Advance"],
        required: true,
    },
    question: {
        type: String,
        required: true,
    },
    imageDescription: {
        type: String,
    },
    options: {
        type: [optionSchema],
        validate: {
            validator: (v: any[]) => v.length >= 2,
            message: "Each MCQ must have at least two options.",
        },
    },
    correctOption: {
        type: String,
        enum: ["A", "B", "C", "D", "E", "F"],
        required: true,
    },
}, { versionKey: false, timestamps: false, _id: false });

const McqBankSchema = new mongoose.Schema(
    {
        title: { type: String, required: true },
        subject: { type: String, required: true },
        system: { type: String, required: true },
        topic: { type: String, required: true },
        subtopic: { type: String, required: true },
        slug: { type: String },
        type: { type: String, enum: ["exam", "study"], required: true },
        uploadedBy: { type: String, required: true },
        mcqs: { type: [mcqSchema], required: true },
    },
    { timestamps: true }
);
export const McqBankModel = mongoose.model<TMcqBank>("mcq_bank", McqBankSchema);
