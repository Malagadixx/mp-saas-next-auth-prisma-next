import NextAuth from "next-auth";
import Credentials from "next-auth/providers/credentials";
import { findUserByCredentials } from "./lib/user";

export const { handlers, signIn, signOut, auth } = NextAuth({
  providers: [
    Credentials({
      credentials: {
        email: {},
        password: {},
      },
      authorize: async (credentials) => {
        console.log(credentials);

        // lógica de autenticação
        // procura usuário com credenciais
        const user = await findUserByCredentials(
          credentials.email as string,
          credentials.password as string
        );

        return user;
      },
    }),
  ],
});
