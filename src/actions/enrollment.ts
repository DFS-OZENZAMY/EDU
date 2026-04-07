"use server"

import { prisma } from "@/lib/prisma"
import { Role } from "@prisma/client"
import { getSession } from "@/lib/auth"
import bcrypt from "bcryptjs"
import { revalidatePath } from "next/cache"

export async function enrollParentWithStudents(formData: FormData) {
  try {
    const session = await getSession()
    if (!session || !session.schoolId) return { error: "Non autorisé" }

    const parentName = formData.get("parentName") as string
    const parentEmail = formData.get("parentEmail") as string
    const parentPhone = formData.get("parentPhone") as string
    const parentCin = formData.get("parentCin") as string

    const studentIndicesRaw = formData.get("studentIndices") as string
    const studentIndices = studentIndicesRaw ? studentIndicesRaw.split(',').map(Number) : []

    if (!parentEmail) return { error: "L'email du parent est requis." }

    // Create Parent Account (User)
    const existingParent = await prisma.user.findUnique({ where: { email: parentEmail } })
    let parentId: number

    if (existingParent) {
        parentId = existingParent.id
    } else {
        const hashedPassword = await bcrypt.hash("password123", 10)
        const parent = await prisma.user.create({
            data: {
                name: parentName,
                email: parentEmail,
                phone: parentPhone,
                cin: parentCin,
                password: hashedPassword,
                role: Role.PARENT,
                schoolId: session.schoolId
            }
        })
        parentId = parent.id
    }

    // Handle students using the provided indices
    for (const index of studentIndices) {
        const name = formData.get(`studentName_${index}`) as string
        const bday = formData.get(`studentBday_${index}`) as string
        const classIdRaw = formData.get(`studentClass_${index}`) as string
        const classId = classIdRaw ? parseInt(classIdRaw) : null

        if (name) {
            let birthdayDate: Date | null = null
            if (bday) {
                const parsedDate = new Date(bday)
                if (!isNaN(parsedDate.getTime())) {
                    birthdayDate = parsedDate
                }
            }

            await prisma.student.create({
                data: {
                    name,
                    birthday: birthdayDate,
                    classId: classId,
                    parentId,
                    schoolId: session.schoolId
                }
            })
        }
    }

    revalidatePath("/dashboard/students")
    return { success: true }
  } catch (error: any) {
      console.error("Enrollment Error:", error)
      return { error: "Erreur lors de l'inscription : " + (error.message || "Problème base de données") }
  }
}
