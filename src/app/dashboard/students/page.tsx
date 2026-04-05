import { Card } from "@/components/ui/card"
import { Search, Plus, Filter, MoreVertical, Download } from "lucide-react"

const students = [
  { id: "1029", name: "Amine El Amrani", class: "CP-A", status: "Inscrit", payment: "Payé" },
  { id: "1030", name: "Sara Mansouri", class: "CP-B", status: "Inscrit", payment: "Retard" },
  { id: "1031", name: "Omar Rahmouni", class: "CE1-A", status: "Inscrit", payment: "Payé" },
  { id: "1032", name: "Yasmine Joudar", class: "CE2-A", status: "Inscrit", payment: "Payé" },
  { id: "1033", name: "Mehdi Tazi", class: "CM1-C", status: "En attente", payment: "Retard" },
  { id: "1034", name: "Layla Fekkak", class: "CM2-B", status: "Inscrit", payment: "Payé" },
]

export default function StudentsPage() {
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
           <button className="flex-1 sm:flex-none flex items-center justify-center gap-2 bg-white px-4 py-2 rounded-xl border border-gray-200 text-sm font-bold text-gray-700 hover:bg-gray-50 transition-colors">
              <Download className="h-4 w-4" />
              Exporter CSV
           </button>
           <button className="flex-1 sm:flex-none flex items-center justify-center gap-2 bg-primary px-6 py-2 rounded-xl text-white text-sm font-bold shadow-lg hover:shadow-xl transition-all">
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
                        <td className="px-6 py-4 text-sm text-gray-600 font-medium">{student.class}</td>
                        <td className="px-6 py-4">
                           <span className={`text-[10px] uppercase font-bold px-2 py-1 rounded-full ${
                              student.status === "Inscrit" ? "bg-green-100 text-green-700" : "bg-yellow-100 text-yellow-700"
                           }`}>
                              {student.status}
                           </span>
                        </td>
                        <td className="px-6 py-4">
                           <span className={`text-[10px] uppercase font-bold px-2 py-1 rounded-full ${
                              student.payment === "Payé" ? "bg-blue-100 text-blue-700" : "bg-red-100 text-red-700"
                           }`}>
                              {student.payment}
                           </span>
                        </td>
                        <td className="px-6 py-4 text-center">
                           <button className="text-gray-400 hover:text-gray-600">
                              <MoreVertical className="h-5 w-5" />
                           </button>
                        </td>
                     </tr>
                  ))}
               </tbody>
            </table>
         </div>
         <div className="px-6 py-4 border-t border-gray-100 flex justify-between items-center bg-gray-50/30">
            <p className="text-xs text-gray-500">Affichage de {students.length} sur 342 élèves</p>
            <div className="flex gap-2">
               <button className="px-3 py-1 text-xs border rounded-lg bg-white text-gray-600 hover:bg-gray-50">Précédent</button>
               <button className="px-3 py-1 text-xs border rounded-lg bg-white text-gray-600 hover:bg-gray-50">Suivant</button>
            </div>
         </div>
      </Card>
    </div>
  )
}
