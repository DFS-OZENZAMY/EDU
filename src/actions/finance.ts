"use server"
import { prisma } from "@/lib/prisma"
import { getSession } from "@/lib/auth"
import { revalidatePath } from "next/cache"

async function verifySchoolAdmin() {
  const session = await getSession()
  if (!session || (session.role !== 'SCHOOL_ADMIN' && session.role !== 'ADMIN' && session.role !== 'ACCOUNTANT' && session.role !== 'SUPER_ADMIN')) {
    throw new Error("Accès non autorisé")
  }
  return session
}

export async function getFinancialStats() {
  const session = await verifySchoolAdmin()
  const schoolId = session.schoolId

  const [totalCollected, pendingFees, recentInvoices] = await Promise.all([
    prisma.fee.aggregate({
      where: { status: 'PAID', parent: { schoolId } },
      _sum: { amount: true }
    }),
    prisma.fee.aggregate({
      where: { status: 'PENDING', parent: { schoolId } },
      _sum: { amount: true }
    }),
    prisma.fee.findMany({
      where: { parent: { schoolId } },
      include: { parent: true },
      orderBy: { id: 'desc' },
      take: 10
    })
  ])

  return {
    totalCollected: totalCollected._sum.amount || 0,
    pendingFees: pendingFees._sum.amount || 0,
    recentInvoices,
    monthlyRevenue: [
        { name: 'Jan', value: 45000 },
        { name: 'Feb', value: 52000 },
        { name: 'Mar', value: 48000 },
        { name: 'Apr', value: 61000 },
    ]
  }
}

export async function createInvoice(parentId: number, amount: number, month: string) {
  await verifySchoolAdmin()
  await prisma.fee.create({
    data: {
      parentId,
      amount,
      month,
      status: 'PENDING'
    }
  })
  revalidatePath("/dashboard/admin/finance")
}

export async function markAsPaid(feeId: number) {
  await verifySchoolAdmin()
  await prisma.fee.update({
    where: { id: feeId },
    data: {
        status: 'PAID',
        paidAt: new Date()
    }
  })
  revalidatePath("/dashboard/admin/finance")
}
