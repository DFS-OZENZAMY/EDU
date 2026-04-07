"use server"
import { prisma } from "@/lib/prisma"
import { getSession } from "@/lib/auth"
import { revalidatePath } from "next/cache"

export async function updateUserProfile(formData: FormData) {
  const session = await getSession()
  if (!session) return { error: "Non authentifié" }

  const name = formData.get("name") as string
  const phone = formData.get("phone") as string

  try {
    await prisma.user.update({
        where: { id: session.userId },
        data: { name, phone }
    })
    revalidatePath("/dashboard/profile")
    return { success: true }
  } catch (error) {
    return { error: "Erreur lors de la mise à jour" }
  }
}
