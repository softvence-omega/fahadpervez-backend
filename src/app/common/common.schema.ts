import { Document, Schema } from "mongoose";

export interface ICommonPreference extends Document {
    subject: string;
    systemPreference: string;
    topic: string;
    subTopic: string;
}

export const CommonPreferenceSchema: Schema<ICommonPreference> = new Schema(
    {
        subject: { type: String, required: true, trim: true },
        systemPreference: { type: String, required: true, trim: true },
        topic: { type: String, required: true, trim: true },
        subTopic: { type: String, required: true, trim: true },
    },
    { timestamps: true, _id: false, versionKey: false }
);
