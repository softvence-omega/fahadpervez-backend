import { Types } from "mongoose";

type CardCustomization = {
  prompt: string;
  sectionName: string;
  maxFlash: number;
  category: string;
  level: "EASY" | "MEDIUM" | "HARD";
  isPublic: boolean;
};
type AiFlashCard = {
  category: string;
  topicName: string;
  level:string;
  accountId: string;
};

export type TFlashCard = {
  postedBy: Types.ObjectId;
  cardCustomization: CardCustomization[];
  aiFlashCard?: AiFlashCard[];
  uploadMedia?: string;
  isDeleted: boolean;
};
