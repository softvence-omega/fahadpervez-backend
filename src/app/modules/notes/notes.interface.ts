export type T_Notes = {
    title: string,
    subject: string,
    description?: string,
    system: string,
    topic: string,
    subtopic: string,
    slug: string,
    studentType: string,
    type: "exam" | "study"
    uploadedBy: string,
    notes: {
        fileId: string;
        fileType: string;
        fileName: string;
        fileUrl: string;
    }[]
}
