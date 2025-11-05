
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
    }
}

