import { model, Schema } from "mongoose";
import { TFlashCard } from "./flash_card.interface";


const CardSchema = new Schema(
  {
    flashCardId: { type: String, required: true },
    frontText: { type: String, required: true },
    backText: { type: String, required: true },
    explanation: { type: String, required: true },
    difficulty: {
      type: String,
      enum: ["Basics", "Intermediate", "Advance"],
      required: true
    }
  }, { versionKey: false, timestamps: false, _id: false }
)

const FlashCardSchema = new Schema<TFlashCard>(
  {
    title: { type: String, required: true },
    subject: { type: String, required: true },
    system: { type: String, required: true },
    topic: { type: String, required: true },
    subtopic: { type: String, required: true },
    slug: { type: String, required: true },
    studentType: { type: String, required: true },
    type: { type: String, enum: ["exam", "study"], required: true },
    uploadedBy: { type: String, required: true },
    flashCards: [CardSchema]
  },
  {
    timestamps: true,
    versionKey: false,
  }
);

export const FlashcardModel = model<TFlashCard>("flash_card", FlashCardSchema);
