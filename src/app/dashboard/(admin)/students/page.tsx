"use client"
import * as React from "react"
import { Card } from "@/components/ui/card"
import { Search, Plus, Filter, MoreVertical, Download, Trash2, X } from "lucide-react"
import { getAllStudents, getAllClasses } from "@/actions/data"
import { createStudent, deleteStudent } from "@/actions/admin"

export default function StudentsPage() {
  const [students, setStudents] = React.useState<any[]>([])
  const [classes, setClasses] = React.useState<any[]>([])
  const [showAddModal, setShowAddModal] = React.useState(false)
  const [isLoading, setIsLoading] = React.useState(false)

  React.useEffect(() => {
    fetchData()
  }, [])

  const fetchData = async () => {
    const s = await getAllStudents()
    const c = await getAllClasses()
    setStudents(s)
    setClasses(c)
  }

  const handleAddStudent = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault()
    setIsLoading(true)
    const formData = new FormData(e.currentTarget)
    await createStudent(formData)
    setShowAddModal(false)
    fetchData()
    setIsLoading(false)
  }

  const exportToCSV = () => {
    const headers = ["ID", "Nom", "Classe", "Niveau"]
    const rows = students.map(s => [s.id, s.name, s.class?.name || 'N/A', s.class?.level || 'N/A'])
    const csvContent = "data:text/csv;charset=utf-8,"
      + headers.join(",") + "\n"
      + rows.map(e => e.join(",")).join("\n")

    const encodedUri = encodeURI(csvContent)
    const link = document.createElement("a")
    link.setAttribute("href", encodedUri)
    link.setAttribute("download", "liste_eleves_edu.csv")
    document.body.appendChild(link)
    link.click()
    document.body.removeChild(link)
  }
  return (
    <div className="space-y-6">
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
        <div className="flex items-center gap-4 bg-white px-4 py-2 rounded-xl border border-gray-200 shadow-sm w-full max-w-md">
           <Search className="h-5 w-5 text-gray-400" />
           <input
              type="text"
              placeholder="Rechercher un élève par nom ou ID..."
              className="bg-transparent border-0 focus:ring-0 text-sm w-full placeholder:text-gray-400"
           />
        </div>
        <div className="flex gap-4 w-full sm:w-auto">
           <button
             onClick={exportToCSV}
             className="flex-1 sm:flex-none flex items-center justify-center gap-2 bg-white px-4 py-2 rounded-xl border border-gray-200 text-sm font-bold text-gray-700 hover:bg-gray-50 transition-colors"
           >
              <Download className="h-4 w-4" />
              Exporter CSV
           </button>
           <button
             onClick={() => setShowAddModal(true)}
             className="flex-1 sm:flex-none flex items-center justify-center gap-2 bg-primary px-6 py-2 rounded-xl text-white text-sm font-bold shadow-lg hover:shadow-xl transition-all"
           >
              <Plus className="h-4 w-4" />
              Ajouter un élève
           </button>
        </div>
      </div>

      <Card className="overflow-hidden">
         <div className="flex justify-between items-center px-6 py-4 border-b border-gray-100 bg-gray-50/50">
            <h3 className="font-bold text-gray-900">Liste des élèves (2025/2026)</h3>
            <button className="text-gray-400 hover:text-gray-600">
               <Filter className="h-5 w-5" />
            </button>
         </div>
         <div className="overflow-x-auto">
            <table className="w-full text-left">
               <thead>
                  <tr className="text-xs uppercase font-bold text-gray-500 border-b border-gray-100">
                     <th className="px-6 py-4">ID</th>
                     <th className="px-6 py-4">Nom Complet</th>
                     <th className="px-6 py-4">Classe</th>
                     <th className="px-6 py-4">Statut</th>
                     <th className="px-6 py-4">Paiement</th>
                     <th className="px-6 py-4 text-center">Actions</th>
                  </tr>
               </thead>
               <tbody className="divide-y divide-gray-50">
                  {students.map((student) => (
                     <tr key={student.id} className="hover:bg-gray-50/50 transition-colors">
                        <td className="px-6 py-4 text-sm font-bold text-gray-900">#{student.id}</td>
                        <td className="px-6 py-4 text-sm font-medium text-gray-700">{student.name}</td>
                        <td className="px-6 py-4 text-sm text-gray-600 font-medium">{student.class?.name || "N/A"}</td>
                        <td className="px-6 py-4">
                           <span className={`text-[10px] uppercase font-bold px-2 py-1 rounded-full bg-green-100 text-green-700`}>
                              Inscrit
                           </span>
                        </td>
                        <td className="px-6 py-4">
                           <span className={`text-[10px] uppercase font-bold px-2 py-1 rounded-full ${
                              student.parent?.fees?.[0]?.status === 'PAID' ? "bg-blue-100 text-blue-700" : "bg-red-100 text-red-700"
                           }`}>
                              {student.parent?.fees?.[0]?.status === 'PAID' ? "Payé" : "Retard"}
                           </span>
                        </td>
                        <td className="px-6 py-4 text-center">
                           <div className="flex items-center justify-center gap-2">
                              <button
                                onClick={async () => {
                                    if(confirm('Supprimer cet élève ?')) {
                                        await deleteStudent(student.id)
                                        fetchData()
                                    }
                                }}
                                className="p-1.5 text-gray-400 hover:text-red-600 transition-colors"
                              >
                                 <Trash2 className="h-4 w-4" />
                              </button>
                           </div>
                        </td>
                     </tr>
                  ))}
               </tbody>
            </table>
         </div>
         <div className="px-6 py-4 border-t border-gray-100 flex justify-between items-center bg-gray-50/30">
            <p className="text-xs text-gray-500">Total: {students.length} élèves inscrits</p>
         </div>
      </Card>

      {showAddModal && (
         <div className="fixed inset-0 bg-black/50 backdrop-blur-sm z-50 flex items-center justify-center p-4">
            <form onSubmit={handleAddStudent}>
              <Card className="w-full max-w-md p-6 space-y-4">
                 <div className="flex justify-between items-center border-b pb-4">
                    <h3 className="text-xl font-bold">Ajouter un élève</h3>
                    <button type="button" onClick={() => setShowAddModal(false)}><X className="h-5 w-5" /></button>
                 </div>
                 <div className="space-y-4">
                    <div>
                       <label className="block text-sm font-medium mb-1">Nom Complet</label>
                       <input name="name" required type="text" className="w-full px-4 py-2 border rounded-lg" placeholder="ex: Amine Tahiri" />
                    </div>
                    <div>
                       <label className="block text-sm font-medium mb-1">Classe</label>
                       <select name="classId" required className="w-full px-4 py-2 border rounded-lg">
                          <option value="">Choisir une classe...</option>
                          {classes.map(c => <option key={c.id} value={c.id}>{c.name}</option>)}
                       </select>
                    </div>
                 </div>
                 <div className="flex justify-end gap-3 pt-4">
                    <button type="button" className="px-4 py-2 text-sm border rounded-lg" onClick={() => setShowAddModal(false)}>Annuler</button>
                    <button type="submit" disabled={isLoading} className="px-6 py-2 text-sm bg-primary text-white rounded-lg font-bold shadow-md">
                       {isLoading ? "Enregistrement..." : "Confirmer l'ajout"}
                    </button>
                 </div>
              </Card>
            </form>
         </div>
      )}
    </div>
  )
}
