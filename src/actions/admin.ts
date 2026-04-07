"use server"

import { prisma } from "@/lib/prisma"
import { revalidatePath } from "next/cache"
import bcrypt from "bcryptjs"
import { Role } from "@prisma/client"
import { getSession } from "@/lib/auth"

async function verifySchoolAdmin() {
  const session = await getSession()
  if (!session || (session.role !== Role.SCHOOL_ADMIN && session.role !== Role.SUPER_ADMIN)) {
    // Note: In the new SaaS schema, school owners are SCHOOL_ADMIN.
    // We check for SUPER_ADMIN too to allow platform owners to debug.
    throw new Error("Accès non autorisé")
  }
  return session
}

export async function createUser(formData: FormData) {
  try {
    const session = await verifySchoolAdmin()
    const name = formData.get("name") as string
    const email = formData.get("email") as string
    const roleStr = formData.get("role") as string
    const password = formData.get("password") as string || "password123"

    if (!name || !email || !roleStr) {
        return { error: "Veuillez remplir tous les champs obligatoires." }
    }

    const role = roleStr as Role

    const existing = await prisma.user.findUnique({ where: { email } })
    if (existing) {
        return { error: "Cet email est déjà utilisé." }
    }

    const hashedPassword = await bcrypt.hash(password, 10)

    const user = await prisma.user.create({
        data: {
            name,
            email,
            role,
            password: hashedPassword,
            schoolId: session.schoolId
        }
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
  try {
    const session = await verifySchoolAdmin()
    const name = formData.get("name") as string
    const level = formData.get("level") as string
    const room = formData.get("room") as string
    const teacherIdRaw = formData.get("teacherId") as string
    const teacherId = teacherIdRaw ? parseInt(teacherIdRaw) : null

    if (!name || !level) {
        return { error: "Le nom et le niveau sont obligatoires." }
    }

    await prisma.class.create({
        data: {
            name,
            level,
            room,
            teacherId,
            schoolId: session.schoolId!
        }
    })
    revalidatePath("/dashboard/classes")
    return { success: true }
  } catch (err) {
    return { error: "Erreur lors de la création de la classe." }
  }
}

export async function linkParentStudent(formData: FormData) {
  try {
    await verifySchoolAdmin()
    const parentId = parseInt(formData.get("parentId") as string)
    const studentId = parseInt(formData.get("studentId") as string)

    if (!parentId || !studentId) {
        return { error: "Sélectionnez un parent et un élève." }
    }

    await prisma.student.update({
        where: { id: studentId },
        data: { parentId }
    })
    revalidatePath("/dashboard/link-accounts")
    return { success: true }
  } catch (err) {
    return { error: "Échec de la liaison." }
  }
}

export async function createStudent(formData: FormData) {
  try {
    const session = await verifySchoolAdmin()
    const name = formData.get("name") as string
    const classIdRaw = formData.get("classId") as string
    const classId = classIdRaw ? parseInt(classIdRaw) : null

    if (!name || !classId) {
        return { error: "Le nom et la classe sont obligatoires." }
    }

    const student = await prisma.student.create({
        data: {
            name,
            classId: classId!,
            schoolId: session.schoolId!
        }
    })

    revalidatePath("/dashboard/students")
    return { success: true, studentId: student.id }
  } catch (error) {
    console.error("Error in createStudent:", error)
    return { error: "Erreur lors de l'ajout de l'élève. Vérifiez les données." }
  }
}

export async function deleteUser(id: number) {
  try {
    await verifySchoolAdmin()
    await prisma.user.delete({ where: { id } })
    revalidatePath("/dashboard/users")
    return { success: true }
  } catch (error) {
    return { error: "Impossible de supprimer l'utilisateur." }
  }
}

export async function deleteStudent(id: number) {
  try {
    await verifySchoolAdmin()
    await prisma.student.delete({ where: { id } })
    revalidatePath("/dashboard/students")
    return { success: true }
  } catch (error) {
    return { error: "Impossible de supprimer l'élève." }
  }
}

export async function deleteClass(id: number) {
  try {
    await verifySchoolAdmin()
    await prisma.class.delete({ where: { id } })
    revalidatePath("/dashboard/classes")
    return { success: true }
  } catch (error) {
    return { error: "Impossible de supprimer la classe." }
  }
}

export async function updateCanteenMenu(formData: FormData) {
  try {
    const session = await verifySchoolAdmin()
    const dish = formData.get("dish") as string
    const dessert = formData.get("dessert") as string
    const dateStr = formData.get("date") as string
    const date = new Date(dateStr)

    if (isNaN(date.getTime())) {
        return { error: "Date invalide." }
    }

    await prisma.canteenMenu.upsert({
        where: {
            schoolId_date: {
                schoolId: session.schoolId!,
                date: date
            }
        },
        update: { dish, dessert },
        create: {
            date,
            dish,
            dessert,
            schoolId: session.schoolId!
        }
    })

    revalidatePath("/dashboard/parent")
    revalidatePath("/dashboard/canteen")
    return { success: true }
  } catch (err) {
    console.error(err)
    return { error: "Erreur menu cantine." }
  }
}
