"use server"

import { prisma } from "@/lib/prisma"
import { redirect } from "next/navigation"

export async function login(formData: FormData) {
  const email = formData.get("email") as string
  const password = formData.get("password") as string
  const role = formData.get("role") as string

  const user = await prisma.user.findFirst({
    where: {
      email,
      password, // In a real app, use hashed passwords!
      role,
    },
  })

  if (!user) {
    return { error: "Identifiants invalides" }
  }

  // Normally you'd set a cookie/session here.
  // For this prototype, we'll just redirect based on role.
  if (user.role === "ADMIN") redirect("/dashboard/users")
  if (user.role === "TEACHER") redirect("/dashboard/teacher")
  if (user.role === "PARENT") redirect("/dashboard/parent")
}
