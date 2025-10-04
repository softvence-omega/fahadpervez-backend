import { model, Schema } from "mongoose";
import { TFlashCard } from "./flash_card.interface";

// ---------- CardCustomization Sub-Schema ----------
const CardCustomizationSchema = new Schema(
  {
    prompt: { type: String, required: true },
    sectionName: { type: String, required: true },
    maxFlash: { type: Number, default: 0 },
    category: { type: String, required: true },
    level: {
      type: String,
      enum: ["EASY", "MEDIUM", "HARD"],
      required: true,
    },
    isPublic: { type: Boolean, default: false },
  },
  { _id: false }
);

// ---------- AiFlashCard Sub-Schema ----------
const AiFlashCardSchema = new Schema(
  {
    category: { type: String, required: true },
    topicName: { type: String, required: true },
    level: { type: String, required: true },
  },
  { _id: false }
);

// ---------- FlashCard Main Schema ----------
const FlashCardSchema = new Schema<TFlashCard>(
  {
    postedBy: {
      type: Schema.Types.ObjectId,
      required: true,
      ref: "account", // dynamic ref
    },
    cardCustomization: { type: [CardCustomizationSchema], default: [] },
    aiFlashCard: { type: [AiFlashCardSchema], default: [] },
    uploadMedia: { type: String },
    isDeleted: { type: Boolean, default: false },
  },
  {
    timestamps: true,
    versionKey: false,
  }
);

// ---------- Export Model ----------
export const FlashcardModel = model<TFlashCard>("flash_card", FlashCardSchema);
