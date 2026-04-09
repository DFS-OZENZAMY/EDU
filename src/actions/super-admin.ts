"use server"
import { prisma } from "@/lib/prisma"
import { getSession } from "@/lib/auth"
import { Role, SubscriptionTier, Prisma } from "@prisma/client"
import { revalidatePath } from "next/cache"

async function verifySuperAdmin() {
  const session = await getSession()
  if (!session || session.role !== Role.SUPER_ADMIN) {
    throw new Error("Accès non autorisé")
  }
  return session
}

export async function getPlatformStats() {
  await verifySuperAdmin()
  const [schoolsCount, usersCount, activeSubsCount] = await Promise.all([
    prisma.school.count(),
    prisma.user.count(),
    prisma.school.count({ where: { plan: { not: 'FREE' } } })
  ])

  // Aggregate stats by tier
  const tierStats = await prisma.school.groupBy({
    by: ['plan'],
    _count: { id: true }
  })

  return {
    totalSchools: schoolsCount,
    totalUsers: usersCount,
    activeSubscriptions: activeSubsCount,
    tierStats: tierStats.map(s => ({ name: s.plan, value: s._count.id })),
    recentSchools: await prisma.school.findMany({
        orderBy: { createdAt: 'desc' },
        take: 5
    })
  }
}

export async function getPlatformIntelligence() {
  await verifySuperAdmin()

  // 1. Revenue Trends (Simulation based on subscriptions)
  const subs = await prisma.subscription.findMany({
    where: { status: 'ACTIVE' },
    select: { amount: true, startDate: true }
  })

  // 2. Module Adoption (Aggregate from School.enabledModules)
  const schools = await prisma.school.findMany({
    select: { enabledModules: true }
  })

  const moduleCounts: Record<string, number> = {}
  schools.forEach(s => {
    const modules = s.enabledModules as any
    if (modules) {
        Object.keys(modules).forEach(m => {
            if (modules[m]) moduleCounts[m] = (moduleCounts[m] || 0) + 1
        })
    }
  })

  return {
    revenue: subs.reduce((acc, s) => acc + (s.amount || 0), 0),
    activeSubs: subs.length,
    moduleAdoption: Object.entries(moduleCounts).map(([name, value]) => ({ name, value })),
    recentPayments: await prisma.subscription.findMany({
        orderBy: { startDate: 'desc' },
        take: 10,
        include: { school: true }
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
  revalidatePath("/dashboard/super/schools")
  return { success: true }
}

export async function toggleSchoolStatus(schoolId: number, isActive: boolean) {
    await verifySuperAdmin()
    await prisma.school.update({
        where: { id: schoolId },
        data: { isActive }
    })
    revalidatePath("/dashboard/super/schools")
    return { success: true }
}

export async function updateSchoolModules(schoolId: number, modules: any) {
    await verifySuperAdmin()
    await prisma.school.update({
        where: { id: schoolId },
        data: { enabledModules: modules }
    })
    revalidatePath("/dashboard/super/schools")
    return { success: true }
}
