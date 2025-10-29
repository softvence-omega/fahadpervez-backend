
export const studyModeTreeSwaggerDocs = {
    "/api/study_mode_tree/create": {
        post: {
            tags: ["Study Mode Tree -(Admin)"],
            summary: "Create a new Content Management Admin entry",
            security: [{ bearerAuth: [] }],
            description: "Creates a new content management structure including subjects, systems, topics, and subtopics.",
            requestBody: {
                required: true,
                content: {
                    "application/json": {
                        schema: {
                            type: "object",
                            required: ["subjectName", "systems"],
                            example: {
                                subjectName: "Computer Science",
                                systems: [
                                    {
                                        name: "Operating Systems",
                                        topics: [
                                            {
                                                topicName: "Memory Management",
                                                subTopics: [
                                                    { subtopicName: "Paging" }
                                                ]
                                            },
                                            {
                                                topicName: "Process Management",
                                                subTopics: [
                                                    { subtopicName: "Threads" }
                                                ]
                                            }
                                        ]
                                    },
                                    {
                                        name: "Computer Networks",
                                        topics: [
                                            {
                                                topicName: "Network Layers",
                                                subTopics: [
                                                    { subtopicName: "Application Layer" }
                                                ]
                                            },
                                            {
                                                topicName: "Network Protocols",
                                                subTopics: [
                                                    { subtopicName: "TCP/IP" }
                                                ]
                                            }
                                        ]
                                    }
                                ]
                            }
                        }
                    }
                }
            },
            responses: {
                201: { description: "ContentManagementAdmin created successfully" },
                400: { description: "Validation error" }
            }
        }
    },
    "/api/study_mode_tree/all": {
        get: {
            tags: ["Study Mode Tree -(Admin)"],
            summary: "Get all Content Management Admin entries",
            security: [{ bearerAuth: [] }],
            description: "Retrieves a list of all content management structures.",
            responses: {
                201: { description: "Data fetched successfully" },
                400: { description: "Internal server error" }
            }
        }
    },
    "/api/study_mode_tree/update/{treeId}": {
        patch: {
            tags: ["Study Mode Tree -(Admin)"],
            summary: "Update a Content Management tree",
            description: "Updates a content management tree based on the provided tree ID. Please send all existing data + new data.",
            parameters: [
                {
                    name: "treeId",
                    in: "path",
                    required: true,
                    schema: { type: "string" },
                    description: "Provide a content management tree ID"
                }
            ],
            requestBody: {
                required: true,
                content: {
                    "application/json": {
                        schema: {
                            type: "object",
                            required: ["subjectName", "systems"],
                            example: {
                                subjectName: "Computer Science",
                                systems: [
                                    {
                                        name: "Operating Systems",
                                        topics: [
                                            {
                                                topicName: "Memory Management",
                                                subTopics: [
                                                    { subtopicName: "Paging" }
                                                ]
                                            },
                                            {
                                                topicName: "Process Management",
                                                subTopics: [
                                                    { subtopicName: "Threads" }
                                                ]
                                            }
                                        ]
                                    },
                                    {
                                        name: "Computer Networks",
                                        topics: [
                                            {
                                                topicName: "Network Layers",
                                                subTopics: [
                                                    { subtopicName: "Application Layer" }
                                                ]
                                            },
                                            {
                                                topicName: "Network Protocols",
                                                subTopics: [
                                                    { subtopicName: "TCP/IP" }
                                                ]
                                            }
                                        ]
                                    }
                                ]
                            }
                        }
                    }
                }
            },
            responses: {
                201: { description: "Content Management tree updated successfully" },
                400: { description: "Validation error" }
            }
        }
    },
    "/api/study_mode_tree/delete/{treeId}": {
        delete: {
            tags: ["Study Mode Tree -(Admin)"],
            summary: "Delete content management tree",
            description: "Deletes a content management tree based on the provided tree ID.",
            parameters: [
                {
                    name: "treeId",
                    in: "path",
                    required: true,
                    schema: { type: "string" },
                    description: "Provide a content management tree ID"
                }
            ],
            responses: {
                201: { description: "Content Management tree deleted successfully" },
                400: { description: "Internal server error" }
            }
        }
    },

}


