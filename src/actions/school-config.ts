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

export async function getSchoolModules() {
  const session = await verifySchoolAdmin()
  const school = await prisma.school.findUnique({
    where: { id: session.schoolId! },
    select: { enabledModules: true }
  })
  return school?.enabledModules || {}
}

export async function updateLocalModules(modules: any) {
  const session = await verifySchoolAdmin()
  await prisma.school.update({
    where: { id: session.schoolId! },
    data: { enabledModules: modules }
  })
  revalidatePath("/dashboard/settings")
  return { success: true }
}

export async function createStaffAccount(formData: FormData) {
    const session = await verifySchoolAdmin()
    const name = formData.get("name") as string
    const email = formData.get("email") as string
    const phone = formData.get("phone") as string
    const role = formData.get("role") as Role
    const password = formData.get("password") as string

    const { login } = await import("@/actions/auth")
    const bcrypt = await import("bcryptjs")
    const hashedPassword = await bcrypt.hash(password, 10)

    await prisma.user.create({
        data: {
            name,
            email,
            phone,
            password: hashedPassword,
            role,
            schoolId: session.schoolId
        }
    })
    revalidatePath("/dashboard/users")
    return { success: true }
}
