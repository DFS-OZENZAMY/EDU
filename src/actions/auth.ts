"use server"

import { prisma } from "@/lib/prisma"
import { redirect } from "next/navigation"
import { cookies } from "next/headers"
import bcrypt from "bcryptjs"

export async function login(formData: FormData) {
  const email = formData.get("email") as string
  const password = formData.get("password") as string
  const role = formData.get("role") as string

  const user = await prisma.user.findUnique({
    where: { email },
  })

  if (!user || user.role !== role) {
    return { error: "Identifiants invalides" }
  }

  const isPasswordValid = await bcrypt.compare(password, user.password)
  if (!isPasswordValid) {
    return { error: "Identifiants invalides" }
  }

  // Set a simple cookie for current user ID (Prototype session)
  const cookieStore = await cookies()
  cookieStore.set("userId", user.id.toString(), { path: "/", httpOnly: true, secure: true })
  cookieStore.set("userRole", user.role, { path: "/", httpOnly: true, secure: true })

  if (user.role === "ADMIN") redirect("/dashboard/users")
  if (user.role === "TEACHER") redirect("/dashboard/teacher")
  if (user.role === "PARENT") redirect("/dashboard/parent")
}

export async function logout() {
  const cookieStore = await cookies()
  cookieStore.delete("userId")
  cookieStore.delete("userRole")
  redirect("/login")
}

export async function getSession() {
  const cookieStore = await cookies()
  const userId = cookieStore.get("userId")?.value
  if (!userId) return null

  const user = await prisma.user.findUnique({
    where: { id: parseInt(userId) }
  })
  return user
}
