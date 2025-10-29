import path from "path";
import { configs } from "./app/configs";
import { adminSwaggerDoc } from "./app/modules/admin/admin.swagger";
import { authDocs } from "./app/modules/auth/auth.swagger";
import { chatSwaggerDoc } from "./app/modules/chat/chat.swagger";
import { clinicalCaseSwagger } from "./app/modules/clinical_case/clinical_case.swagger";
import { mcqBankSwaggerDoc } from "./app/modules/mcq_bank/mcq_bank.swagger";
import { socialPostDocs } from "./app/modules/social_post/social_post.swagger";
import { studyModeTreeSwaggerDocs } from "./app/modules/study_mode_tree/study_mode_tree.swagger";


export const swaggerOptions = {
    definition: {
        openapi: "3.0.0",
        info: {
            title: "Fahad Pervez API - Team Future-Stack",
            version: "1.0.0",
            description: "Express API with auto-generated Swagger docs",
        },
        paths: {
            ...authDocs,
            ...adminSwaggerDoc,
            ...clinicalCaseSwagger,
            ...socialPostDocs,
            ...chatSwaggerDoc,
            ...mcqBankSwaggerDoc,

            ...studyModeTreeSwaggerDocs,
        },
        servers: configs.env === "production" ? [
            { url: "https://fahadpervez-backend.onrender.com" },
            { url: "http://localhost:5000" },
        ] : [
            { url: "http://localhost:5000" },
            { url: "https://fahadpervez-backend.onrender.com" },
        ],
        components: {
            securitySchemes: {
                AuthorizationToken: {
                    type: "apiKey",
                    in: "header",
                    name: "Authorization",
                    description: "Put your accessToken here ",
                },
            },
        },
        security: [
            {
                AuthorizationToken: []
            },
        ],
    },
    apis: [
        path.join(
            __dirname,
            configs.env === "production" ? "./**/*.js" : "./**/*.ts"
        ),
    ],
};
