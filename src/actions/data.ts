"use server"

import { prisma } from "@/lib/prisma"
import { cookies } from "next/headers"

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
    include: {
        fees: true,
        parentStudents: true,
        teacherClasses: true
    },
    orderBy: { createdAt: 'desc' }
  })
}

export async function getTeacherClasses(teacherId: number) {
  return await prisma.class.findMany({
    where: { teacherId },
    include: {
      students: true,
      teacher: true
    }
  })
}

export async function getAllClasses() {
  return await prisma.class.findMany({
    include: {
        teacher: true,
        _count: {
            select: { students: true }
        }
    }
  })
}

export async function getAllStudents() {
  return await prisma.student.findMany({
    include: {
      class: true,
      parent: true
    }
  })
}

export async function getMyData() {
  const cookieStore = await cookies()
  const userId = cookieStore.get("userId")?.value
  const userRole = cookieStore.get("userRole")?.value

  if (!userId) return null
  const id = parseInt(userId)

  const notifications = await prisma.notification.findMany({
    where: { userId: id },
    orderBy: { createdAt: 'desc' },
    take: 5
  })

  if (userRole === 'PARENT') {
    const students = await prisma.student.findMany({
      where: { parentId: id },
      include: {
        class: { include: { teacher: true } },
        grades: { orderBy: { date: 'desc' } },
        attendance: true,
        parent: {
            include: {
                fees: { orderBy: { id: 'desc' } }
            }
        }
      }
    })
    return { students, notifications }
  }

  if (userRole === 'TEACHER') {
    const classes = await prisma.class.findMany({
      where: { teacherId: id },
      include: {
        lessonLogs: {
            orderBy: { createdAt: 'desc' },
            include: { class: true }
        },
        students: {
            include: {
                attendance: { orderBy: { date: 'desc' }, take: 1 },
                grades: { orderBy: { date: 'desc' }, take: 1 }
            }
        },
        teacher: {
            include: {
                clockIns: {
                    where: {
                        time: {
                            gte: new Date(new Date().setHours(0,0,0,0))
                        }
                    },
                    orderBy: { time: 'desc' },
                    take: 1
                }
            }
        }
      }
    })
    return { classes, notifications }
  }

  if (userRole === 'ADMIN') {
    return { notifications }
  }

  return null
}
