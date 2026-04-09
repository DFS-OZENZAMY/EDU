"use client"
import * as React from "react"
import { Card } from "@/components/ui/card"
import { Zap, Clock, AlertTriangle, CheckCircle, Search, Filter, Calendar, ShieldAlert, UserCheck, MessageSquare, Info } from "lucide-react"
import { cn } from "@/lib/utils"

const studentIncidents = [
  { id: 1, type: "ABSENCE", date: "08/04/2026", duration: "2 heures", subject: "Mathématiques", status: "NON JUSTIFIÉ", severity: "HIGH" },
  { id: 2, type: "RETARD", date: "05/04/2026", duration: "10 min", subject: "Français", status: "JUSTIFIÉ", severity: "LOW" },
  { id: 3, type: "MERITE", date: "01/04/2026", duration: "N/A", subject: "SVT", status: "VALIDE", severity: "POSITIVE" },
]

export default function ParentVieScolairePage() {
  return (
    <div className="space-y-10 animate-in fade-in duration-500 pb-20">
      <div className="flex flex-col sm:flex-row justify-between items-end gap-6 border-b border-gray-200 pb-8">
        <div>
          <h2 className="text-4xl font-black text-slate-900 tracking-tight">Vie Scolaire & Discipline</h2>
          <p className="text-slate-500 font-bold mt-1 uppercase text-xs tracking-widest">Suivi des présences et du comportement en temps réel</p>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          <Card className="p-8 border-0 shadow-sm rounded-[32px] bg-red-50 border-b-8 border-red-500">
             <p className="text-[10px] font-black text-red-400 uppercase tracking-widest mb-1">Absences injustifiées</p>
             <h3 className="text-4xl font-black text-red-600 italic">02 <span className="text-sm">Séances</span></h3>
          </Card>
          <Card className="p-8 border-0 shadow-sm rounded-[32px] bg-amber-50 border-b-8 border-amber-500">
             <p className="text-[10px] font-black text-amber-400 uppercase tracking-widest mb-1">Retards cumulés</p>
             <h3 className="text-4xl font-black text-amber-600 italic">10 <span className="text-sm">Minutes</span></h3>
          </Card>
          <Card className="p-8 border-0 shadow-sm rounded-[32px] bg-emerald-50 border-b-8 border-emerald-500">
             <p className="text-[10px] font-black text-emerald-400 uppercase tracking-widest mb-1">Points Mérite</p>
             <h3 className="text-4xl font-black text-emerald-600 italic">+15 <span className="text-sm">Points</span></h3>
          </Card>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-10">
         <div className="lg:col-span-2 space-y-6">
            <h3 className="text-lg font-black text-slate-900 uppercase tracking-tight mb-6">Timeline de l'élève</h3>
            {studentIncidents.map((incident) => (
               <Card key={incident.id} className="p-6 border-0 shadow-sm rounded-[24px] bg-white group hover:shadow-xl transition-all relative overflow-hidden">
                  <div className={cn(
                      "absolute top-0 left-0 w-2 h-full",
                      incident.severity === 'HIGH' ? "bg-red-500" : incident.severity === 'POSITIVE' ? "bg-emerald-500" : "bg-amber-500"
                  )} />
                  <div className="flex justify-between items-center">
                     <div className="flex items-center gap-6">
                        <div className={cn(
                            "h-12 w-12 rounded-2xl flex items-center justify-center shrink-0",
                            incident.severity === 'HIGH' ? "bg-red-50 text-red-600" : incident.severity === 'POSITIVE' ? "bg-emerald-50 text-emerald-600" : "bg-amber-50 text-amber-600"
                        )}>
                            {incident.type === 'ABSENCE' ? <ShieldAlert className="h-6 w-6" /> : incident.type === 'RETARD' ? <Clock className="h-6 w-6" /> : <Zap className="h-6 w-6" />}
                        </div>
                        <div>
                           <div className="flex items-center gap-3 mb-1">
                              <h4 className="text-sm font-black text-slate-900 uppercase">{incident.type} : {incident.subject}</h4>
                              <span className="text-[9px] font-bold text-slate-400 border px-2 py-0.5 rounded-lg">{incident.date}</span>
                           </div>
                           <p className="text-xs font-bold text-slate-500 italic">Durée : {incident.duration} • {incident.status}</p>
                        </div>
                     </div>
                     {incident.status === 'NON JUSTIFIÉ' && (
                        <button className="bg-slate-900 text-white text-[9px] font-black h-8 px-4 rounded-lg uppercase hover:bg-slate-800 transition-colors">
                           Justifier en ligne
                        </button>
                     )}
                  </div>
               </Card>
            ))}
         </div>

         <div className="space-y-10">
            <Card className="p-8 rounded-[40px] border-0 shadow-sm bg-slate-900 text-white relative overflow-hidden group">
               <div className="absolute top-0 right-0 p-8 opacity-10"><Info className="h-32 w-32" /></div>
               <div className="relative z-10">
                  <h3 className="text-xl font-black uppercase tracking-tight mb-4 italic">Règlement Intérieur</h3>
                  <p className="text-slate-400 font-medium text-sm leading-relaxed mb-8">Consultez les règles de conduite et les barèmes de sanctions de l'établissement.</p>
                  <button className="w-full bg-white text-slate-900 font-black py-4 rounded-2xl text-[10px] uppercase tracking-widest hover:bg-slate-100">TELECHARGER LE PDF</button>
               </div>
            </Card>

            <Card className="p-8 rounded-[40px] border-0 shadow-sm bg-white">
                <div className="flex items-center gap-3 mb-6">
                    <div className="p-2 bg-blue-50 text-blue-600 rounded-xl"><MessageSquare className="h-5 w-5" /></div>
                    <h4 className="font-black text-slate-900 uppercase tracking-tight">Contact CPE</h4>
                </div>
                <p className="text-xs font-bold text-slate-500 leading-relaxed mb-6 italic">Besoin d'un rendez-vous avec le conseiller d'éducation ?</p>
                <button className="w-full bg-blue-600 text-white font-black py-4 rounded-2xl text-[10px] uppercase tracking-widest hover:bg-blue-700 transition-all shadow-lg shadow-blue-600/20">PRENDRE RENDEZ-VOUS</button>
            </Card>
         </div>
      </div>
    </div>
  )
}
