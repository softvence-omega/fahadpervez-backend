import z from "zod";

export const bulk_upload = z.object({
    mcqBankTitle: z.string().min(1, "MCQ bank title is required"),
    subjectName: z.string().min(1, "Subject name is required"),
});

export const mcq_validation = {
    bulk_upload
}