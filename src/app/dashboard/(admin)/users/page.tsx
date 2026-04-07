"use client"
import * as React from "react"
import { Card } from "@/components/ui/card"
import { Users, UserPlus, Mail, Phone, ShieldCheck, Trash2, Search, Plus, Loader2 } from "lucide-react"
import { getAdminUsers } from "@/actions/data"
import { deleteUser } from "@/actions/admin"
import { createStaffAccount } from "@/actions/school-config"
import { Button } from "@/components/ui/button"
import { Role } from "@prisma/client"
import { cn } from "@/lib/utils"

export default function UsersPage() {
  const [users, setUsers] = React.useState<any[]>([])
  const [searchTerm, setSearchTerm] = React.useState("")
  const [isAdding, setIsAdding] = React.useState(false)
  const [isLoading, setIsLoading] = React.useState(false)

  const fetchUsers = () => getAdminUsers().then(setUsers)

  React.useEffect(() => {
    fetchUsers()
  }, [])

  const handleDelete = async (id: number) => {
    if (confirm("Supprimer cet utilisateur ?")) {
        await deleteUser(id)
        fetchUsers()
    }
  }

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
      e.preventDefault()
      setIsLoading(true)
      const formData = new FormData(e.currentTarget)
      await createStaffAccount(formData)
      await fetchUsers()
      setIsLoading(false)
      setIsAdding(false)
  }

  const filteredUsers = users.filter(u =>
    u.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
    u.email.toLowerCase().includes(searchTerm.toLowerCase())
  )

  return (
    <div className="space-y-10 animate-in fade-in duration-500 pb-20">
      <div className="flex flex-col sm:flex-row justify-between items-end gap-6 border-b border-gray-200 pb-8">
        <div>
          <h2 className="text-4xl font-black text-slate-900 tracking-tight">Gouvernance du Staff</h2>
          <p className="text-slate-500 font-bold mt-1 uppercase text-xs tracking-widest">Gestion des accès enseignants et administratifs</p>
        </div>
        <div className="flex gap-3">
            <button
                onClick={() => setIsAdding(!isAdding)}
                className="bg-slate-900 text-white px-6 py-3 rounded-2xl text-[10px] font-black uppercase tracking-widest hover:bg-slate-800 shadow-xl shadow-slate-900/10 transition-all flex items-center gap-2"
            >
                <UserPlus className="h-4 w-4" /> {isAdding ? "ANNULER" : "CRÉER UN COMPTE"}
            </button>
        </div>
      </div>

      {isAdding && (
          <Card className="p-10 border-0 shadow-2xl rounded-[32px] bg-white animate-in zoom-in-95 duration-200 max-w-2xl mx-auto">
              <form onSubmit={handleSubmit} className="space-y-6">
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                      <div className="space-y-1">
                          <label className="text-[10px] font-black text-slate-400 uppercase tracking-widest ml-1">Nom Complet</label>
                          <input name="name" required className="w-full px-5 py-3 bg-slate-50 border-0 rounded-2xl text-xs font-bold outline-none focus:ring-4 focus:ring-slate-900/5 focus:bg-white transition-all" placeholder="ex: Ahmed Alaoui" />
                      </div>
                      <div className="space-y-1">
                          <label className="text-[10px] font-black text-slate-400 uppercase tracking-widest ml-1">Adresse Email</label>
                          <input name="email" type="email" required className="w-full px-5 py-3 bg-slate-50 border-0 rounded-2xl text-xs font-bold outline-none focus:ring-4 focus:ring-slate-900/5 focus:bg-white transition-all" placeholder="prof@ecole.ma" />
                      </div>
                      <div className="space-y-1">
                          <label className="text-[10px] font-black text-slate-400 uppercase tracking-widest ml-1">Rôle Système</label>
                          <select name="role" required className="w-full px-5 py-3 bg-slate-50 border-0 rounded-2xl text-xs font-bold outline-none focus:ring-4 focus:ring-slate-900/5 focus:bg-white transition-all appearance-none cursor-pointer">
                              <option value={Role.TEACHER}>Enseignant (Prof)</option>
                              <option value={Role.ACCOUNTANT}>Comptable</option>
                              <option value={Role.STAFF}>Secrétaire / Surveillant</option>
                          </select>
                      </div>
                      <div className="space-y-1">
                          <label className="text-[10px] font-black text-slate-400 uppercase tracking-widest ml-1">Téléphone</label>
                          <input name="phone" required className="w-full px-5 py-3 bg-slate-50 border-0 rounded-2xl text-xs font-bold outline-none focus:ring-4 focus:ring-slate-900/5 focus:bg-white transition-all" placeholder="+212 6..." />
                      </div>
                      <div className="space-y-1 md:col-span-2">
                          <label className="text-[10px] font-black text-slate-400 uppercase tracking-widest ml-1">Mot de Passe Provisoire</label>
                          <input name="password" type="password" required className="w-full px-5 py-3 bg-slate-50 border-0 rounded-2xl text-xs font-bold outline-none focus:ring-4 focus:ring-slate-900/5 focus:bg-white transition-all" placeholder="********" />
                      </div>
                  </div>
                  <Button type="submit" className="w-full bg-slate-900 text-white font-black py-6 rounded-2xl shadow-xl hover:bg-slate-800" disabled={isLoading}>
                      {isLoading ? <Loader2 className="h-5 w-5 animate-spin mx-auto" /> : "GÉNÉRER LE COMPTE"}
                  </Button>
              </form>
          </Card>
      )}

      <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
        {filteredUsers.map((user) => (
          <Card key={user.id} className="p-8 border-0 shadow-lg shadow-slate-100 rounded-[32px] bg-white group hover:shadow-xl transition-all relative overflow-hidden">
             <div className="flex justify-between items-start mb-6">
                <div className="h-12 w-12 bg-slate-900 text-white rounded-2xl flex items-center justify-center font-black text-sm italic shadow-lg shadow-slate-900/10">
                    {user.name.charAt(0)}
                </div>
                <div className={cn(
                    "text-[8px] px-3 py-1.5 rounded-full font-black uppercase tracking-widest",
                    user.role === 'TEACHER' ? 'bg-blue-50 text-blue-600' :
                    user.role === 'SCHOOL_ADMIN' ? 'bg-primary/10 text-primary' :
                    'bg-slate-100 text-slate-500'
                )}>
                    {user.role}
                </div>
             </div>
             <div>
                <h3 className="text-lg font-black text-slate-900 truncate">{user.name}</h3>
                <p className="text-[10px] font-bold text-slate-400 flex items-center gap-2 mt-1 truncate">
                    <Mail className="h-3 w-3" /> {user.email}
                </p>
                <div className="flex items-center justify-between mt-6 pt-6 border-t border-slate-50">
                    <p className="text-[10px] font-black text-slate-500 uppercase tracking-widest flex items-center gap-1">
                        <Phone className="h-3 w-3 text-emerald-500" /> {user.phone || "N/A"}
                    </p>
                    {user.role !== 'SCHOOL_ADMIN' && (
                        <button onClick={() => handleDelete(user.id)} className="p-2 text-slate-200 hover:text-red-500 transition-colors">
                            <Trash2 className="h-4 w-4" />
                        </button>
                    )}
                </div>
             </div>
          </Card>
        ))}
      </div>
    </div>
  )
}
