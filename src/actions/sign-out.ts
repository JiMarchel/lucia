"use server";

import { getAuth } from "@/lib/get-auth";
import { lucia } from "@/lib/lucia";
import { cookies } from "next/headers";
import { redirect } from "next/navigation";

export const signOut = async () => {
  const { session } = await getAuth();

  if (!session) {
    redirect("/");
  }

  await lucia.invalidateSession(session.id);
  const sessionCookie = lucia.createBlankSessionCookie();

  cookies().set(
    sessionCookie.name,
    sessionCookie.value,
    sessionCookie.attributes
  );

  redirect("/")
};
