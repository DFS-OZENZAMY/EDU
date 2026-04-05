"use server"

import { prisma } from "@/lib/prisma"

export async function getParentData(parentId: number) {
  const students = await prisma.student.findMany({
    where: { parentId },
    include: {
      class: {
        include: { teacher: true }
      },
      grades: true,
      attendance: true
    }
  })
  return students
}

export async function getAdminUsers() {
  return await prisma.user.findMany({
    orderBy: { createdAt: 'desc' }
  })
}

export async function getTeacherClasses(teacherId: number) {
  return await prisma.class.findMany({
    where: { teacherId },
    include: { students: true }
  })
}
