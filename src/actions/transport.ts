"use server"
import { prisma } from "@/lib/prisma"
import { getSession } from "@/lib/auth"
import { revalidatePath } from "next/cache"

export async function getBusRoutes() {
  const session = await getSession()
  if (!session) return []
  return await prisma.busRoute.findMany({
    where: { schoolId: session.schoolId! },
    include: { stops: { orderBy: { order: 'asc' } }, _count: { select: { students: true } } }
  })
}

export async function createBusRoute(data: { name: string, driverName?: string, driverPhone?: string, busNumber?: string }) {
  const session = await getSession()
  if (!session) throw new Error("Unauthorized")

  const route = await prisma.busRoute.create({
    data: {
      ...data,
      schoolId: session.schoolId!
    }
  })
  revalidatePath("/dashboard/transport")
  return route
}

export async function addBusStop(routeId: number, name: string, time: string, order: number) {
  const stop = await prisma.busStop.create({
    data: { routeId, name, time, order }
  })
  revalidatePath("/dashboard/transport")
  return stop
}

export async function assignStudentToRoute(studentId: number, routeId: number) {
  await prisma.student.update({
    where: { id: studentId },
    data: { busRouteId: routeId }
  })
  revalidatePath("/dashboard/transport")
}
