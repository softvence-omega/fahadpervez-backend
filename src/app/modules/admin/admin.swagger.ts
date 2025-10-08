export const adminSwaggerDoc = {
    "/api/admin/overview": {
        get: {
            tags: ["Admin Dashboard API"],
            summary: "Get all Overview for admin",
            security: [{ bearerAuth: [] }],
            responses: {
                200: {
                    description: "Data fetched successfully.",
                },
                401: { description: "Unauthorized" },
            },
        },
    },
    "/api/admin/students": {
        get: {
            tags: ["Admin Dashboard API"],
            summary: "Get all students for admin",
            security: [{ bearerAuth: [] }],
            parameters: [
                {
                    name: "search",
                    in: "query",
                    required: false,
                    schema: { type: "string" }
                },
                {
                    name: "year_of_study",
                    in: "query",
                    required: false,
                    schema: { type: "string" }
                },
                {
                    name: "preparingFor",
                    in: "query",
                    required: false,
                    schema: { type: "string" }
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
                200: {
                    description: "Data fetched successfully.",
                },
                401: { description: "Unauthorized" },
            },
        },
    },
    "/api/admin/student/{studentId}": {
        get: {
            tags: ["Admin Dashboard API"],
            summary: "Get student by id",
            security: [{ bearerAuth: [] }],
            parameters: [
                {
                    name: "studentId",
                    in: "path",
                    required: true,
                    schema: { type: "string" }
                }
            ],
            responses: {
                200: {
                    description: "Data fetched successfully.",
                },
                401: { description: "Unauthorized" },
                404: { description: "Student not found" },
            },
        },
        delete: {
            tags: ["Admin Dashboard API"],
            summary: "Delete student by id",
            security: [{ bearerAuth: [] }],
            parameters: [
                {
                    name: "studentId",
                    in: "path",
                    required: true,
                    schema: { type: "string" }
                }
            ],
            responses: {
                200: {
                    description: "Student account deleted successfully.",
                },
                401: { description: "Unauthorized" },
                404: { description: "Student not found" },
            },
        },
    },

};
