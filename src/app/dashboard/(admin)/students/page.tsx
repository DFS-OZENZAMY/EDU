"use client"
import * as React from "react"
import { Card } from "@/components/ui/card"
import { Search, Plus, Filter, Download, Trash2, X } from "lucide-react"
import { getAllStudents, getAllClasses } from "@/actions/data"
import { createStudent, deleteStudent } from "@/actions/admin"
import { Button } from "@/components/ui/button"

export default function StudentsPage() {
  const [students, setStudents] = React.useState<any[]>([])
  const [classes, setClasses] = React.useState<any[]>([])
  const [showAddModal, setShowAddModal] = React.useState(false)
  const [isLoading, setIsLoading] = React.useState(false)
  const [error, setError] = React.useState<string | null>(null)

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
    setError(null)
    const formData = new FormData(e.currentTarget)
    try {
        const res = await createStudent(formData)
        if (res?.error) {
            setError(res.error)
        } else {
            setShowAddModal(false)
            fetchData()
        }
    } catch (err) {
        setError("Une erreur de communication est survenue.")
    } finally {
        setIsLoading(false)
    }
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
              placeholder="Rechercher un élève..."
              className="bg-transparent border-0 focus:ring-0 text-sm w-full placeholder:text-gray-400"
           />
        </div>
        <div className="flex gap-4 w-full sm:w-auto">
           <Button variant="google" size="sm" onClick={exportToCSV} className="flex-1 sm:flex-none">
              <Download className="h-4 w-4" />
              CSV
           </Button>
           <Button size="sm" onClick={() => setShowAddModal(true)} className="flex-1 sm:flex-none">
              <Plus className="h-4 w-4" />
              Ajouter un élève
           </Button>
        </div>
      </div>

      <Card className="overflow-hidden border-gray-100 shadow-sm">
         <div className="flex justify-between items-center px-6 py-4 border-b border-gray-100 bg-gray-50/50">
            <h3 className="font-black text-gray-900 tracking-tight uppercase text-xs">Liste des élèves inscrits</h3>
            <button className="text-gray-400 hover:text-gray-600">
               <Filter className="h-5 w-5" />
            </button>
         </div>
         <div className="overflow-x-auto">
            <table className="w-full text-left">
               <thead className="bg-gray-50/50">
                  <tr className="text-[10px] uppercase font-black text-gray-400 border-b border-gray-100 tracking-widest">
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
                     <tr key={student.id} className="hover:bg-gray-50/30 transition-all group">
                        <td className="px-6 py-4 text-xs font-black text-gray-400">#{student.id}</td>
                        <td className="px-6 py-4 text-sm font-bold text-gray-900">{student.name}</td>
                        <td className="px-6 py-4 text-xs text-gray-600 font-bold uppercase tracking-tight">{student.class?.name || "N/A"}</td>
                        <td className="px-6 py-4">
                           <span className={`text-[9px] uppercase font-black px-2 py-1 rounded bg-green-100 text-green-700 tracking-widest`}>
                              Inscrit
                           </span>
                        </td>
                        <td className="px-6 py-4">
                           <span className={`text-[9px] uppercase font-black px-2 py-1 rounded tracking-widest ${
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
                                className="p-2 text-gray-400 hover:text-red-600 transition-colors rounded-lg hover:bg-red-50"
                              >
                                 <Trash2 className="h-4 w-4" />
                              </button>
                           </div>
                        </td>
                     </tr>
                  ))}
                  {students.length === 0 && (
                    <tr>
                        <td colSpan={6} className="px-6 py-12 text-center text-gray-400 italic text-sm">Aucun élève trouvé.</td>
                    </tr>
                  )}
               </tbody>
            </table>
         </div>
         <div className="px-6 py-4 border-t border-gray-100 flex justify-between items-center bg-gray-50/30">
            <p className="text-[10px] font-black text-gray-400 uppercase tracking-widest">Total: {students.length} élèves inscrits</p>
         </div>
      </Card>

      {showAddModal && (
         <div className="fixed inset-0 bg-black/60 backdrop-blur-sm z-50 flex items-center justify-center p-4">
            <form onSubmit={handleAddStudent} className="w-full max-w-md">
              <Card className="p-6 md:p-8 space-y-6 shadow-2xl animate-in fade-in zoom-in duration-200">
                 <div className="flex justify-between items-center">
                    <h3 className="text-2xl font-black text-gray-900 tracking-tight">Ajouter un élève</h3>
                    <button type="button" onClick={() => setShowAddModal(false)} className="text-gray-400 hover:text-gray-600">
                        <X className="h-6 w-6" />
                    </button>
                 </div>

                 {error && (
                    <div className="bg-red-50 text-red-700 p-3 rounded-lg text-xs font-bold border border-red-100 animate-shake">
                        {error}
                    </div>
                 )}

                 <div className="space-y-4">
                    <div>
                       <label className="block text-xs font-black uppercase text-gray-400 mb-1.5 tracking-widest">Nom Complet</label>
                       <input name="name" required type="text" className="w-full px-4 py-3 rounded-xl border border-gray-100 bg-gray-50 focus:ring-4 focus:ring-primary/10 transition-all outline-none text-sm font-medium" placeholder="ex: Amine Tahiri" />
                    </div>
                    <div>
                       <label className="block text-xs font-black uppercase text-gray-400 mb-1.5 tracking-widest">Classe d'affectation</label>
                       <select name="classId" required className="w-full px-4 py-3 rounded-xl border border-gray-100 bg-gray-50 focus:ring-4 focus:ring-primary/10 transition-all outline-none text-sm font-medium">
                          <option value="">Sélectionnez une classe...</option>
                          {classes.map(c => <option key={c.id} value={c.id}>{c.name}</option>)}
                       </select>
                       {classes.length === 0 && (
                        <p className="mt-1 text-[10px] text-red-500 font-bold">Aucune classe disponible. Créez-en une d'abord.</p>
                       )}
                    </div>
                 </div>
                 <div className="flex gap-3 pt-4">
                    <Button type="button" variant="outline" className="flex-1" onClick={() => setShowAddModal(false)}>Annuler</Button>
                    <Button type="submit" disabled={isLoading || classes.length === 0} className="flex-1">
                       {isLoading ? "Envoi..." : "Confirmer"}
                    </Button>
                 </div>
              </Card>
            </form>
         </div>
      )}
    </div>
  )
}
