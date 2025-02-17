"use server";

import { signIn } from "@/auth";
import { isRedirectError } from "next/dist/client/components/redirect";

export default async function LoginAction(_prevState: any, formData: FormData) {
  // await signin
  try {
    await signIn("credentials", {
      email: formData.get("email") as string,
      password: formData.get("password") as string,
      redirect: true,
      redirectTo: "/dashboard",
    });
    return { success: true };
  } catch (e: any) {
    if (isRedirectError(e)) {
      throw e;
    }
    if (e.type === "CredentialsSignin") {
      return { success: false, message: "Email ou senha incorretos." };
    }
    {
      return { success: false, message: "Ops, algum erro aconteceu!" };
    }
  }
}
