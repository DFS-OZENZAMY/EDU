"use client"
import * as React from "react"
import { Card } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Search, Save, Trash, Plus } from "lucide-react"

const grades = [
  { id: 1, name: "Youssef Bennani", note: "18.5", obs: "Très Bien" },
  { id: 2, name: "Sara Mansouri", note: "16.0", obs: "Bien" },
  { id: 3, name: "Karim El Amrani", note: "12.5", obs: "Moyen" },
  { id: 4, name: "Sofia Tazi", note: "19.0", obs: "Excellent" },
  { id: 5, name: "Anas Bennani", note: "14.5", obs: "Assez Bien" },
]

export default function TeacherGradesPage() {
  const [currentClass, setCurrentClass] = React.useState("CP-B")
  const [currentExam, setCurrentExam] = React.useState("Contrôle N°2")

  return (
    <div className="space-y-6">
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
        <div>
          <h2 className="text-2xl font-bold text-gray-900">Saisie des Notes</h2>
          <p className="text-gray-500 text-sm">Gérez les évaluations et les résultats des élèves.</p>
        </div>
        <div className="flex flex-wrap gap-3">
           <select
             value={currentClass}
             onChange={(e) => setCurrentClass(e.target.value)}
             className="px-4 py-2 border border-gray-200 rounded-lg text-sm font-medium focus:ring-2 focus:ring-green-600/20"
           >
              <option value="CP-B">CP - Section B</option>
              <option value="CE1-A">CE1 - Section A</option>
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
                  {grades.map((student) => (
                     <tr key={student.id} className="hover:bg-slate-50 transition-colors">
                        <td className="px-6 py-4 font-medium text-gray-900">{student.name}</td>
                        <td className="px-6 py-4">
                           <input
                             type="text"
                             defaultValue={student.note}
                             className="w-full px-3 py-1.5 border border-slate-200 rounded-lg text-center font-bold text-green-700 focus:ring-2 focus:ring-green-600/20"
                           />
                        </td>
                        <td className="px-6 py-4 text-sm text-gray-600 italic">
                           <input
                             type="text"
                             defaultValue={student.obs}
                             className="w-full px-3 py-1.5 border-0 bg-transparent rounded-lg focus:bg-white focus:ring-2 focus:ring-green-600/20"
                           />
                        </td>
                        <td className="px-6 py-4 text-right">
                           <div className="flex justify-end gap-2">
                              <button className="p-2 text-slate-400 hover:text-green-600">
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
