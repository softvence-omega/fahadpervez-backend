import { model, Schema } from "mongoose";
import { TChatMessage } from "./chat.interface";


const ChatMessageSchema: Schema<TChatMessage> = new Schema({
  id: { type: String, required: false },
  userId: { type: String, required: false },
  sessionId: { type: String, required: false },
  sessionTitle: { type: String, required: false },
  HumanMessage: { type: String, required: false },
  AIMessage: { type: String, required: false },
}, { versionKey: false, timestamps: true });

export const ChatMessageModel = model<TChatMessage>(
  "chat-message",
  ChatMessageSchema
);
