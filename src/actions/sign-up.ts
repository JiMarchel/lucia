"use server";

import { db } from "@/lib/db";
import { getEmail } from "@/lib/get-email";
import { lucia } from "@/lib/lucia";
import { signUpSchema } from "@/schemas/sign-up";
import { generateId } from "lucia";
import { cookies } from "next/headers";
import { redirect } from "next/navigation";
import { Argon2id } from "oslo/password";

export const signUp = async (prevState: unknown, formData: FormData) => {
  const result = signUpSchema.safeParse(Object.fromEntries(formData.entries()));

  let fieldErrors = {};

  if (result.success === false) {
   return fieldErrors = result.error.formErrors.fieldErrors;
  }
  
  const { firstName, lastName, email, password } = result.data;
  
  const existingUser = await getEmail(email);
  
  if (existingUser) {
   return fieldErrors = {
      ...fieldErrors,
      email: 'Email already exists',
    };
  }
  
  // If there are any field errors, return them
  if (Object.keys(fieldErrors).length > 0) {
    return fieldErrors;
  }

  const userId = generateId(15);
  const hashedPassword = await new Argon2id().hash(password);

  await db.user.create({
    data: {
      id: userId,
      firstName,
      lastName,
      email,
      hashedPassword,
    },
  });

  const session = await lucia.createSession(userId, {});
  const sessionCookie = lucia.createSessionCookie(session.id);

  cookies().set(
    sessionCookie.name,
    sessionCookie.value,
    sessionCookie.attributes
  );

  redirect("/dashboard");
};
