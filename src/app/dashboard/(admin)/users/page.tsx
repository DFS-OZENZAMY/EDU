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
        }
    } catch (err) {
        alert("Une erreur inattendue est survenue.")
    }
  }

  return (
    <div className="space-y-6">
      <div className="flex flex-col lg:flex-row justify-between items-start lg:items-center gap-4">
        <div>
          <h2 className="text-2xl font-bold text-gray-900">Gestion des Utilisateurs</h2>
          <p className="text-gray-500 text-sm">Créez et gérez les comptes professeurs et parents.</p>
        </div>
        <div className="flex flex-wrap gap-3 w-full lg:w-auto">
           <Button variant="outline" size="sm" className="flex-1 lg:flex-none" asChild>
             <Link href="/dashboard/link-accounts">
                <LinkIcon className="h-4 w-4" />
                Liaisons
             </Link>
           </Button>
           <Button size="sm" className="flex-1 lg:flex-none" onClick={() => setShowCreateForm(true)}>
             <UserPlus className="h-4 w-4" />
             Nouveau
           </Button>
        </div>
      </div>

      {/* Stats Quick View */}
      <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 md:gap-6">
         <Card className="p-4 flex items-center gap-4">
            <div className="h-10 w-10 md:h-12 md:w-12 rounded-full bg-blue-50 text-blue-600 flex items-center justify-center shrink-0">
               <Users className="h-5 w-5 md:h-6 md:w-6" />
            </div>
            <div className="min-w-0">
               <p className="text-xs md:text-sm text-gray-500 truncate">Total Utilisateurs</p>
               <p className="text-lg md:text-xl font-bold">{users.length}</p>
            </div>
         </Card>
         <Card className="p-4 flex items-center gap-4">
            <div className="h-10 w-10 md:h-12 md:w-12 rounded-full bg-green-50 text-green-600 flex items-center justify-center shrink-0">
               <Users className="h-5 w-5 md:h-6 md:w-6" />
            </div>
            <div className="min-w-0">
               <p className="text-xs md:text-sm text-gray-500 truncate">Enseignants</p>
               <p className="text-lg md:text-xl font-bold">{users.filter(u => u.role === 'TEACHER').length}</p>
            </div>
         </Card>
         <Card className="p-4 flex items-center gap-4">
            <div className="h-10 w-10 md:h-12 md:w-12 rounded-full bg-purple-50 text-purple-600 flex items-center justify-center shrink-0">
               <Users className="h-5 w-5 md:h-6 md:w-6" />
            </div>
            <div className="min-w-0">
               <p className="text-xs md:text-sm text-gray-500 truncate">Parents</p>
               <p className="text-lg md:text-xl font-bold">{users.filter(u => u.role === 'PARENT').length}</p>
            </div>
         </Card>
      </div>

      {/* Users List */}
      <Card className="overflow-hidden border-gray-100">
        <div className="p-4 border-b border-gray-100 flex flex-col md:flex-row items-center gap-4">
           <div className="relative flex-1 w-full md:max-w-md">
              <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-gray-400" />
              <input
                type="text"
                placeholder="Rechercher..."
                className="w-full pl-10 pr-4 py-2 bg-gray-50 border-0 rounded-lg text-sm focus:ring-2 focus:ring-primary/20"
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
              />
           </div>
           <select
             className="w-full md:w-auto bg-gray-50 border-0 rounded-lg px-3 py-2 text-sm focus:ring-2 focus:ring-primary/20 font-medium"
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
            <thead className="bg-gray-50 text-gray-500 text-[10px] uppercase font-black tracking-wider">
              <tr>
                <th className="px-4 md:px-6 py-4">Utilisateur</th>
                <th className="px-4 md:px-6 py-4 hidden sm:table-cell">Rôle</th>
                <th className="px-4 md:px-6 py-4 hidden md:table-cell">Email</th>
                <th className="px-4 md:px-6 py-4">Statut</th>
                <th className="px-4 md:px-6 py-4 text-right">Actions</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-100">
              {filteredUsers.map((user) => (
                <tr key={user.id} className="hover:bg-gray-50 transition-colors group">
                  <td className="px-4 md:px-6 py-4">
                    <div className="flex items-center gap-3">
                      <div className="h-8 w-8 rounded-full bg-primary/10 text-primary flex items-center justify-center text-xs font-bold shrink-0">
                        {user.name.charAt(0)}
                      </div>
                      <div className="min-w-0">
                        <p className="font-bold text-gray-900 text-sm truncate">{user.name}</p>
                        <p className="text-[10px] text-gray-500 sm:hidden uppercase font-bold tracking-tight">
                            {user.role === 'TEACHER' ? 'PROF' : 'PARENT'}
                        </p>
                      </div>
                    </div>
                  </td>
                  <td className="px-4 md:px-6 py-4 hidden sm:table-cell">
                    <span className={`text-[10px] font-black px-2 py-1 rounded-md uppercase ${
                      user.role === 'TEACHER' ? 'bg-green-100 text-green-700' : 'bg-blue-100 text-blue-700'
                    }`}>
                      {user.role === 'TEACHER' ? 'PROFESSEUR' : user.role === 'PARENT' ? 'PARENT' : 'ADMIN'}
                    </span>
                  </td>
                  <td className="px-4 md:px-6 py-4 text-sm text-gray-500 hidden md:table-cell truncate max-w-[200px]">{user.email}</td>
                  <td className="px-4 md:px-6 py-4">
                    <div className="flex items-center gap-2">
                        <span className="h-2 w-2 rounded-full bg-green-500 shrink-0" />
                        <span className="text-xs font-bold text-gray-700 hidden sm:inline">ACTIF</span>
                    </div>
                  </td>
                  <td className="px-4 md:px-6 py-4 text-right">
                    <button
                        onClick={async () => {
                            if(confirm('Supprimer cet utilisateur ?')) {
                                await deleteUser(user.id)
                                getAdminUsers().then(setUsers)
                            }
                        }}
                        className="p-2 text-gray-400 hover:text-red-600 transition-colors rounded-lg hover:bg-red-50"
                    >
                        <Trash2 className="h-4 w-4" />
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </Card>

      {/* Create User Modal */}
      {showCreateForm && (
         <div className="fixed inset-0 bg-black/60 backdrop-blur-sm z-50 flex items-center justify-center p-4">
            <form onSubmit={handleCreateUser} className="w-full max-w-lg">
              <Card className="p-6 md:p-8 space-y-6 shadow-2xl animate-in fade-in zoom-in duration-200">
                 <div className="flex justify-between items-center">
                    <h3 className="text-2xl font-black text-gray-900 tracking-tight">Nouveau Compte</h3>
                    <button type="button" onClick={() => setShowCreateForm(false)} className="text-gray-400 hover:text-gray-600">
                        <svg className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" /></svg>
                    </button>
                 </div>
                 <div className="grid grid-cols-1 gap-5">
                    <div>
                       <label className="block text-xs font-black uppercase text-gray-400 mb-1.5 tracking-widest">Nom Complet</label>
                       <input name="name" required type="text" className="w-full px-4 py-3 rounded-xl border border-gray-100 bg-gray-50 focus:ring-4 focus:ring-primary/10 transition-all outline-none text-sm font-medium" placeholder="ex: Omar Tazi" />
                    </div>
                    <div>
                       <label className="block text-xs font-black uppercase text-gray-400 mb-1.5 tracking-widest">Email</label>
                       <input name="email" required type="email" className="w-full px-4 py-3 rounded-xl border border-gray-100 bg-gray-50 focus:ring-4 focus:ring-primary/10 transition-all outline-none text-sm font-medium" placeholder="omar@email.com" />
                    </div>
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
                       <div>
                          <label className="block text-xs font-black uppercase text-gray-400 mb-1.5 tracking-widest">Rôle</label>
                          <select name="role" className="w-full px-4 py-3 rounded-xl border border-gray-100 bg-gray-50 focus:ring-4 focus:ring-primary/10 transition-all outline-none text-sm font-medium">
                             <option value="TEACHER">Enseignant</option>
                             <option value="PARENT">Parent</option>
                          </select>
                       </div>
                       <div>
                          <label className="block text-xs font-black uppercase text-gray-400 mb-1.5 tracking-widest">Mot de passe</label>
                          <input name="password" required type="password" className="w-full px-4 py-3 rounded-xl border border-gray-100 bg-gray-50 focus:ring-4 focus:ring-primary/10 transition-all outline-none text-sm font-medium" placeholder="********" />
                       </div>
                    </div>
                 </div>
                 <div className="flex gap-3 pt-4">
                    <Button type="button" variant="outline" className="flex-1" onClick={() => setShowCreateForm(false)}>Annuler</Button>
                    <Button type="submit" className="flex-1">Créer le compte</Button>
                 </div>
              </Card>
            </form>
         </div>
      )}

    </div>
  )
}
