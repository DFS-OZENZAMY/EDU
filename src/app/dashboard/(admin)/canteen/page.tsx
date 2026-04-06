"use client"
import * as React from "react"
import { Card } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Utensils, Save, Calendar, CheckCircle2 } from "lucide-react"
import { prisma } from "@/lib/prisma"

export default function AdminCanteenPage() {
  const [dish, setDish] = React.useState("")
  const [dessert, setDessert] = React.useState("")
  const [isLoading, setIsLoading] = React.useState(false)

  const handleSave = async (e: React.FormEvent) => {
    e.preventDefault()
    setIsLoading(true)
    // Using a dynamic import for action to keep it simple or direct prisma if client-side allowed (no, use action)
    const { updateCanteenMenu } = await import("@/actions/admin")
    const formData = new FormData()
    formData.append("dish", dish)
    formData.append("dessert", dessert)
    formData.append("date", new Date().toISOString().split('T')[0])

    await updateCanteenMenu(formData)
    setIsLoading(false)
    alert("Menu mis à jour !")
  }

  return (
    <div className="max-w-2xl mx-auto space-y-8">
      <div>
        <h2 className="text-2xl font-bold text-gray-900">Gestion de la Cantine</h2>
        <p className="text-gray-500">Définissez le menu du jour pour les élèves et parents.</p>
      </div>

      <Card className="p-8 space-y-6">
        <div className="flex items-center gap-3 border-b pb-4">
           <div className="h-12 w-12 rounded-2xl bg-orange-50 text-orange-600 flex items-center justify-center">
              <Utensils className="h-6 w-6" />
           </div>
           <div>
              <h3 className="font-bold text-lg">Menu du {new Date().toLocaleDateString('fr-FR')}</h3>
              <p className="text-xs text-gray-500 uppercase font-bold tracking-widest">Aujourd'hui</p>
           </div>
        </div>

        <form onSubmit={handleSave} className="space-y-4">
           <div>
              <label className="block text-sm font-bold text-gray-700 mb-2">Plat principal</label>
              <input
                type="text"
                required
                className="w-full px-4 py-3 rounded-xl border border-gray-200 focus:ring-4 focus:ring-primary/10 outline-none"
                placeholder="ex: Tajine de poulet aux olives"
                value={dish}
                onChange={(e) => setDish(e.target.value)}
              />
           </div>
           <div>
              <label className="block text-sm font-bold text-gray-700 mb-2">Dessert / Accompagnement</label>
              <input
                type="text"
                className="w-full px-4 py-3 rounded-xl border border-gray-200 focus:ring-4 focus:ring-primary/10 outline-none"
                placeholder="ex: Fruits de saison ou Yaourt"
                value={dessert}
                onChange={(e) => setDessert(e.target.value)}
              />
           </div>

           <div className="pt-4">
              <Button type="submit" disabled={isLoading} className="w-full bg-primary py-6 text-lg font-black uppercase tracking-widest shadow-xl shadow-primary/20">
                 {isLoading ? "Enregistrement..." : "Publier le menu"}
              </Button>
           </div>
        </form>
      </Card>

      <div className="bg-blue-50 p-6 rounded-3xl border border-blue-100 flex gap-4 items-start">
         <CheckCircle2 className="h-6 w-6 text-primary shrink-0" />
         <p className="text-sm text-blue-900 leading-relaxed font-medium">
            Une fois publié, le menu sera immédiatement visible par tous les parents sur leur tableau de bord.
         </p>
      </div>
    </div>
  )
}
