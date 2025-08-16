import NextAuth, { type NextAuthConfig } from "next-auth";
import GoogleProvider from "next-auth/providers/google";
import type { Profile } from "next-auth";

declare module "next-auth" {
  interface Session {
    user: {
      id: string;
      name?: string | null;
      email?: string | null;
      image?: string | null;
    };
  }
}

interface GoogleProfile extends Profile {
  sub: string;
  email: string;
  name: string;
  picture: string;
}

function isGoogleProfile(
  profile: Profile | undefined
): profile is GoogleProfile {
  return (
    profile !== undefined && "sub" in profile && typeof profile.sub === "string"
  );
}

export const authOptions: NextAuthConfig = {
  providers: [
    GoogleProvider({
      clientId: process.env.GOOGLE_CLIENT_ID!,
      clientSecret: process.env.GOOGLE_CLIENT_SECRET!,
    }),
  ],
  callbacks: {
    async jwt({ token, account, profile }) {
      if (
        account &&
        account.provider === "google" &&
        isGoogleProfile(profile)
      ) {
        token.id = profile.sub;
        console.log("Fresh login - Google stable ID:", profile.sub);
      }
      return token;
    },

    async session({ session, token }) {
      if (session.user && token.id && typeof token.id === "string") {
        session.user.id = token.id;
      }
      return session;
    },
  },
};

export const { handlers, signIn, signOut, auth } = NextAuth(authOptions);
