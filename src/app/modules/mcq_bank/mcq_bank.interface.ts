export type TMcqBank = {
    mcqBankTitle: string,
    subjectName: string,
    uploadedBy: string,
    totalMcq:number,
    mcqSets: {
        category: string;
        difficulty: "Easy" | "Medium" | "Hard";
        question: string;
        imageDescription?: string;
        options: {
            option: "A" | "B" | "C" | "D";
            optionText: string;
            explanation?: string;
        }[];
        correctOption: "A" | "B" | "C" | "D";
    }[]
};
