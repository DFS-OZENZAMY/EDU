"use client"
import * as React from "react"
import { Card } from "@/components/ui/card"
import { Users, GraduationCap, Calendar, BarChart3, TrendingUp, AlertTriangle } from "lucide-react"
import { getAdminUsers, getAllStudents, getAllClasses } from "@/actions/data"
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, LineChart, Line } from 'recharts';

export default function DashboardPage() {
  const [users, setUsers] = React.useState<any[]>([])
  const [students, setStudents] = React.useState<any[]>([])
  const [classes, setClasses] = React.useState<any[]>([])

  React.useEffect(() => {
    getAdminUsers().then(setUsers)
    getAllStudents().then(setStudents)
    getAllClasses().then(setClasses)
  }, [])

  const stats = [
    { name: "Total Élèves", value: students.length.toString(), icon: GraduationCap, color: "text-blue-600", bg: "bg-blue-50" },
    { name: "Enseignants", value: users.filter(u => u.role === 'TEACHER').length.toString(), icon: Users, color: "text-green-600", bg: "bg-green-50" },
    { name: "Classes", value: classes.length.toString(), icon: Calendar, color: "text-purple-600", bg: "bg-purple-50" },
    { name: "Parents", value: users.filter(u => u.role === 'PARENT').length.toString(), icon: AlertTriangle, color: "text-red-600", bg: "bg-red-50" },
  ]

  const data = [
    { name: 'Lun', value: 4000 },
    { name: 'Mar', value: 3000 },
    { name: 'Mer', value: 2000 },
    { name: 'Jeu', value: 2780 },
    { name: 'Ven', value: 1890 },
    { name: 'Sam', value: 2390 },
  ];
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
         <Card className="lg:col-span-2 p-6 flex flex-col min-h-[400px]">
            <div className="flex justify-between items-center mb-6">
               <h3 className="font-bold text-gray-900 text-lg">Suivi des présences / paiements</h3>
               <select className="text-sm border-0 bg-gray-50 rounded-lg px-2 py-1 font-medium focus:ring-0">
                  <option>7 derniers jours</option>
                  <option>30 derniers jours</option>
               </select>
            </div>
            <div className="flex-1 w-full h-full min-h-[300px]">
                <ResponsiveContainer width="100%" height="100%">
                    <BarChart data={data}>
                        <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#f1f5f9" />
                        <XAxis
                            dataKey="name"
                            axisLine={false}
                            tickLine={false}
                            tick={{fill: '#94a3b8', fontSize: 12}}
                            dy={10}
                        />
                        <YAxis
                            axisLine={false}
                            tickLine={false}
                            tick={{fill: '#94a3b8', fontSize: 12}}
                        />
                        <Tooltip
                            contentStyle={{borderRadius: '12px', border: 'none', boxShadow: '0 10px 15px -3px rgb(0 0 0 / 0.1)'}}
                        />
                        <Bar dataKey="value" fill="#2563eb" radius={[4, 4, 0, 0]} barSize={40} />
                    </BarChart>
                </ResponsiveContainer>
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
