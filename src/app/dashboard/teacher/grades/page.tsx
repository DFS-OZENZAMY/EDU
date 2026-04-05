"use client"
import * as React from "react"
import { Card } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Search, Save, Trash, Plus } from "lucide-react"
import { getMyData } from "@/actions/data"
import { enterGrade } from "@/actions/teacher"

export default function TeacherGradesPage() {
  const [classes, setClasses] = React.useState<any[]>([])
  const [currentClassId, setCurrentClassId] = React.useState<number | null>(null)
  const [students, setStudents] = React.useState<any[]>([])
  const [currentExam, setCurrentExam] = React.useState("Contrôle N°2")

  React.useEffect(() => {
    getMyData().then((data: any) => {
        if (Array.isArray(data)) {
            setClasses(data)
            if (data.length > 0) {
                setCurrentClassId(data[0].id)
                setStudents(data[0].students)
            }
        }
    })
  }, [])

  return (
    <div className="space-y-6">
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
        <div>
          <h2 className="text-2xl font-bold text-gray-900">Saisie des Notes</h2>
          <p className="text-gray-500 text-sm">Gérez les évaluations et les résultats des élèves.</p>
        </div>
        <div className="flex flex-wrap gap-3">
           <select
             value={currentClassId || ""}
             onChange={(e) => {
                const id = parseInt(e.target.value)
                setCurrentClassId(id)
                setStudents(classes.find(c => c.id === id)?.students || [])
             }}
             className="px-4 py-2 border border-gray-200 rounded-lg text-sm font-medium focus:ring-2 focus:ring-green-600/20"
           >
              {classes.map(c => (
                <option key={c.id} value={c.id}>{c.name}</option>
              ))}
           </select>
           <select
             value={currentExam}
             onChange={(e) => setCurrentExam(e.target.value)}
             className="px-4 py-2 border border-gray-200 rounded-lg text-sm font-medium focus:ring-2 focus:ring-green-600/20"
           >
              <option>Contrôle N°1</option>
              <option>Contrôle N°2</option>
              <option>Examen Semestriel</option>
           </select>
           <Button className="bg-green-600 hover:bg-green-700 flex items-center gap-2">
              <Save className="h-4 w-4" /> Enregistrer tout
           </Button>
        </div>
      </div>

      <Card>
         <div className="p-4 border-b border-gray-100 flex justify-between items-center gap-4">
            <div className="relative flex-1 max-w-md">
               <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-gray-400" />
               <input
                 type="text"
                 placeholder="Rechercher un élève..."
                 className="w-full pl-10 pr-4 py-2 bg-slate-50 border-0 rounded-lg text-sm focus:ring-2 focus:ring-green-600/20"
               />
            </div>
            <Button variant="outline" className="flex items-center gap-2">
               <Plus className="h-4 w-4" /> Ajouter une colonne
            </Button>
         </div>
         <div className="overflow-x-auto">
            <table className="w-full text-left">
               <thead className="bg-slate-50 text-slate-500 text-xs uppercase font-bold">
                  <tr>
                     <th className="px-6 py-4">Élève</th>
                     <th className="px-6 py-4 w-32">Note / 20</th>
                     <th className="px-6 py-4">Observation</th>
                     <th className="px-6 py-4 text-right">Actions</th>
                  </tr>
               </thead>
               <tbody className="divide-y divide-slate-100">
                  {students.map((student) => (
                     <tr key={student.id} className="hover:bg-slate-50 transition-colors">
                        <td className="px-6 py-4 font-medium text-gray-900">{student.name}</td>
                        <td className="px-6 py-4">
                           <input
                             type="number"
                             defaultValue={student.grades?.[0]?.value || ""}
                             id={`note-${student.id}`}
                             className="w-full px-3 py-1.5 border border-slate-200 rounded-lg text-center font-bold text-green-700 focus:ring-2 focus:ring-green-600/20"
                           />
                        </td>
                        <td className="px-6 py-4 text-sm text-gray-600 italic">
                           <input
                             type="text"
                             defaultValue={student.grades?.[0]?.observation || ""}
                             id={`obs-${student.id}`}
                             className="w-full px-3 py-1.5 border-0 bg-transparent rounded-lg focus:bg-white focus:ring-2 focus:ring-green-600/20"
                           />
                        </td>
                        <td className="px-6 py-4 text-right">
                           <div className="flex justify-end gap-2">
                              <button
                                onClick={async () => {
                                    const note = (document.getElementById(`note-${student.id}`) as HTMLInputElement).value
                                    const obs = (document.getElementById(`obs-${student.id}`) as HTMLInputElement).value
                                    const fd = new FormData()
                                    fd.append("studentId", student.id.toString())
                                    fd.append("subject", "Général")
                                    fd.append("value", note)
                                    fd.append("observation", obs)
                                    await enterGrade(fd)
                                    alert("Note enregistrée")
                                }}
                                className="p-2 text-slate-400 hover:text-green-600"
                              >
                                 <Save className="h-4 w-4" />
                              </button>
                              <button className="p-2 text-slate-400 hover:text-red-500">
                                 <Trash className="h-4 w-4" />
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
