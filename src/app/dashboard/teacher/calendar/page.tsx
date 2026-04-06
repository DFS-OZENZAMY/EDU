"use client"
import * as React from "react"
import { Card } from "@/components/ui/card"
import { Calendar as CalendarIcon, Clock, MapPin, ChevronLeft, ChevronRight } from "lucide-react"
import { getMyData } from "@/actions/data"

export default function TeacherSchedulePage() {
  const [classes, setClasses] = React.useState<any[]>([])

  React.useEffect(() => {
    getMyData().then((res: any) => {
        if (Array.isArray(res)) setClasses(res)
    })
  }, [])

  const schedule = [
    { day: "Lundi", lessons: classes.map(c => ({ time: "08:30 - 10:00", subject: "Cours", class: c.name, room: c.room || 'Salle 12' })) },
    { day: "Mardi", lessons: [] },
    { day: "Mercredi", lessons: [] },
    { day: "Jeudi", lessons: [] },
    { day: "Vendredi", lessons: [] },
  ]

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center bg-white p-4 rounded-xl shadow-sm border border-gray-100">
         <h2 className="text-xl font-bold flex items-center gap-2">
            <CalendarIcon className="h-5 w-5 text-green-600" />
            Mon Emploi du Temps
         </h2>
         <div className="flex items-center gap-2">
            <button className="p-2 hover:bg-gray-100 rounded-lg"><ChevronLeft className="h-4 w-4" /></button>
            <span className="text-sm font-medium">Semaine du 14 Avril</span>
            <button className="p-2 hover:bg-gray-100 rounded-lg"><ChevronRight className="h-4 w-4" /></button>
         </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-5 gap-4">
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
              {day.lessons.length === 0 && (
                <div className="h-20 border border-dashed border-gray-200 rounded-xl flex items-center justify-center text-[10px] text-gray-400 italic">
                    Aucun cours
                </div>
              )}
           </div>
         ))}
      </div>
    </div>
  )
}
