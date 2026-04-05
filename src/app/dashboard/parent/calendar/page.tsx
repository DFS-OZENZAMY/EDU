"use client"
import * as React from "react"
import { Card } from "@/components/ui/card"
import { Calendar as CalendarIcon, Clock, MapPin, ChevronLeft, ChevronRight, User } from "lucide-react"

const schedule = [
  { day: "Lundi", lessons: [
    { time: "08:30 - 10:00", subject: "Mathématiques", teacher: "M. Alaoui", room: "Salle 12" },
    { time: "10:15 - 11:45", subject: "Français", teacher: "Mme. Bennani", room: "Salle 05" },
    { time: "14:30 - 16:00", subject: "Éducation Islamique", teacher: "M. Mansouri", room: "Salle 12" },
  ]},
  { day: "Mardi", lessons: [
    { time: "09:00 - 10:30", subject: "Français", teacher: "Mme. Bennani", room: "Salle 08" },
    { time: "11:00 - 12:30", subject: "Activités d'Éveil", teacher: "M. Tazi", room: "Labo 1" },
    { time: "15:00 - 16:30", subject: "Mathématiques", teacher: "M. Alaoui", room: "Salle 12" },
  ]},
  { day: "Mercredi", lessons: [
    { time: "08:30 - 10:00", subject: "Arabe", teacher: "Mme. Fassi", room: "Salle 12" },
    { time: "10:15 - 11:45", subject: "Français", teacher: "Mme. Bennani", room: "Admin" },
  ]},
  { day: "Jeudi", lessons: [
    { time: "08:30 - 10:00", subject: "Français", teacher: "Mme. Bennani", room: "Salle 05" },
    { time: "10:15 - 11:45", subject: "Mathématiques", teacher: "M. Alaoui", room: "Salle 12" },
    { time: "14:30 - 16:00", subject: "Éducation Physique", teacher: "M. Karim", room: "Terrain" },
  ]},
  { day: "Vendredi", lessons: [
    { time: "09:00 - 10:30", subject: "Soutien", teacher: "M. Alaoui", room: "Labo 2" },
    { time: "11:00 - 12:30", subject: "Arabe", teacher: "Mme. Fassi", room: "Salle 12" },
  ]},
]

export default function ParentCalendarPage() {
  return (
    <div className="space-y-6">
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center bg-white p-6 rounded-2xl shadow-sm border border-gray-100 gap-4">
         <div>
            <h2 className="text-xl font-bold flex items-center gap-2 text-primary">
               <CalendarIcon className="h-5 w-5" />
               Emploi du Temps de Youssef
            </h2>
            <p className="text-sm text-gray-500">Année scolaire 2023 - 2024 • Classe CP-B</p>
         </div>
         <div className="flex items-center gap-2 self-end sm:self-auto">
            <button className="p-2 hover:bg-gray-100 rounded-lg border border-gray-200"><ChevronLeft className="h-4 w-4" /></button>
            <span className="text-sm font-medium px-4">Semaine du 07 Avril</span>
            <button className="p-2 hover:bg-gray-100 rounded-lg border border-gray-200"><ChevronRight className="h-4 w-4" /></button>
         </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-5 gap-4">
         {schedule.map((day) => (
           <div key={day.day} className="flex flex-col gap-4">
              <div className="bg-primary text-white p-3 rounded-xl text-center font-bold text-sm shadow-sm">
                 {day.day}
              </div>
              {day.lessons.map((lesson, idx) => (
                <Card key={idx} className="p-4 border-l-4 border-l-primary/30 hover:shadow-md transition-all hover:-translate-y-1">
                   <p className="text-[10px] font-bold text-gray-400 flex items-center gap-1 mb-3 uppercase tracking-tight">
                      <Clock className="h-3 w-3" />
                      {lesson.time}
                   </p>
                   <h4 className="text-sm font-extrabold text-gray-900 leading-none mb-2">{lesson.subject}</h4>
                   <div className="flex items-center gap-2 text-xs text-primary font-medium mb-3">
                      <User className="h-3 w-3" />
                      {lesson.teacher}
                   </div>
                   <div className="flex items-center gap-1 text-[10px] text-gray-500 bg-gray-50 p-1.5 rounded-lg">
                      <MapPin className="h-3 w-3" />
                      {lesson.room}
                   </div>
                </Card>
              ))}
           </div>
         ))}
      </div>
    </div>
  )
}
