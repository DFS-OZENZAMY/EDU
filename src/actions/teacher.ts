"use server"

import { prisma } from "@/lib/prisma"
import { revalidatePath } from "next/cache"

export async function takeAttendance(formData: FormData) {
  const studentId = parseInt(formData.get("studentId") as string)
  const status = formData.get("status") as string

  await prisma.attendance.create({
    data: { studentId, status }
  })
  revalidatePath("/dashboard/teacher/attendance")
}

export async function enterGrade(formData: FormData) {
  const studentId = parseInt(formData.get("studentId") as string)
  const subject = formData.get("subject") as string
  const value = parseFloat(formData.get("value") as string)
  const observation = formData.get("observation") as string

  await prisma.grade.create({
    data: { studentId, subject, value, observation }
  })
  revalidatePath("/dashboard/teacher/grades")
}

export async function sendMessage(formData: FormData) {
  const senderId = parseInt(formData.get("senderId") as string)
  const receiverId = parseInt(formData.get("receiverId") as string)
  const content = formData.get("content") as string

  await prisma.message.create({
    data: { senderId, receiverId, content }
  })
  revalidatePath("/dashboard/teacher/messages")
  revalidatePath("/dashboard/parent/messages")
}
