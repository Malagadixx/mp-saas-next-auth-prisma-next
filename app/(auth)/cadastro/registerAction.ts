"use server";

import db from "@/lib/db";
import { hashSync } from "bcrypt-ts";
import { redirect } from "next/navigation";

export default async function registerAction(
  _prevstate: any,
  formData: FormData
) {
  const entries = Array.from(formData.entries());
  const data = Object.fromEntries(entries) as {
    name: string;
    email: string;
    password: string;
  };

  console.log(data);

  // Validação de email, nome e senha
  if (!data.email || !data.password || !data.name) {
    return {
      error: "Preencha todos os campos",
      succcess: false,
    };
  }

  // Se o usuario existe
  const user = await db.user.findUnique({
    where: {
      email: data.email,
    },
  });

  if (user) {
    return {
      error: "Usuário já cadastrado",
      succcess: false,
    };
  }

  // Se não existir, cria o usuario
  await db.user.create({
    data: {
      email: data.email,
      name: data.name,
      password: hashSync(data.password),
    },
  });

  return redirect("/");
}
