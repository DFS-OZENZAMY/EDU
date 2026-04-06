"use server"

import { prisma } from "@/lib/prisma"
import { revalidatePath } from "next/cache"
import bcrypt from "bcryptjs"

export async function createUser(formData: FormData) {
  const name = formData.get("name") as string
  const email = formData.get("email") as string
  const role = formData.get("role") as string
  const password = formData.get("password") as string || "password123"

  const hashedPassword = await bcrypt.hash(password, 10)

  await prisma.user.create({
    data: { name, email, role, password: hashedPassword }
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

export async function createStudent(formData: FormData) {
  const name = formData.get("name") as string
  const classId = parseInt(formData.get("classId") as string)

  await prisma.student.create({
    data: { name, classId }
  })
  revalidatePath("/dashboard/students")
}

export async function deleteUser(id: number) {
  await prisma.user.delete({ where: { id } })
  revalidatePath("/dashboard/users")
}

export async function deleteStudent(id: number) {
  await prisma.student.delete({ where: { id } })
  revalidatePath("/dashboard/students")
}

export async function deleteClass(id: number) {
  await prisma.class.delete({ where: { id } })
  revalidatePath("/dashboard/classes")
}
