import { model, Schema } from "mongoose";

const mentorSchema = new Schema({
    name: { type: String, required: false }
})


export const MentorModel = model("mentor_profile", mentorSchema)