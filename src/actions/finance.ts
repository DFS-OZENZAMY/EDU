"use server"
import { prisma } from "@/lib/prisma"
import { getSession } from "@/lib/auth"
import { revalidatePath } from "next/cache"
import { Role } from "@prisma/client"

async function verifySchoolAdmin() {
  const session = await getSession()
  if (!session || (session.role !== Role.SCHOOL_ADMIN && session.role !== Role.ACCOUNTANT && session.role !== Role.SUPER_ADMIN)) {
    throw new Error("Accès non autorisé")
  }
  return session
}

export async function getTreasuryData() {
  const session = await verifySchoolAdmin()
  const schoolId = session.schoolId

  const [income, payroll] = await Promise.all([
    prisma.fee.findMany({
      where: { parent: { schoolId } },
      include: { parent: true, student: true },
      orderBy: { id: 'desc' }
    }),
    prisma.salaryPayment.findMany({
        where: { user: { schoolId } },
        include: { user: true },
        orderBy: { id: 'desc' }
    })
  ])

  const totalIncome = income.filter(f => f.status === 'PAID').reduce((acc, f) => acc + f.amount, 0)
  const totalExpenses = payroll.reduce((acc, p) => acc + p.amount + p.bonus, 0)

  return {
    income,
    payroll,
    stats: {
        totalIncome,
        totalExpenses,
        netBalance: totalIncome - totalExpenses,
        pendingIncome: income.filter(f => f.status === 'PENDING').reduce((acc, f) => acc + f.amount, 0)
    }
  }
}

export async function createInvoice(parentId: number, studentId: number, amount: number, month: string) {
  await verifySchoolAdmin()
  await prisma.fee.create({
    data: {
      parentId,
      studentId,
      amount,
      month,
      status: 'PENDING'
    }
  })
  revalidatePath("/dashboard/finance")
}

export async function markFeeAsPaid(feeId: number, mode: string) {
  await verifySchoolAdmin()
  await prisma.fee.update({
    where: { id: feeId },
    data: {
        status: 'PAID',
        paidAt: new Date(),
        paymentMode: mode
    }
  })
  revalidatePath("/dashboard/finance")
}
