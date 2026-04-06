"use client"
import * as React from "react"
import { Card } from "@/components/ui/card"
import { Users, BarChart3, Wallet, Bell, CheckCircle2, AlertCircle } from "lucide-react"
import { getMyData } from "@/actions/data"

export default function ParentDashboardPage() {
  const [data, setData] = React.useState<any[]>([])

  const [notifications, setNotifications] = React.useState<any[]>([])
  const [canteen, setCanteen] = React.useState<any>(null)

  React.useEffect(() => {
    getMyData().then((res: any) => {
        if (res?.students) {
            setData(res.students)
            setNotifications(res.notifications || [])
            setCanteen(res.canteenMenu)
        }
    })
  }, [])

  const student = data[0]

  if (data.length === 0) {
    return (
        <div className="space-y-8">
            <div className="bg-blue-600 rounded-2xl p-8 text-white flex justify-between items-center overflow-hidden relative shadow-lg">
                <div className="relative z-10">
                    <h2 className="text-2xl font-bold mb-2">Bienvenue sur votre espace Parent !</h2>
                    <p className="text-blue-100 max-w-md italic">Votre compte est actif. Veuillez contacter l'administration pour lier le dossier de votre enfant à votre compte.</p>
                </div>
                <Users className="h-32 w-32 text-white/10 absolute -right-4 -bottom-4 rotate-12" />
            </div>
            <Card className="p-12 text-center border-2 border-dashed border-gray-200 rounded-3xl">
                <div className="h-16 w-16 bg-blue-50 text-blue-600 rounded-full flex items-center justify-center mx-auto mb-4">
                    <AlertCircle className="h-8 w-8" />
                </div>
                <h3 className="text-xl font-bold text-gray-900 mb-2">Aucun enfant trouvé</h3>
                <p className="text-gray-500 max-w-sm mx-auto">Une fois que l'école aura effectué la liaison, vous pourrez suivre les notes, les absences et l'emploi du temps ici.</p>
            </Card>
        </div>
    )
  }

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
                  {notifications.map((notif, i) => (
                     <div key={i} className={`p-4 rounded-xl flex gap-3 ${
                        notif.type === "ERROR" ? "bg-red-50 text-red-700 border border-red-100" : "bg-gray-50 text-gray-700 border border-gray-100"
                     }`}>
                        <Bell className="h-5 w-5 shrink-0" />
                        <div>
                            <p className="text-xs font-bold leading-none mb-1">{notif.title}</p>
                            <p className="text-[11px] font-medium leading-relaxed">{notif.message}</p>
                        </div>
                     </div>
                  ))}
                  {notifications.length === 0 && (
                    <p className="text-center text-gray-400 text-xs italic py-4">Aucune nouvelle notification.</p>
                  )}
               </div>
            </Card>

            <Card className="p-6 bg-gradient-to-br from-blue-700 to-indigo-800 text-white border-0">
               <h4 className="font-bold text-lg mb-2">Menu de la Cantine</h4>
               <div className="bg-white/10 backdrop-blur-sm rounded-xl p-4 mb-4 border border-white/20">
                    {canteen ? (
                        <>
                            <p className="text-[10px] font-black uppercase text-blue-200 mb-1">Plat du jour</p>
                            <p className="text-sm font-bold mb-2">{canteen.dish}</p>
                            {canteen.dessert && (
                                <>
                                    <p className="text-[10px] font-black uppercase text-blue-200 mb-1">Dessert</p>
                                    <p className="text-sm font-bold">{canteen.dessert}</p>
                                </>
                            )}
                        </>
                    ) : (
                        <p className="text-xs italic text-blue-200">Menu non communiqué pour aujourd'hui.</p>
                    )}
               </div>
               <div className="space-y-2">
                  <button className="w-full py-2 bg-white text-blue-900 rounded-lg text-xs font-bold transition-all">Consulter la semaine</button>
                  <button className="w-full py-2 bg-white/20 hover:bg-white/30 rounded-lg text-xs font-bold transition-all backdrop-blur-sm">Suivi Bus Temps Réel</button>
               </div>
            </Card>
         </div>
      </div>
    </div>
  )
}
