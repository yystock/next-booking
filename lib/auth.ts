import { NextAuthOptions } from "next-auth";

import GoogleProvider from "next-auth/providers/google";
import TwitterProvider from "next-auth/providers/twitter";

import { db } from "@/lib/db";

export const authOptions: NextAuthOptions = {
  providers: [
    GoogleProvider({
      clientId: process.env.GOOGLE_CLIENT_ID as string,
      clientSecret: process.env.GOOGLE_CLIENT_SECRET as string,
    }),
    TwitterProvider({
      clientId: process.env.TWITTER_CLIENT_ID as string,
      clientSecret: process.env.TWITTER_CLIENT_SECRET as string,
      version: "2.0", // opt-in to Twitter OAuth 2.0
    }),
  ],
  // pages: {
  //   signIn: "/login",
  // },

  session: {
    strategy: "jwt",
  },
  callbacks: {
    async signIn({ account, profile }) {
      console.log("Signin ");
      if (!profile?.email) {
        throw new Error("No profile");
      }

      const user = await db.user.upsert({
        where: {
          email: profile.email,
        },
        create: {
          email: profile.email,
          name: profile.name,
          image: (profile as any).picture,
        },
        update: {
          name: profile.name,
          image: (profile as any).picture,
        },
      });
      console.log("Signin Complete");
      return true;
    },
    session: async ({ session, token }) => {
      if (token) {
        session.user.id = token.id;
        session.user.image = token.picture;
        session.user.name = token.name;
        session.user.email = token.email;
      }
      return session;
    },
    jwt: async ({ user, token, account, profile }) => {
      if (profile) {
        const user = await db.user.findUnique({
          where: {
            email: profile.email,
          },
        });
        if (!user) {
          throw new Error("No user found");
        }
        token.id = user.id;
      }
      return token;
    },
  },
};
