"use client"
import * as React from "react"
import { Card } from "@/components/ui/card"
import { Users, CheckSquare, BarChart3, Clock, Calendar, PlayCircle, CheckCircle2, Bell, Wallet, Truck, ChefHat } from "lucide-react"
import { getMyData } from "@/actions/data"
import { clockIn } from "@/actions/teacher"
import { Button } from "@/components/ui/button"

import { getSessionUser } from "@/actions/auth"

export default function EmployeeDashboardPage() {
  const [user, setUser] = React.useState<any>(null)
  const [hasStartedDay, setHasStartedDay] = React.useState(false)
  const [startTime, setStartTime] = React.useState<string | null>(null)
  const [classes, setClasses] = React.useState<any[]>([])
  const [notifications, setNotifications] = React.useState<any[]>([])

  React.useEffect(() => {
    getSessionUser().then(setUser)
    getMyData().then((res: any) => {
        if (res?.classes) {
            const data = res.classes
            setClasses(data)
            setNotifications(res.notifications || [])
            // Check if already clocked in today
            const teacher = data[0]?.teacher
            if (teacher?.clockIns?.length > 0) {
                const lastClock = new Date(teacher.clockIns[0].time)
                setHasStartedDay(true)
                setStartTime(lastClock.toLocaleTimeString('fr-FR', { hour: '2-digit', minute: '2-digit' }))
            }
        }
    })
  }, [])

  const handleStartDay = async () => {
    await clockIn()
    setHasStartedDay(true)
    setStartTime(new Date().toLocaleTimeString('fr-FR', { hour: '2-digit', minute: '2-digit' }))
  }

  if (user?.role === 'ACCOUNTANT') {
    return (
      <div className="space-y-8 animate-in fade-in duration-500">
        <div className="bg-slate-900 rounded-3xl p-10 text-white relative overflow-hidden shadow-2xl">
          <div className="relative z-10">
            <h2 className="text-3xl font-black mb-2 tracking-tight">Bonjour, {user.name}</h2>
            <p className="text-slate-400 font-bold uppercase text-xs tracking-widest italic">Espace Gestion Financière & Trésorerie</p>
          </div>
          <Wallet className="absolute -right-12 -top-12 h-64 w-64 text-white/5 -rotate-12 pointer-events-none" />
        </div>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
           {/* Generic Stat cards for accountant */}
           <Card className="p-6">
              <p className="text-[10px] font-black text-slate-400 uppercase tracking-widest mb-1">Total Recettes (Mois)</p>
              <h4 className="text-2xl font-black text-slate-900">142,500 DH</h4>
           </Card>
           <Card className="p-6 border-l-4 border-l-red-500">
              <p className="text-[10px] font-black text-slate-400 uppercase tracking-widest mb-1">Impayés Critiques</p>
              <h4 className="text-2xl font-black text-red-600">8,400 DH</h4>
           </Card>
           <Card className="p-6">
              <p className="text-[10px] font-black text-slate-400 uppercase tracking-widest mb-1">Dépenses Approuvées</p>
              <h4 className="text-2xl font-black text-slate-900">32,100 DH</h4>
           </Card>
           <Card className="p-6 border-l-4 border-l-emerald-500">
              <p className="text-[10px] font-black text-slate-400 uppercase tracking-widest mb-1">Balance Net</p>
              <h4 className="text-2xl font-black text-emerald-600">+102,000 DH</h4>
           </Card>
        </div>
        {/* Quick access for accountant */}
        <div className="flex gap-4 overflow-x-auto pb-4">
           {['Factures Parents', 'Salaires Staff', 'Fournisseurs', 'Rapports'].map((item) => (
             <Button key={item} variant="secondary" className="whitespace-nowrap rounded-2xl px-8 h-12 font-black uppercase tracking-widest text-[10px]">
               {item}
             </Button>
           ))}
        </div>
      </div>
    )
  }

  if (user?.role === 'STAFF') {
    return (
      <div className="space-y-8 animate-in fade-in duration-500">
        <div className="bg-blue-600 rounded-3xl p-10 text-white relative overflow-hidden shadow-2xl">
          <div className="relative z-10">
            <h2 className="text-3xl font-black mb-2 tracking-tight italic">ESPACE STAFF - {user.name}</h2>
            <p className="text-blue-100 font-bold uppercase text-xs tracking-widest">Opérations Scolaires & Logistique</p>
          </div>
          <Users className="absolute -right-12 -top-12 h-64 w-64 text-white/5 -rotate-12 pointer-events-none" />
        </div>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
           <Card className="p-8 border-0 shadow-xl rounded-[40px] bg-white group hover:scale-[1.02] transition-transform">
              <Truck className="h-10 w-10 text-blue-600 mb-4" />
              <h4 className="text-xl font-black text-slate-900 uppercase tracking-tighter italic">Transport</h4>
              <p className="text-xs text-slate-500 font-medium mt-2">12 bus en service • 87% arrivés</p>
              <Button className="w-full mt-6 rounded-2xl font-black uppercase tracking-widest text-[10px]">Gérer la flotte</Button>
           </Card>
           <Card className="p-8 border-0 shadow-xl rounded-[40px] bg-white group hover:scale-[1.02] transition-transform">
              <ChefHat className="h-10 w-10 text-orange-600 mb-4" />
              <h4 className="text-xl font-black text-slate-900 uppercase tracking-tighter italic">Cantine</h4>
              <p className="text-xs text-slate-500 font-medium mt-2">445 repas servis • Menu du jour: Poulet</p>
              <Button className="w-full mt-6 rounded-2xl font-black uppercase tracking-widest text-[10px]">Voir menus</Button>
           </Card>
           <Card className="p-8 border-0 shadow-xl rounded-[40px] bg-white group hover:scale-[1.02] transition-transform">
              <Bell className="h-10 w-10 text-red-600 mb-4" />
              <h4 className="text-xl font-black text-slate-900 uppercase tracking-tighter italic">Absences</h4>
              <p className="text-xs text-slate-500 font-medium mt-2">22 nouveaux signalements ce matin</p>
              <Button className="w-full mt-6 rounded-2xl font-black uppercase tracking-widest text-[10px]">Appeler parents</Button>
           </Card>
        </div>
      </div>
    )
  }

  if (classes.length === 0) {
    return (
        <div className="space-y-8 p-2 md:p-0">
            <div className="bg-green-600 rounded-3xl p-6 md:p-10 text-white flex justify-between items-center overflow-hidden relative shadow-2xl">
                <div className="relative z-10 text-center md:text-left">
                    <h2 className="text-xl md:text-3xl font-black mb-3 tracking-tight uppercase">Bienvenue Professeur !</h2>
                    <p className="text-green-100 max-w-md italic text-sm md:text-base leading-relaxed">Votre compte est actif. Veuillez attendre que l'administration vous assigne vos classes pour commencer à gérer vos élèves.</p>
                </div>
                <Clock className="absolute -right-12 -top-12 h-48 md:h-64 w-48 md:w-64 text-white/5 -rotate-12 pointer-events-none" />
            </div>
            <Card className="p-10 md:p-16 text-center border-2 border-dashed border-gray-100 rounded-3xl bg-white shadow-sm">
                <div className="h-20 w-20 bg-green-50 text-green-600 rounded-full flex items-center justify-center mx-auto mb-6 shadow-inner">
                    <Calendar className="h-10 w-10" />
                </div>
                <h3 className="text-xl md:text-2xl font-black text-gray-900 mb-3 tracking-tight">Aucune classe assignée</h3>
                <p className="text-gray-500 max-w-md mx-auto text-sm md:text-base">Contactez l'administrateur pour mettre à jour votre emploi du temps et votre liste d'élèves.</p>
            </Card>
        </div>
    )
  }

  return (
    <div className="space-y-6 md:space-y-8">
      {/* Overview Banner */}
      <div className="bg-green-600 rounded-3xl p-6 md:p-10 text-white flex flex-col md:flex-row justify-between items-start md:items-center gap-8 overflow-hidden relative shadow-2xl">
        <div className="relative z-10">
          <h2 className="text-2xl md:text-3xl font-black mb-3 tracking-tight">Bonjour Prof. {classes[0]?.teacher?.name || "Ahmed"} !</h2>
          <p className="text-green-50 max-w-md mb-6 font-medium text-sm md:text-base">Vous avez {classes.length} classes prévues aujourd'hui. Votre prochain cours commence à 08:30.</p>
          {hasStartedDay ? (
            <div className="inline-flex items-center gap-3 bg-white/20 backdrop-blur-xl px-5 py-3 rounded-2xl border border-white/30 text-sm font-black uppercase tracking-widest shadow-lg">
               <CheckCircle2 className="h-5 w-5 text-green-300" />
               Journée démarrée à {startTime}
            </div>
          ) : (
            <Button
              variant="google"
              size="lg"
              onClick={handleStartDay}
              className="group bg-white text-green-700 hover:bg-green-50 border-none shadow-2xl"
            >
               <PlayCircle className="h-5 w-5 group-hover:scale-110 transition-transform" />
               Démarrer ma journée
            </Button>
          )}
        </div>
        <Clock className="absolute -right-12 -top-12 h-48 md:h-64 w-48 md:w-64 text-white/5 -rotate-12 pointer-events-none" />
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 md:gap-8">
         <div className="lg:col-span-2 space-y-6 md:space-y-8">
            {/* Today's Schedule */}
            <Card className="p-6 md:p-8 shadow-sm border-gray-100">
               <h3 className="font-black text-gray-900 text-lg md:text-xl mb-6 flex items-center gap-3 tracking-tight">
                  <div className="p-2 bg-green-50 rounded-xl">
                    <Calendar className="h-5 w-5 text-green-600" />
                  </div>
                  Emploi du temps
               </h3>
               <div className="space-y-4">
                  {classes.map((lesson, i) => (
                     <div key={i} className="flex flex-col sm:flex-row items-start sm:items-center gap-4 p-5 rounded-2xl bg-gray-50 border border-gray-100 transition-all hover:bg-white hover:shadow-xl hover:border-green-100 group cursor-default">
                        <div className="flex items-center gap-3 min-w-[140px] sm:border-r sm:border-gray-200">
                           <Clock className="h-4 w-4 text-gray-400" />
                           <span className="text-xs font-black text-gray-700 tracking-tighter uppercase">08:30 - 10:00</span>
                        </div>
                        <div className="flex-1 min-w-0">
                           <p className="text-sm font-black text-gray-900 tracking-tight">{lesson.name}</p>
                           <p className="text-[10px] md:text-xs text-gray-500 font-bold uppercase tracking-wider mt-0.5">{lesson.room || "Salle 14"} • Section {lesson.id}</p>
                        </div>
                        <Button variant="secondary" size="sm" className="w-full sm:w-auto opacity-100 sm:opacity-0 group-hover:opacity-100 transition-all shadow-none">
                           Faire l'appel
                        </Button>
                     </div>
                  ))}
                  {classes.length === 0 && (
                    <p className="text-sm text-gray-500 text-center py-4 italic">Aucune classe prévue aujourd'hui.</p>
                  )}
               </div>
            </Card>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
               <Card className="p-6 border-l-8 border-l-green-600 shadow-sm">
                  <div className="flex justify-between items-start mb-6">
                     <div className="p-3 bg-green-50 rounded-2xl">
                        <CheckSquare className="h-8 w-8 text-green-600" />
                     </div>
                     <span className="text-[10px] font-black text-green-600 bg-green-50 px-2 py-1 rounded uppercase tracking-widest">98% complété</span>
                  </div>
                  <h4 className="font-black text-gray-900 text-lg tracking-tight">Présences du mois</h4>
                  <p className="text-xs text-gray-500 mt-2 font-medium">Saisie régulière effectuée.</p>
               </Card>
               <Card className="p-6 border-l-8 border-l-orange-500 shadow-sm">
                  <div className="flex justify-between items-start mb-6">
                     <div className="p-3 bg-orange-50 rounded-2xl">
                        <BarChart3 className="h-8 w-8 text-orange-500" />
                     </div>
                     <span className="text-[10px] font-black text-orange-600 bg-orange-50 px-2 py-1 rounded uppercase tracking-widest">Action requise</span>
                  </div>
                  <h4 className="font-black text-gray-900 text-lg tracking-tight">Notes Trimestre 2</h4>
                  <p className="text-xs text-gray-500 mt-2 font-medium">Dernier délai : Vendredi prochain.</p>
               </Card>
            </div>
         </div>

         <div className="space-y-6 md:space-y-8">
            <Card className="p-6 md:p-8 shadow-sm border-gray-100">
               <h3 className="font-black text-gray-900 text-lg md:text-xl mb-6 tracking-tight">Alertes</h3>
               <div className="space-y-4">
                  {notifications.map((notif, i) => (
                     <div key={i} className="p-4 rounded-2xl bg-orange-50 border border-orange-100 flex gap-4 transition-all hover:shadow-inner">
                        <div className="p-2 bg-orange-100 rounded-xl h-fit">
                            <Bell className="h-4 w-4 text-orange-600" />
                        </div>
                        <div className="min-w-0">
                            <p className="text-xs font-black text-gray-900 mb-1 tracking-tight">{notif.title}</p>
                            <p className="text-[11px] text-gray-700 leading-relaxed font-medium">{notif.message}</p>
                            <p className="text-[9px] text-orange-600 mt-3 font-black uppercase tracking-widest">{new Date(notif.createdAt).toLocaleTimeString()}</p>
                        </div>
                     </div>
                  ))}
                  {notifications.length === 0 && (
                    <p className="text-center text-gray-400 text-xs italic py-4">Aucune notification.</p>
                  )}
               </div>
            </Card>

            <Card className="p-8 bg-gray-900 text-white border-0 shadow-2xl overflow-hidden relative group rounded-3xl">
               <div className="relative z-10">
                  <h4 className="font-black text-xl mb-3 tracking-tighter uppercase">Cahier de texte</h4>
                  <p className="text-sm text-gray-400 mb-6 font-medium leading-relaxed">Préparez vos prochaines séances et communiquez avec les parents.</p>
                  <Button variant="secondary" className="w-full">
                     Saisir maintenant
                  </Button>
               </div>
               <div className="absolute -bottom-6 -right-6 h-32 w-32 bg-green-500/10 rounded-full blur-3xl group-hover:scale-150 transition-all duration-500" />
               <Users className="absolute -bottom-4 -right-4 h-24 w-24 text-white/5 rotate-12 transition-transform group-hover:scale-110 pointer-events-none" />
            </Card>
         </div>
      </div>
    </div>
  )
}
