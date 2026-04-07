"use server"

import { prisma } from "@/lib/prisma"
import { revalidatePath } from "next/cache"
import { cookies } from "next/headers"
import { getSession } from "@/lib/auth"
import { Role } from "@prisma/client"

export async function clockIn() {
  const session = await getSession()
  if (!session) return { error: "Non authentifié" }

  const id = session.userId
  const schoolId = session.schoolId
  const user = await prisma.user.findUnique({ where: { id } })

  await prisma.clockIn.create({
    data: { userId: id }
  })

  // Notify admin
  const admins = await prisma.user.findMany({
    where: {
        schoolId: schoolId!,
        role: Role.SCHOOL_ADMIN
    }
  })

  for (const admin of admins) {
    await prisma.notification.create({
        data: {
            userId: admin.id,
            title: "Pointage Enseignant",
            message: `${user?.name} vient de démarrer sa journée.`,
            type: "INFO"
        }
    })
  }

  revalidatePath("/dashboard/teacher")
  revalidatePath("/dashboard/teacher-attendance")
  return { success: true }
}

export async function takeAttendance(formData: FormData) {
  const studentId = parseInt(formData.get("studentId") as string)
  const status = formData.get("status") as string

  const attendance = await prisma.attendance.create({
    data: { studentId, status },
    include: { student: { include: { parent: true } } }
  })

  // Notify parent if student is absent or late
  if ((status === 'ABSENT' || status === 'LATE') && attendance.student.parentId) {
    await prisma.notification.create({
        data: {
            userId: attendance.student.parentId,
            title: status === 'ABSENT' ? "Alerte Absence" : "Alerte Retard",
            message: `Votre enfant ${attendance.student.name} est marqué ${status.toLowerCase()} aujourd'hui.`,
            type: "WARNING"
        }
    })
  }

  revalidatePath("/dashboard/teacher/attendance")
}

export async function enterGrade(formData: FormData) {
  const studentId = parseInt(formData.get("studentId") as string)
  const subject = formData.get("subject") as string
  const value = parseFloat(formData.get("value") as string)
  const observation = formData.get("observation") as string

  const grade = await prisma.grade.create({
    data: { studentId, subject, value, observation },
    include: { student: { include: { parent: true } } }
  })

  // Notify parent
  if (grade.student.parentId) {
    await prisma.notification.create({
        data: {
            userId: grade.student.parentId,
            title: "Nouvelle Note : " + subject,
            message: `Résultat pour ${grade.student.name} : ${value}/20. Observation : ${observation || 'N/A'}`,
            type: "INFO"
        }
    })
  }

  revalidatePath("/dashboard/teacher/grades")
  revalidatePath("/dashboard/parent")
  revalidatePath("/dashboard/parent/grades")
  return { success: true }
}

export async function sendMessage(formData: FormData) {
  const session = await getSession()
  if (!session) return

  const receiverId = parseInt(formData.get("receiverId") as string)
  const content = formData.get("content") as string

  const message = await prisma.message.create({
    data: {
        senderId: session.userId,
        receiverId,
        content
    },
    include: { sender: true }
  })

  // Notify receiver
  await prisma.notification.create({
    data: {
        userId: receiverId,
        title: "Nouveau Message",
        message: `Vous avez reçu un message de ${message.sender.name}.`,
        type: "INFO"
    }
  })

  revalidatePath("/dashboard/teacher/messages")
  revalidatePath("/dashboard/parent/messages")
}

export async function createLessonLog(formData: FormData) {
  const session = await getSession()
  if (!session) return { error: "Non authentifié" }

  const classId = parseInt(formData.get("classId") as string)
  const subject = formData.get("subject") as string
  const content = formData.get("content") as string
  const homework = formData.get("homework") as string

  const log = await prisma.lessonLog.create({
    data: {
      classId,
      teacherId: session.userId,
      subject,
      content,
      homework
    },
    include: { class: { include: { students: true } } }
  })

  // Notify parents of students in this class
  const studentIds = log.class.students.map(s => s.parentId).filter(id => id !== null) as number[]
  const uniqueParentIds = Array.from(new Set(studentIds))

  for (const parentId of uniqueParentIds) {
    await prisma.notification.create({
        data: {
            userId: parentId,
            title: "Cahier de Texte mis à jour",
            message: `Le cours de ${subject} (${log.class.name}) a été documenté.`,
            type: "INFO"
        }
    })
  }

  revalidatePath("/dashboard/teacher/cahier-texte")
  revalidatePath("/dashboard/parent")
  return { success: true }
}

export async function deleteLessonLog(id: number) {
  await prisma.lessonLog.delete({ where: { id } })
  revalidatePath("/dashboard/teacher/cahier-texte")
}
