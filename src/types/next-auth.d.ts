// next-auth.d.ts
import "next-auth";

declare module "next-auth" {
  interface User {
    id?: string;
    roles?: string[];
    token?: string;
  }

  interface Session {
    user?: {
      id?: string;
      roles?: string[];
    } & DefaultSession["user"];
    accessToken?: string;
  }
}
