"use server"

import { prisma } from "@/lib/prisma"
import { redirect } from "next/navigation"
import { cookies } from "next/headers"
import bcrypt from "bcryptjs"
import { encrypt } from "@/lib/auth"
import { Role, SubscriptionTier } from "@prisma/client"

export async function login(formData: FormData) {
  try {
    const email = formData.get("email") as string
    const password = formData.get("password") as string
    const roleStr = formData.get("role") as string

    if (!email || !password || !roleStr) {
      return { error: "Veuillez remplir tous les champs" }
    }

    const user = await prisma.user.findUnique({
      where: { email },
      include: { school: true }
    })

    // Basic role check
    if (!user || user.role !== roleStr) {
      return { error: "Identifiants invalides ou rôle incorrect" }
    }

    // Check if school or user is active
    if (!user.isActive || (user.school && !user.school.isActive)) {
      return { error: "Ce compte ou cet établissement a été désactivé." }
    }

    const isPasswordValid = await bcrypt.compare(password, user.password)
    if (!isPasswordValid) {
      return { error: "Identifiants invalides" }
    }

    // Set a secure JWT session cookie
    const expires = new Date(Date.now() + 2 * 60 * 60 * 1000); // 2 hours
    const session = await encrypt({
      userId: user.id,
      role: user.role,
      schoolId: user.schoolId,
      expires
    });

    const cookieStore = await cookies()
    cookieStore.set("session", session, {
      expires,
      httpOnly: true,
      secure: process.env.NODE_ENV === 'production',
      path: '/'
    });

    let redirectTo = "/dashboard/overview"
    if (user.role === Role.SUPER_ADMIN) redirectTo = "/dashboard/super"
    if (user.role === Role.TEACHER) redirectTo = "/dashboard/teacher"
    if (user.role === Role.PARENT) redirectTo = "/dashboard/parent"

    return { success: true, redirectTo }
  } catch (error: any) {
    console.error("LOGIN ERROR:", error)
    return { error: "Une erreur est survenue lors de la connexion" }
  }
}

export async function logout() {
  const cookieStore = await cookies()
  cookieStore.delete("session")
  redirect("/login")
}

export async function register(formData: FormData) {
  try {
    const email = formData.get("email") as string
    const password = formData.get("password") as string
    const name = formData.get("name") as string
    const phone = formData.get("phone") as string
    const schoolName = formData.get("schoolName") as string

    if (!email || !password || !name || !schoolName) {
      return { error: "Veuillez remplir tous les champs obligatoires" }
    }

    const existingUser = await prisma.user.findUnique({
      where: { email },
    })

    if (existingUser) {
      return { error: "Cet email est déjà utilisé" }
    }

    const hashedPassword = await bcrypt.hash(password, 10)

    const defaultModules = {
      SIS: true,
      FINANCE: true,
      LMS: true,
      ANALYTICS: true,
      MESSAGING: true,
      CANTEEN: false,
      SUBSCRIPTION: true,
      HR: true
    }

    const { user } = await prisma.$transaction(async (tx) => {
      const school = await tx.school.create({
        data: {
            name: schoolName,
            ownerName: name,
            ownerEmail: email,
            ownerPhone: phone,
            plan: SubscriptionTier.FREE,
            enabledModules: defaultModules
        }
      })

      const u = await tx.user.create({
        data: {
          email,
          password: hashedPassword,
          name,
          phone,
          role: Role.SCHOOL_ADMIN,
          schoolId: school.id
        },
      })
      return { school, user: u }
    })

    const expires = new Date(Date.now() + 2 * 60 * 60 * 1000);
    const session = await encrypt({
      userId: user.id,
      role: user.role,
      schoolId: user.schoolId,
      expires
    });

    const cookieStore = await cookies()
    cookieStore.set("session", session, {
      expires,
      httpOnly: true,
      secure: process.env.NODE_ENV === 'production',
      path: '/'
    });

    return { success: true, redirectTo: "/dashboard/overview" }
  } catch (error: any) {
    console.error("REGISTER ACTION ERROR:", error);
    let msg = "Une erreur est survenue lors de l'inscription";
    if (error.code === 'P2002') msg = "Cet email est déjà utilisé par un autre établissement.";
    return { error: msg };
  }
}

export async function getSessionUser() {
  const cookieStore = await cookies()
  const session = cookieStore.get("session")?.value
  if (!session) return null

  try {
    const { decrypt } = await import("@/lib/auth")
    const payload = await decrypt(session)
    const user = await prisma.user.findUnique({
      where: { id: payload.userId },
      include: { school: true }
    })
    if (!user) return null
    if (!user.isActive || (user.school && !user.school.isActive)) return null

    const { password, ...userWithoutPassword } = user
    return userWithoutPassword
  } catch (error) {
    return null
  }
}
