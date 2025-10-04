export const clinicalCaseSwagger = {
  "/api/clinical-case/create-new": {
    post: {
      tags: ["Clinical Case"],
      summary: "Create a new clinical case",
      requestBody: {
        required: true,
        content: {
          "application/json": {
            schema: {
              type: "object",
              properties: {
                title: { type: "string", example: "Diabetes Mellitus" },
                description: { type: "string", example: "Case details..." },
              },
              required: ["title", "description"],
            },
          },
        },
      },
      responses: {
        201: {
          description: "Clinical case created successfully",
        },
      },
    },
  },

  "/api/clinical-case": {
    get: {
      tags: ["Clinical Case"],
      summary: "Get all clinical cases",
      responses: {
        200: {
          description: "List of clinical cases",
        },
      },
    },
  },

  "/api/clinical-case/{caseId}": {
    get: {
      tags: ["Clinical Case"],
      summary: "Get a single clinical case",
      parameters: [
        {
          name: "caseId",
          in: "path",
          required: true,
          schema: { type: "string" },
        },
      ],
      responses: {
        200: { description: "Single clinical case" },
      },
    },
    patch: {
      tags: ["Clinical Case"],
      summary: "Update clinical case by ID",
      parameters: [
        {
          name: "caseId",
          in: "path",
          required: true,
          schema: { type: "string" },
        },
      ],
      requestBody: {
        content: {
          "application/json": {
            schema: {
              type: "object",
              properties: {
                title: { type: "string", example: "Updated Title" },
                description: { type: "string", example: "Updated description" },
              },
            },
          },
        },
      },
      responses: {
        200: { description: "Updated successfully" },
      },
    },
    delete: {
      tags: ["Clinical Case"],
      summary: "Delete clinical case by ID",
      parameters: [
        {
          name: "caseId",
          in: "path",
          required: true,
          schema: { type: "string" },
        },
      ],
      responses: {
        200: { description: "Deleted successfully" },
      },
    },
  },
};
