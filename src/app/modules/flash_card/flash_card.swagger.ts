
export const flashCardSwaggerDoc = {
    "/api/flash-card/bulk-create": {
        post: {
            tags: ["Flash Card"],
            summary: "Upload a bulk of flash cards - Only Admin can upload",
            security: [{ bearerAuth: [] }],
            requestBody: {
                required: true,
                content: {
                    "multipart/form-data": {
                        schema: {
                            type: "object",
                            properties: {
                                data: {
                                    type: "string",
                                    description: "Provide a valid data format for MCQs",
                                    example: {
                                        title: "Anatomy Essentials MCQs",
                                        subject: "Neurology",
                                        system: "Anatomy",
                                        topic: "Tonatomy",
                                        subtopic: "Monatomy",
                                        type: "study",
                                        studentType: "Nursing Student"
                                    },
                                },
                                file: {
                                    type: "string",
                                    format: "binary",
                                    description: "Excel file containing MCQ data",
                                },
                            },
                            required: ["data", "file"],
                        },
                    },
                },
            },
            responses: {
                201: { description: "Flash card uploaded successfully" },
                400: { description: "Invalid data format or missing fields" },
                401: { description: "Unauthorized" },
            },
        }
    },
    "/api/flash-card/get-all": {
        get: {
            tags: ["Flash Card"],
            summary: "Get all flash cards - (For Admin)",
            security: [{ bearerAuth: [] }],
            responses: {
                201: { description: "Flash card fetched successfully" },
                401: { description: "Unauthorized" },
            },
        }
    },
    "/api/flash-card/get-all-student": {
        get: {
            tags: ["Flash Card"],
            summary: "Get all flash cards - (For Student)",
            security: [{ bearerAuth: [] }],
            responses: {
                201: { description: "Flash card fetched successfully" },
                401: { description: "Unauthorized" },
            },
        }
    },
    "/api/flash-card/get-single/{flashCardId}": {
        get: {
            tags: ["Flash Card"],
            summary: "Get all flash cards - (For Student)",
            security: [{ bearerAuth: [] }],
            parameters: [
                {
                    name: "flashCardId",
                    in: "path",
                    required: true,
                    schema: { type: "string" }
                }
            ],
            responses: {
                201: { description: "Flash card fetched successfully" },
                401: { description: "Unauthorized" },
            },
        }
    },
    "/api/flash-card/update/{flashCardId}": {
        patch: {
            tags: ["Flash Card"],
            summary: "Update a Flash card using FlashcardId - (For Admin)",
            security: [{ bearerAuth: [] }],
            parameters: [
                {
                    name: "flashCardId",
                    in: "path",
                    required: true,
                    schema: { type: "string" }
                }
            ],
            responses: {
                201: { description: "Flash card fetched successfully" },
                401: { description: "Unauthorized" },
            },
        }
    },
    "/api/flash-card/delete/{flashCardId}": {
        delete: {
            tags: ["Flash Card"],
            summary: "Delete FlashcardId - (For Admin)",
            security: [{ bearerAuth: [] }],
            parameters: [
                {
                    name: "flashCardId",
                    in: "path",
                    required: true,
                    schema: { type: "string" }
                }
            ],
            responses: {
                201: { description: "Flash card fetched successfully" },
                401: { description: "Unauthorized" },
            },
        }
    }
}

