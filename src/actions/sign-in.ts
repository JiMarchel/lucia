"use server";

import { getEmail } from "@/lib/get-email";
import { lucia } from "@/lib/lucia";
import { signInSchema } from "@/schemas/sign-in";
import { cookies } from "next/headers";
import { redirect } from "next/navigation";
import { Argon2id } from "oslo/password";

export const signIn = async (prevState: unknown, formData: FormData) => {
  const result = signInSchema.safeParse(Object.fromEntries(formData.entries()));

  let fieldErrors = {};

  if (result.success === false) {
    return (fieldErrors = result.error.formErrors.fieldErrors);
  }

  const { email, password } = result.data;

  const existingUser = await getEmail(email);

  if (!existingUser) {
    return (fieldErrors = {
      ...fieldErrors,
      email: "Email doesnt exists",
    });
  }

  const validPassword = await new Argon2id().verify(
    existingUser.hashedPassword,
    password
  );

  if (!validPassword) {
    return (fieldErrors = {
      ...fieldErrors,
      password: "Incorrect password",
    });
  }

  // If there are any field errors, return them
  if (Object.keys(fieldErrors).length > 0) {
    return fieldErrors;
  }

  const session = await lucia.createSession(existingUser.id, {});
  const sessionCookie = lucia.createSessionCookie(session.id);

  cookies().set(
    sessionCookie.name,
    sessionCookie.value,
    sessionCookie.attributes
  );

  redirect("/dashboard");
};
