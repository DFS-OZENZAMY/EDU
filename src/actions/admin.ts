"use server"

import { prisma } from "@/lib/prisma"
import { revalidatePath } from "next/cache"

export async function createUser(formData: FormData) {
  const name = formData.get("name") as string
  const email = formData.get("email") as string
  const role = formData.get("role") as string
  const password = "password123" // Default for prototype

  await prisma.user.create({
    data: { name, email, role, password }
  })
  revalidatePath("/dashboard/users")
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
