"use server";

import { db } from "@/lib/db";
import { resetPasswordSchema } from "@/schemas/reset-password";
import { revalidatePath } from "next/cache";
import { redirect } from "next/navigation";
import { Argon2id } from "oslo/password";

export const resetPassword = async (prevState: unknown, formData: FormData) => {
  const result = resetPasswordSchema.safeParse(
    Object.fromEntries(formData.entries())
  );

  let fieldErrors = {};

  if (result.success === false) {
    return result.error.formErrors.fieldErrors;
  }

  const { password, newPassword, id } = result.data;

  const user = await db.user.findUnique({
    where: {
      id,
    },
  });

  if (!user) {
    redirect("/");
  }

  const validPassword = await new Argon2id().verify(user.hashedPassword, password);

  if (!validPassword) {
    fieldErrors = {
      ...fieldErrors,
      password: "Incorrect current password",
    };
  }

  if (Object.keys(fieldErrors).length > 0) {
    return fieldErrors;
  }

  const hashedPassword = await new Argon2id().hash(newPassword);

  await db.user.update({
    where: {
      id,
    },
    data: {
      hashedPassword,
    },
  });

  revalidatePath("/settings");
};
