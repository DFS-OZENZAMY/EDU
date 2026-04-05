"use client"
import * as React from "react"
import { Card } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Link as LinkIcon, UserPlus, Search, X, CheckCircle2, AlertCircle } from "lucide-react"

const linkedAccounts = [
  { id: 1, parent: "Salma Bennani", student: "Youssef Bennani", class: "CP-B", status: "Active" },
  { id: 2, parent: "Driss Alaoui", student: "Sara Alaoui", class: "CE1-A", status: "Active" },
  { id: 3, parent: "Khadija El Fassi", student: "Karim El Amrani", class: "CM1", status: "Pending" },
]

export default function LinkAccountsPage() {
  const [activeTab, setActiveTab] = React.useState<"parent" | "teacher">("parent")
  const [parentSearch, setParentSearch] = React.useState("")
  const [studentSearch, setStudentSearch] = React.useState("")
  const [isLinking, setIsLinking] = React.useState(false)

  const handleLink = () => {
    setIsLinking(true)
    setTimeout(() => {
      setIsLinking(false)
      alert("Lien créé avec succès !")
    }, 1000)
  }

  return (
    <div className="space-y-8">
      <div className="flex justify-between items-end">
        <div>
          <h2 className="text-2xl font-bold text-gray-900">Liaisons et Comptes Associés</h2>
          <p className="text-gray-500">Gérez les connexions entre parents, élèves et enseignants.</p>
        </div>
        <div className="flex bg-gray-100 p-1 rounded-xl">
           <button
             onClick={() => setActiveTab("parent")}
             className={`px-4 py-2 text-xs font-bold rounded-lg transition-all ${activeTab === 'parent' ? 'bg-white text-primary shadow-sm' : 'text-gray-500 hover:text-gray-700'}`}
           >
              Lien Parent-Élève
           </button>
           <button
             onClick={() => setActiveTab("teacher")}
             className={`px-4 py-2 text-xs font-bold rounded-lg transition-all ${activeTab === 'teacher' ? 'bg-white text-primary shadow-sm' : 'text-gray-500 hover:text-gray-700'}`}
           >
              Lien Prof-Élève
           </button>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        {/* Linking Form */}
        <Card className="lg:col-span-1 p-6 space-y-6 border-primary/20 shadow-sm relative overflow-hidden">
          <div className="flex items-center gap-2 text-primary font-bold mb-2">
            <LinkIcon className="h-5 w-5" />
            <h3>Nouveau Lien {activeTab === 'parent' ? 'Parent' : 'Professeur'}</h3>
          </div>

          <div className="space-y-4">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                 {activeTab === 'parent' ? 'Rechercher le Parent' : 'Rechercher le Professeur'}
              </label>
              <div className="relative">
                <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-gray-400" />
                <input
                  type="text"
                  className="w-full pl-10 pr-4 py-2 rounded-lg border border-gray-200 text-sm"
                  placeholder={activeTab === 'parent' ? "Nom ou Email du parent..." : "Nom ou Matricule du prof..."}
                  value={parentSearch}
                  onChange={(e) => setParentSearch(e.target.value)}
                />
              </div>
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">Rechercher l'Élève</label>
              <div className="relative">
                <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-gray-400" />
                <input
                  type="text"
                  className="w-full pl-10 pr-4 py-2 rounded-lg border border-gray-200 text-sm"
                  placeholder="Nom de l'élève..."
                  value={studentSearch}
                  onChange={(e) => setStudentSearch(e.target.value)}
                />
              </div>
            </div>

            {activeTab === 'teacher' && (
               <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">Matière / Type de lien</label>
                  <select className="w-full px-4 py-2 rounded-lg border border-gray-200 text-sm">
                     <option>Titulaire de classe</option>
                     <option>Soutien scolaire</option>
                     <option>Suivi spécialisé</option>
                  </select>
               </div>
            )}

            <div className="pt-4">
               <Button
                 className="w-full bg-primary hover:bg-primary/90 flex items-center justify-center gap-2"
                 disabled={!parentSearch || !studentSearch || isLinking}
                 onClick={handleLink}
               >
                 {isLinking ? "Traitement..." : (
                   <>
                     <UserPlus className="h-4 w-4" />
                     Confirmer le lien
                   </>
                 )}
               </Button>
            </div>
          </div>
          <LinkIcon className="absolute -bottom-4 -right-4 h-24 w-24 text-primary/5 -rotate-12" />
        </Card>

        {/* Current Links List */}
        <Card className="lg:col-span-2 overflow-hidden border-gray-100">
          <div className="p-4 bg-gray-50/50 border-b border-gray-100">
            <h4 className="font-semibold text-gray-700">Liaisons existantes</h4>
          </div>
          <div className="overflow-x-auto">
            <table className="w-full text-left">
              <thead className="bg-gray-50 text-gray-500 text-xs uppercase font-bold">
                <tr>
                  <th className="px-6 py-4">Parent</th>
                  <th className="px-6 py-4">Élève associé</th>
                  <th className="px-6 py-4">Classe</th>
                  <th className="px-6 py-4">Statut</th>
                  <th className="px-6 py-4">Action</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-gray-100">
                {linkedAccounts.map((link) => (
                  <tr key={link.id} className="hover:bg-gray-50 transition-colors">
                    <td className="px-6 py-4">
                       <span className="font-medium text-gray-900">{link.parent}</span>
                    </td>
                    <td className="px-6 py-4">
                       <div className="flex items-center gap-2">
                          <CheckCircle2 className="h-4 w-4 text-green-500" />
                          <span className="text-gray-700">{link.student}</span>
                       </div>
                    </td>
                    <td className="px-6 py-4">
                       <span className="text-xs font-medium px-2 py-1 rounded bg-blue-50 text-blue-700">
                          {link.class}
                       </span>
                    </td>
                    <td className="px-6 py-4">
                       {link.status === 'Active' ? (
                         <span className="text-xs text-green-600 flex items-center gap-1 font-medium">
                            <div className="h-1.5 w-1.5 rounded-full bg-green-600" />
                            Actif
                         </span>
                       ) : (
                         <span className="text-xs text-orange-600 flex items-center gap-1 font-medium">
                            <AlertCircle className="h-3 w-3" />
                            En attente
                         </span>
                       )}
                    </td>
                    <td className="px-6 py-4">
                       <button className="text-gray-400 hover:text-red-500 transition-colors">
                          <X className="h-5 w-5" />
                       </button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </Card>
      </div>
    </div>
  )
}
