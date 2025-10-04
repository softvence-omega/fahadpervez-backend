import cookieParser from 'cookie-parser';
import cors from 'cors';
import express, { Request, Response } from 'express';
import path from 'path';
import swaggerJsdoc from "swagger-jsdoc";
import swaggerUi from "swagger-ui-express";
import { configs } from './app/configs';
import globalErrorHandler from './app/middlewares/global_error_handler';
import notFound from './app/middlewares/not_found_api';
import { authDocs } from './app/modules/auth/auth.swagger';
import { clinicalCaseSwagger } from './app/modules/clinical_case/clinical_case.swagger';
import { socialPostDocs } from './app/modules/social_post/social_post.swagger';
import appRouter from './routes';
const app = express()


const swaggerOptions = {
    definition: {
        openapi: "3.0.0",
        info: {
            title: "Fahad Pervez API - Team Future-Stack",
            version: "1.0.0",
            description: "Express API with auto-generated Swagger docs",
        },
        paths: {
            ...authDocs,
            ...clinicalCaseSwagger,
            ...socialPostDocs
        },
        servers: [
            { url: "https://fahadpervez-backend.onrender.com" },
            { url: "http://localhost:5000" },
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


const swaggerSpec = swaggerJsdoc(swaggerOptions);
app.use("/docs", swaggerUi.serve, swaggerUi.setup(swaggerSpec));


// middleware
app.use(cors({
    origin: ["http://localhost:3000", "http://localhost:5173", "https://ai-student-protal.netlify.app"],
    methods: ["GET", "POST", "PATCH", "DELETE", "PUT"],
    credentials: true
}))
app.use(express.json({ limit: "100mb" }))
app.use(express.raw())
app.use(cookieParser())
app.use(express.urlencoded({ extended: true }));
app.use("/api", appRouter)


app.get("/", (req: Request, res: Response) => {
    res.status(200).json({
        status: "success",
        message: "Server is running successful !!",
        data: null,
    });
});


// global error handler
app.use(globalErrorHandler);
app.use(notFound);

// export app
export default app;