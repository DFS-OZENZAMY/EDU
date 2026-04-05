"use client"
import * as React from "react"
import { Card } from "@/components/ui/card"
import { Calendar as CalendarIcon, Clock, MapPin, ChevronLeft, ChevronRight } from "lucide-react"

const schedule = [
  { day: "Lundi", lessons: [
    { time: "08:30 - 10:00", subject: "Français", class: "CP-A", room: "Salle 12" },
    { time: "10:15 - 11:45", subject: "Mathématiques", class: "CE1-B", room: "Salle 05" },
    { time: "14:30 - 16:00", subject: "Français", class: "CP-B", room: "Salle 12" },
  ]},
  { day: "Mardi", lessons: [
    { time: "09:00 - 10:30", subject: "Français", class: "CE2-A", room: "Salle 08" },
    { time: "11:00 - 12:30", subject: "Soutien", class: "CP-A", room: "Labo 1" },
    { time: "15:00 - 16:30", subject: "Français", class: "CP-B", room: "Salle 12" },
  ]},
  { day: "Mercredi", lessons: [
    { time: "08:30 - 10:00", subject: "Français", class: "CP-A", room: "Salle 12" },
    { time: "10:15 - 11:45", subject: "Réunion Pédagogique", class: "Staff", room: "Admin" },
  ]},
  { day: "Jeudi", lessons: [
    { time: "08:30 - 10:00", subject: "Mathématiques", class: "CE1-B", room: "Salle 05" },
    { time: "10:15 - 11:45", subject: "Français", class: "CP-B", room: "Salle 12" },
    { time: "14:30 - 16:00", subject: "Français", class: "CE2-A", room: "Salle 08" },
  ]},
  { day: "Vendredi", lessons: [
    { time: "09:00 - 10:30", subject: "Soutien", class: "CE1-B", room: "Labo 2" },
    { time: "11:00 - 12:30", subject: "Français", class: "CP-A", room: "Salle 12" },
  ]},
]

export default function TeacherSchedulePage() {
  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center bg-white p-4 rounded-xl shadow-sm border border-gray-100">
         <h2 className="text-xl font-bold flex items-center gap-2">
            <CalendarIcon className="h-5 w-5 text-green-600" />
            Mon Emploi du Temps
         </h2>
         <div className="flex items-center gap-2">
            <button className="p-2 hover:bg-gray-100 rounded-lg"><ChevronLeft className="h-4 w-4" /></button>
            <span className="text-sm font-medium">Semaine du 07 Avril</span>
            <button className="p-2 hover:bg-gray-100 rounded-lg"><ChevronRight className="h-4 w-4" /></button>
         </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-5 gap-4 h-[calc(100vh-16rem)] overflow-y-auto">
         {schedule.map((day) => (
           <div key={day.day} className="flex flex-col gap-4">
              <div className="bg-green-600 text-white p-2 rounded-lg text-center font-bold text-sm shadow-sm sticky top-0 z-10">
                 {day.day}
              </div>
              {day.lessons.map((lesson, idx) => (
                <Card key={idx} className="p-3 border-l-4 border-l-green-400 hover:shadow-md transition-shadow">
                   <p className="text-[10px] font-bold text-gray-400 flex items-center gap-1 mb-2 uppercase tracking-tight">
                      <Clock className="h-3 w-3" />
                      {lesson.time}
                   </p>
                   <h4 className="text-sm font-bold text-gray-900 leading-none mb-1">{lesson.subject}</h4>
                   <p className="text-xs text-green-600 font-medium mb-2">{lesson.class}</p>
                   <div className="flex items-center gap-1 text-[10px] text-gray-500">
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
