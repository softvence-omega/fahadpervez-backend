export const chatSwaggerDoc = {
    "/api/chat/save-chat": {
        post: {
            tags: ["Chat Bot"],
            summary: "Save Chat history",
            security: [{ bearerAuth: [] }],
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
    "/api/chat/get-all": {
        get: {
            tags: ["Chat Bot"],
            summary: "Get All Chat history",
            security: [{ bearerAuth: [] }],
            parameters: [
                {
                    name: "page",
                    in: "query",
                    required: false,
                    schema: { type: "integer", default: 1 }
                },
                {
                    name: "limit",
                    in: "query",
                    required: false,
                    schema: { type: "integer", default: 10 }
                }
            ],
            responses: {
                200: {
                    description: "Chat history fetched successfully",
                },
            },
        },
    },
    "/api/chat/get-by-sessionId/{id}": {
        get: {
            tags: ["Chat Bot"],
            summary: "Get All Chat history",
            security: [{ bearerAuth: [] }],
            parameters: [
                {
                    name: "id",
                    in: "path",
                    required: true,
                    schema: { type: "string" },
                    description: "You can use session id or id of chat history"
                }
            ],
            responses: {
                200: {
                    description: "Chat history fetched successfully",
                },
            },
        },
    },
};
