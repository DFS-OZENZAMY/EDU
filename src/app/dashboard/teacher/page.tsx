import { Card } from "@/components/ui/card"
import { Users, CheckSquare, BarChart3, Clock, Calendar } from "lucide-react"

export default function TeacherDashboardPage() {
  return (
    <div className="space-y-8">
      {/* Overview Banner */}
      <div className="bg-green-600 rounded-2xl p-8 text-white">
        <h2 className="text-2xl font-bold mb-2">Bonjour Prof. Ahmed !</h2>
        <p className="text-green-100 max-w-md">Vous avez 4 classes prévues aujourd'hui. Votre prochain cours commence à 10:00.</p>
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
                  {[
                     { time: "08:30 - 10:00", class: "CP-A", subject: "Français", room: "Salle 12" },
                     { time: "10:15 - 11:45", class: "CE1-B", subject: "Français", room: "Salle 05" },
                     { time: "14:30 - 16:00", class: "CP-B", subject: "Français", room: "Salle 12" },
                     { time: "16:15 - 17:45", class: "CE2-A", subject: "Soutien", room: "Labo 01" },
                  ].map((lesson, i) => (
                     <div key={i} className="flex items-center gap-4 p-4 rounded-xl bg-slate-50 border border-slate-100 transition-hover hover:border-green-200 group">
                        <div className="w-32 flex flex-col items-center border-r border-slate-200">
                           <Clock className="h-4 w-4 text-slate-400 mb-1" />
                           <span className="text-xs font-bold text-slate-700">{lesson.time}</span>
                        </div>
                        <div className="flex-1">
                           <p className="text-sm font-bold text-gray-900">{lesson.subject}</p>
                           <p className="text-xs text-slate-500">{lesson.class} • {lesson.room}</p>
                        </div>
                        <button className="opacity-0 group-hover:opacity-100 bg-green-600 text-white text-[10px] font-bold px-3 py-1.5 rounded-lg transition-all">
                           Faire l'appel
                        </button>
                     </div>
                  ))}
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
               <h3 className="font-bold text-gray-900 text-lg mb-6">Messages Urgents</h3>
               <div className="space-y-4">
                  {[1, 2].map(i => (
                     <div key={i} className="p-3 rounded-lg bg-orange-50 border border-orange-100">
                        <div className="flex items-center gap-2 mb-2">
                           <div className="h-6 w-6 rounded-full bg-orange-200" />
                           <p className="text-xs font-bold text-gray-900 italic">Mme Bennani (Parent)</p>
                        </div>
                        <p className="text-xs text-gray-700 leading-tight">Bonjour M. Alaoui, mon fils Youssef sera absent demain pour rendez-vous médical.</p>
                        <p className="text-[10px] text-orange-600 mt-2 font-medium">Il y a 45 min • Répondre</p>
                     </div>
                  ))}
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
