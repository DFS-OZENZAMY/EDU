import { Card } from "@/components/ui/card"
import { Users, GraduationCap, Calendar, BarChart3, TrendingUp, AlertTriangle } from "lucide-react"

const stats = [
  { name: "Total Élèves", value: "342", icon: GraduationCap, color: "text-blue-600", bg: "bg-blue-50" },
  { name: "Enseignants", value: "28", icon: Users, icon2: Users, color: "text-green-600", bg: "bg-green-50" },
  { name: "Taux de présence", value: "94.2%", icon: Calendar, color: "text-purple-600", bg: "bg-purple-50" },
  { name: "Retards paiement", value: "12", icon: AlertTriangle, color: "text-red-600", bg: "bg-red-50" },
]

export default function DashboardPage() {
  return (
    <div className="space-y-8">
      {/* Welcome Banner */}
      <div className="bg-primary rounded-2xl p-8 text-white flex flex-col sm:flex-row justify-between items-center gap-6">
        <div>
          <h2 className="text-2xl font-bold mb-2">Bienvenue sur votre espace EDU !</h2>
          <p className="text-blue-100 max-w-md">Voici un aperçu de l'activité de votre établissement pour aujourd'hui.</p>
        </div>
        <div className="flex gap-4">
           <div className="bg-white/20 px-4 py-2 rounded-xl backdrop-blur-sm border border-white/30 text-center min-w-[100px]">
              <p className="text-sm font-medium opacity-80 leading-none">Aujourd'hui</p>
              <p className="text-lg font-bold">14 Avr</p>
           </div>
           <div className="bg-white/20 px-4 py-2 rounded-xl backdrop-blur-sm border border-white/30 text-center min-w-[100px]">
              <p className="text-sm font-medium opacity-80 leading-none">Statut</p>
              <p className="text-lg font-bold text-green-300">Actif</p>
           </div>
        </div>
      </div>

      {/* Stats Grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
        {stats.map((stat, i) => (
          <Card key={i} className="p-6">
             <div className="flex justify-between items-start mb-4">
                <div className={`${stat.bg} ${stat.color} p-3 rounded-xl`}>
                   <stat.icon className="h-6 w-6" />
                </div>
                <div className="flex items-center gap-1 text-green-600 text-xs font-bold bg-green-50 px-2 py-1 rounded-full">
                   <TrendingUp className="h-3 w-3" />
                   +2.4%
                </div>
             </div>
             <div>
                <p className="text-sm font-medium text-gray-500">{stat.name}</p>
                <p className="text-2xl font-bold text-gray-900">{stat.value}</p>
             </div>
          </Card>
        ))}
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
         {/* Main Chart Placeholder */}
         <Card className="lg:col-span-2 p-6 flex flex-col">
            <div className="flex justify-between items-center mb-6">
               <h3 className="font-bold text-gray-900 text-lg">Suivi des paiements</h3>
               <select className="text-sm border-0 bg-gray-50 rounded-lg px-2 py-1 font-medium focus:ring-0">
                  <option>7 derniers jours</option>
                  <option>30 derniers jours</option>
               </select>
            </div>
            <div className="flex-1 bg-slate-50 rounded-xl border border-dashed border-gray-200 flex items-center justify-center">
                <p className="text-gray-400 font-medium italic">Graphique analytique en attente de données</p>
            </div>
         </Card>

         {/* Recent Activity */}
         <Card className="p-6">
            <h3 className="font-bold text-gray-900 text-lg mb-6">Activités récentes</h3>
            <div className="space-y-6">
               {[1, 2, 3, 4].map(i => (
                  <div key={i} className="flex gap-4">
                     <div className="h-10 w-10 rounded-full bg-gray-100 flex items-center justify-center shrink-0">
                        <Users className="h-5 w-5 text-gray-400" />
                     </div>
                     <div className="flex-1 min-w-0">
                        <p className="text-sm font-bold text-gray-900">Nouvel élève inscrit</p>
                        <p className="text-xs text-gray-500 truncate">Youssef Bennani - CP-B</p>
                        <p className="text-[10px] text-gray-400 mt-1">Il y a 2 heures</p>
                     </div>
                  </div>
               ))}
            </div>
            <button className="w-full mt-6 py-2 text-primary text-sm font-bold hover:bg-blue-50 rounded-lg transition-colors border border-primary/10">
               Voir tout l'historique
            </button>
         </Card>
      </div>
    </div>
  )
}
