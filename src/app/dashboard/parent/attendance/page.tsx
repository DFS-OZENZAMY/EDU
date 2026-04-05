"use client"
import * as React from "react"
import { Card } from "@/components/ui/card"
import { Calendar, CheckCircle, XCircle, AlertCircle, Clock } from "lucide-react"

const monthlyAttendance = [
  { day: "14 Avril", status: "Present", time: "08:15", subject: "Maths" },
  { day: "13 Avril", status: "Present", time: "08:20", subject: "Français" },
  { day: "12 Avril", status: "Late", time: "08:45", subject: "Arabe" },
  { day: "11 Avril", status: "Present", time: "08:10", subject: "Sciences" },
  { day: "10 Avril", status: "Absent", time: "-", subject: "Sport" },
]

export default function ParentAttendancePage() {
  return (
    <div className="space-y-6">
      <div>
        <h2 className="text-2xl font-bold text-gray-900">Présence de Youssef</h2>
        <p className="text-gray-500 text-sm">Suivez la ponctualité et l'assiduité de votre enfant ce mois-ci.</p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
         <Card className="p-4 border-l-4 border-l-blue-500">
            <p className="text-sm text-gray-500">Taux de présence</p>
            <p className="text-2xl font-bold">94.2%</p>
         </Card>
         <Card className="p-4 border-l-4 border-l-green-500">
            <p className="text-sm text-gray-500">Jours Présents</p>
            <p className="text-2xl font-bold">22</p>
         </Card>
         <Card className="p-4 border-l-4 border-l-orange-500">
            <p className="text-sm text-gray-500">Jours Retards</p>
            <p className="text-2xl font-bold">1</p>
         </Card>
         <Card className="p-4 border-l-4 border-l-red-500">
            <p className="text-sm text-gray-500">Jours Absents</p>
            <p className="text-2xl font-bold">1</p>
         </Card>
      </div>

      <Card>
         <div className="p-4 border-b border-gray-100 font-bold text-gray-900">
            Journal de présence du mois en cours
         </div>
         <div className="overflow-x-auto">
            <table className="w-full text-left">
               <thead className="bg-slate-50 text-slate-500 text-xs uppercase font-bold">
                  <tr>
                     <th className="px-6 py-4">Date</th>
                     <th className="px-6 py-4">Première Matière</th>
                     <th className="px-6 py-4">Heure d'arrivée</th>
                     <th className="px-6 py-4">Statut</th>
                  </tr>
               </thead>
               <tbody className="divide-y divide-slate-100">
                  {monthlyAttendance.map((log, i) => (
                     <tr key={i} className="hover:bg-slate-50 transition-colors">
                        <td className="px-6 py-4 font-medium text-gray-900">{log.day}</td>
                        <td className="px-6 py-4 text-sm text-gray-600 font-medium italic">{log.subject}</td>
                        <td className="px-6 py-4 text-sm text-gray-500">
                           <div className="flex items-center gap-2">
                              <Clock className="h-3.5 w-3.5" /> {log.time}
                           </div>
                        </td>
                        <td className="px-6 py-4">
                           {log.status === 'Present' && (
                              <span className="flex items-center gap-1.5 text-xs font-bold text-green-600 bg-green-50 px-2 py-1 rounded-full w-fit">
                                 <CheckCircle className="h-3 w-3" /> Présent
                              </span>
                           )}
                           {log.status === 'Late' && (
                              <span className="flex items-center gap-1.5 text-xs font-bold text-orange-600 bg-orange-50 px-2 py-1 rounded-full w-fit">
                                 <AlertCircle className="h-3 w-3" /> Retard
                              </span>
                           )}
                           {log.status === 'Absent' && (
                              <span className="flex items-center gap-1.5 text-xs font-bold text-red-600 bg-red-50 px-2 py-1 rounded-full w-fit">
                                 <XCircle className="h-3 w-3" /> Absent
                              </span>
                           )}
                        </td>
                     </tr>
                  ))}
               </tbody>
            </table>
         </div>
      </Card>
    </div>
  )
}
