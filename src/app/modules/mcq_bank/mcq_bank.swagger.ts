export const mcqBankSwaggerDoc = {
    "/api/mcq-bank/upload-bulk": {
        post: {
            tags: ["MCQ Bank"],
            summary: "Upload a bulk of MCQs",
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
                201: { description: "MCQ bank uploaded successfully" },
                400: { description: "Invalid data format or missing fields" },
                401: { description: "Unauthorized" },
            },
        },
    },

    "/api/mcq-bank": {
        get: {
            tags: ["MCQ Bank"],
            summary: "Get all MCQ banks with pagination and search",
            security: [{ bearerAuth: [] }],
            parameters: [
                {
                    name: "page",
                    in: "query",
                    description: "Page number for pagination (default: 1)",
                    required: false,
                    schema: { type: "integer", example: 1 },
                },
                {
                    name: "limit",
                    in: "query",
                    description: "Number of items per page (default: 10)",
                    required: false,
                    schema: { type: "integer", example: 10 },
                },
                {
                    name: "searchTerm",
                    in: "query",
                    description: "Search by mcqBankTitle or category",
                    required: false,
                    schema: { type: "string", example: "anatomy" },
                },
            ],
            responses: {
                200: { description: "Paginated list of MCQ banks fetched successfully" },
                401: { description: "Unauthorized" }
            }
        }
    },

    "/api/mcq-bank/{id}": {
        get: {
            tags: ["MCQ Bank"],
            summary: "Get a single MCQ bank by ID",
            security: [{ bearerAuth: [] }],
            parameters: [
                {
                    name: "id",
                    in: "path",
                    required: true,
                    description: "MCQ Bank ID",
                    schema: { type: "string" },
                },
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
                200: { description: "MCQ bank fetched successfully" },
                404: { description: "MCQ bank not found" },
                401: { description: "Unauthorized" },
            },
        },
        delete: {
            tags: ["MCQ Bank"],
            summary: "Delete an MCQ bank by ID",
            security: [{ bearerAuth: [] }],
            parameters: [
                {
                    name: "id",
                    in: "path",
                    required: true,
                    description: "MCQ Bank ID",
                    schema: { type: "string" },
                },
            ],
            responses: {
                200: { description: "MCQ bank deleted successfully" },
                404: { description: "MCQ bank not found" },
                401: { description: "Unauthorized" },
            },
        },
    },

    "/api/mcq-bank/{id}/question/{questionIndex}": {
        patch: {
            tags: ["MCQ Bank"],
            summary: "Update a specific question in an MCQ bank by index",
            security: [{ bearerAuth: [] }],
            parameters: [
                {
                    name: "id",
                    in: "path",
                    required: true,
                    description: "MCQ Bank ID",
                    schema: { type: "string" },
                },
                {
                    name: "questionIndex",
                    in: "path",
                    required: true,
                    description: "Index of the question to update (0-based)",
                    schema: { type: "integer" },
                },
            ],
            requestBody: {
                required: true,
                content: {
                    "application/json": {
                        schema: {
                            type: "object",
                            properties: {
                                difficulty: {
                                    type: "string",
                                    enum: ["Basics", "Intermediate", "Advance"],
                                    example: "Intermediate",
                                },
                                question: {
                                    type: "string",
                                    example: "Which cranial nerve controls facial expressions?",
                                },
                                optionA: { type: "string", example: "Optic nerve" },
                                optionB: { type: "string", example: "Facial nerve" },
                                optionC: { type: "string", example: "Trigeminal nerve" },
                                optionD: { type: "string", example: "Vagus nerve" },
                                optionE: { type: "string", example: "Vagus nerve" },
                                optionF: { type: "string", example: "Vagus nerve" },
                                correctOption: {
                                    type: "string",
                                    enum: ["A", "B", "C", "D", "E", "F"],
                                    example: "B",
                                },
                                explanationB: {
                                    type: "string",
                                    example: "The facial nerve controls muscles of facial expression.",
                                },
                            },
                        },
                    },
                },
            },
            responses: {
                200: { description: "Question updated successfully" },
                400: { description: "Invalid question index or payload" },
                401: { description: "Unauthorized" },
                404: { description: "MCQ bank not found" },
            },
        },
    },
    "/api/mcq-bank/save-report": {
        post: {
            tags: ["MCQ Bank"],
            summary: "Send a report for an MCQ",
            security: [{ bearerAuth: [] }],
            requestBody: {
                required: true,
                content: {
                    "application/json": {
                        schema: {
                            type: "object",
                            properties: {
                                questionBankId: {
                                    type: "string",
                                    example: "69086df1267c5d421266eb46"
                                },
                                questionIndex: {
                                    type: "number",
                                    example: 1,
                                },
                                text: {
                                    type: "string",
                                    example: "This option is not correct"
                                }
                            }
                        }
                    }
                }
            },
            responses: {
                200: { description: "Question updated successfully" },
                400: { description: "Invalid question index or payload" },
                401: { description: "Unauthorized" },
                404: { description: "MCQ bank not found" },
            },
        },
    },
};
