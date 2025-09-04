import { z } from "zod";

const create = z.object({
    publishedBy: z.string().regex(/^[0-9a-fA-F]{24}$/, "Invalid ObjectId").optional(),
    caseName: z.string(),
    topic: z.string(),

    patientDetails: z
        .object({
            age: z.number(),
            sex: z.enum(["MALE", "FEMALE", "OTHER"]),
            ethnicity: z.string(),
            occupation: z.string(),
            remark: z.string(),
        })
        .optional(),

    caseHistory: z.string().optional(),

    vital_signs: z
        .object({
            temperature: z.string(),
            heartRate: z.string(),
            bloodPressure: z.string(),
            respiratoryRate: z.string(),
            generalAppearance: z.array(z.string()).default([]),
            abdominalExamination: z.array(z.string()).default([]),
        })
        .optional(),

    laboratory_result: z
        .object({
            testName: z.string(),
            testResult: z.string(),
            subTest: z
                .array(
                    z.object({
                        testName: z.string(),
                        testResult: z.string(),
                        refValue: z.string(),
                    })
                )
                .optional(),
        })
        .optional(),

    imaging_studies: z.array(z.string()).optional(),
    caseTips: z.array(z.string()).optional(),

    studentDecision: z
        .array(
            z.object({
                question: z.string(),
                supportingEvidence: z.array(z.string()).default([]),
                refutingEvidence: z.array(z.string()).default([]),
                isCorrect: z.boolean(),
            })
        )
        .optional(),

    detailedExplanation: z
        .object({
            explanation: z.string(),
            keyFeatures: z.array(z.string()),
        })
        .optional(),

    isDeleted: z.boolean().default(false),
});

export const clinical_case_validation = {
    create
}