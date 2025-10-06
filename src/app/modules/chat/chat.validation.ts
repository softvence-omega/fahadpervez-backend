import { z } from "zod";

const create = z.object({
    id: z.string().optional(),
    sessionId: z.string().optional(),
    sessionTitle: z.string().optional(),
    HumanMessage: z.string().optional(),
    AIMessage: z.string().optional(),
});

export const chat_validation = {
    create,
};
