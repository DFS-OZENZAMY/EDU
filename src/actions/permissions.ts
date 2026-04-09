"use server"
import { prisma } from "@/lib/prisma"
import { getSession } from "@/lib/auth"
import { Role } from "@prisma/client"
import { revalidatePath } from "next/cache"

async function verifySchoolAdmin() {
  const session = await getSession()
  if (!session || (session.role !== Role.SCHOOL_ADMIN && session.role !== Role.SUPER_ADMIN)) {
    throw new Error("Accès non autorisé")
  }
  return session
}

export async function getRolePermissions() {
  const session = await verifySchoolAdmin()
  const school = await prisma.school.findUnique({
    where: { id: session.schoolId! },
    select: { rolePermissions: true }
  })

  // Default matrix if none exists
  const defaultPermissions = {
    TEACHER: ["LMS", "MESSAGING"],
    ACCOUNTANT: ["FINANCE", "MESSAGING"],
    STAFF: ["SIS", "TRANSPORT", "CANTEEN", "MESSAGING"]
  }

  return (school?.rolePermissions as any) || defaultPermissions
}

export async function updateRolePermissions(role: string, modules: string[]) {
  const session = await verifySchoolAdmin()
  const currentPermissions = await getRolePermissions()

  const updatedPermissions = {
    ...currentPermissions,
    [role]: modules
  }

  await prisma.school.update({
    where: { id: session.schoolId! },
    data: { rolePermissions: updatedPermissions }
  })

  revalidatePath("/dashboard/permissions")
  return { success: true }
}

export async function getMyRoleModules() {
  const session = await getSession()
  if (!session) return []

  // Admins see everything
  if (session.role === Role.SCHOOL_ADMIN || session.role === Role.SUPER_ADMIN) {
      return ["SIS", "LMS", "FINANCE", "HR", "TRANSPORT", "CANTEEN", "MESSAGING", "ANALYTICS", "COMMUNITY"]
  }

  const school = await prisma.school.findUnique({
    where: { id: session.schoolId! },
    select: { rolePermissions: true }
  })

  const permissions = (school?.rolePermissions as any) || {}
  return permissions[session.role] || []
}
