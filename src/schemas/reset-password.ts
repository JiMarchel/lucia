import { z } from "zod";

export const resetPasswordSchema = z
  .object({
    id: z.string().min(1),
    password: z.string().min(4),
    newPassword: z.string().min(4),
    newConfirmPassword: z.string().min(4),
  })
  .refine((data) => data.newPassword === data.newConfirmPassword, {
    message: "Passwords don't match",
    path: ["newConfirmPassword"],
  });
