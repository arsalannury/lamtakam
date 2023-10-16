import NextAuth from "next-auth";
import GithubProvider from "next-auth/providers/github";

export const OPTIONS = {
  providers: [
    GithubProvider({
      clientId: process.env.GITHUB_ID as string,
      clientSecret: process.env.GITHUB_SECRET as string,
    }),
  ],
  pages: {
    signIn: "/auth/signin",
  },
};

const handler = NextAuth(OPTIONS);
export { handler as GET, handler as POST };
