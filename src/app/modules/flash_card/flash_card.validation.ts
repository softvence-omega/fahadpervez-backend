import { z } from "zod";

// ---------- Flash Card Validation for FormData ----------

// For create request
const create = z.object({
  title: z.string().nonempty(),
  subject: z.string().nonempty(),
  system: z.string().nonempty(),
  topic: z.string().nonempty(),
  subtopic: z.string().nonempty(),
  slug: z.string().nonempty(),
  studentType: z.string().nonempty(),
  type: z.enum(["exam", "study"]),
  uploadedBy: z.string().nonempty(),
  flashCards: z.array(
    z.object({
      flashCardId: z.string().nonempty(),
      frontText: z.string().nonempty(),
      backText: z.string().nonempty(),
      explanation: z.string().nonempty(),
      difficulty: z.enum(["Basics", "Intermediate", "Advance"])
    })
  )
});
const update = z.object({
  frontText: z.string().optional(),
  backText: z.string().optional(),
  explanation: z.string().optional(),
  difficulty: z.enum(["Basics", "Intermediate", "Advance"]).optional()
})


// ---------- Export ----------
export const flash_card_validation = {
  create,
  update
};
