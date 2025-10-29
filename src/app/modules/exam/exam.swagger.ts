
export const examSwaggerDocs = {
    "/api/exam/create": {
        post: {
            tags: ["Exam Management -(Admin)"],
            summary: "Create new Exam",
            description: "Pass a valid object with examName",
            security: [{ bearerAuth: [] }],
            requestBody: {
                required: true,
                content: {
                    "application/json": {
                        schema: {
                            type: "object",
                            required: ["examName"],
                            properties: {
                                examName: { type: "string", example: "Anatomy" }
                            }
                        }
                    }
                }
            },
            responses: {
                201: { description: "exam created successfully" },
                400: { description: "Validation error" }
            }
        }
    },
    "/api/exam/all": {
        get: {
            tags: ["Exam Management -(Admin)"],
            summary: "Get all Exam",
            description: "No need anything only valid admin access this",
            security: [{ bearerAuth: [] }],
            responses: {
                201: { description: "exam fetched successfully" },
                400: { description: "Validation error" }
            }
        }
    },
    "/api/exam/update/{examId}": {
        patch: {
            tags: ["Exam Management -(Admin)"],
            summary: "Update Exam Name by Id",
            description: "Pass the exam id on param path and examName in body with valid json object",
            security: [{ bearerAuth: [] }],
            parameters: [
                {
                    name: "examId",
                    in: "path",
                    required: true,
                    schema: { type: "string" }
                }
            ],
            requestBody: {
                required: true,
                content: {
                    "application/json": {
                        schema: {
                            type: "object",
                            required: ["examName"],
                            properties: {
                                examName: { type: "string", example: "Nurology" }
                            }
                        }
                    }
                }
            },
            responses: {
                201: { description: "exam update successfully" },
                400: { description: "Validation error" }
            }
        }
    },
    "/api/exam/delete/{examId}": {
        delete: {
            tags: ["Exam Management -(Admin)"],
            summary: "Delete Exam by Id",
            description: "Pass a valid exam id on param path",
            security: [{ bearerAuth: [] }],
            parameters: [
                {
                    name: "examId",
                    in: "path",
                    required: true,
                    schema: { type: "string" }
                }
            ],
            responses: {
                201: { description: "exam delete successfully" },
                400: { description: "Validation error" }
            }
        }
    },
}


