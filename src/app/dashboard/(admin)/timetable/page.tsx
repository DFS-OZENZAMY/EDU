"use client"
import * as React from "react"
import { Card } from "@/components/ui/card"
import { Calendar, Clock, Plus, Users, Search, ChevronLeft, ChevronRight, MoreVertical, BookOpen, MapPin, Monitor, Coffee } from "lucide-react"
import { Button } from "@/components/ui/button"
import { cn } from "@/lib/utils"

const DAYS = ["Lundi", "Mardi", "Mercredi", "Jeudi", "Vendredi", "Samedi"]
const HOURS = ["08:00", "09:00", "10:00", "11:00", "12:00", "14:00", "15:00", "16:00", "17:00", "18:00"]

export default function TimetablePage() {
  const [activeTab, setActiveTab] = React.useState<"CLASSES" | "TEACHERS" | "ROOMS">("CLASSES")
  const [selectedEntity, setSelectedEntity] = React.useState("CE1-A")

  return (
    <div className="h-[calc(100vh-100px)] flex flex-col gap-4 animate-in fade-in duration-500 overflow-hidden">
      {/* Pronote Header */}
      <div className="flex items-center justify-between bg-white border border-slate-200 rounded-lg px-6 py-3 shadow-sm shrink-0">
        <div className="flex items-center gap-4">
           <div className="h-10 w-10 bg-orange-600 rounded-xl flex items-center justify-center text-white">
              <Calendar className="h-6 w-6" />
           </div>
           <div>
              <h2 className="text-sm font-black uppercase tracking-widest text-slate-900 leading-none mb-1">EDT & Ressources</h2>
              <p className="text-[10px] font-bold text-slate-400 uppercase tracking-tighter italic">Gestion du temps et des espaces</p>
           </div>
        </div>
        <div className="flex bg-slate-100 p-1 rounded-lg border border-slate-200">
           {[
               { id: "CLASSES", label: "Classes", icon: Users },
               { id: "TEACHERS", label: "Profs", icon: BookOpen },
               { id: "ROOMS", label: "Salles", icon: MapPin }
           ].map((t) => (
              <button
                key={t.id}
                onClick={() => setActiveTab(t.id as any)}
                className={cn(
                    "px-4 py-1.5 text-[9px] font-black uppercase tracking-widest rounded flex items-center gap-2 transition-all",
                    activeTab === t.id ? "bg-white shadow-sm text-orange-600" : "text-slate-400 hover:text-slate-600"
                )}
              >
                <t.icon className="h-3 w-3" /> {t.label}
              </button>
           ))}
        </div>
      </div>

      <div className="flex-1 flex gap-4 overflow-hidden">
         {/* Sidebar for Entity Selection */}
         <div className="w-64 h-full bg-white border border-slate-200 rounded-lg flex flex-col shrink-0">
            <div className="p-4 border-b border-slate-100">
                <div className="relative">
                    <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-3 w-3 text-slate-400" />
                    <input
                        placeholder="Rechercher..."
                        className="w-full pl-8 pr-3 py-1.5 bg-slate-50 border border-slate-200 rounded text-[10px] font-bold outline-none"
                    />
                </div>
            </div>
            <div className="flex-1 overflow-y-auto p-2 space-y-1">
                {(activeTab === "CLASSES" ? ["CE1-A", "CE1-B", "CE2-A", "CM1-A", "CM2-B"] :
                  activeTab === "ROOMS" ? ["Salle 101", "Labo SVT", "Salle Info", "Sport-A"] :
                  ["M. Alami", "Mme. Bennani", "M. Khalil"]).map(item => (
                    <button
                        key={item}
                        onClick={() => setSelectedEntity(item)}
                        className={cn(
                            "w-full text-left px-3 py-2 rounded text-[10px] font-black uppercase tracking-widest transition-all",
                            selectedEntity === item ? "bg-orange-50 text-orange-600" : "text-slate-500 hover:bg-slate-50"
                        )}
                    >
                        {item}
                    </button>
                ))}
            </div>
         </div>

         {/* Main Timetable View */}
         <div className="flex-1 bg-white border border-slate-200 rounded-lg overflow-hidden flex flex-col">
            <div className="p-3 border-b border-slate-100 flex items-center justify-between bg-slate-50/50">
                <div className="flex items-center gap-2">
                    <Button variant="ghost" size="icon" className="h-7 w-7"><ChevronLeft className="h-4 w-4" /></Button>
                    <span className="text-[10px] font-black uppercase tracking-widest px-2">Semaine du 12 Avril 2026</span>
                    <Button variant="ghost" size="icon" className="h-7 w-7"><ChevronRight className="h-4 w-4" /></Button>
                </div>
                <Button className="bg-slate-900 text-white text-[9px] font-black h-7 px-3 uppercase rounded shadow-sm">
                    Imprimer l'EDT
                </Button>
            </div>

            <div className="flex-1 overflow-auto">
                <table className="w-full border-collapse table-fixed">
                    <thead>
                        <tr className="sticky top-0 z-20 bg-white shadow-sm border-b border-slate-200">
                            <th className="w-16 p-2 border-r border-slate-200">
                                <Clock className="h-3.5 w-3.5 text-slate-300 mx-auto" />
                            </th>
                            {DAYS.map(day => (
                                <th key={day} className="p-2 text-[10px] font-black uppercase tracking-widest text-slate-400 text-center border-r border-slate-100 last:border-0">
                                    {day}
                                </th>
                            ))}
                        </tr>
                    </thead>
                    <tbody>
                        {HOURS.map((hour, hIdx) => (
                            <tr key={hour} className="h-24">
                                <td className="p-2 border-r border-b border-slate-200 text-center bg-slate-50/30 align-top">
                                    <span className="text-[9px] font-black text-slate-400">{hour}</span>
                                </td>
                                {DAYS.map((day, dIdx) => {
                                    const hasClass = (hIdx + dIdx) % 3 === 0 && hIdx < 8
                                    const isConflict = hIdx === 2 && dIdx === 0 // Force a conflict example

                                    return (
                                        <td key={`${day}-${hour}`} className="p-1 border-b border-r border-slate-100 last:border-0 align-top group relative">
                                            {hasClass && (
                                                <div className={cn(
                                                    "h-full rounded-md p-3 border text-left transition-all cursor-pointer relative",
                                                    isConflict ? "bg-red-50 border-red-200" : "bg-blue-50/50 border-blue-100 hover:bg-blue-50 hover:shadow-sm"
                                                )}>
                                                    <p className={cn("text-[8px] font-black uppercase mb-1", isConflict ? "text-red-600" : "text-blue-600")}>
                                                        {isConflict ? "CONFLIT SALLE" : "Mathématiques"}
                                                    </p>
                                                    <p className="text-[10px] font-black text-slate-900 leading-tight">
                                                        {activeTab === "TEACHERS" ? selectedEntity : "M. Khalil"}
                                                    </p>
                                                    <div className="mt-2 flex items-center justify-between opacity-60">
                                                        <div className="flex items-center gap-1">
                                                            <MapPin className="h-2.5 w-2.5" />
                                                            <span className="text-[8px] font-bold uppercase tracking-tighter">Salle 104</span>
                                                        </div>
                                                        {isConflict && <AlertCircle className="h-3 w-3 text-red-600 animate-pulse" />}
                                                    </div>
                                                </div>
                                            )}
                                        </td>
                                    )
                                })}
                            </tr>
                        ))}
                    </tbody>
                </table>
            </div>
         </div>
      </div>
    </div>
  )
}

function AlertCircle(props: any) {
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
        <circle cx="12" cy="12" r="10" />
        <line x1="12" x2="12" y1="8" y2="12" />
        <line x1="12" x2="12.01" y1="16" y2="16" />
      </svg>
    )
}
