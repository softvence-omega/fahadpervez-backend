import { Schema, model } from "mongoose";
import { T_Exam } from "./exam.interface";

const exam_schema = new Schema<T_Exam>({
    examName: { type: String, required: true }
}, { versionKey: false, timestamps: true });

export const exam_model = model("exam", exam_schema);
