import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { ChefHat, Utensils, Apple, Info } from "lucide-react"

export default function CanteenPage() {
  return (
    <div className="p-6 space-y-6">
      <div className="flex justify-between items-center">
        <h1 className="text-2xl font-bold text-slate-900">Gestion de la Cantine</h1>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <ChefHat className="w-5 h-5 text-orange-600" />
              Menu du Jour
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="p-4 bg-orange-50 rounded-2xl border border-orange-100">
              <div className="space-y-3">
                <div>
                  <p className="text-[10px] text-orange-600 font-bold uppercase tracking-widest">Entrée</p>
                  <p className="font-bold text-slate-900">Salade Marocaine Fraîche</p>
                </div>
                <div>
                  <p className="text-[10px] text-orange-600 font-bold uppercase tracking-widest">Plat Principal</p>
                  <p className="font-bold text-slate-900">Tajine de Poulet aux Citrons Confits</p>
                </div>
                <div>
                  <p className="text-[10px] text-orange-600 font-bold uppercase tracking-widest">Dessert</p>
                  <p className="font-bold text-slate-900">Fruits de Saison & Thé</p>
                </div>
              </div>
            </div>

            <div className="flex items-start gap-2 p-3 bg-blue-50 text-blue-800 rounded-lg text-sm">
              <Info className="w-4 h-4 mt-0.5" />
              <p>Menu validé par le nutritionniste le 12/05/2024</p>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Utensils className="w-5 h-5 text-blue-600" />
              Statistiques de Fréquentation
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-6 pt-4">
              {[
                { label: "Maternelle", current: 85, total: 100, color: "bg-pink-500" },
                { label: "Primaire", current: 240, total: 280, color: "bg-blue-500" },
                { label: "Collège", current: 120, total: 150, color: "bg-green-500" },
              ].map((group, i) => (
                <div key={i} className="space-y-2">
                  <div className="flex justify-between text-sm">
                    <span className="font-medium text-slate-700">{group.label}</span>
                    <span className="text-slate-500">{group.current} / {group.total} présents</span>
                  </div>
                  <div className="h-2 bg-slate-100 rounded-full overflow-hidden">
                    <div className="h-full transition-all duration-1000"
                         style={{
                           width: `${(group.current / group.total) * 100}%`,
                           backgroundColor: group.color
                         }} />
                  </div>
                </div>
              ))}

              <div className="pt-4 grid grid-cols-2 gap-4">
                <div className="p-3 border rounded-xl text-center">
                  <Apple className="w-5 h-5 mx-auto text-green-500 mb-1" />
                  <p className="text-xs text-slate-500">Repas Allergènes</p>
                  <p className="text-lg font-bold text-slate-900">14</p>
                </div>
                <div className="p-3 border rounded-xl text-center">
                  <Utensils className="w-5 h-5 mx-auto text-blue-500 mb-1" />
                  <p className="text-xs text-slate-500">Total Servis</p>
                  <p className="text-lg font-bold text-slate-900">445</p>
                </div>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  )
}
