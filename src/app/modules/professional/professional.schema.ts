import mongoose, { Schema, Document, Types } from "mongoose";
import { TCommonPreference } from "../../types/common";
import { CommonPreferenceSchema } from "../../common/common.schema";

// If you have TCommonPreference, define a schema for it as well

export interface IProfessional extends Document {
  accountId: Types.ObjectId;
  firstName: string;
  lastName: string;
  profile_photo: string;
  institution: string;
  country: string;
  post_graduate: string;
  experience: string;
  bio: string;
  preference?: TCommonPreference;
}

const ProfessionalSchema = new Schema<IProfessional>(
  {
    accountId: { type: Schema.Types.ObjectId, ref: "account", required: true },
    firstName: { type: String, required: false },
    lastName: { type: String, required: false },
    profile_photo: { type: String, required: false },
    institution: { type: String, required: false },
    country: { type: String, required: false },
    post_graduate: { type: String, required: false },
    experience: { type: String, required: false },
    bio: { type: String, required: false },
    preference: { type: CommonPreferenceSchema, required: false },
  },
  { timestamps: true ,versionKey:false}
);

export const ProfessionalModel = mongoose.model<IProfessional>(
  "professional",
  ProfessionalSchema
);
