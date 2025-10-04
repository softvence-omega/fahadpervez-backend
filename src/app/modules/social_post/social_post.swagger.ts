export const socialPostDocs = {
  "/api/social-post": {
    post: {
      tags: ["Social Post"],
      summary: "Create a new social post",
      security: [{ bearerAuth: [] }],
      requestBody: {
        required: true,
        content: {
          "multipart/form-data": {
            schema: {
              type: "object",
              properties: {
                image: { type: "string", format: "binary" },
                data: {
                  type: "string",
                  description: "JSON string of social post data",
                  example:
                    '{"title": "My Social Post", "description": "This is my social post."}'
                }
              }
            }
          }
        }
      },
      responses: {
        200: { description: "Social post created successfully" }
      }
    },
    get: {
      tags: ["Social Post"],
      summary: "Get all social posts",
      security: [{ bearerAuth: [] }],
      responses: {
        200: { description: "List of social posts" }
      }
    }
  },

  "/api/social-post/{postId}": {
    get: {
      tags: ["Social Post"],
      summary: "Get a single social post by ID with share count",
      security: [{ bearerAuth: [] }],
      parameters: [
        {
          name: "postId",
          in: "path",
          required: true,
          schema: { type: "string" }
        }
      ],
      responses: {
        200: { description: "Single social post data" }
      }
    },
    patch: {
      tags: ["Social Post"],
      summary: "Update a social post",
      security: [{ bearerAuth: [] }],
      parameters: [
        {
          name: "postId",
          in: "path",
          required: true,
          schema: { type: "string" }
        }
      ],
      requestBody: {
        required: true,
        content: {
          "multipart/form-data": {
            schema: {
              type: "object",
              properties: {
                image: { type: "string", format: "binary" },
                data: {
                  type: "string",
                  description: "JSON string of updated social post data"
                }
              }
            }
          }
        }
      },
      responses: {
        200: { description: "Social post updated successfully" }
      }
    },
    delete: {
      tags: ["Social Post"],
      summary: "Delete a social post by ID",
      security: [{ bearerAuth: [] }],
      parameters: [
        {
          name: "postId",
          in: "path",
          required: true,
          schema: { type: "string" }
        }
      ],
      responses: {
        200: { description: "Social post deleted successfully" }
      }
    },
    put: {
      tags: ["Social Post"],
      summary: "Save or update reactions on a social post",
      security: [{ bearerAuth: [] }],
      parameters: [
        {
          name: "postId",
          in: "path",
          required: true,
          schema: { type: "string" }
        }
      ],
      responses: {
        200: { description: "Reaction saved successfully" }
      }
    }
  },

  "/api/social-post/comment/{postId}": {
    put: {
      tags: ["Social Post"],
      summary: "Save a comment on a social post",
      security: [{ bearerAuth: [] }],
      parameters: [
        {
          name: "postId",
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
              properties: {
                comment: {
                  type: "string",
                  example: "This is my comment"
                }
              }
            }
          }
        }
      },
      responses: {
        200: { description: "Comment saved successfully" }
      }
    }
  }
};
