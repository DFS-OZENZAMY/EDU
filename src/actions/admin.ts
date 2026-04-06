"use server"

import { prisma } from "@/lib/prisma"
import { revalidatePath } from "next/cache"
import bcrypt from "bcryptjs"

export async function createUser(formData: FormData) {
  try {
    const name = formData.get("name") as string
    const email = formData.get("email") as string
    const role = formData.get("role") as string
    const password = formData.get("password") as string || "password123"

    if (!name || !email || !role) {
        return { error: "Veuillez remplir tous les champs obligatoires." }
    }

    const existing = await prisma.user.findUnique({ where: { email } })
    if (existing) {
        return { error: "Cet email est déjà utilisé." }
    }

    const hashedPassword = await bcrypt.hash(password, 10)

    const user = await prisma.user.create({
        data: { name, email, role, password: hashedPassword }
    })

    await prisma.notification.create({
        data: {
            userId: user.id,
            title: "Bienvenue !",
            message: "Votre compte a été créé avec succès par l'administration.",
            type: "SUCCESS"
        }
    })

    revalidatePath("/dashboard/users")
    return { success: true }
  } catch (error) {
    console.error("Error in createUser:", error)
    return { error: "Une erreur interne est survenue." }
  }
}

export async function createClass(formData: FormData) {
  const name = formData.get("name") as string
  const level = formData.get("level") as string
  const room = formData.get("room") as string
  const teacherId = parseInt(formData.get("teacherId") as string)

  await prisma.class.create({
    data: { name, level, room, teacherId }
  })
  revalidatePath("/dashboard/classes")
}

export async function linkParentStudent(formData: FormData) {
  const parentId = parseInt(formData.get("parentId") as string)
  const studentId = parseInt(formData.get("studentId") as string)

  await prisma.student.update({
    where: { id: studentId },
    data: { parentId }
  })
  revalidatePath("/dashboard/link-accounts")
}

export async function createStudent(formData: FormData) {
  const name = formData.get("name") as string
  const classId = parseInt(formData.get("classId") as string)

  await prisma.student.create({
    data: { name, classId }
  })
  revalidatePath("/dashboard/students")
}

export async function deleteUser(id: number) {
  try {
    // Delete related records first or handle via Prisma cascade if configured
    // For now, let's just delete the user
    await prisma.user.delete({ where: { id } })
    revalidatePath("/dashboard/users")
    return { success: true }
  } catch (error) {
    return { error: "Impossible de supprimer l'utilisateur." }
  }
}

export async function deleteStudent(id: number) {
  try {
    await prisma.student.delete({ where: { id } })
    revalidatePath("/dashboard/students")
    return { success: true }
  } catch (error) {
    return { error: "Impossible de supprimer l'élève." }
  }
}

export async function deleteClass(id: number) {
  try {
    await prisma.class.delete({ where: { id } })
    revalidatePath("/dashboard/classes")
    return { success: true }
  } catch (error) {
    return { error: "Impossible de supprimer la classe." }
  }
}
