import { z } from "zod";

const create = z.object({
  examName: z.string({ message: "examName is required" }),
});

export const exam_validations = {
  create
};
