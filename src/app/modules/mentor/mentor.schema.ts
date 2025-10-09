import { model, Schema } from "mongoose";

const mentorSchema = new Schema({
    firstName: { type: String, required: false },
    lastName: { type: String, required: false },
    specialties: { type: String, required: false },
    experience: { type: String, required: false },
})


export const MentorModel = model("mentor_profile", mentorSchema)