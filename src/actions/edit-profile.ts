"use server";

import { db } from "@/lib/db";
import { editProfileSchema } from "@/schemas/edit-profile";
import { revalidatePath } from "next/cache";

export const editProfile = async (prevState: unknown, formData: FormData) => {
  const result = editProfileSchema.safeParse(
    Object.fromEntries(formData.entries())
  );

  if (result.success === false) {
    return result.error.formErrors.fieldErrors;
  }

  const { firstName, lastName, image, id } = result.data;
  // Update the user in the database
  await db.user.update({
    where: {
      id,
    },
    data: {
      firstName,
      lastName,
      image,
    },
  });

  revalidatePath("/profile")
};
