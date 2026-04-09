import { redirect } from "next/navigation"
import { getSessionUser } from "@/actions/auth"
import { Role } from "@prisma/client"

export default async function DashboardRootPage() {
  const user = await getSessionUser()

  if (!user) {
    redirect("/login")
  }

  if (user.role === Role.SUPER_ADMIN) {
    redirect("/dashboard/platform-intelligence")
  }

  if (user.role === Role.SCHOOL_ADMIN) {
    redirect("/dashboard/overview")
  }

  if (user.role === Role.TEACHER) {
    redirect("/dashboard/teacher")
  }

  if (user.role === Role.PARENT) {
    redirect("/dashboard/parent")
  }

  return redirect("/login")
}
