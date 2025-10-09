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
                    description: "Student fetched successfully.",
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
    "/api/admin/professionals": {
        get: {
            tags: ["Admin Dashboard API"],
            summary: "Get all Professionals for admin",
            security: [{ bearerAuth: [] }],
            parameters: [
                {
                    name: "search",
                    in: "query",
                    required: false,
                    schema: { type: "string" }
                },
                {
                    name: "post_graduate",
                    in: "query",
                    required: false,
                    schema: { type: "string" }
                },
                {
                    name: "experience",
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
    "/api/admin/professional/{accountId}": {
        get: {
            tags: ["Admin Dashboard API"],
            summary: "Get Professional by accountId",
            security: [{ bearerAuth: [] }],
            parameters: [
                {
                    name: "accountId",
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
                404: { description: "Professional not found" },
            },
        },
        delete: {
            tags: ["Admin Dashboard API"],
            summary: "Delete professional by accountId",
            security: [{ bearerAuth: [] }],
            parameters: [
                {
                    name: "accountId",
                    in: "path",
                    required: true,
                    schema: { type: "string" }
                }
            ],
            responses: {
                200: {
                    description: "Professional account deleted successfully.",
                },
                401: { description: "Unauthorized" },
                404: { description: "Professional not found" },
            },
        },
    },
    "/api/admin/mentors": {
        get: {
            tags: ["Admin Dashboard API"],
            summary: "Get all Mentors for admin",
            security: [{ bearerAuth: [] }],
            parameters: [
                {
                    name: "search",
                    in: "query",
                    required: false,
                    schema: { type: "string" },
                    description: "Search mentors by firstName or lastName",
                },
                {
                    name: "specialties",
                    in: "query",
                    required: false,
                    schema: { type: "string" },
                    description: "Filter mentors by specialties",
                },
                {
                    name: "experience",
                    in: "query",
                    required: false,
                    schema: { type: "string" },
                    description: "Filter mentors by years of experience",
                },
                {
                    name: "page",
                    in: "query",
                    required: false,
                    schema: { type: "integer", default: 1 },
                },
                {
                    name: "limit",
                    in: "query",
                    required: false,
                    schema: { type: "integer", default: 10 },
                },
            ],
            responses: {
                200: {
                    description: "Mentors fetched successfully.",
                },
                401: { description: "Unauthorized" },
            },
        },
    },

    "/api/admin/mentor/{accountId}": {
        get: {
            tags: ["Admin Dashboard API"],
            summary: "Get Mentor by accountId",
            security: [{ bearerAuth: [] }],
            parameters: [
                {
                    name: "accountId",
                    in: "path",
                    required: true,
                    schema: { type: "string" },
                    description: "The ID of the mentor account",
                },
            ],
            responses: {
                200: {
                    description: "Mentor fetched successfully.",
                },
                401: { description: "Unauthorized" },
                404: { description: "Mentor not found" },
            },
        },
        delete: {
            tags: ["Admin Dashboard API"],
            summary: "Delete Mentor by accountId",
            security: [{ bearerAuth: [] }],
            parameters: [
                {
                    name: "accountId",
                    in: "path",
                    required: true,
                    schema: { type: "string" },
                    description: "The ID of the mentor account",
                },
            ],
            responses: {
                200: {
                    description: "Mentor account deleted successfully.",
                },
                401: { description: "Unauthorized" },
                404: { description: "Mentor not found" },
            },
        },
    },


};
