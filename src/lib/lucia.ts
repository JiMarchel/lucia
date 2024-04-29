import { Lucia } from "lucia";
import { PrismaAdapter } from '@lucia-auth/adapter-prisma';
import { db } from "./db";

const adapter = new PrismaAdapter(db?.session, db?.user) // TODO

export const lucia = new Lucia(adapter, {
  sessionCookie: {
    // this sets cookies with super long expiration
    // since Next.js doesn't allow Lucia to extend cookie expiration when rendering pages
    expires: false,
    attributes: {
      // set to `true` when using HTTPS
      secure: process.env.NODE_ENV === "production",
    },
  },
  getUserAttributes: (attributes) => {
    return {
      // attributes has the type of DatabaseUserAttributes
      email: attributes.email,
      username: attributes.firstName + " " + attributes.lastName,
      firstName: attributes.firstName,
      lastName: attributes.lastName,
      image: attributes.image
    };
  },
});

declare module "lucia" {
  interface Register {
    Lucia: typeof lucia;
    DatabaseUserAttributes: DatabaseUserAttributes;
  }
}

export interface DatabaseUserAttributes {
  email: string;
  firstName: string;
  lastName: string;
  image: string | undefined;
}
