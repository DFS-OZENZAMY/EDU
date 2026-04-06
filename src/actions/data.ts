"use server"

import { prisma } from "@/lib/prisma"
import { cookies } from "next/headers"
import { revalidatePath } from "next/cache"

export async function getAdminUsers() {
  return await prisma.user.findMany({
    include: {
        fees: true,
        parentStudents: {
            include: { class: true }
        },
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
      parent: true,
      grades: true
    }
  })
}

export async function getConversations() {
  const cookieStore = await cookies()
  const userId = cookieStore.get("userId")?.value
  if (!userId) return []
  const id = parseInt(userId)

  const messages = await prisma.message.findMany({
    where: {
      OR: [
        { senderId: id },
        { receiverId: id }
      ]
    },
    include: {
      sender: true,
      receiver: true
    },
    orderBy: { createdAt: 'asc' }
  })

  // Group messages by the other user
  const conversationsMap = new Map()
  messages.forEach(msg => {
    const otherUser = msg.senderId === id ? msg.receiver : msg.sender
    if (!conversationsMap.has(otherUser.id)) {
        conversationsMap.set(otherUser.id, {
            user: otherUser,
            messages: []
        })
    }
    conversationsMap.get(otherUser.id).messages.push(msg)
  })

  return Array.from(conversationsMap.values())
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

    const today = new Date().toISOString().split('T')[0]
    const menu = await prisma.canteenMenu.findUnique({
        where: { date: new Date(today) }
    })

    return { students, notifications, canteenMenu: menu }
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
    const last7Days = Array.from({ length: 7 }, (_, i) => {
        const d = new Date();
        d.setDate(d.getDate() - i);
        return d.toISOString().split('T')[0];
    }).reverse();

    const attendanceStats = await Promise.all(last7Days.map(async (date) => {
        const count = await prisma.attendance.count({
            where: {
                date: {
                    gte: new Date(date),
                    lt: new Date(new Date(date).getTime() + 86400000)
                },
                status: 'PRESENT'
            }
        });
        return {
            name: new Date(date).toLocaleDateString('fr-FR', { weekday: 'short' }),
            value: count
        };
    }));

    return { notifications, chartData: attendanceStats }
  }

  return null
}

export async function markNotificationsAsRead() {
  const cookieStore = await cookies()
  const userId = cookieStore.get("userId")?.value
  if (!userId) return

  await prisma.notification.updateMany({
    where: { userId: parseInt(userId), isRead: false },
    data: { isRead: true }
  })
  revalidatePath("/dashboard")
}
