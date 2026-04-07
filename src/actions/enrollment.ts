"use server"

import { prisma } from "@/lib/prisma"
import { Role } from "@prisma/client"
import { getSession } from "@/lib/auth"
import bcrypt from "bcryptjs"
import { revalidatePath } from "next/cache"

export async function enrollParentWithStudents(formData: FormData) {
  const session = await getSession()
  if (!session || !session.schoolId) throw new Error("Non autorisé")

  const parentName = formData.get("parentName") as string
  const parentEmail = formData.get("parentEmail") as string
  const parentPhone = formData.get("parentPhone") as string
  const parentCin = formData.get("parentCin") as string

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

  // Handle multiple students
  let index = 1
  while (formData.has(`studentName_${index}`)) {
      const name = formData.get(`studentName_${index}`) as string
      const bday = formData.get(`studentBday_${index}`) as string
      const classIdRaw = formData.get(`studentClass_${index}`) as string
      const classId = classIdRaw ? parseInt(classIdRaw) : null

      if (name) {
          await prisma.student.create({
              data: {
                  name,
                  birthday: bday ? new Date(bday) : null,
                  classId: classId,
                  parentId,
                  schoolId: session.schoolId
              }
          })
      }
      index++
  }

  revalidatePath("/dashboard/students")
  return { success: true }
}
