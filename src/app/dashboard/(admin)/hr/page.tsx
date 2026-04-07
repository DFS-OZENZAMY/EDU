"use client"
import * as React from "react"
import { Card } from "@/components/ui/card"
import { Users, ShieldCheck, Mail, Phone, Briefcase, FileText, CheckCircle2, Clock, Search, MoreVertical, Plus, Loader2, Wallet, X, CreditCard } from "lucide-react"
import { getEmployees, createEmployee, paySalary } from "@/actions/hr"
import { Button } from "@/components/ui/button"
import { Role } from "@prisma/client"
import { cn } from "@/lib/utils"

export default function HRManagementPage() {
  const [employees, setEmployees] = React.useState<any[]>([])
  const [searchTerm, setSearchTerm] = React.useState("")
  const [isLoading, setIsLoading] = React.useState(true)
  const [isAdding, setIsAdding] = React.useState(false)
  const [isPaying, setIsPaying] = React.useState<any>(null)

  const fetchEmployees = React.useCallback(() => {
    setIsLoading(true)
    getEmployees().then(data => {
        setEmployees(data)
        setIsLoading(false)
    })
  }, [])

  React.useEffect(() => {
    fetchEmployees()
  }, [fetchEmployees])

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
      e.preventDefault()
      const formData = new FormData(e.currentTarget)
      await createEmployee(formData)
      setIsAdding(false)
      fetchEmployees()
  }

  const handlePaySalary = async (e: React.FormEvent<HTMLFormElement>) => {
      e.preventDefault()
      const fd = new FormData(e.currentTarget)
      await paySalary(
          isPaying.id,
          parseFloat(fd.get("amount") as string),
          parseFloat(fd.get("bonus") as string),
          fd.get("month") as string
      )
      setIsPaying(null)
      fetchEmployees()
  }

  const filtered = employees.filter(e =>
    e.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
    e.role.toLowerCase().includes(searchTerm.toLowerCase())
  )

  if (isLoading && employees.length === 0) return <div className="h-full flex items-center justify-center font-black text-slate-300 animate-pulse uppercase tracking-widest">Initialisation RH...</div>

  return (
    <div className="space-y-10 animate-in fade-in duration-500 pb-20">
      <div className="flex flex-col sm:flex-row justify-between items-end gap-6 border-b border-gray-200 pb-8">
        <div>
          <h2 className="text-4xl font-black text-slate-900 tracking-tight">Gestion du Personnel & Paie</h2>
          <p className="text-slate-500 font-bold mt-1 uppercase text-xs tracking-widest">Registre centralisé des collaborateurs et suivi des carrières</p>
        </div>
        <div className="flex gap-3">
            <button
                onClick={() => setIsAdding(true)}
                className="bg-slate-900 text-white px-6 py-3 rounded-2xl text-[10px] font-black uppercase tracking-widest hover:bg-slate-800 shadow-xl shadow-slate-900/10 transition-all flex items-center gap-2"
            >
                <Plus className="h-4 w-4" /> RECRUTER COLLABORATEUR
            </button>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
        {[
          { label: "Collaborateurs", value: employees.length, icon: Users, color: "blue" },
          { label: "Masse Salariale", value: employees.reduce((acc, e) => acc + (e.employeeProfile?.baseSalary || 0), 0).toLocaleString() + " DH", icon: Wallet, color: "emerald" },
          { label: "Contrats Actifs", value: employees.length, icon: Briefcase, color: "purple" },
        ].map((k, i) => (
          <Card key={i} className="p-8 rounded-[32px] border-0 shadow-sm flex items-center gap-6 group hover:shadow-xl transition-all bg-white">
             <div className={`p-4 rounded-2xl bg-${k.color}-50 text-${k.color}-600 transition-transform group-hover:scale-110`}>
                <k.icon className="h-6 w-6" />
             </div>
             <div>
                <p className="text-[10px] font-black text-slate-400 uppercase tracking-widest mb-1">{k.label}</p>
                <p className="text-2xl font-black text-slate-900">{k.value}</p>
             </div>
          </Card>
        ))}
      </div>

      <Card className="p-8 rounded-[40px] border-0 shadow-sm bg-white overflow-hidden">
         <div className="flex flex-col md:flex-row items-center justify-between gap-6 mb-10">
            <h3 className="font-black text-slate-900 text-xl tracking-tight uppercase">Annuaire du Personnel</h3>
            <div className="relative w-full md:w-96">
               <Search className="absolute left-4 top-1/2 -translate-y-1/2 h-4 w-4 text-gray-400" />
               <input
                 type="text"
                 placeholder="Rechercher collaborateur..."
                 className="w-full pl-12 pr-4 py-3 bg-slate-50 border-0 rounded-2xl text-xs font-bold outline-none focus:ring-4 focus:ring-slate-900/5 focus:bg-white transition-all"
                 value={searchTerm}
                 onChange={(e) => setSearchTerm(e.target.value)}
               />
            </div>
         </div>

         <div className="overflow-x-auto">
            <table className="w-full text-left">
                <thead>
                    <tr className="text-[10px] uppercase font-black text-slate-400 border-b border-slate-50 tracking-[0.2em]">
                        <th className="px-6 py-4 font-black">Nom & Poste</th>
                        <th className="px-6 py-4 font-black">Salaire de Base</th>
                        <th className="px-6 py-4 font-black">Dernière Paie</th>
                        <th className="px-6 py-4 font-black">Contrat</th>
                        <th className="px-6 py-4 font-black text-right">Actions</th>
                    </tr>
                </thead>
                <tbody className="divide-y divide-slate-50">
                    {filtered.map((e) => (
                        <tr key={e.id} className="group hover:bg-slate-50/50 transition-all">
                            <td className="px-6 py-6">
                                <div className="flex items-center gap-4">
                                    <div className="h-10 w-10 rounded-2xl bg-slate-900 text-white flex items-center justify-center font-black text-xs italic shadow-lg shadow-slate-900/10">
                                        {e.name.charAt(0)}
                                    </div>
                                    <div>
                                        <p className="text-sm font-black text-slate-900 uppercase">{e.name}</p>
                                        <p className="text-[10px] font-bold text-slate-400 mt-0.5">{e.role}</p>
                                    </div>
                                </div>
                            </td>
                            <td className="px-6 py-6">
                                <p className="text-sm font-black text-slate-900">{e.employeeProfile?.baseSalary?.toLocaleString() || 0} DH</p>
                                <p className="text-[9px] font-bold text-slate-400 uppercase">Brut Mensuel</p>
                            </td>
                            <td className="px-6 py-6">
                                {e.salaryPayments?.[0] ? (
                                    <div>
                                        <p className="text-xs font-bold text-emerald-600">{e.salaryPayments[0].month}</p>
                                        <p className="text-[9px] font-medium text-slate-400">Versé le {new Date(e.salaryPayments[0].paidAt).toLocaleDateString()}</p>
                                    </div>
                                ) : (
                                    <span className="text-[10px] font-black text-amber-500 uppercase">À initialiser</span>
                                )}
                            </td>
                            <td className="px-6 py-6">
                                <span className="text-[9px] font-black px-3 py-1.5 bg-blue-50 text-blue-600 rounded-xl uppercase tracking-widest border border-blue-100">{e.employeeProfile?.contractType || 'CDI'}</span>
                            </td>
                            <td className="px-6 py-6 text-right">
                                <div className="flex justify-end gap-2">
                                    <button
                                        onClick={() => setIsPaying(e)}
                                        className="p-2.5 bg-emerald-50 text-emerald-600 rounded-xl hover:bg-emerald-100 transition-all shadow-sm"
                                        title="Émettre bulletin de paie"
                                    >
                                        <CreditCard className="h-4 w-4" />
                                    </button>
                                    <button className="p-2 text-slate-300 hover:text-slate-900 transition-colors">
                                        <MoreVertical className="h-4 w-4" />
                                    </button>
                                </div>
                            </td>
                        </tr>
                    ))}
                </tbody>
            </table>
         </div>
      </Card>

      {/* Add Employee Modal */}
      {isAdding && (
          <div className="fixed inset-0 bg-slate-900/60 backdrop-blur-md z-50 flex items-center justify-center p-6 overflow-y-auto">
              <Card className="w-full max-w-2xl bg-white p-10 rounded-[40px] shadow-2xl animate-in zoom-in-95 duration-200">
                  <div className="flex justify-between items-center mb-10 border-b border-slate-50 pb-6">
                      <h3 className="text-2xl font-black text-slate-900 tracking-tight uppercase italic">Nouvelle Recrue</h3>
                      <button onClick={() => setIsAdding(false)} className="p-2 hover:bg-slate-100 rounded-xl transition-colors"><X className="h-6 w-6" /></button>
                  </div>
                  <form onSubmit={handleSubmit} className="space-y-8">
                      <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                          <div className="space-y-2">
                              <label className="text-[10px] font-black text-slate-400 uppercase tracking-widest ml-1">Nom Complet</label>
                              <input name="name" required className="w-full px-5 py-3 bg-slate-50 border-0 rounded-2xl text-sm font-bold outline-none focus:ring-4 focus:ring-slate-900/5 focus:bg-white transition-all" />
                          </div>
                          <div className="space-y-2">
                              <label className="text-[10px] font-black text-slate-400 uppercase tracking-widest ml-1">Email Personnel</label>
                              <input name="email" type="email" required className="w-full px-5 py-3 bg-slate-50 border-0 rounded-2xl text-sm font-bold outline-none focus:ring-4 focus:ring-slate-900/5 focus:bg-white transition-all" />
                          </div>
                          <div className="space-y-2">
                              <label className="text-[10px] font-black text-slate-400 uppercase tracking-widest ml-1">Poste / Rôle</label>
                              <select name="role" required className="w-full px-5 py-3 bg-slate-50 border-0 rounded-2xl text-sm font-bold outline-none focus:ring-4 focus:ring-slate-900/5 focus:bg-white transition-all">
                                  <option value={Role.TEACHER}>Enseignant</option>
                                  <option value={Role.STAFF}>Support / Administration</option>
                                  <option value={Role.ACCOUNTANT}>Comptabilité</option>
                              </select>
                          </div>
                          <div className="space-y-2">
                              <label className="text-[10px] font-black text-slate-400 uppercase tracking-widest ml-1">Salaire de Base (DH)</label>
                              <input name="baseSalary" type="number" required className="w-full px-5 py-3 bg-slate-50 border-0 rounded-2xl text-sm font-bold outline-none focus:ring-4 focus:ring-slate-900/5 focus:bg-white transition-all" />
                          </div>
                          <div className="space-y-2">
                              <label className="text-[10px] font-black text-slate-400 uppercase tracking-widest ml-1">RIB (Bancaire)</label>
                              <input name="rib" required className="w-full px-5 py-3 bg-slate-50 border-0 rounded-2xl text-sm font-bold outline-none focus:ring-4 focus:ring-slate-900/5 focus:bg-white transition-all" />
                          </div>
                          <div className="space-y-2">
                              <label className="text-[10px] font-black text-slate-400 uppercase tracking-widest ml-1">N° CNSS</label>
                              <input name="cnss" className="w-full px-5 py-3 bg-slate-50 border-0 rounded-2xl text-sm font-bold outline-none focus:ring-4 focus:ring-slate-900/5 focus:bg-white transition-all" />
                          </div>
                          <div className="space-y-2 md:col-span-2">
                              <label className="text-[10px] font-black text-slate-400 uppercase tracking-widest ml-1">Mot de Passe Système</label>
                              <input name="password" type="password" required className="w-full px-5 py-3 bg-slate-50 border-0 rounded-2xl text-sm font-bold outline-none focus:ring-4 focus:ring-slate-900/5 focus:bg-white transition-all" placeholder="••••••••" />
                          </div>
                      </div>
                      <Button type="submit" className="w-full bg-slate-900 text-white font-black py-8 rounded-[32px] shadow-2xl hover:bg-slate-800">INTÉGRER AU PERSONNEL</Button>
                  </form>
              </Card>
          </div>
      )}

      {/* Pay Salary Modal */}
      {isPaying && (
          <div className="fixed inset-0 bg-slate-900/60 backdrop-blur-md z-50 flex items-center justify-center p-6">
              <Card className="w-full max-w-md bg-white p-10 rounded-[40px] shadow-2xl">
                <div className="flex justify-between items-center mb-8 border-b border-slate-50 pb-6">
                    <h3 className="text-xl font-black text-slate-900 uppercase">Émettre Paiement</h3>
                    <button onClick={() => setIsPaying(null)} className="p-2"><X className="h-5 w-5" /></button>
                </div>
                <p className="text-xs font-bold text-slate-500 mb-6 uppercase">Pour : <span className="text-slate-900">{isPaying.name}</span></p>
                <form onSubmit={handlePaySalary} className="space-y-6">
                    <div className="space-y-1">
                        <label className="text-[10px] font-black text-slate-400 uppercase tracking-widest ml-1">Mois de Référence</label>
                        <input name="month" required defaultValue="Avril 2026" className="w-full px-5 py-3 bg-slate-50 border-0 rounded-2xl text-sm font-bold" />
                    </div>
                    <div className="space-y-1">
                        <label className="text-[10px] font-black text-slate-400 uppercase tracking-widest ml-1">Montant Net (DH)</label>
                        <input name="amount" type="number" required defaultValue={isPaying.employeeProfile?.baseSalary} className="w-full px-5 py-3 bg-slate-50 border-0 rounded-2xl text-sm font-bold" />
                    </div>
                    <div className="space-y-1">
                        <label className="text-[10px] font-black text-slate-400 uppercase tracking-widest ml-1">Prime / Bonus</label>
                        <input name="bonus" type="number" defaultValue="0" className="w-full px-5 py-3 bg-slate-50 border-0 rounded-2xl text-sm font-bold" />
                    </div>
                    <Button type="submit" className="w-full bg-emerald-600 text-white font-black py-6 rounded-2xl shadow-xl hover:bg-emerald-500">CONFIRMER LE VIREMENT</Button>
                </form>
              </Card>
          </div>
      )}
    </div>
  )
}
