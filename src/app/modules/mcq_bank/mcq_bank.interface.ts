export type TMcqBank = {
    title: string,
    subject: string,
    system: string,
    topic: string,
    subtopic: string,
    slug: string,
    studentType: string,
    type: "exam" | "study"
    uploadedBy: string,
    mcqs: {
        mcqId:string,
        difficulty: "Basics" | "Intermediate" | "Advance";
        question: string;
        imageDescription?: string;
        options: {
            option: "A" | "B" | "C" | "D" | "E" | "F";
            optionText: string;
            explanation?: string;
        }[];
        correctOption: "A" | "B" | "C" | "D" | "E" | "F";
    }[]
};
