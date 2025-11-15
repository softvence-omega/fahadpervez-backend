export const notesSwaggerDocs = {
  "/api/notes/create": {
    post: {
      tags: ["Notes - (Admin-Student)"],
      summary: "notes create",
      description: "This is auto generated notes create API",
      requestBody: {
        required: true,
        content: {
          "multipart/form-data": {
            schema: {
              type: "object",
              properties: {
                data: {
                  type: "string",
                  example: `{
                  "title":"Sample Note",
                  "description":"Sample Description",
                  "subject":"Anatomy",
                  "system":"Reading",
                  "topic":"Sample Topic",
                  "subtopic":"Sample Subtopic",
                  "studentType":"Sample Student Type",
                  "type":"exam"
                  }`
                },
                files: {
                  type: "array",
                  items: {
                    type: "string",
                    format: "binary"
                  },
                  maxItems: 10
                }
              }
            }
          }
        }
      },
      responses: {
        201: { description: "notes created successfully" },
        400: { description: "Validation error" }
      }
    }
  },
  "/api/notes/all": {
    get: {
      tags: ["Notes - (Admin-Student)"],
      summary: "Get all Notes with pagination and search",
      security: [{ bearerAuth: [] }],
      parameters: [
        {
          name: "searchTerm",
          in: "query",
          description: "Search by mcqBankTitle",
          required: false,
          schema: { type: "string" }
        },
        {
          name: "type",
          in: "query",
          description: "Filter by type - exam or study",
          required: false,
          schema: { type: "string" }
        },
        {
          name: "subject",
          in: "query",
          description: "Filter by subject",
          required: false,
          schema: { type: "string" }
        },
        {
          name: "system",
          in: "query",
          description: "Filter by system",
          required: false,
          schema: { type: "string" }
        },
        {
          name: "topic",
          in: "query",
          description: "Filter by topic",
          required: false,
          schema: { type: "string" }
        },
        {
          name: "subtopic",
          in: "query",
          description: "Filter by subtopic",
          required: false,
          schema: { type: "string" }
        },
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

      ],
      responses: {
        200: { description: "Paginated list of Notes fetched successfully" },
        401: { description: "Unauthorized" }
      }
    }
  },
  "/api/notes/single/{noteId}": {
    get: {
      tags: ["Notes - (Admin-Student)"],
      summary: "Get single Note",
      security: [{ bearerAuth: [] }],
      parameters: [
        {
          name: "noteId",
          in: "path",
          description: "Provide a valid noteId",
          required: true,
          schema: { type: "string" }
        }
      ],
      responses: {
        200: { description: "Note fetched successful" },
        401: { description: "Unauthorized" }
      }
    }
  },
  "/api/notes/delete/{noteId}": {
    delete: {
      tags: ["Notes - (Admin-Student)"],
      summary: "Delete single Note - Admin",
      security: [{ bearerAuth: [] }],
      parameters: [
        {
          name: "noteId",
          in: "path",
          description: "Provide a valid noteId",
          required: true,
          schema: { type: "string" }
        }
      ],
      responses: {
        200: { description: "Note deleted successful" },
        401: { description: "Unauthorized" }
      }
    }
  },
};
