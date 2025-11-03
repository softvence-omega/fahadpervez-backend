import { z } from "zod";

export const optionZodSchema = z.object({
    option: z.enum(["A", "B", "C", "D", "E", "F"]),
    optionText: z.string().min(1, "Option text is required").optional(),
    explanation: z.string().optional(),
});

export const mcqZodSchema = z.object({
    difficulty: z.enum(["Basics", "Intermediate", "Advance"]),
    question: z.string().min(1, "Question is required"),
    imageDescription: z.string().optional(),
    options: z
        .array(optionZodSchema)
        .min(2, "Each MCQ must have at least two options"),
    correctOption: z.enum(["A", "B", "C", "D", "E", "F"]),
});

export const create = z.object({
    title: z.string().min(1, "Title is required"),
    subject: z.string().min(1, "Subject is required"),
    system: z.string().min(1, "System is required"),
    topic: z.string().min(1, "Topic is required"),
    subtopic: z.string().min(1, "Subtopic is required"),
    type: z.enum(["exam", "study"]),
    uploadedBy: z.string().min(1, "Uploader is required"),
    mcqs: z.array(mcqZodSchema).nonempty("At least one MCQ is required"),
});


export const mcq_validation = {
    create
}
