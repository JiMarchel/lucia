import { z } from "zod";

export const editProfileSchema = z.object({
  id: z.string().min(1),
  firstName: z.string().min(1),
  lastName: z.string().min(1),
  image: z.string().min(1).nullable(),
});
