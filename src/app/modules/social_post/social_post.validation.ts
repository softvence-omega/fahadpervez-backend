import { z } from "zod";

const create = z.object({
    topic: z.string({ message: "topic is required" }),
    content: z.string({ message: "content is required" }),
});
const update = z.object({
    topic: z.string({ message: "topic is required" }).optional(),
    content: z.string({ message: "content is required" }).optional(),
});


export const social_post_validation = {
    create,
    update
}