"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.ClinicalCaseModel = void 0;
const mongoose_1 = require("mongoose");
// adjust import if needed
// Sub-schemas
const PatientDetailsSchema = new mongoose_1.Schema({
    age: { type: Number, required: true },
    sex: { type: String, enum: ["MALE", "FEMALE", "OTHER"], required: true },
    ethnicity: { type: String, required: true },
    occupation: { type: String, required: true },
    remark: { type: String, required: true },
}, { _id: false });
const VitalSignsSchema = new mongoose_1.Schema({
    temperature: { type: String, required: true },
    heartRate: { type: String, required: true },
    bloodPressure: { type: String, required: true },
    respiratoryRate: { type: String, required: true },
    generalAppearance: [{ type: String }],
    abdominalExamination: [{ type: String }],
}, { _id: false });
const LaboratorySubTestSchema = new mongoose_1.Schema({
    testName: { type: String, required: true },
    testResult: { type: String, required: true },
    refValue: { type: String, required: true },
}, { _id: false });
const LaboratoryResultSchema = new mongoose_1.Schema({
    testName: { type: String, required: true },
    testResult: { type: String, required: true },
    subTest: [LaboratorySubTestSchema],
}, { _id: false });
const StudentDecisionSchema = new mongoose_1.Schema({
    question: { type: String, required: true },
    supportingEvidence: [{ type: String }],
    refutingEvidence: [{ type: String }],
    isCorrect: { type: Boolean, required: true },
}, { _id: false });
const DetailedExplanationSchema = new mongoose_1.Schema({
    explanation: { type: String, required: true },
    keyFeatures: [{ type: String, required: true }],
}, { _id: false });
// Main schema
const ClinicalCaseSchema = new mongoose_1.Schema({
    publishedBy: { type: mongoose_1.Schema.Types.ObjectId, ref: "account", required: true },
    caseName: { type: String, required: true, index: true },
    topic: { type: String, required: true },
    patientDetails: { type: PatientDetailsSchema, required: false },
    caseHistory: { type: String },
    vital_signs: { type: VitalSignsSchema, required: false },
    laboratory_result: { type: LaboratoryResultSchema, required: false },
    imaging_studies: [{ type: String }],
    caseTips: [{ type: String }],
    studentDecision: { type: [StudentDecisionSchema], required: false },
    detailedExplanation: { type: DetailedExplanationSchema, required: false },
    isDeleted: { type: Boolean, default: false },
    isAIGenerated: { type: Boolean, default: false },
}, { timestamps: true, versionKey: false });
exports.ClinicalCaseModel = (0, mongoose_1.model)("clinical_case", ClinicalCaseSchema);
