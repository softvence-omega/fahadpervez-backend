import { z } from "zod";

export const commonPreferenceValidationSchema = z.object({
  subject: z.string().min(1, "Subject is required"),
  systemPreference: z.string().min(1, "System Preference is required"),
  topic: z.string().min(1, "Topic is required"),
  subTopic: z.string().min(1, "Sub-topic is required"),
});

