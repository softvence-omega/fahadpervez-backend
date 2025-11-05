import { Schema, model } from "mongoose";
import { T_ProfileTypeConst } from "./profile_type_const.interface";

const profile_type_const_schema = new Schema<T_ProfileTypeConst>({
    typeName: { type: String, required: true, unique: true, index: true },
    totalContent: { type: Number, required: true, default: 0 },
    totalStudent: { type: Number, required: true, default: 0 }
}, { versionKey: false, timestamps: true });

export const profile_type_const_model = model("profile_type_const", profile_type_const_schema);
