"use client"
import * as React from "react"
import { Card } from "@/components/ui/card"
import { Zap, Clock, AlertTriangle, CheckCircle, Search, Filter, MoreVertical, ShieldAlert, UserCheck, Calendar } from "lucide-react"
import { DataGrid } from "@/components/admin/data-grid"
import { cn } from "@/lib/utils"
import { Button } from "@/components/ui/button"

const incidents = [
  { id: 1, student: "Yassine Mansouri", class: "2AC-1", type: "ABSENCE", date: "08/04/2026", status: "NON JUSTIFIÉ", severity: "HIGH" },
  { id: 2, student: "Lina Bennani", class: "1AC-3", type: "RETARD", date: "08/04/2026", status: "JUSTIFIÉ", severity: "LOW" },
  { id: 3, student: "Omar El Amrani", class: "3AC-2", type: "SANCTION", date: "07/04/2026", status: "EN COURS", severity: "MEDIUM" },
  { id: 4, student: "Sara Tahiri", class: "2AC-1", type: "ABSENCE", date: "08/04/2026", status: "NON JUSTIFIÉ", severity: "HIGH" },
]

export default function VieScolairePage() {
  const [activeTab, setActiveTab] = React.useState<"TODAY" | "HISTORY" | "SANCTIONS">("TODAY")
  const [selectedIncident, setSelectedIncident] = React.useState<any>(null)

  const columns = [
    { header: "Élève", accessor: "student", render: (val: any) => <span className="font-black text-slate-900">{val}</span> },
    { header: "Classe", accessor: "class" },
    { header: "Nature", accessor: "type", render: (val: any) => (
        <span className={cn(
            "text-[9px] font-black px-2 py-1 rounded-lg uppercase tracking-widest",
            val === 'ABSENCE' ? 'bg-red-50 text-red-600' :
            val === 'RETARD' ? 'bg-amber-50 text-amber-600' : 'bg-slate-900 text-white'
        )}>{val}</span>
    )},
    { header: "Date", accessor: "date" },
    { header: "État", accessor: "status" },
  ]

  return (
    <div className="h-[calc(100vh-100px)] flex flex-col gap-4 animate-in fade-in duration-500 overflow-hidden">
      {/* Pronote Header */}
      <div className="flex items-center justify-between bg-white border border-slate-200 rounded-lg px-6 py-3 shadow-sm shrink-0">
        <div className="flex items-center gap-4">
           <div className="h-10 w-10 bg-red-600 rounded-xl flex items-center justify-center text-white">
              <Zap className="h-6 w-6" />
           </div>
           <div>
              <h2 className="text-sm font-black uppercase tracking-widest text-slate-900 leading-none mb-1">Vie Scolaire</h2>
              <p className="text-[10px] font-bold text-slate-400 uppercase tracking-tighter italic">Absences, Retards & Discipline</p>
           </div>
        </div>
        <div className="flex bg-slate-100 p-1 rounded-lg border border-slate-200">
           {["TODAY", "HISTORY", "SANCTIONS"].map((t) => (
              <button
                key={t}
                onClick={() => setActiveTab(t as any)}
                className={cn(
                    "px-4 py-1.5 text-[9px] font-black uppercase tracking-widest rounded transition-all",
                    activeTab === t ? "bg-white shadow-sm text-red-600" : "text-slate-400 hover:text-slate-600"
                )}
              >
                {t === "TODAY" ? "Aujourd'hui" : t === "HISTORY" ? "Registre Global" : "Sanctions"}
              </button>
           ))}
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-4 gap-4 shrink-0">
          {[
              { label: "Absents (matin)", value: "24", icon: AlertTriangle, color: "red" },
              { label: "Retards", value: "8", icon: Clock, color: "amber" },
              { label: "Justifiés", value: "12", icon: CheckCircle, color: "emerald" },
              { label: "Taux Présence", value: "94%", icon: UserCheck, color: "blue" },
          ].map((k, i) => (
              <Card key={i} className="p-4 border-0 shadow-sm rounded-xl flex items-center gap-4 bg-white">
                  <div className={`p-2 rounded-lg bg-${k.color}-50 text-${k.color}-600`}>
                      <k.icon className="h-5 w-5" />
                  </div>
                  <div>
                      <p className="text-[9px] font-black text-slate-400 uppercase tracking-widest mb-0.5">{k.label}</p>
                      <p className="text-lg font-black text-slate-900">{k.value}</p>
                  </div>
              </Card>
          ))}
      </div>

      <div className="flex-1 flex gap-4 overflow-hidden">
         <div className={cn("flex-1 h-full transition-all duration-300", selectedIncident ? "md:w-2/3" : "w-full")}>
            <DataGrid
                title="Événements de la journée"
                data={incidents}
                columns={columns}
                onRowClick={setSelectedIncident}
                actions={
                    <Button className="bg-red-600 text-white text-[9px] font-black py-1 h-7 rounded px-3 uppercase">Saisir incident</Button>
                }
            />
         </div>

         {selectedIncident && (
            <Card className="w-96 h-full border border-slate-200 shadow-xl overflow-y-auto rounded-lg bg-white flex flex-col animate-in slide-in-from-right-4">
               <div className="p-6 border-b border-slate-100 flex justify-between items-start sticky top-0 bg-white z-10">
                  <div>
                     <h3 className="text-xl font-black text-slate-900 leading-tight uppercase italic">{selectedIncident.student}</h3>
                     <p className="text-[10px] font-black text-red-600 uppercase mt-1 tracking-widest">{selectedIncident.type}</p>
                  </div>
                  <button onClick={() => setSelectedIncident(null)} className="text-slate-300 hover:text-slate-900 transition-colors font-bold text-xl">×</button>
               </div>

               <div className="p-6 space-y-8 flex-1">
                  <div className="bg-red-50 rounded-2xl p-6 border border-red-100 relative overflow-hidden text-red-900">
                     <ShieldAlert className="absolute -bottom-4 -right-4 h-20 w-20 opacity-10" />
                     <p className="text-[10px] font-black uppercase tracking-widest mb-1 opacity-60">Status de l'incident</p>
                     <p className="text-2xl font-black italic">{selectedIncident.status}</p>
                     <Button className="mt-4 bg-red-600 hover:bg-red-700 text-white text-[9px] font-black h-8 px-4 rounded-lg uppercase w-full">Envoyer SMS Parent</Button>
                  </div>

                  <div>
                     <h4 className="text-[10px] font-black text-slate-400 uppercase tracking-widest mb-4 flex items-center gap-2">
                        <Calendar className="h-3 w-3" /> Historique Disciplinaire
                     </h4>
                     <div className="space-y-3">
                        {[1, 2].map((_, i) => (
                            <div key={i} className="flex justify-between items-center p-3 bg-slate-50 rounded-xl border border-slate-100">
                                <div>
                                    <p className="text-[10px] font-black text-slate-900 uppercase">Absence injustifiée</p>
                                    <p className="text-[8px] font-bold text-slate-400 uppercase italic">12/03/2026 • 2 heures</p>
                                </div>
                                <span className="text-[8px] font-black bg-slate-200 px-1.5 py-0.5 rounded uppercase">Dossier #21</span>
                            </div>
                        ))}
                     </div>
                  </div>

                  <div className="pt-6 mt-auto space-y-3">
                     <Button variant="outline" className="w-full text-[10px] font-black uppercase rounded-xl py-6 tracking-widest border-2">
                        Justifier l'absence
                     </Button>
                     <Button className="w-full bg-slate-900 text-white text-[10px] font-black uppercase rounded-xl py-6 tracking-widest">
                        Convertir en Sanction
                     </Button>
                  </div>
               </div>
            </Card>
         )}
      </div>
    </div>
  )
}
