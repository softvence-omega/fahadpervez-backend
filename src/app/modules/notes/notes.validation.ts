import { z } from "zod";

const create = z.object({
    title: z.string(),
    description: z.string().optional(),
    subject: z.string(),
    system: z.string(),
    topic: z.string(),
    subtopic: z.string(),
    studentType: z.string(),
    type: z.enum(["exam", "study"])
});

export const notes_validations = { create };
