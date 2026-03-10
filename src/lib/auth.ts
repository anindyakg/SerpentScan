import { NextAuthOptions } from "next-auth";
import GoogleProvider from "next-auth/providers/google";

// Centralized config for use in Server Components vs Route Handlers
export const authOptions: NextAuthOptions = {
  providers: [
    GoogleProvider({
      clientId: process.env.GOOGLE_CLIENT_ID || "",
      clientSecret: process.env.GOOGLE_CLIENT_SECRET || "",
    }),
  ],
  session: {
    strategy: "jwt",
  },
};
