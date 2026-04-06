"use server"

import { prisma } from "@/lib/prisma"
import { redirect } from "next/navigation"
import { cookies } from "next/headers"
import bcrypt from "bcryptjs"
import { encrypt } from "@/lib/auth"

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

  // Set a secure JWT session cookie
  const expires = new Date(Date.now() + 2 * 60 * 60 * 1000); // 2 hours
  const session = await encrypt({ userId: user.id, role: user.role, expires });

  const cookieStore = await cookies()
  cookieStore.set("session", session, { expires, httpOnly: true, secure: true, path: '/' });

  if (user.role === "ADMIN") redirect("/dashboard/overview")
  if (user.role === "TEACHER") redirect("/dashboard/teacher")
  if (user.role === "PARENT") redirect("/dashboard/parent")
}

export async function logout() {
  const cookieStore = await cookies()
  cookieStore.delete("session")
  redirect("/login")
}

export async function register(formData: FormData) {
  const email = formData.get("email") as string
  const password = formData.get("password") as string
  const name = formData.get("name") as string
  const role = "ADMIN" // Default role for registration

  const existingUser = await prisma.user.findUnique({
    where: { email },
  })

  if (existingUser) {
    return { error: "Cet email est déjà utilisé" }
  }

  const hashedPassword = await bcrypt.hash(password, 10)

  const user = await prisma.user.create({
    data: {
      email,
      password: hashedPassword,
      name,
      role,
    },
  })

  const expires = new Date(Date.now() + 2 * 60 * 60 * 1000);
  const session = await encrypt({ userId: user.id, role: user.role, expires });

  const cookieStore = await cookies()
  cookieStore.set("session", session, { expires, httpOnly: true, secure: true, path: '/' });

  redirect("/dashboard/overview")
}

export async function getSessionUser() {
  const cookieStore = await cookies()
  const session = cookieStore.get("session")?.value
  if (!session) return null

  try {
    const { decrypt } = await import("@/lib/auth")
    const payload = await decrypt(session)
    const user = await prisma.user.findUnique({
      where: { id: payload.userId }
    })
    if (!user) return null
    const { password, ...userWithoutPassword } = user
    return userWithoutPassword
  } catch (error) {
    return null
  }
}
