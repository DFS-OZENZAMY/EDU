"use client"
import * as React from "react"
import { Card } from "@/components/ui/card"
import { Users, BarChart3, Wallet, Bell, CheckCircle2, AlertCircle } from "lucide-react"
import { getMyData } from "@/actions/data"

export default function ParentDashboardPage() {
  const [data, setData] = React.useState<any[]>([])

  React.useEffect(() => {
    getMyData().then((res: any) => {
        if (Array.isArray(res)) setData(res)
    })
  }, [])

  const student = data[0]

  return (
    <div className="space-y-8">
      {/* Overview Banner */}
      <div className="bg-blue-600 rounded-2xl p-8 text-white flex justify-between items-center overflow-hidden relative">
        <div className="relative z-10">
          <h2 className="text-2xl font-bold mb-2">Bonjour {student?.parent?.name || "Parent"} !</h2>
          <p className="text-blue-100 max-w-md">Tout va bien pour {student?.name || "votre enfant"} cette semaine. {student?.attendance?.length || 0} jours de présence enregistrés.</p>
        </div>
        <Users className="h-32 w-32 text-white/10 absolute -right-4 -bottom-4 rotate-12" />
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
         <div className="lg:col-span-2 space-y-8">
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
               <Card className="p-6">
                  <div className="flex justify-between items-start mb-6">
                     <div className="bg-green-50 text-green-600 p-2 rounded-lg">
                        <CheckCircle2 className="h-6 w-6" />
                     </div>
         <span className="text-[10px] font-bold text-green-600 uppercase">
            {student?.parent?.fees?.[0]?.status === 'PAID' ? 'À jour' : 'En attente'}
         </span>
                  </div>
                  <h4 className="font-bold text-gray-900">Paiement Scolarité</h4>
      <p className="text-2xl font-bold text-gray-900 mt-2">
        {student?.parent?.fees?.[0]?.month || 'N/A'}
      </p>
      <p className="text-xs text-gray-500 mt-1">
        {student?.parent?.fees?.[0]?.status === 'PAID'
            ? `Payé le ${new Date(student?.parent?.fees?.[0]?.paidAt).toLocaleDateString()}`
            : 'Non encore réglé'
        }
      </p>
               </Card>
               <Card className="p-6">
                  <div className="flex justify-between items-start mb-6">
                     <div className="bg-blue-50 text-blue-600 p-2 rounded-lg">
                        <BarChart3 className="h-6 w-6" />
                     </div>
                     <span className="text-[10px] font-bold text-blue-600 uppercase">Trimestre 2</span>
                  </div>
                  <h4 className="font-bold text-gray-900">Moyenne Générale</h4>
                  <p className="text-2xl font-bold text-gray-900 mt-2">17.45 / 20</p>
                  <p className="text-xs text-gray-500 mt-1">2ème sur 28 élèves</p>
               </Card>
            </div>

            {/* Recent Grades */}
            <Card className="p-6">
               <h3 className="font-bold text-gray-900 text-lg mb-6">Derniers Résultats</h3>
               <div className="space-y-4">
                  {student?.grades?.length > 0 ? student.grades.map((item: any, i: number) => (
                     <div key={i} className="flex items-center justify-between p-4 rounded-xl border border-gray-100 hover:bg-slate-50 transition-colors">
                        <div>
                           <p className="text-xs font-bold text-blue-600 uppercase tracking-tight">{item.subject}</p>
                           <p className="text-sm font-bold text-gray-900">Note d'évaluation</p>
                           <p className="text-[10px] text-gray-500">{new Date(item.date).toLocaleDateString()}</p>
                        </div>
                        <div className="text-right">
                           <p className="text-lg font-bold text-gray-900">{item.value}/20</p>
                           <p className="text-[10px] font-bold text-green-600 italic">{item.observation}</p>
                        </div>
                     </div>
                  )) : (
                     <p className="text-sm text-gray-500 italic text-center py-4">Aucune note enregistrée pour le moment.</p>
                  )}
               </div>
            </Card>
         </div>

         <div className="space-y-8">
            <Card className="p-6">
               <h3 className="font-bold text-gray-900 text-lg mb-6">Notifications</h3>
               <div className="space-y-4">
                  {[
                     { text: "Réunion parents-profs ce Vendredi à 17h.", type: "urgent" },
                     { text: "Excursion scolaire prévue pour le 25 Mai.", type: "info" },
                     { text: "Nouveau cahier de texte disponible (Français).", type: "update" },
                  ].map((notif, i) => (
                     <div key={i} className={`p-4 rounded-xl flex gap-3 ${
                        notif.type === "urgent" ? "bg-red-50 text-red-700 border border-red-100" : "bg-gray-50 text-gray-700 border border-gray-100"
                     }`}>
                        <Bell className="h-5 w-5 shrink-0" />
                        <p className="text-xs font-medium leading-relaxed">{notif.text}</p>
                     </div>
                  ))}
               </div>
            </Card>

            <Card className="p-6 bg-gradient-to-br from-blue-700 to-indigo-800 text-white border-0">
               <h4 className="font-bold text-lg mb-2">Cantine & Transport</h4>
               <p className="text-xs text-blue-200 mb-6 leading-relaxed italic">Vérifiez le menu de la semaine et suivez le bus scolaire en temps réel.</p>
               <div className="space-y-2">
                  <button className="w-full py-2 bg-white/20 hover:bg-white/30 rounded-lg text-xs font-bold transition-all backdrop-blur-sm">Menu de la semaine</button>
                  <button className="w-full py-2 bg-white/20 hover:bg-white/30 rounded-lg text-xs font-bold transition-all backdrop-blur-sm">Suivi Bus Temps Réel</button>
               </div>
            </Card>
         </div>
      </div>
    </div>
  )
}
