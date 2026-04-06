"use client"
import * as React from "react"
import Link from "next/link"
import { Card } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Users, UserPlus, Link as LinkIcon, Search, MoreHorizontal, Trash2 } from "lucide-react"
import { getAdminUsers } from "@/actions/data"
import { createUser, deleteUser } from "@/actions/admin"

export default function UsersPage() {
  const [users, setUsers] = React.useState<any[]>([])
  const [filteredUsers, setFilteredUsers] = React.useState<any[]>([])
  const [searchTerm, setSearchTerm] = React.useState("")
  const [roleFilter, setRoleFilter] = React.useState("Tous les rôles")
  const [showCreateForm, setShowCreateForm] = React.useState(false)

  React.useEffect(() => {
    getAdminUsers().then(data => {
        setUsers(data)
        setFilteredUsers(data)
    })
  }, [])

  React.useEffect(() => {
    let result = users
    if (searchTerm) {
        result = result.filter(u =>
            u.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
            u.email.toLowerCase().includes(searchTerm.toLowerCase())
        )
    }
    if (roleFilter !== "Tous les rôles") {
        const roleMap: Record<string, string> = {
            "Enseignant": "TEACHER",
            "Parent": "PARENT"
        }
        result = result.filter(u => u.role === roleMap[roleFilter])
    }
    setFilteredUsers(result)
  }, [searchTerm, roleFilter, users])

  const handleCreateUser = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault()
    const formData = new FormData(e.currentTarget)
    try {
        const result = await createUser(formData)
        if (result?.error) {
            alert(result.error)
        } else {
            setShowCreateForm(false)
            const updatedUsers = await getAdminUsers()
            setUsers(updatedUsers)
            alert("Compte créé avec succès !")
        }
    } catch (err) {
        alert("Une erreur inattendue est survenue.")
    }
  }

  return (
    <div className="space-y-6">
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
        <div>
          <h2 className="text-2xl font-bold text-gray-900">Gestion des Utilisateurs</h2>
          <p className="text-gray-500">Créez et gérez les comptes professeurs et parents.</p>
        </div>
        <div className="flex gap-3">
           <Button variant="outline" className="flex items-center gap-2" asChild>
             <Link href="/dashboard/link-accounts">
                <LinkIcon className="h-4 w-4" />
                Lier Parent/Élève
             </Link>
           </Button>
           <Button className="flex items-center gap-2" onClick={() => setShowCreateForm(true)}>
             <UserPlus className="h-4 w-4" />
             Nouveau Compte
           </Button>
        </div>
      </div>

      {/* Stats Quick View */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
         <Card className="p-4 flex items-center gap-4">
            <div className="h-12 w-12 rounded-full bg-blue-50 text-blue-600 flex items-center justify-center">
               <Users className="h-6 w-6" />
            </div>
            <div>
               <p className="text-sm text-gray-500">Total Utilisateurs</p>
               <p className="text-xl font-bold">{users.length}</p>
            </div>
         </Card>
         <Card className="p-4 flex items-center gap-4">
            <div className="h-12 w-12 rounded-full bg-green-50 text-green-600 flex items-center justify-center">
               <Users className="h-6 w-6" />
            </div>
            <div>
               <p className="text-sm text-gray-500">Enseignants</p>
               <p className="text-xl font-bold">{users.filter(u => u.role === 'TEACHER').length}</p>
            </div>
         </Card>
         <Card className="p-4 flex items-center gap-4">
            <div className="h-12 w-12 rounded-full bg-purple-50 text-purple-600 flex items-center justify-center">
               <Users className="h-6 w-6" />
            </div>
            <div>
               <p className="text-sm text-gray-500">Parents</p>
               <p className="text-xl font-bold">{users.filter(u => u.role === 'PARENT').length}</p>
            </div>
         </Card>
      </div>

      {/* Users List */}
      <Card className="overflow-hidden">
        <div className="p-4 border-b border-gray-100 flex items-center gap-4">
           <div className="relative flex-1 max-w-md">
              <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-gray-400" />
              <input
                type="text"
                placeholder="Rechercher un utilisateur..."
                className="w-full pl-10 pr-4 py-2 bg-gray-50 border-0 rounded-lg text-sm focus:ring-2 focus:ring-primary/20"
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
              />
           </div>
           <select
             className="bg-gray-50 border-0 rounded-lg px-3 py-2 text-sm focus:ring-2 focus:ring-primary/20"
             value={roleFilter}
             onChange={(e) => setRoleFilter(e.target.value)}
           >
              <option>Tous les rôles</option>
              <option>Enseignant</option>
              <option>Parent</option>
           </select>
        </div>
        <div className="overflow-x-auto">
          <table className="w-full text-left">
            <thead className="bg-gray-50 text-gray-500 text-xs uppercase font-bold">
              <tr>
                <th className="px-6 py-4">Utilisateur</th>
                <th className="px-6 py-4">Rôle</th>
                <th className="px-6 py-4">Email</th>
                <th className="px-6 py-4">Statut</th>
                <th className="px-6 py-4">Actions</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-100">
              {filteredUsers.map((user) => (
                <tr key={user.id} className="hover:bg-gray-50 transition-colors">
                  <td className="px-6 py-4">
                    <div className="flex items-center gap-3">
                      <div className="h-8 w-8 rounded-full bg-primary/10 text-primary flex items-center justify-center text-xs font-bold">
                        {user.name.charAt(0)}
                      </div>
                      <span className="font-medium text-gray-900">{user.name}</span>
                    </div>
                  </td>
                  <td className="px-6 py-4">
                    <span className={`text-xs font-bold px-2 py-1 rounded ${
                      user.role === 'TEACHER' ? 'bg-green-50 text-green-700' : 'bg-blue-50 text-blue-700'
                    }`}>
                      {user.role === 'TEACHER' ? 'PROFESSEUR' : user.role === 'PARENT' ? 'PARENT' : 'ADMIN'}
                    </span>
                  </td>
                  <td className="px-6 py-4 text-sm text-gray-500">{user.email}</td>
                  <td className="px-6 py-4">
                    <span className="h-2 w-2 rounded-full inline-block mr-2 bg-green-500" />
                    <span className="text-sm text-gray-700">Actif</span>
                  </td>
                  <td className="px-6 py-4">
                    <div className="flex gap-2">
                        <button
                          onClick={async () => {
                              if(confirm('Supprimer cet utilisateur ?')) {
                                  await deleteUser(user.id)
                                  getAdminUsers().then(setUsers)
                              }
                          }}
                          className="text-gray-400 hover:text-red-600 transition-colors"
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
      </Card>

      {/* Create User Modal */}
      {showCreateForm && (
         <div className="fixed inset-0 bg-black/50 backdrop-blur-sm z-50 flex items-center justify-center p-4">
            <form onSubmit={handleCreateUser}>
              <Card className="w-full max-w-lg p-6 space-y-4">
                 <h3 className="text-xl font-bold">Créer un nouveau compte</h3>
                 <div className="grid grid-cols-1 gap-4">
                    <div>
                       <label className="block text-sm font-medium text-gray-700 mb-1">Nom Complet</label>
                       <input name="name" required type="text" className="w-full px-4 py-2 rounded-lg border border-gray-200" placeholder="ex: Omar Tazi" />
                    </div>
                    <div>
                       <label className="block text-sm font-medium text-gray-700 mb-1">Email</label>
                       <input name="email" required type="email" className="w-full px-4 py-2 rounded-lg border border-gray-200" placeholder="omar@email.com" />
                    </div>
                    <div className="grid grid-cols-2 gap-4">
                       <div>
                          <label className="block text-sm font-medium text-gray-700 mb-1">Rôle</label>
                          <select name="role" className="w-full px-4 py-2 rounded-lg border border-gray-200">
                             <option value="TEACHER">Enseignant</option>
                             <option value="PARENT">Parent</option>
                          </select>
                       </div>
                       <div>
                          <label className="block text-sm font-medium text-gray-700 mb-1">Mot de passe</label>
                          <input name="password" required type="password" className="w-full px-4 py-2 rounded-lg border border-gray-200" placeholder="********" />
                       </div>
                    </div>
                 </div>
                 <div className="flex justify-end gap-3 pt-4">
                    <Button type="button" variant="outline" onClick={() => setShowCreateForm(false)}>Annuler</Button>
                    <Button type="submit">Créer le compte</Button>
                 </div>
              </Card>
            </form>
         </div>
      )}

    </div>
  )
}
