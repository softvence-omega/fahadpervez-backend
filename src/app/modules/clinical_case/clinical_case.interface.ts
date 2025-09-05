import { Types } from "mongoose";

type ProfileType = "mentor_profile" | "admin_profile";
export interface TClinicalCase {
    profile_type: ProfileType;
    publishedBy: Types.ObjectId;
    caseName: string;
    topic: string;
    patientDetails?: TPatientDetails;
    caseHistory?: string;
    vital_signs?: TVitalSigns;
    laboratory_result?: TLaboratoryResult;
    imaging_studies?: string[];
    caseTips?: string[];
    studentDecision?: TStudentDecision[];
    detailedExplanation?: {
        explanation: string;
        keyFeatures: string[]
    };
    isDeleted: boolean;
    isAIGenerated: boolean;
}


export type TPatientDetails = {
    age: number;
    sex: TSex;
    ethnicity: string;
    occupation: string;
    remark: string;
}

export type TSex = 'MALE' | 'FEMALE' | 'OTHER';

export type TVitalSigns = {
    temperature: string;
    heartRate: string;
    bloodPressure: string;
    respiratoryRate: string;
    generalAppearance: string[];
    abdominalExamination: string[];
}

export type TLaboratoryResult = {
    testName: string;
    testResult: string;
    subTest?: {
        testName: string;
        testResult: string;
        refValue: string;
    }[];
}

export type TStudentDecision = {
    question: string;
    supportingEvidence: string[];
    refutingEvidence: string[];
    isCorrect: boolean;
}
