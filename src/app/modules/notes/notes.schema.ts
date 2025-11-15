import { Schema, model } from "mongoose";
import { T_Notes } from "./notes.interface";

const fileSchema = new Schema(
    {
        fileId: { type: String, required: true },
        fileType: { type: String, required: true },
        fileUrl: { type: String, required: true },
        fileName: { type: String, required: true }
    }, { versionKey: false, timestamps: false, _id: false }
)

const notes_schema = new Schema<T_Notes>({
    title: { type: String, required: true },
    description: { type: String, required: false },
    subject: { type: String, required: true },
    system: { type: String, required: true },
    topic: { type: String, required: true },
    subtopic: { type: String, required: true },
    slug: { type: String, required: true },
    studentType: { type: String, required: true },
    type: { type: String, enum: ["exam", "study"], required: true },
    uploadedBy: { type: String, required: true },
    notes: [fileSchema],
}, { timestamps: true, versionKey: false });

export const notes_model = model("notes", notes_schema);
