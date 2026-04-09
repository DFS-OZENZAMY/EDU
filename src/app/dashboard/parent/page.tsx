"use client"
import * as React from "react"
import { Card } from "@/components/ui/card"
import { Users, BarChart3, Wallet, Bell, CheckCircle2, AlertCircle, Clock, TrendingUp, ChefHat, Trophy, Zap, MessageSquare } from "lucide-react"
import { getMyData } from "@/actions/data"
import { Button } from "@/components/ui/button"
import { cn } from "@/lib/utils"

export default function ParentDashboardPage() {
  const [data, setData] = React.useState<any[]>([])
  const [notifications, setNotifications] = React.useState<any[]>([])
  const [canteen, setCanteen] = React.useState<any>(null)
  const [isLoading, setIsLoading] = React.useState(true)

  React.useEffect(() => {
    getMyData().then((res: any) => {
        if (res?.students) {
            setData(res.students)
            setNotifications(res.notifications || [])
            setCanteen(res.canteenMenu)
        }
        setIsLoading(false)
    })
  }, [])

  if (isLoading) return <div className="h-full flex items-center justify-center font-black text-slate-300 animate-pulse uppercase tracking-widest">Synchronisation des données...</div>

  if (data.length === 0) {
    return (
        <div className="space-y-8 animate-in fade-in duration-500">
            <div className="bg-slate-900 rounded-[40px] p-10 text-white flex flex-col md:flex-row justify-between items-center overflow-hidden relative shadow-2xl">
                <div className="relative z-10 text-center md:text-left">
                    <h2 className="text-3xl font-black mb-2 tracking-tight">Bienvenue, Parent !</h2>
                    <p className="text-slate-400 max-w-md font-bold text-sm italic">Votre instance SaaS est active. Veuillez patienter pendant que l'administration lie le dossier de vos enfants.</p>
                </div>
                <div className="absolute right-0 top-0 p-10 opacity-10">
                    <Users className="h-40 w-40" />
                </div>
            </div>
            <Card className="p-20 text-center border-0 shadow-sm rounded-[40px] bg-white">
                <div className="h-20 w-20 bg-slate-50 text-slate-400 rounded-3xl flex items-center justify-center mx-auto mb-6">
                    <AlertCircle className="h-10 w-10" />
                </div>
                <h3 className="text-2xl font-black text-slate-900 mb-2">Dossier en attente</h3>
                <p className="text-slate-400 max-w-sm mx-auto font-medium">Une fois la liaison effectuée, vous pourrez piloter la scolarité de vos enfants ici.</p>
            </Card>
        </div>
    )
  }

  const student = data[0]
  const average = student.grades && student.grades.length > 0
    ? (student.grades.reduce((acc: any, g: any) => acc + g.value, 0) / student.grades.length).toFixed(2)
    : "N/A"

  const lastFee = student.parent?.fees?.[0]

  return (
    <div className="space-y-10 animate-in fade-in duration-700 pb-20">
      {/* Premium Parent Banner */}
      <div className="bg-slate-900 rounded-[40px] p-10 text-white flex flex-col md:flex-row justify-between items-center overflow-hidden relative shadow-2xl">
        <div className="relative z-10 text-center md:text-left">
          <h2 className="text-4xl font-black mb-3 tracking-tighter">Bonjour, {student?.parent?.name?.split(' ')[0] || "Parent"} !</h2>
          <p className="text-slate-400 font-bold max-w-lg leading-relaxed">
            Suivi en temps réel de <span className="text-primary italic">{student?.name}</span>.
            Dernière présence : <span className="text-white">{student.attendance?.[0] ? new Date(student.attendance[0].date).toLocaleDateString() : 'Non enregistrée'}</span>.
          </p>
        </div>
        <div className="absolute right-0 top-0 p-10 opacity-10">
            <Users className="h-40 w-40" />
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-10">
         <div className="lg:col-span-2 space-y-10">
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-8">
               <Card className="p-8 border-0 shadow-sm rounded-[32px] bg-white group hover:shadow-xl transition-all">
                  <div className="flex justify-between items-start mb-8">
                     <div className="bg-emerald-50 text-emerald-600 p-4 rounded-2xl">
                        <Wallet className="h-6 w-6" />
                     </div>
                     <span className={cn(
                        "text-[10px] font-black px-3 py-1.5 rounded-xl uppercase tracking-widest border",
                        lastFee?.status === 'PAID' ? 'bg-emerald-50 text-emerald-600 border-emerald-100' : 'bg-amber-50 text-amber-600 border-amber-100'
                     )}>
                        {lastFee?.status === 'PAID' ? 'RÉGLÉ' : 'À PAYER'}
                     </span>
                  </div>
                  <p className="text-[10px] font-black text-slate-400 uppercase tracking-widest mb-1">Dernier Frais</p>
                  <h4 className="text-2xl font-black text-slate-900 tracking-tight">{lastFee?.month || 'Scolarité'}</h4>
                  <p className="text-xs font-bold text-slate-500 mt-2">
                    {lastFee?.status === 'PAID'
                        ? `Transaction validée le ${new Date(lastFee.paidAt).toLocaleDateString()}`
                        : `Montant dû : ${lastFee?.amount || '0'} DH`
                    }
                  </p>
               </Card>

               <Card className="p-8 border-0 shadow-sm rounded-[32px] bg-white group hover:shadow-xl transition-all">
                  <div className="flex justify-between items-start mb-8">
                     <div className="bg-blue-50 text-blue-600 p-4 rounded-2xl">
                        <BarChart3 className="h-6 w-6" />
                     </div>
                     <div className="flex items-center gap-1 text-blue-600 text-[10px] font-black bg-blue-50 px-2 py-1 rounded-full uppercase">
                        <TrendingUp className="h-3 w-3" /> STABLE
                     </div>
                  </div>
                  <p className="text-[10px] font-black text-slate-400 uppercase tracking-widest mb-1">Moyenne Générale</p>
                  <h4 className="text-3xl font-black text-slate-900 tracking-tighter">{average} <span className="text-sm font-bold text-slate-300 tracking-normal">/ 20</span></h4>
                  <p className="text-xs font-bold text-slate-500 mt-2">Basé sur {student.grades?.length || 0} évaluations</p>
               </Card>
            </div>

            {/* Recent Grades */}
            <Card className="p-10 border-0 shadow-sm rounded-[40px] bg-white">
               <div className="flex justify-between items-center mb-10">
                  <h3 className="font-black text-slate-900 text-xl tracking-tight uppercase">Derniers Résultats</h3>
                  <button className="text-[10px] font-black text-primary hover:underline uppercase tracking-widest">Dossier Complet</button>
               </div>
               <div className="space-y-6">
                  {student?.grades?.length > 0 ? student.grades.slice(0, 4).map((item: any, i: number) => (
                     <div key={i} className="flex items-center justify-between p-6 rounded-3xl border border-slate-50 hover:bg-slate-50/50 transition-all hover:border-primary/20 group cursor-pointer">
                        <div className="flex items-center gap-5">
                           <div className="h-12 w-12 bg-slate-900 text-white rounded-2xl flex items-center justify-center font-black text-xs italic group-hover:bg-primary transition-colors shadow-lg shadow-slate-900/10">
                              {item.subject.charAt(0)}
                           </div>
                           <div className="min-w-0">
                              <p className="text-[10px] font-black text-primary uppercase tracking-[0.2em] mb-0.5">{item.subject}</p>
                              <p className="text-sm font-black text-slate-900 truncate">Évaluation continue</p>
                              <p className="text-[10px] font-bold text-slate-400 mt-1 uppercase">{new Date(item.date).toLocaleDateString('fr-FR', {day: 'numeric', month: 'long'})}</p>
                           </div>
                        </div>
                        <div className="text-right shrink-0">
                           <p className="text-2xl font-black text-slate-900 tracking-tight">{item.value}<span className="text-[10px] text-slate-300 font-bold ml-1">/20</span></p>
                           <p className="text-[10px] font-black text-emerald-500 uppercase tracking-tight mt-1 bg-emerald-50 px-2 py-0.5 rounded-lg">{item.observation || "Bravos !"}</p>
                        </div>
                     </div>
                  )) : (
                     <div className="py-12 text-center text-slate-300">
                        <FileText className="h-12 w-12 mx-auto mb-4 opacity-20" />
                        <p className="text-xs font-black uppercase tracking-widest">Aucune note synchronisée</p>
                     </div>
                  )}
               </div>
            </Card>
         </div>

         <div className="space-y-10">
            <Card className="p-8 border-0 shadow-sm rounded-[32px] bg-white">
               <div className="flex justify-between items-center mb-8">
                  <h3 className="font-black text-slate-900 text-sm uppercase tracking-widest">Flux Direct</h3>
                  <div className="h-2 w-2 bg-red-500 rounded-full animate-ping" />
               </div>
               <div className="space-y-6">
                  {notifications.map((notif, i) => (
                     <div key={i} className="flex gap-4 group cursor-pointer">
                        <div className={cn(
                            "h-10 w-10 rounded-xl flex items-center justify-center shrink-0 transition-colors",
                            notif.type === "WARNING" ? "bg-amber-50 text-amber-600" : "bg-blue-50 text-blue-600"
                        )}>
                            <Bell className="h-5 w-5" />
                        </div>
                        <div className="min-w-0">
                            <p className="text-xs font-black text-slate-900 group-hover:text-primary transition-colors truncate">{notif.title}</p>
                            <p className="text-[10px] font-bold text-slate-400 leading-tight mt-0.5 line-clamp-2">{notif.message}</p>
                        </div>
                     </div>
                  ))}
                  {notifications.length === 0 && (
                    <p className="text-center text-slate-300 text-[10px] font-black uppercase tracking-widest py-10 italic">Canal vide</p>
                  )}
               </div>
            </Card>

            <Card className="p-8 border-0 shadow-xl rounded-[40px] bg-indigo-600 text-white overflow-hidden relative group">
                <div className="absolute top-0 right-0 p-8 opacity-10 rotate-12 group-hover:rotate-45 transition-transform duration-700"><Trophy className="h-40 w-40" /></div>
                <div className="relative z-10">
                    <h3 className="text-2xl font-black uppercase tracking-tight mb-4 italic">Succès & Badges</h3>
                    <p className="text-indigo-100 font-medium text-sm leading-relaxed mb-8">Découvrez les derniers badges et points mérités par {student?.name}.</p>
                    <div className="flex gap-4">
                       <div className="h-12 w-12 bg-white/20 rounded-xl flex items-center justify-center backdrop-blur-md">
                          <Zap className="h-6 w-6 text-yellow-300" />
                       </div>
                       <div>
                          <p className="text-xs font-black uppercase tracking-widest">Points Totaux</p>
                          <p className="text-2xl font-black">{student?.achievements?.reduce((acc: number, a: any) => acc + a.points, 0) || 120} XP</p>
                       </div>
                    </div>
                </div>
            </Card>

            <Card className="p-10 bg-primary text-white border-0 shadow-2xl rounded-[40px] relative overflow-hidden group">
               <div className="relative z-10">
                  <div className="flex items-center gap-3 mb-8">
                     <ChefHat className="h-8 w-8 text-blue-100" />
                     <h4 className="font-black text-xl tracking-tight uppercase italic">Menu Cantine</h4>
                  </div>
                  <div className="bg-white/10 backdrop-blur-xl rounded-[32px] p-8 mb-10 border border-white/20 shadow-inner">
                        {canteen ? (
                            <div className="space-y-6">
                                <div>
                                    <p className="text-[10px] font-black uppercase text-blue-200 mb-2 tracking-[0.2em]">Principal</p>
                                    <p className="text-xl font-black leading-tight">{canteen.dish}</p>
                                </div>
                                {canteen.dessert && (
                                    <div>
                                        <div className="h-px bg-white/10 w-12 mb-4" />
                                        <p className="text-[10px] font-black uppercase text-blue-200 mb-2 tracking-[0.2em]">Fin de Repas</p>
                                        <p className="text-lg font-black leading-tight text-blue-100">{canteen.dessert}</p>
                                    </div>
                                )}
                            </div>
                        ) : (
                            <div className="py-6 text-center">
                                <Clock className="h-10 w-10 mx-auto mb-4 opacity-30 animate-pulse" />
                                <p className="text-xs font-black uppercase tracking-widest text-blue-200">En cours de préparation</p>
                            </div>
                        )}
                  </div>
                  <button className="w-full py-4 bg-white text-primary font-black uppercase text-[10px] tracking-[0.2em] rounded-2xl shadow-xl hover:bg-blue-50 transition-all active:scale-95">
                     PLANNING SEMAINE
                  </button>
               </div>
               <div className="absolute -bottom-10 -right-10 h-60 w-60 bg-white/5 rounded-full blur-[80px] pointer-events-none" />
            </Card>
         </div>
      </div>
    </div>
  )
}

// Helper icons for the empty state
function FileText(props: any) {
  return (
    <svg
      {...props}
      xmlns="http://www.w3.org/2000/svg"
      width="24"
      height="24"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
    >
      <path d="M15 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V7Z" />
      <path d="M14 2v4a2 2 0 0 0 2 2h4" />
      <path d="M10 9H8" />
      <path d="M16 13H8" />
      <path d="M16 17H8" />
    </svg>
  )
}
