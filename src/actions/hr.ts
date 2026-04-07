"use server"

import { prisma } from "@/lib/prisma"
import { Role } from "@prisma/client"
import { getSession } from "@/lib/auth"
import bcrypt from "bcryptjs"
import { revalidatePath } from "next/cache"

async function verifySchoolAdmin() {
  const session = await getSession()
  if (!session || (session.role !== Role.SCHOOL_ADMIN && session.role !== Role.SUPER_ADMIN)) {
    throw new Error("Accès non autorisé")
  }
  return session
}

export async function createEmployee(formData: FormData) {
  const session = await verifySchoolAdmin()
  const name = formData.get("name") as string
  const email = formData.get("email") as string
  const phone = formData.get("phone") as string
  const role = formData.get("role") as Role
  const password = formData.get("password") as string

  const baseSalary = parseFloat(formData.get("baseSalary") as string) || 0
  const contractType = formData.get("contractType") as string || "CDI"
  const cin = formData.get("cin") as string
  const cnss = formData.get("cnss") as string
  const rib = formData.get("rib") as string

  const hashedPassword = await bcrypt.hash(password, 10)

  const user = await prisma.user.create({
    data: {
      name,
      email,
      phone,
      cin,
      password: hashedPassword,
      role,
      schoolId: session.schoolId,
      employeeProfile: {
          create: {
              baseSalary,
              contractType,
              cnssNumber: cnss,
              rib,
              position: role.toString()
          }
      }
    }
  })

  revalidatePath("/dashboard/hr")
  return { success: true }
}

export async function getEmployees() {
    const session = await getSession()
    if (!session) return []
    const today = new Date()
    today.setHours(0,0,0,0)

    return await prisma.user.findMany({
        where: {
            schoolId: session.schoolId,
            role: { in: ['TEACHER', 'STAFF', 'ACCOUNTANT', 'SCHOOL_ADMIN'] },
            id: { not: session.userId }
        },
        include: {
            employeeProfile: true,
            salaryPayments: { orderBy: { id: 'desc' }, take: 1 },
            clockIns: {
                where: { time: { gte: today } },
                take: 1
            }
        }
    })
}

export async function paySalary(employeeId: number, amount: number, bonus: number, month: string) {
    const session = await verifySchoolAdmin()
    await prisma.salaryPayment.create({
        data: {
            userId: employeeId,
            amount,
            bonus,
            month,
            status: 'PAID'
        }
    })
    revalidatePath("/dashboard/hr")
    revalidatePath("/dashboard/finance")
    return { success: true }
}

export async function updateEmployee(id: number, formData: FormData) {
    const session = await verifySchoolAdmin()

    const name = formData.get("name") as string
    const email = formData.get("email") as string
    const phone = formData.get("phone") as string
    const role = formData.get("role") as Role
    const cin = formData.get("cin") as string

    const baseSalary = parseFloat(formData.get("baseSalary") as string) || 0
    const contractType = formData.get("contractType") as string
    const cnss = formData.get("cnss") as string
    const rib = formData.get("rib") as string

    await prisma.user.update({
        where: { id, schoolId: session.schoolId! },
        data: {
            name,
            email,
            phone,
            cin,
            role,
            employeeProfile: {
                update: {
                    baseSalary,
                    contractType,
                    cnssNumber: cnss,
                    rib
                }
            }
        }
    })

    revalidatePath("/dashboard/hr")
    return { success: true }
}
