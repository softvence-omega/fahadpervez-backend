export const authDocs = {
    "/api/auth/register": {
        post: {
            tags: ["Auth"],
            summary: "Register a new user",
            requestBody: {
                required: true,
                content: {
                    "application/json": {
                        schema: {
                            type: "object",
                            required: ["email", "password"],
                            properties: {
                                email: { type: "string", example: "user@example.com" },
                                password: { type: "string", example: "secret123" }
                            }
                        }
                    }
                }
            },
            responses: {
                200: { description: "User registered successfully" }
            }
        }
    },

    "/api/auth/login": {
        post: {
            tags: ["Auth"],
            summary: "Login a user",
            requestBody: {
                required: true,
                content: {
                    "application/json": {
                        schema: {
                            type: "object",
                            required: ["email", "password"],
                            properties: {
                                email: { type: "string", example: "user@example.com" },
                                password: { type: "string", example: "123456" }
                            }
                        }
                    }
                }
            },
            responses: {
                200: { description: "User logged in successfully" }
            }
        }
    },

    "/api/auth/me": {
        get: {
            tags: ["Auth"],
            summary: "Get logged-in user's profile",
            security: [{ bearerAuth: [] }],
            responses: {
                200: { description: "Profile data" }
            }
        }
    },

    "/api/auth/forgot-password": {
        post: {
            tags: ["Auth"],
            summary: "Request password reset",
            requestBody: {
                required: true,
                content: {
                    "application/json": {
                        schema: {
                            type: "object",
                            required: ["email"],
                            properties: {
                                email: { type: "string", example: "user@example.com" }
                            }
                        }
                    }
                }
            },
            responses: {
                200: { description: "Password reset email sent" }
            }
        }
    },

    "/api/auth/reset-password": {
        post: {
            tags: ["Auth"],
            summary: "Reset password using OTP",
            requestBody: {
                required: true,
                content: {
                    "application/json": {
                        schema: {
                            type: "object",
                            required: ["email", "otp", "newPassword"],
                            properties: {
                                email: { type: "string", example: "user@example.com" },
                                otp: { type: "string", example: "123456" },
                                newPassword: { type: "string", example: "newPassword123" }
                            }
                        }
                    }
                }
            },
            responses: {
                200: { description: "Password reset successfully" }
            }
        }
    },

    "/api/auth/update-initial-profile": {
        patch: {
            tags: ["Auth"],
            summary: "Update initial profile with file upload",
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
                                    description: "JSON string of profile data"
                                }
                            }
                        }
                    }
                }
            },
            responses: {
                200: { description: "Profile updated successfully" }
            }
        }
    }
};
