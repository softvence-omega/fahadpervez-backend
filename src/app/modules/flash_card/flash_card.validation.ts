import { z } from "zod";

// ---------- Flash Card Validation for FormData ----------

// For create request
const create = z.object({
  prompt: z
    .string({ message: "Flash card prompt is required" })
    .min(1, "Flash card prompt cannot be empty"),
  data: z
    .string({ message: "Flash card data is required" })
    .min(1, "Flash card data cannot be empty"),
  uploadMedia: z.string().optional(), // e.g., file URL after upload
});

// For update request
const update = z.object({
  prompt: z
    .string({ message: "Flash card prompt is required" })
    .min(1, "Flash card prompt cannot be empty")
    .optional(),
  data: z
    .string({ message: "Flash card data is required" })
    .min(1, "Flash card data cannot be empty")
    .optional(),
  uploadMedia: z.string().optional(),
});

// ---------- Export ----------
export const flash_card_validation = {
  create,
  update,
};
