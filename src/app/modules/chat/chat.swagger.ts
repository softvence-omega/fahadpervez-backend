export const chatSwaggerDoc = {
    "/api/chat/save-chat": {
        post: {
            tags: ["Chat Bot"],
            summary: "Save Chat history",
            requestBody: {
                required: true,
                content: {
                    "application/json": {
                        schema: {
                            type: "object",
                            properties: {
                                title: { type: "string", example: "Diabetes Mellitus" },
                                description: { type: "string", example: "Case details..." },
                                required: ["title", "description"],
                                id: { type: "string", example: "chat-1" },
                                sessionId: { type: "string", example: "session-1" },
                                sessionTitle: { type: "string", example: "Python Guide" },
                                HumanMessage: { type: "string", example: "How to learn python?" },
                                AIMessage: { type: "string", example: "Learn python in 30 days" },
                            },
                        },
                    },
                },
            },
            responses: {
                201: {
                    description: "Chat history saved successfully",
                },
            },
        },
    },
};
