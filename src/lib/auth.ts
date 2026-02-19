import type { AuthOptions } from "next-auth";
import KeycloakProvider from "next-auth/providers/keycloak";

export const authOptions: AuthOptions = {
  providers: [
    KeycloakProvider({
      clientId: process.env.KEYCLOAK_CLIENT_ID!,
      clientSecret: process.env.KEYCLOAK_CLIENT_SECRET!,
      issuer: process.env.KEYCLOAK_ISSUER!,
    }),
  ],
  callbacks: {
    async jwt({ token, account }) {
      if (account) {
        token.sub = account.providerAccountId;
        token.accessToken = account.access_token;
        token.idToken = account.id_token;
      }
      return token;
    },
    async session({ session, token }) {
      if (session.user) {
        (session as any).user.id = token.sub;
        (session as any).accessToken = token.accessToken;
      }
      return session;
    },
  },
  pages: {
    signIn: "/login",
  },
  events: {
    async signOut({ token }) {
      if (token.idToken) {
        const issuer = process.env.KEYCLOAK_ISSUER!;
        const url = `${issuer}/protocol/openid-connect/logout?id_token_hint=${token.idToken}`;
        try {
          await fetch(url);
        } catch {
          // best-effort logout
        }
      }
    },
  },
};

export function isAdmin(userId?: string | null): boolean {
  return !!userId && userId === process.env.ADMIN_USER_ID;
}
