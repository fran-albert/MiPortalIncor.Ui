import NextAuth from "next-auth";
import CredentialsProvider from "next-auth/providers/credentials";
var jwt = require("jsonwebtoken");

const handler = NextAuth({
  providers: [
    CredentialsProvider({
      name: "Credentials",
      credentials: {
        userName: { label: "UserName", type: "text" },
        password: { label: "Password", type: "password" },
      },
      async authorize(credentials) {
        const userName = credentials?.userName;
        const password = credentials?.password;

        const res = await fetch(
          `${process.env.NEXT_PUBLIC_BACKEND_API}account/login`,
          {
            method: "POST",
            body: JSON.stringify({
              userName,
              password,
            }),
            headers: { "Content-Type": "application/json" },
          }
        );
        const data = await res.json();

        if (!data.token) {
          throw new Error("No se pudo iniciar sesión");
        }

        const decoded = jwt.decode(data.token);

        if (!decoded) {
          throw new Error("Error al decodificar el token");
        }

        return {
          token: data.token,
          id: decoded.Id,
          email: decoded.Email,
          roles:
            decoded[
              "http://schemas.microsoft.com/ws/2008/06/identity/claims/role"
            ],
        };
      },
    }),
  ],
  callbacks: {
    // Personaliza el token JWT
    jwt: async ({ token, user }) => {
      if (user) {
        token.id = user.id;
        token.email = user.email;
        token.roles = user.roles;
        token.accessToken = user.token;
      }
      return token;
    },
    session: async ({ session, token }) => {
      session.user.id = token.id;
      session.user.email = token.email;
      session.user.roles = token.roles;
      session.accessToken = token.accessToken as string;

      return session;
    },
  },
  pages: {
    signIn: "/iniciar-sesion",
  },
});

export { handler as GET, handler as POST };
