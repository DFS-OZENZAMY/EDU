"use client"
import * as React from "react"
import { Card } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Plus, Users, GraduationCap, Search, MoreHorizontal, Settings2, Trash2 } from "lucide-react"

const classes = [
  { id: 1, name: "CP - Section A", teacher: "Ahmed Alaoui", studentsCount: 24, level: "Primaire", room: "Salle 102" },
  { id: 2, name: "CE1 - Section B", teacher: "Salma Bennani", studentsCount: 22, level: "Primaire", room: "Salle 204" },
  { id: 3, name: "CM1 - Mixte", teacher: "Youssef Mansouri", studentsCount: 18, level: "Primaire", room: "Salle 301" },
  { id: 4, name: "6ème - Groupe 1", teacher: "Khadija El Fassi", studentsCount: 28, level: "Collège", room: "Salle 405" },
]

export default function ClassesPage() {
  const [showAddModal, setShowAddModal] = React.useState(false)

  return (
    <div className="space-y-6">
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
        <div>
          <h2 className="text-2xl font-bold text-gray-900">Gestion des Classes</h2>
          <p className="text-gray-500">Gérez les classes, affectez les enseignants et suivez les effectifs.</p>
        </div>
        <Button className="flex items-center gap-2" onClick={() => setShowAddModal(true)}>
          <Plus className="h-4 w-4" />
          Ajouter une classe
        </Button>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
        {classes.map((cls) => (
          <Card key={cls.id} className="p-5 hover:shadow-md transition-shadow border-gray-100">
            <div className="flex justify-between items-start mb-4">
              <div className="h-10 w-10 rounded-lg bg-primary/10 text-primary flex items-center justify-center">
                <GraduationCap className="h-6 w-6" />
              </div>
              <button className="text-gray-400 hover:text-gray-600">
                <MoreHorizontal className="h-5 w-5" />
              </button>
            </div>
            <h3 className="font-bold text-lg mb-1">{cls.name}</h3>
            <p className="text-sm text-gray-500 mb-4">{cls.level}</p>

            <div className="space-y-3 pt-4 border-t border-gray-50">
              <div className="flex items-center gap-2 text-sm text-gray-600">
                <Users className="h-4 w-4 text-gray-400" />
                <span>{cls.studentsCount} élèves inscrits</span>
              </div>
              <div className="flex items-center gap-2 text-sm text-gray-600">
                <span className="h-2 w-2 rounded-full bg-green-500" />
                <span>Titulaire: <span className="font-medium">{cls.teacher}</span></span>
              </div>
              <div className="flex items-center gap-2 text-sm text-gray-400 mt-2">
                <Settings2 className="h-3 w-3" />
                <span>Local: {cls.room}</span>
              </div>
            </div>

            <div className="mt-5 grid grid-cols-2 gap-2">
               <Button variant="outline" size="sm" className="w-full text-xs">Modifier</Button>
               <Button variant="outline" size="sm" className="w-full text-xs text-red-600 hover:text-red-700">Supprimer</Button>
            </div>
          </Card>
        ))}
      </div>

      {/* Classes Table View for detailed lists */}
      <Card className="mt-8 overflow-hidden border-gray-100">
        <div className="p-4 bg-gray-50/50 border-b border-gray-100 flex items-center justify-between">
           <h4 className="font-semibold text-gray-700">Liste détaillée des classes</h4>
           <div className="relative">
              <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-gray-400" />
              <input type="text" placeholder="Rechercher une classe..." className="pl-9 pr-4 py-1.5 bg-white border border-gray-200 rounded-md text-sm w-64" />
           </div>
        </div>
        <div className="overflow-x-auto">
          <table className="w-full text-left">
            <thead className="bg-gray-50 text-gray-500 text-xs uppercase font-bold">
              <tr>
                <th className="px-6 py-4">Nom de la classe</th>
                <th className="px-6 py-4">Enseignant</th>
                <th className="px-6 py-4">Niveau</th>
                <th className="px-6 py-4">Effectif</th>
                <th className="px-6 py-4">Actions</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-100">
              {classes.map((cls) => (
                <tr key={cls.id} className="hover:bg-gray-50 transition-colors">
                  <td className="px-6 py-4 font-medium text-gray-900">{cls.name}</td>
                  <td className="px-6 py-4 text-sm text-gray-600">{cls.teacher}</td>
                  <td className="px-6 py-4">
                     <span className="text-xs px-2 py-1 rounded bg-gray-100 text-gray-600 font-medium">{cls.level}</span>
                  </td>
                  <td className="px-6 py-4 text-sm font-medium">{cls.studentsCount} / 30</td>
                  <td className="px-6 py-4">
                     <div className="flex gap-2">
                        <button className="p-1.5 text-gray-400 hover:text-primary transition-colors"><Settings2 className="h-4 w-4" /></button>
                        <button className="p-1.5 text-gray-400 hover:text-red-500 transition-colors"><Trash2 className="h-4 w-4" /></button>
                     </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </Card>

      {/* Add Class Modal Mockup */}
      {showAddModal && (
         <div className="fixed inset-0 bg-black/50 backdrop-blur-sm z-50 flex items-center justify-center p-4">
            <Card className="w-full max-w-lg p-6 space-y-4">
               <h3 className="text-xl font-bold">Ajouter une nouvelle classe</h3>
               <div className="grid grid-cols-1 gap-4">
                  <div>
                     <label className="block text-sm font-medium text-gray-700 mb-1">Nom de la classe</label>
                     <input type="text" className="w-full px-4 py-2 rounded-lg border border-gray-200" placeholder="ex: CM2 - Section A" />
                  </div>
                  <div className="grid grid-cols-2 gap-4">
                     <div>
                        <label className="block text-sm font-medium text-gray-700 mb-1">Niveau</label>
                        <select className="w-full px-4 py-2 rounded-lg border border-gray-200">
                           <option>Préscolaire</option>
                           <option>Primaire</option>
                           <option>Collège</option>
                           <option>Lycée</option>
                        </select>
                     </div>
                     <div>
                        <label className="block text-sm font-medium text-gray-700 mb-1">Salle</label>
                        <input type="text" className="w-full px-4 py-2 rounded-lg border border-gray-200" placeholder="ex: Salle 304" />
                     </div>
                  </div>
                  <div>
                     <label className="block text-sm font-medium text-gray-700 mb-1">Enseignant Titulaire</label>
                     <select className="w-full px-4 py-2 rounded-lg border border-gray-200">
                        <option>Sélectionner un enseignant...</option>
                        <option>Ahmed Alaoui</option>
                        <option>Salma Bennani</option>
                     </select>
                  </div>
               </div>
               <div className="flex justify-end gap-3 pt-4">
                  <Button variant="outline" onClick={() => setShowAddModal(false)}>Annuler</Button>
                  <Button onClick={() => setShowAddModal(false)} className="bg-primary">Enregistrer la classe</Button>
               </div>
            </Card>
         </div>
      )}
    </div>
  )
}
