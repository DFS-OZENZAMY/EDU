"use server"
import { prisma } from "@/lib/prisma"
import { getSession } from "@/lib/auth"
import { Role, SubscriptionTier } from "@prisma/client"

async function verifySuperAdmin() {
  const session = await getSession()
  if (!session || session.role !== Role.SUPER_ADMIN) {
    throw new Error("Accès non autorisé")
  }
  return session
}

export async function getPlatformStats() {
  await verifySuperAdmin()
  const [schoolsCount, usersCount, subscriptions] = await Promise.all([
    prisma.school.count(),
    prisma.user.count(),
    prisma.subscription.findMany({
        where: { status: 'active' },
        include: { school: true }
    })
  ])

  // Aggregate stats by tier
  const tierStats = await prisma.school.groupBy({
    by: ['plan'],
    _count: { id: true }
  })

  return {
    totalSchools: schoolsCount,
    totalUsers: usersCount,
    activeSubscriptions: subscriptions.length,
    tierStats: tierStats.map(s => ({ name: s.plan, value: s._count.id })),
    recentSchools: await prisma.school.findMany({
        orderBy: { createdAt: 'desc' },
        take: 5
    })
  }
}

export async function getAllSchools() {
  await verifySuperAdmin()
  return await prisma.school.findMany({
    include: {
      _count: {
        select: { users: true, students: true }
      }
    },
    orderBy: { createdAt: 'desc' }
  })
}

export async function updateSchoolPlan(schoolId: number, plan: SubscriptionTier) {
  await verifySuperAdmin()
  await prisma.school.update({
    where: { id: schoolId },
    data: { plan }
  })
  return { success: true }
}
