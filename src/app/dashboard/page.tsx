import { getSessionUser } from "@/actions/auth"
import { redirect } from "next/navigation"

export default async function DashboardPage() {
  const user = await getSessionUser()

  if (!user) {
    redirect("/login")
  }

  if (user.role === "ADMIN") {
    redirect("/dashboard/overview")
  }

  if (user.role === "TEACHER") {
    redirect("/dashboard/teacher")
  }

  if (user.role === "PARENT") {
    redirect("/dashboard/parent")
  }

  redirect("/login")
}
