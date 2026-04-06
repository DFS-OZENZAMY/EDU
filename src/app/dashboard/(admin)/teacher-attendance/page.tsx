"use client"
import * as React from "react"
import { Card } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Calendar, Search, CheckCircle, XCircle, Clock } from "lucide-react"
import { getAdminUsers } from "@/actions/data"

export default function TeacherAttendancePage() {
  const [selectedDate, setSelectedDate] = React.useState(new Date().toISOString().split('T')[0])
  const [teachers, setTeachers] = React.useState<any[]>([])

  React.useEffect(() => {
    getAdminUsers().then(data => setTeachers(data.filter(u => u.role === 'TEACHER')))
  }, [])

  const presentCount = teachers.filter(t => t.clockIns?.length > 0).length
  const absentCount = teachers.length - presentCount

  return (
    <div className="space-y-6">
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
        <div>
          <h2 className="text-2xl font-bold text-gray-900">Pointage des Enseignants</h2>
          <p className="text-gray-500">Suivi quotidien de la présence du corps enseignant.</p>
        </div>
        <div className="flex items-center gap-3">
           <input
             type="date"
             value={selectedDate}
             onChange={(e) => setSelectedDate(e.target.value)}
             className="px-4 py-2 border rounded-lg text-sm font-medium focus:ring-2 focus:ring-primary/20"
           />
           <Button variant="outline" className="flex items-center gap-2">
             <Calendar className="h-4 w-4" />
             Historique
           </Button>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
         <Card className="p-4 border-l-4 border-l-blue-500">
            <p className="text-sm text-gray-500">Total Enseignants</p>
            <p className="text-2xl font-bold">{teachers.length}</p>
         </Card>
         <Card className="p-4 border-l-4 border-l-green-500">
            <p className="text-sm text-gray-500">Présents</p>
            <p className="text-2xl font-bold">{presentCount}</p>
         </Card>
         <Card className="p-4 border-l-4 border-l-orange-500">
            <p className="text-sm text-gray-500">En retard</p>
            <p className="text-2xl font-bold">0</p>
         </Card>
         <Card className="p-4 border-l-4 border-l-red-500">
            <p className="text-sm text-gray-500">Absents</p>
            <p className="text-2xl font-bold">{absentCount}</p>
         </Card>
      </div>

      <Card className="overflow-hidden">
        <div className="p-4 border-b border-gray-100">
           <div className="relative max-w-md">
              <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-gray-400" />
              <input
                type="text"
                placeholder="Rechercher un enseignant..."
                className="w-full pl-10 pr-4 py-2 bg-gray-50 border-0 rounded-lg text-sm"
              />
           </div>
        </div>
        <div className="overflow-x-auto">
          <table className="w-full text-left">
            <thead className="bg-gray-50 text-gray-500 text-xs uppercase font-bold">
              <tr>
                <th className="px-6 py-4">Enseignant</th>
                <th className="px-6 py-4">Matière</th>
                <th className="px-6 py-4">Heure d'arrivée</th>
                <th className="px-6 py-4">Statut</th>
                <th className="px-6 py-4">Actions</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-100">
              {teachers.map((teacher) => {
                const clockIn = teacher.clockIns?.[0]
                const status = clockIn ? 'Present' : 'Absent'
                const time = clockIn ? new Date(clockIn.time).toLocaleTimeString('fr-FR', {hour: '2-digit', minute:'2-digit'}) : '-'

                return (
                  <tr key={teacher.id} className="hover:bg-gray-50 transition-colors">
                    <td className="px-6 py-4">
                      <div className="flex items-center gap-3">
                        <div className="h-8 w-8 rounded-full bg-blue-100 text-blue-600 flex items-center justify-center text-xs font-bold">
                          {teacher.name.charAt(0)}
                        </div>
                        <span className="font-medium text-gray-900">{teacher.name}</span>
                      </div>
                    </td>
                    <td className="px-6 py-4 text-sm text-gray-600">{teacher.teacherClasses?.[0]?.name || '-'}</td>
                    <td className="px-6 py-4 text-sm text-gray-500">
                      <div className="flex items-center gap-2">
                         <Clock className="h-3 w-3" />
                         {time}
                      </div>
                    </td>
                    <td className="px-6 py-4">
                      <div className="flex items-center gap-2">
                        {status === 'Present' && (
                          <span className="flex items-center gap-1.5 text-xs font-bold text-green-600 bg-green-50 px-2 py-1 rounded-full">
                             <CheckCircle className="h-3 w-3" /> Présent
                          </span>
                        )}
                        {status === 'Absent' && (
                          <span className="flex items-center gap-1.5 text-xs font-bold text-red-600 bg-red-50 px-2 py-1 rounded-full">
                             <XCircle className="h-3 w-3" /> Absent
                          </span>
                        )}
                      </div>
                    </td>
                    <td className="px-6 py-4 text-sm">
                        <button className="text-primary hover:underline font-medium">Modifier</button>
                    </td>
                  </tr>
                )
              })}
            </tbody>
          </table>
        </div>
      </Card>
    </div>
  )
}
