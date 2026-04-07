"use client"
import * as React from "react"
import { Card } from "@/components/ui/card"
import { Users, ShieldCheck, Mail, Phone, Briefcase, FileText, CheckCircle2, Clock, Search, MoreVertical, ToggleRight } from "lucide-react"
import { getAdminUsers } from "@/actions/data"
import { cn } from "@/lib/utils"

export default function HRManagementPage() {
  const [employees, setEmployees] = React.useState<any[]>([])
  const [searchTerm, setSearchTerm] = React.useState("")
  const [isLoading, setIsLoading] = React.useState(true)

  React.useEffect(() => {
    getAdminUsers().then(users => {
        // Filter for employees only
        setEmployees(users.filter(u => ['TEACHER', 'STAFF', 'ACCOUNTANT', 'SCHOOL_ADMIN'].includes(u.role)))
        setIsLoading(false)
    })
  }, [])

  const filtered = employees.filter(e =>
    e.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
    e.role.toLowerCase().includes(searchTerm.toLowerCase())
  )

  if (isLoading) return <div className="h-full flex items-center justify-center font-black text-slate-300 animate-pulse uppercase tracking-widest">Initialisation RH...</div>

  return (
    <div className="space-y-10 animate-in fade-in duration-500 pb-20">
      <div className="flex flex-col sm:flex-row justify-between items-end gap-6 border-b border-gray-200 pb-8">
        <div>
          <h2 className="text-4xl font-black text-slate-900 tracking-tight">Espace Ressources Humaines</h2>
          <p className="text-slate-500 font-bold mt-1 uppercase text-xs tracking-widest">Pilotage des carrières et suivi opérationnel du staff</p>
        </div>
        <div className="flex gap-3">
            <button className="bg-slate-900 text-white px-6 py-3 rounded-2xl text-[10px] font-black uppercase tracking-widest hover:bg-slate-800 transition-all flex items-center gap-2">
                <FileText className="h-4 w-4" /> EXPORTER DOSSIERS
            </button>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
        {[
          { label: "Collaborateurs", value: employees.length, icon: Users, color: "blue" },
          { label: "En Poste Aujourd'hui", value: employees.filter(e => e.clockIns?.length > 0).length, icon: CheckCircle2, color: "emerald" },
          { label: "Contrats CDI", value: Math.floor(employees.length * 0.8), icon: Briefcase, color: "purple" },
        ].map((k, i) => (
          <Card key={i} className="p-8 rounded-[32px] border-0 shadow-sm flex items-center gap-6 group hover:shadow-xl transition-all">
             <div className={`p-4 rounded-2xl bg-${k.color}-50 text-${k.color}-600 transition-transform group-hover:scale-110`}>
                <k.icon className="h-6 w-6" />
             </div>
             <div>
                <p className="text-[10px] font-black text-slate-400 uppercase tracking-widest mb-1">{k.label}</p>
                <p className="text-2xl font-black text-slate-900">{k.value}</p>
             </div>
          </Card>
        ))}
      </div>

      <Card className="p-8 rounded-[40px] border-0 shadow-sm bg-white overflow-hidden">
         <div className="flex flex-col md:flex-row items-center justify-between gap-6 mb-10">
            <h3 className="font-black text-slate-900 text-xl tracking-tight uppercase">Registre du Personnel</h3>
            <div className="relative w-full md:w-96">
               <Search className="absolute left-4 top-1/2 -translate-y-1/2 h-4 w-4 text-gray-400" />
               <input
                 type="text"
                 placeholder="Nom, matricule ou rôle..."
                 className="w-full pl-12 pr-4 py-3 bg-slate-50 border-0 rounded-2xl text-xs font-bold outline-none focus:ring-4 focus:ring-slate-900/5 focus:bg-white transition-all"
                 value={searchTerm}
                 onChange={(e) => setSearchTerm(e.target.value)}
               />
            </div>
         </div>

         <div className="overflow-x-auto">
            <table className="w-full text-left">
                <thead>
                    <tr className="text-[10px] uppercase font-black text-slate-400 border-b border-slate-50 tracking-[0.2em]">
                        <th className="px-6 py-4 font-black">Collaborateur</th>
                        <th className="px-6 py-4 font-black text-center">Contrat</th>
                        <th className="px-6 py-4 font-black">Performance</th>
                        <th className="px-6 py-4 font-black">État</th>
                        <th className="px-6 py-4 font-black text-right">Actions</th>
                    </tr>
                </thead>
                <tbody className="divide-y divide-slate-50">
                    {filtered.map((e) => (
                        <tr key={e.id} className="group hover:bg-slate-50/50 transition-all">
                            <td className="px-6 py-6">
                                <div className="flex items-center gap-4">
                                    <div className="h-10 w-10 rounded-2xl bg-slate-900 text-white flex items-center justify-center font-black text-xs italic shadow-lg shadow-slate-900/10">
                                        {e.name.charAt(0)}
                                    </div>
                                    <div>
                                        <p className="text-sm font-black text-slate-900 uppercase">{e.name}</p>
                                        <p className="text-[10px] font-bold text-slate-400 mt-0.5">{e.role}</p>
                                    </div>
                                </div>
                            </td>
                            <td className="px-6 py-6 text-center">
                                <span className="text-[9px] font-black px-3 py-1.5 bg-blue-50 text-blue-600 rounded-xl uppercase tracking-widest border border-blue-100">CDI Full-Time</span>
                            </td>
                            <td className="px-6 py-6">
                                <div className="flex items-center gap-3">
                                    <div className="h-1.5 w-24 bg-slate-100 rounded-full overflow-hidden">
                                        <div className="h-full w-[92%] bg-emerald-500 rounded-full" />
                                    </div>
                                    <span className="text-[10px] font-black text-emerald-600">92%</span>
                                </div>
                            </td>
                            <td className="px-6 py-6">
                                <div className="flex items-center gap-2">
                                    <div className="h-2 w-2 bg-emerald-500 rounded-full shadow-sm shadow-emerald-400" />
                                    <span className="text-[10px] font-black text-slate-900 uppercase tracking-tighter">En Poste</span>
                                </div>
                            </td>
                            <td className="px-6 py-6 text-right">
                                <button className="p-2 text-slate-300 hover:text-slate-900 transition-colors">
                                    <MoreVertical className="h-4 w-4" />
                                </button>
                            </td>
                        </tr>
                    ))}
                </tbody>
            </table>
         </div>
      </Card>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-10">
         <Card className="p-10 border-0 bg-slate-900 text-white rounded-[40px] relative overflow-hidden group">
            <div className="absolute top-0 right-0 p-10 opacity-10 transition-transform group-hover:scale-110">
                <ShieldCheck className="h-40 w-40" />
            </div>
            <div className="relative z-10">
                <h4 className="text-2xl font-black tracking-tight mb-4 uppercase italic">Politique RH</h4>
                <p className="text-slate-400 font-bold max-w-md leading-relaxed mb-10">Centralisez les demandes de congés, les fiches de paie et l'évaluation annuelle de vos collaborateurs dans ce module sécurisé.</p>
                <div className="flex flex-wrap gap-4">
                    <button className="px-6 py-3 bg-white text-slate-900 rounded-2xl text-[10px] font-black uppercase tracking-widest hover:bg-blue-50 transition-all">Gérer les Congés</button>
                    <button className="px-6 py-3 bg-white/10 text-white border border-white/20 rounded-2xl text-[10px] font-black uppercase tracking-widest hover:bg-white/20 transition-all">Tableau Paie</button>
                </div>
            </div>
         </Card>

         <Card className="p-10 border-0 bg-white shadow-sm rounded-[40px] flex flex-col justify-center">
            <div className="flex items-center gap-4 mb-8">
                <Clock className="h-8 w-8 text-primary" />
                <h4 className="text-xl font-black text-slate-900 uppercase tracking-tight">Récapitulatif Horaire</h4>
            </div>
            <div className="space-y-6">
                {[
                    { label: "Moyenne Hebdomadaire", value: "38.5h", trend: "Statique" },
                    { label: "Retards Cumulés", value: "12min", trend: "Baisse (-4%)" },
                ].map((item, i) => (
                    <div key={i} className="flex justify-between items-end p-5 bg-slate-50 rounded-[24px]">
                        <div>
                            <p className="text-[10px] font-black text-slate-400 uppercase tracking-widest mb-1">{item.label}</p>
                            <p className="text-xl font-black text-slate-900">{item.value}</p>
                        </div>
                        <span className="text-[9px] font-black text-blue-600 bg-blue-100/50 px-3 py-1 rounded-full uppercase">{item.trend}</span>
                    </div>
                ))}
            </div>
         </Card>
      </div>
    </div>
  )
}
