"use client"
import * as React from "react"
import { Card } from "@/components/ui/card"
import { Calendar as CalendarIcon, Clock, ChevronLeft, ChevronRight, Plus } from "lucide-react"

const days = ["Lundi", "Mardi", "Mercredi", "Jeudi", "Vendredi", "Samedi"]
const hours = ["08:00", "09:00", "10:00", "11:00", "12:00", "13:00", "14:00", "15:00", "16:00", "17:00"]

export default function AdminCalendarPage() {
  return (
    <div className="space-y-6">
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
        <div>
          <h2 className="text-2xl font-bold text-gray-900">Emploi du Temps Global</h2>
          <p className="text-gray-500">Planification des cours et occupation des salles.</p>
        </div>
        <div className="flex items-center gap-3">
           <div className="flex bg-white border border-gray-200 rounded-lg overflow-hidden">
              <button className="p-2 hover:bg-gray-50 border-r border-gray-200"><ChevronLeft className="h-4 w-4" /></button>
              <div className="px-4 py-2 text-sm font-bold">Semaine du 14 Avr</div>
              <button className="p-2 hover:bg-gray-50 border-l border-gray-200"><ChevronRight className="h-4 w-4" /></button>
           </div>
           <button className="bg-primary text-white px-4 py-2 rounded-lg text-sm font-bold shadow-md flex items-center gap-2">
              <Plus className="h-4 w-4" /> Nouveau cours
           </button>
        </div>
      </div>

      <Card className="p-1 overflow-hidden">
        <div className="overflow-x-auto">
          <div className="min-w-[800px]">
             {/* Header */}
             <div className="grid grid-cols-7 border-b border-gray-100 bg-gray-50/50">
                <div className="p-4 border-r border-gray-100 bg-white" />
                {days.map(day => (
                  <div key={day} className="p-4 text-center text-xs font-bold text-gray-500 uppercase tracking-wider border-r border-gray-100 last:border-0">
                    {day}
                  </div>
                ))}
             </div>
             {/* Grid */}
             <div className="relative">
                {hours.map((hour, idx) => (
                   <div key={hour} className="grid grid-cols-7 border-b border-gray-50 last:border-0 h-20">
                      <div className="p-2 text-[10px] font-bold text-gray-400 text-right pr-4 border-r border-gray-100 bg-gray-50/30">
                        {hour}
                      </div>
                      {days.map(day => (
                         <div key={`${day}-${hour}`} className="p-1 border-r border-gray-50 last:border-0 relative">
                            {day === "Lundi" && hour === "09:00" && (
                               <div className="absolute inset-1 bg-blue-500 text-white p-2 rounded-lg shadow-sm z-10 border border-blue-600">
                                  <p className="text-[10px] font-black leading-none">MATHS</p>
                                  <p className="text-[8px] opacity-80 mt-1">CP-B • Salle 102</p>
                               </div>
                            )}
                            {day === "Mercredi" && hour === "11:00" && (
                               <div className="absolute inset-1 bg-green-600 text-white p-2 rounded-lg shadow-sm z-10 border border-green-700">
                                  <p className="text-[10px] font-black leading-none">FRANÇAIS</p>
                                  <p className="text-[8px] opacity-80 mt-1">CE1-A • Salle 204</p>
                               </div>
                            )}
                         </div>
                      ))}
                   </div>
                ))}
             </div>
          </div>
        </div>
      </Card>
    </div>
  )
}
