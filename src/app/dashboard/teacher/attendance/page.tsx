"use client"
import * as React from "react"
import { Card } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Search, Check, X, AlertCircle } from "lucide-react"
import { getTeacherClasses } from "@/actions/data"
import { takeAttendance } from "@/actions/teacher"

export default function TeacherAttendancePage() {
  const [classes, setClasses] = React.useState<any[]>([])
  const [currentClassId, setCurrentClassId] = React.useState<number | null>(null)
  const [students, setStudents] = React.useState<any[]>([])

  React.useEffect(() => {
    // In a real app, you'd get the teacher ID from the session
    getTeacherClasses(2).then(data => {
      setClasses(data)
      if (data.length > 0) {
        setCurrentClassId(data[0].id)
        setStudents(data[0].students)
      }
    })
  }, [])

  const handleAttendance = async (studentId: number, status: string) => {
    const formData = new FormData()
    formData.append("studentId", studentId.toString())
    formData.append("status", status)
    await takeAttendance(formData)

    // Update local state for feedback
    setStudents(prev => prev.map(s => s.id === studentId ? { ...s, attendanceStatus: status } : s))
  }

  return (
    <div className="space-y-6">
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
        <div>
          <h2 className="text-2xl font-bold text-gray-900">Appel de Présence</h2>
          <p className="text-gray-500 text-sm">Effectuez l'appel pour la classe en cours.</p>
        </div>
        <div className="flex items-center gap-3">
           <select
             value={currentClassId || ""}
             onChange={(e) => {
                const id = parseInt(e.target.value)
                setCurrentClassId(id)
                const cls = classes.find(c => c.id === id)
                setStudents(cls?.students || [])
             }}
             className="px-4 py-2 border border-gray-200 rounded-lg text-sm font-medium focus:ring-2 focus:ring-green-600/20"
           >
              {classes.map(c => (
                <option key={c.id} value={c.id}>{c.name}</option>
              ))}
           </select>
           <Button className="bg-green-600 hover:bg-green-700">Enregistrer l'appel</Button>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
         <Card className="p-4 border-l-4 border-l-blue-500">
            <p className="text-sm text-gray-500">Total Élèves</p>
            <p className="text-2xl font-bold">25</p>
         </Card>
         <Card className="p-4 border-l-4 border-l-green-500">
            <p className="text-sm text-gray-500">Présents</p>
            <p className="text-2xl font-bold">22</p>
         </Card>
         <Card className="p-4 border-l-4 border-l-orange-500">
            <p className="text-sm text-gray-500">Retards</p>
            <p className="text-2xl font-bold">1</p>
         </Card>
         <Card className="p-4 border-l-4 border-l-red-500">
            <p className="text-sm text-gray-500">Absents</p>
            <p className="text-2xl font-bold">2</p>
         </Card>
      </div>

      <Card>
         <div className="p-4 border-b border-gray-100 flex items-center gap-4">
            <div className="relative flex-1 max-w-md">
               <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-gray-400" />
               <input
                 type="text"
                 placeholder="Rechercher un élève..."
                 className="w-full pl-10 pr-4 py-2 bg-slate-50 border-0 rounded-lg text-sm focus:ring-2 focus:ring-green-600/20"
               />
            </div>
         </div>
         <div className="overflow-x-auto">
            <table className="w-full text-left">
               <thead className="bg-slate-50 text-slate-500 text-xs uppercase font-bold">
                  <tr>
                     <th className="px-6 py-4">Élève</th>
                     <th className="px-6 py-4">Statut</th>
                     <th className="px-6 py-4 text-center">Action de présence</th>
                  </tr>
               </thead>
               <tbody className="divide-y divide-slate-100">
                  {students.map((student) => (
                     <tr key={student.id} className="hover:bg-slate-50 transition-colors">
                        <td className="px-6 py-4 font-medium text-gray-900">{student.name}</td>
                        <td className="px-6 py-4">
                           {student.attendanceStatus === 'PRESENT' && <span className="text-xs font-bold text-green-600 bg-green-50 px-2 py-1 rounded-full">Présent</span>}
                           {student.attendanceStatus === 'ABSENT' && <span className="text-xs font-bold text-red-600 bg-red-50 px-2 py-1 rounded-full">Absent</span>}
                           {student.attendanceStatus === 'LATE' && <span className="text-xs font-bold text-orange-600 bg-orange-50 px-2 py-1 rounded-full">En retard</span>}
                        </td>
                        <td className="px-6 py-4">
                           <div className="flex justify-center gap-2">
                              <button
                                onClick={() => handleAttendance(student.id, 'PRESENT')}
                                className={`p-2 rounded-lg border ${student.attendanceStatus === 'PRESENT' ? 'bg-green-600 text-white border-green-600' : 'text-gray-400 border-gray-200 hover:border-green-600 hover:text-green-600'}`}
                              >
                                 <Check className="h-4 w-4" />
                              </button>
                              <button
                                onClick={() => handleAttendance(student.id, 'LATE')}
                                className={`p-2 rounded-lg border ${student.attendanceStatus === 'LATE' ? 'bg-orange-500 text-white border-orange-500' : 'text-gray-400 border-gray-200 hover:border-orange-500 hover:text-orange-500'}`}
                              >
                                 <AlertCircle className="h-4 w-4" />
                              </button>
                              <button
                                onClick={() => handleAttendance(student.id, 'ABSENT')}
                                className={`p-2 rounded-lg border ${student.attendanceStatus === 'ABSENT' ? 'bg-red-500 text-white border-red-500' : 'text-gray-400 border-gray-200 hover:border-red-500 hover:text-red-500'}`}
                              >
                                 <X className="h-4 w-4" />
                              </button>
                           </div>
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
