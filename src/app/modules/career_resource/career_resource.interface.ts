import { Types } from "mongoose";
import { ProfileType } from "../auth/auth.interface";

type TResourceTopic = "Residency Road maps" | "CV Template" | "Personal Statement" | "Research" | "Interview preparation"
export type TCareerResource = {
    uploadedBy: Types.ObjectId;
    profileType: ProfileType;
    resourceName: string;
    shortDescription: string;
    totalDownloads: number;
    resourceLink: string;
    topic: TResourceTopic[]
}