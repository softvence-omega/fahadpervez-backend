import mongoose, { Document, Schema } from "mongoose";

interface IOption {
    option: "A" | "B" | "C" | "D";
    optionText: string;
    explanation?: string;
}

interface IMcqSet {
    category: string;
    difficulty: "Easy" | "Medium" | "Hard";
    question: string;
    imageDescription?: string;
    options: IOption[];
    correctOption: "A" | "B" | "C" | "D";
}

export interface IMcqBank extends Document {
    mcqBankTitle: string;
    subjectName: string;
    uploadedBy: string;
    totalMcq: number;
    mcqSets: IMcqSet[];
}

const OptionSchema = new Schema<IOption>(
    {
        option: {
            type: String,
            enum: ["A", "B", "C", "D"],
            required: true,
        },
        optionText: {
            type: String,
            required: true,
            trim: true,
        },
        explanation: {
            type: String,
            default: null,
        },
    },
    { _id: false, versionKey: false }
);

const McqSetSchema = new Schema<IMcqSet>(
    {
        category: {
            type: String,
            required: true,
            trim: true,
        },
        difficulty: {
            type: String,
            enum: ["Easy", "Medium", "Hard"],
            required: true,
        },
        question: {
            type: String,
            required: true,
            trim: true,
        },
        imageDescription: {
            type: String,
            default: null,
        },
        options: {
            type: [OptionSchema],
            validate: [
                (val: IOption[]) => val.length === 4,
                "Exactly four options are required.",
            ],
            required: true,
        },
        correctOption: {
            type: String,
            enum: ["A", "B", "C", "D"],
            required: true,
        },
    },
    { _id: false, versionKey: false }
);

const McqBankSchema = new Schema<IMcqBank>(
    {
        mcqBankTitle: {
            type: String,
            required: true,
            trim: true,
        },
        subjectName: {
            type: String,
            required: true,
            trim: true,
        },
        uploadedBy: {
            type: String,
            required: true,
            trim: true,
        },
        totalMcq: {
            type: Number,
            required: true
        },
        mcqSets: {
            type: [McqSetSchema],
            required: true,
            validate: [
                (val: IMcqSet[]) => val.length > 0,
                "At least one MCQ set is required.",
            ],
        },
    },
    { timestamps: true, versionKey: false }
);

export const McqBankModel = mongoose.model<IMcqBank>("mcq_bank", McqBankSchema);
