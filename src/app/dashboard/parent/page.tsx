"use client"
import * as React from "react"
import { Card } from "@/components/ui/card"
import { Users, BarChart3, Wallet, Bell, CheckCircle2, AlertCircle } from "lucide-react"
import { getMyData } from "@/actions/data"
import { Button } from "@/components/ui/button"

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
        <div className="space-y-8 p-2 md:p-0">
            <div className="bg-blue-600 rounded-2xl p-6 md:p-8 text-white flex flex-col md:flex-row justify-between items-center overflow-hidden relative shadow-lg">
                <div className="relative z-10 text-center md:text-left">
                    <h2 className="text-xl md:text-2xl font-bold mb-2">Bienvenue sur votre espace Parent !</h2>
                    <p className="text-blue-100 max-w-md italic text-sm">Votre compte est actif. Veuillez contacter l'administration pour lier le dossier de votre enfant à votre compte.</p>
                </div>
                <Users className="h-24 w-24 md:h-32 md:w-32 text-white/10 absolute -right-4 -bottom-4 rotate-12" />
            </div>
            <Card className="p-8 md:p-12 text-center border-2 border-dashed border-gray-200 rounded-3xl">
                <div className="h-16 w-16 bg-blue-50 text-blue-600 rounded-full flex items-center justify-center mx-auto mb-4">
                    <AlertCircle className="h-8 w-8" />
                </div>
                <h3 className="text-lg md:text-xl font-bold text-gray-900 mb-2">Aucun enfant trouvé</h3>
                <p className="text-gray-500 max-w-sm mx-auto text-sm">Une fois que l'école aura effectué la liaison, vous pourrez suivre les notes, les absences et l'emploi du temps ici.</p>
            </Card>
        </div>
    )
  }

  return (
    <div className="space-y-6 md:space-y-8">
      {/* Overview Banner */}
      <div className="bg-blue-600 rounded-2xl p-6 md:p-8 text-white flex flex-col md:flex-row justify-between items-center overflow-hidden relative shadow-xl">
        <div className="relative z-10 text-center md:text-left">
          <h2 className="text-xl md:text-2xl font-bold mb-2">Bonjour {student?.parent?.name || "Parent"} !</h2>
          <p className="text-blue-100 max-w-md text-sm">Tout va bien pour {student?.name || "votre enfant"} cette semaine. {student?.attendance?.length || 0} jours de présence enregistrés.</p>
        </div>
        <Users className="h-24 w-24 md:h-32 md:w-32 text-white/10 absolute -right-4 -bottom-4 rotate-12 pointer-events-none" />
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 md:gap-8">
         <div className="lg:col-span-2 space-y-6 md:space-y-8">
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 md:gap-6">
               <Card className="p-6 shadow-sm border-gray-100">
                  <div className="flex justify-between items-start mb-6">
                     <div className="bg-green-50 text-green-600 p-2 rounded-lg">
                        <CheckCircle2 className="h-6 w-6" />
                     </div>
                     <span className="text-[10px] font-black text-green-600 uppercase bg-green-100 px-2 py-1 rounded">
                        {student?.parent?.fees?.[0]?.status === 'PAID' ? 'À jour' : 'En attente'}
                     </span>
                  </div>
                  <h4 className="font-bold text-gray-900">Paiement Scolarité</h4>
                  <p className="text-2xl font-bold text-gray-900 mt-2">
                    {student?.parent?.fees?.[0]?.month || 'N/A'}
                  </p>
                  <p className="text-[10px] text-gray-500 mt-1 uppercase font-bold tracking-wider">
                    {student?.parent?.fees?.[0]?.status === 'PAID'
                        ? `Payé le ${new Date(student?.parent?.fees?.[0]?.paidAt).toLocaleDateString()}`
                        : 'Non encore réglé'
                    }
                  </p>
               </Card>
               <Card className="p-6 shadow-sm border-gray-100">
                  <div className="flex justify-between items-start mb-6">
                     <div className="bg-blue-50 text-blue-600 p-2 rounded-lg">
                        <BarChart3 className="h-6 w-6" />
                     </div>
                     <span className="text-[10px] font-black text-blue-600 uppercase bg-blue-100 px-2 py-1 rounded">Trimestre 2</span>
                  </div>
                  <h4 className="font-bold text-gray-900">Moyenne Générale</h4>
                  <p className="text-2xl font-bold text-gray-900 mt-2">17.45 / 20</p>
                  <p className="text-xs text-gray-500 mt-1 font-medium">2ème sur 28 élèves</p>
               </Card>
            </div>

            {/* Recent Grades */}
            <Card className="p-6 shadow-sm border-gray-100">
               <h3 className="font-bold text-gray-900 text-lg mb-6">Derniers Résultats</h3>
               <div className="space-y-4">
                  {student?.grades?.length > 0 ? student.grades.map((item: any, i: number) => (
                     <div key={i} className="flex items-center justify-between p-4 rounded-xl border border-gray-50 hover:bg-slate-50 transition-all hover:shadow-sm">
                        <div className="min-w-0">
                           <p className="text-[10px] font-black text-blue-600 uppercase tracking-widest">{item.subject}</p>
                           <p className="text-sm font-bold text-gray-900 truncate">Note d'évaluation</p>
                           <p className="text-[10px] text-gray-500">{new Date(item.date).toLocaleDateString()}</p>
                        </div>
                        <div className="text-right shrink-0">
                           <p className="text-lg font-black text-gray-900">{item.value}/20</p>
                           <p className="text-[10px] font-bold text-green-600 italic">{item.observation}</p>
                        </div>
                     </div>
                  )) : (
                     <p className="text-sm text-gray-500 italic text-center py-4">Aucune note enregistrée pour le moment.</p>
                  )}
               </div>
            </Card>
         </div>

         <div className="space-y-6 md:space-y-8">
            <Card className="p-6 shadow-sm border-gray-100">
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

            <Card className="p-6 bg-gradient-to-br from-blue-700 to-indigo-900 text-white border-0 shadow-2xl relative overflow-hidden group">
               <div className="relative z-10">
                  <h4 className="font-black text-lg mb-4 tracking-tight">Menu de la Cantine</h4>
                  <div className="bg-white/10 backdrop-blur-md rounded-2xl p-5 mb-6 border border-white/20 shadow-inner">
                        {canteen ? (
                            <>
                                <p className="text-[10px] font-black uppercase text-blue-200 mb-1 tracking-widest">Plat du jour</p>
                                <p className="text-base font-bold mb-3">{canteen.dish}</p>
                                {canteen.dessert && (
                                    <>
                                        <div className="h-px bg-white/10 my-3" />
                                        <p className="text-[10px] font-black uppercase text-blue-200 mb-1 tracking-widest">Dessert</p>
                                        <p className="text-base font-bold">{canteen.dessert}</p>
                                    </>
                                )}
                            </>
                        ) : (
                            <p className="text-xs italic text-blue-200">Menu non communiqué pour aujourd'hui.</p>
                        )}
                  </div>
                  <div className="space-y-3">
                     <Button variant="google" size="sm" className="w-full text-blue-900">Consulter la semaine</Button>
                     <Button variant="outline" size="sm" className="w-full text-white border-white/30 hover:bg-white/10">Suivi Bus Temps Réel</Button>
                  </div>
               </div>
               <div className="absolute -bottom-6 -right-6 h-32 w-32 bg-white/5 rounded-full blur-3xl group-hover:scale-150 transition-transform duration-500" />
            </Card>
         </div>
      </div>
    </div>
  )
}
