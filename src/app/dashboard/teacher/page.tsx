"use client"
import * as React from "react"
import { Card } from "@/components/ui/card"
import { Users, CheckSquare, BarChart3, Clock, Calendar, PlayCircle, CheckCircle2, Bell } from "lucide-react"
import { getMyData } from "@/actions/data"
import { clockIn } from "@/actions/teacher"

export default function TeacherDashboardPage() {
  const [hasStartedDay, setHasStartedDay] = React.useState(false)
  const [startTime, setStartTime] = React.useState<string | null>(null)
  const [classes, setClasses] = React.useState<any[]>([])
  const [notifications, setNotifications] = React.useState<any[]>([])

  React.useEffect(() => {
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

  if (classes.length === 0) {
    return (
        <div className="space-y-8">
            <div className="bg-green-600 rounded-2xl p-8 text-white flex justify-between items-center overflow-hidden relative shadow-lg">
                <div className="relative z-10">
                    <h2 className="text-2xl font-bold mb-2">Bienvenue Professeur !</h2>
                    <p className="text-green-100 max-w-md italic">Votre compte est actif. Veuillez attendre que l'administration vous assigne vos classes pour commencer à gérer vos élèves.</p>
                </div>
                <Clock className="absolute -right-8 -top-8 h-48 w-48 text-white/10 -rotate-12 pointer-events-none" />
            </div>
            <Card className="p-12 text-center border-2 border-dashed border-gray-200 rounded-3xl">
                <div className="h-16 w-16 bg-green-50 text-green-600 rounded-full flex items-center justify-center mx-auto mb-4">
                    <Calendar className="h-8 w-8" />
                </div>
                <h3 className="text-xl font-bold text-gray-900 mb-2">Aucune classe assignée</h3>
                <p className="text-gray-500 max-w-sm mx-auto">Contactez l'administrateur pour mettre à jour votre emploi du temps et votre liste d'élèves.</p>
            </Card>
        </div>
    )
  }

  return (
    <div className="space-y-8">
      {/* Overview Banner */}
      <div className="bg-green-600 rounded-2xl p-8 text-white flex flex-col md:flex-row justify-between items-start md:items-center gap-6 overflow-hidden relative">
        <div className="relative z-10">
          <h2 className="text-2xl font-bold mb-2">Bonjour Prof. {classes[0]?.teacher?.name || "Ahmed"} !</h2>
          <p className="text-green-100 max-w-md mb-4">Vous avez {classes.length} classes prévues aujourd'hui. Votre prochain cours commence à 08:30.</p>
          {hasStartedDay ? (
            <div className="inline-flex items-center gap-2 bg-white/20 backdrop-blur-md px-4 py-2 rounded-full border border-white/30 text-sm font-medium">
               <CheckCircle2 className="h-4 w-4" />
               Journée démarrée à {startTime}
            </div>
          ) : (
            <button
              onClick={handleStartDay}
              className="group flex items-center gap-2 bg-white text-green-700 px-6 py-2.5 rounded-xl font-bold hover:bg-green-50 transition-all shadow-lg active:scale-95"
            >
               <PlayCircle className="h-5 w-5 group-hover:scale-110 transition-transform" />
               Démarrer ma journée
            </button>
          )}
        </div>
        <Clock className="absolute -right-8 -top-8 h-48 w-48 text-white/10 -rotate-12 pointer-events-none" />
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
         <div className="lg:col-span-2 space-y-8">
            {/* Today's Schedule */}
            <Card className="p-6">
               <h3 className="font-bold text-gray-900 text-lg mb-6 flex items-center gap-2">
                  <Calendar className="h-5 w-5 text-green-600" />
                  Emploi du temps d'aujourd'hui
               </h3>
               <div className="space-y-4">
                  {classes.map((lesson, i) => (
                     <div key={i} className="flex items-center gap-4 p-4 rounded-xl bg-slate-50 border border-slate-100 transition-hover hover:border-green-200 group">
                        <div className="w-32 flex flex-col items-center border-r border-slate-200">
                           <Clock className="h-4 w-4 text-slate-400 mb-1" />
                           <span className="text-xs font-bold text-slate-700">08:30 - 10:00</span>
                        </div>
                        <div className="flex-1">
                           <p className="text-sm font-bold text-gray-900">Français</p>
                           <p className="text-xs text-slate-500">{lesson.name} • {lesson.room}</p>
                        </div>
                        <button className="opacity-0 group-hover:opacity-100 bg-green-600 text-white text-[10px] font-bold px-3 py-1.5 rounded-lg transition-all">
                           Faire l'appel
                        </button>
                     </div>
                  ))}
                  {classes.length === 0 && (
                    <p className="text-sm text-gray-500 text-center py-4 italic">Aucune classe prévue aujourd'hui.</p>
                  )}
               </div>
            </Card>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
               <Card className="p-6 border-l-4 border-l-green-600">
                  <div className="flex justify-between items-start mb-4">
                     <CheckSquare className="h-8 w-8 text-green-600" />
                     <span className="text-xs font-bold text-green-600 bg-green-50 px-2 py-1 rounded">98% complété</span>
                  </div>
                  <h4 className="font-bold text-gray-900">Présences du mois</h4>
                  <p className="text-xs text-gray-500 mt-1">Saisie régulière effectuée.</p>
               </Card>
               <Card className="p-6 border-l-4 border-l-orange-500">
                  <div className="flex justify-between items-start mb-4">
                     <BarChart3 className="h-8 w-8 text-orange-500" />
                     <span className="text-xs font-bold text-orange-600 bg-orange-50 px-2 py-1 rounded">À faire</span>
                  </div>
                  <h4 className="font-bold text-gray-900">Notes Trimestre 2</h4>
                  <p className="text-xs text-gray-500 mt-1">Dernier délai : Vendredi prochain.</p>
               </Card>
            </div>
         </div>

         <div className="space-y-8">
            <Card className="p-6">
               <h3 className="font-bold text-gray-900 text-lg mb-6">Notifications</h3>
               <div className="space-y-4">
                  {notifications.map((notif, i) => (
                     <div key={i} className="p-3 rounded-xl bg-orange-50 border border-orange-100 flex gap-3">
                        <Bell className="h-4 w-4 text-orange-600 shrink-0" />
                        <div>
                            <p className="text-xs font-bold text-gray-900 leading-none mb-1">{notif.title}</p>
                            <p className="text-[11px] text-gray-700 leading-tight">{notif.message}</p>
                            <p className="text-[10px] text-orange-600 mt-2 font-medium">{new Date(notif.createdAt).toLocaleTimeString()}</p>
                        </div>
                     </div>
                  ))}
                  {notifications.length === 0 && (
                    <p className="text-center text-gray-400 text-xs italic py-4">Aucune notification.</p>
                  )}
               </div>
            </Card>

            <Card className="p-6 bg-slate-900 text-white border-0 shadow-xl overflow-hidden relative group">
               <div className="relative z-10">
                  <h4 className="font-bold text-lg mb-2">Cahier de texte</h4>
                  <p className="text-xs text-slate-400 mb-4">Préparez vos prochaines séances en un clic.</p>
                  <button className="bg-green-600 text-white text-xs font-bold px-4 py-2 rounded-lg hover:bg-green-700 transition-colors">
                     Remplir maintenant
                  </button>
               </div>
               <Users className="absolute -bottom-4 -right-4 h-24 w-24 text-white/5 rotate-12 transition-transform group-hover:scale-110" />
            </Card>
         </div>
      </div>
    </div>
  )
}
