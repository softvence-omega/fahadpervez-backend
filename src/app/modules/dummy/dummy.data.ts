export const dummyClinicalCase = {
    caseName: "Acute Appendicitis",
    patientDetails: {
        age: 23,
        sex: "MALE",
        ethnicity: "Asian",
        occupation: "Student",
        remark: "No significant past medical history",
    },
    caseHistory: "Patient presents with 2-day history of right lower quadrant abdominal pain, nausea, and mild fever.",
    vital_signs: {
        temperature: "38.2°C",
        heartRate: "102 bpm",
        bloodPressure: "118/76 mmHg",
        respiratoryRate: "20 breaths/min",
        generalAppearance: ["Mildly ill-looking", "Guarding abdomen"],
        abdominalExamination: ["Tenderness in right iliac fossa", "Rebound tenderness present"],
    },
    laboratory_result: {
        testName: "CBC",
        testResult: "Elevated WBC count",
        subTest: [
            { testName: "WBC", testResult: "14,500 /µL", refValue: "4,000 - 11,000 /µL" },
            { testName: "Neutrophils", testResult: "82%", refValue: "40 - 70%" },
        ],
    },
    imaging_studies: ["Ultrasound abdomen showing inflamed appendix"],
    caseTips: ["Always rule out gynecological causes in females", "Pain migration is a key feature"],

    studentDecision: [
        {
            question: "Is this appendicitis?",
            supportingEvidence: ["Right lower quadrant tenderness", "Fever", "Elevated WBC"],
            refutingEvidence: ["No diarrhea", "No urinary symptoms"],
            isCorrect: true,
        },
        {
            question: "Should immediate surgery be done?",
            supportingEvidence: ["Typical clinical presentation", "Positive ultrasound findings"],
            refutingEvidence: ["Patient is hemodynamically stable"],
            isCorrect: true,
        },
    ],
    detailedExplanation: {
        explanation: "Acute appendicitis is inflammation of the appendix due to obstruction, commonly by a fecolith.",
        keyFeatures: [
            "Right iliac fossa pain",
            "Fever",
            "Leukocytosis",
            "Rebound tenderness",
        ],
    },
};
