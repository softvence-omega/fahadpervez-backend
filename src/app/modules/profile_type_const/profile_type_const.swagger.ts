
export const profile_type_constSwaggerDocs = {
    "/api/profile_type_const/create": {
        post: {
            tags: ["Student Profile Types"],
            summary: "Create a new profile type - It's only accessible by admin",
            description: "Provide a valid type name for the student profile",
            requestBody: {
                required: true,
                content: {
                    "application/json": {
                        schema: {
                            type: "object",
                            required: ["typeName"],
                            properties: {
                                typeName: { type: "string", example: "Dental Student" }
                            }
                        }
                    }
                }
            },
            responses: {
                201: { description: "Profile Type created successfully" },
                400: { description: "Validation error" }
            }
        }
    },
    "/api/profile_type_const/all": {
        get: {
            tags: ["Student Profile Types"],
            summary: "Get all profile types - It's accessible by all users",
            description: "",
            responses: {
                201: { description: "Profile Type retrieved successfully" },
                400: { description: "Validation error" }
            }
        }
    },
    "/api/profile_type_const/update/{typeId}": {
        patch: {
            tags: ["Student Profile Types"],
            summary: "Update a profile type - It's only accessible by admin",
            description: "Provide a valid type name for the student profile and a valid type id",
            parameters: [
                {
                    name: "typeId",
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
                            required: ["typeName"],
                            properties: {
                                typeName: { type: "string", example: "Dental Student" }
                            }
                        }
                    }
                }
            },
            responses: {
                201: { description: "Profile Type updated successfully" },
                400: { description: "Validation error" }
            }
        }
    },
    "/api/profile_type_const/delete/{typeId}": {
        delete: {
            tags: ["Student Profile Types"],
            summary: "Delete a profile type - It's only accessible by admin",
            description: "Provide a valid type id",
            parameters: [
                {
                    name: "typeId",
                    in: "path",
                    required: true,
                    schema: { type: "string" }
                }
            ],
            responses: {
                201: { description: "Profile Type deleted successfully" },
                400: { description: "Validation error" }
            }
        }
    },
}


