"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.clinical_case_validation = void 0;
const zod_1 = require("zod");
const create = zod_1.z.object({
    publishedBy: zod_1.z.string().regex(/^[0-9a-fA-F]{24}$/, "Invalid ObjectId").optional(),
    caseName: zod_1.z.string(),
    topic: zod_1.z.string(),
    patientDetails: zod_1.z
        .object({
        age: zod_1.z.number(),
        sex: zod_1.z.enum(["MALE", "FEMALE", "OTHER"]),
        ethnicity: zod_1.z.string(),
        occupation: zod_1.z.string(),
        remark: zod_1.z.string(),
    })
        .optional(),
    caseHistory: zod_1.z.string().optional(),
    vital_signs: zod_1.z
        .object({
        temperature: zod_1.z.string(),
        heartRate: zod_1.z.string(),
        bloodPressure: zod_1.z.string(),
        respiratoryRate: zod_1.z.string(),
        generalAppearance: zod_1.z.array(zod_1.z.string()).default([]),
        abdominalExamination: zod_1.z.array(zod_1.z.string()).default([]),
    })
        .optional(),
    laboratory_result: zod_1.z
        .object({
        testName: zod_1.z.string(),
        testResult: zod_1.z.string(),
        subTest: zod_1.z
            .array(zod_1.z.object({
            testName: zod_1.z.string(),
            testResult: zod_1.z.string(),
            refValue: zod_1.z.string(),
        }))
            .optional(),
    })
        .optional(),
    imaging_studies: zod_1.z.array(zod_1.z.string()).optional(),
    caseTips: zod_1.z.array(zod_1.z.string()).optional(),
    studentDecision: zod_1.z
        .array(zod_1.z.object({
        question: zod_1.z.string(),
        supportingEvidence: zod_1.z.array(zod_1.z.string()).default([]),
        refutingEvidence: zod_1.z.array(zod_1.z.string()).default([]),
        isCorrect: zod_1.z.boolean(),
    }))
        .optional(),
    detailedExplanation: zod_1.z
        .object({
        explanation: zod_1.z.string(),
        keyFeatures: zod_1.z.array(zod_1.z.string()),
    })
        .optional(),
    isDeleted: zod_1.z.boolean().default(false),
});
exports.clinical_case_validation = {
    create
};
