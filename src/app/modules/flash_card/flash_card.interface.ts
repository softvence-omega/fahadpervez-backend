
export type TFlashCard = {
  title: string,
  subject: string,
  system: string,
  topic: string,
  subtopic: string,
  slug: string,
  studentType: string,
  type: "exam" | "study"
  uploadedBy: string,
  flashCards: {
    flashCardId: string,
    frontText: string,
    backText: string,
    explanation: string,
    difficulty: "Basics" | "Intermediate" | "Advance"
  }[],
};