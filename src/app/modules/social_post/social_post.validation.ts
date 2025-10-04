import { z } from "zod";

const create = z.object({
    topic: z.string({ message: "topic is required" }),
    content: z.string({ message: "content is required" }),
});
const update = z.object({
    topic: z.string({ message: "topic is required" }).optional(),
    content: z.string({ message: "content is required" }).optional(),
});

const create_question = z.object({
    question: z.string({ message: "question is required" }),
})
const update_anser = z.object({
    answer: z.string({ message: "question is required" }),
})

export const social_post_validation = {
    create,
    update,
    create_question,
    update_anser
}