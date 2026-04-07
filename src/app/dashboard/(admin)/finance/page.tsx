"use client"
import * as React from "react"
import { Card } from "@/components/ui/card"
import { Wallet, CreditCard, TrendingUp, ArrowUpRight, ArrowDownRight, Search, Filter, CheckCircle2, AlertCircle, Receipt, Download, Banknote, Clock } from "lucide-react"
import { getTreasuryData, markFeeAsPaid } from "@/actions/finance"
import { cn } from "@/lib/utils"

export default function FinanceHubPage() {
  const [data, setData] = React.useState<any>(null)
  const [activeTab, setActiveTab] = React.useState<"OVERVIEW" | "INCOME" | "PAYROLL">("OVERVIEW")
  const [isLoading, setIsLoading] = React.useState(true)

  const fetchData = React.useCallback(async () => {
    setIsLoading(true)
    const res = await getTreasuryData()
    setData(res)
    setIsLoading(false)
  }, [])

  React.useEffect(() => {
    fetchData()
  }, [fetchData])

  const handleMarkPaid = async (id: number) => {
      await markFeeAsPaid(id, "ESPÈCES")
      fetchData()
  }

  if (!data) return <div className="h-full flex items-center justify-center font-black text-slate-300 animate-pulse uppercase tracking-widest">Calcul de la trésorerie...</div>

  const { stats, income, payroll } = data

  return (
    <div className="space-y-10 animate-in fade-in duration-500 pb-20 max-w-7xl mx-auto">
      <div className="flex flex-col sm:flex-row justify-between items-end gap-6 border-b border-gray-200 pb-8">
        <div>
          <h2 className="text-4xl font-black text-slate-900 tracking-tight text-center sm:text-left">Pôle Financier & Trésorerie</h2>
          <p className="text-slate-500 font-bold mt-1 uppercase text-xs tracking-widest text-center sm:text-left">Vision consolidée des flux entrants et sortants</p>
        </div>
        <div className="flex gap-3 w-full sm:w-auto">
            <button className="flex-1 sm:flex-none bg-slate-900 text-white px-6 py-3 rounded-2xl text-[10px] font-black uppercase tracking-widest hover:bg-slate-800 shadow-xl shadow-slate-900/10 transition-all flex items-center justify-center gap-2">
                <Download className="h-4 w-4" /> RELEVÉ GLOBAL
            </button>
        </div>
      </div>

      {/* Tabs Navigation */}
      <div className="flex bg-gray-100 p-1.5 rounded-2xl w-full sm:w-fit gap-1">
          {["OVERVIEW", "INCOME", "PAYROLL"].map((t) => (
              <button
                  key={t}
                  onClick={() => setActiveTab(t as any)}
                  className={cn(
                      "px-6 py-2.5 text-[10px] font-black uppercase tracking-widest rounded-xl transition-all duration-200 flex-1 sm:flex-none",
                      activeTab === t ? "bg-white text-slate-900 shadow-md" : "text-slate-400 hover:text-slate-600"
                  )}
              >
                  {t === 'OVERVIEW' ? 'Tableau de bord' : t === 'INCOME' ? 'Recettes Clients' : 'Paie Salariés'}
              </button>
          ))}
      </div>

      {activeTab === "OVERVIEW" && (
          <div className="space-y-10">
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
                <Card className="p-8 border-0 shadow-sm rounded-3xl bg-slate-900 text-white flex flex-col justify-between group hover:shadow-xl transition-all border-b-8 border-blue-500">
                    <p className="text-[10px] font-black text-slate-400 uppercase tracking-widest mb-4">Solde Net Actuel</p>
                    <p className={cn("text-3xl font-black tracking-tighter", stats.netBalance >= 0 ? "text-white" : "text-red-400")}>
                        {stats.netBalance.toLocaleString()} <span className="text-sm font-bold opacity-40">DH</span>
                    </p>
                </Card>
                <Card className="p-8 border-0 shadow-sm rounded-3xl bg-white group hover:shadow-xl transition-all">
                    <div className="flex justify-between items-start mb-6">
                        <div className="p-3 bg-emerald-50 text-emerald-600 rounded-2xl"><ArrowUpRight className="h-6 w-6" /></div>
                        <span className="text-[9px] font-black text-emerald-600 bg-emerald-50 px-2 py-1 rounded-lg">FLUX ENTRANT</span>
                    </div>
                    <p className="text-[10px] font-black text-slate-400 uppercase tracking-widest mb-1">Total Encaissé</p>
                    <p className="text-2xl font-black text-slate-900">{stats.totalIncome.toLocaleString()} DH</p>
                </Card>
                <Card className="p-8 border-0 shadow-sm rounded-3xl bg-white group hover:shadow-xl transition-all">
                    <div className="flex justify-between items-start mb-6">
                        <div className="p-3 bg-red-50 text-red-600 rounded-2xl"><ArrowDownRight className="h-6 w-6" /></div>
                        <span className="text-[9px] font-black text-red-600 bg-red-50 px-2 py-1 rounded-lg">FLUX SORTANT</span>
                    </div>
                    <p className="text-[10px] font-black text-slate-400 uppercase tracking-widest mb-1">Masse Salariale Versée</p>
                    <p className="text-2xl font-black text-slate-900">{stats.totalExpenses.toLocaleString()} DH</p>
                </Card>
                <Card className="p-8 border-0 shadow-sm rounded-3xl bg-white group hover:shadow-xl transition-all">
                    <div className="flex justify-between items-start mb-6">
                        <div className="p-3 bg-amber-50 text-amber-600 rounded-2xl"><Clock className="h-6 w-6" /></div>
                        <span className="text-[9px] font-black text-amber-600 bg-amber-50 px-2 py-1 rounded-lg">EN ATTENTE</span>
                    </div>
                    <p className="text-[10px] font-black text-slate-400 uppercase tracking-widest mb-1">Créances Clients</p>
                    <p className="text-2xl font-black text-slate-900">{stats.pendingIncome.toLocaleString()} DH</p>
                </Card>
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-3 gap-10">
                <Card className="lg:col-span-2 p-10 border-0 shadow-sm rounded-[40px] bg-white">
                    <h3 className="text-xl font-black text-slate-900 uppercase tracking-tight mb-10 flex items-center gap-3">
                        <Receipt className="h-6 w-6 text-primary" /> Derniers Flux Consolidés
                    </h3>
                    <div className="space-y-6">
                        {income.slice(0, 4).map((f: any) => (
                            <div key={f.id} className="flex items-center justify-between p-5 bg-slate-50 rounded-3xl border border-slate-100 hover:border-emerald-200 transition-all">
                                <div className="flex items-center gap-4">
                                    <div className="h-10 w-10 bg-emerald-100 text-emerald-600 rounded-xl flex items-center justify-center"><ArrowUpRight className="h-5 w-5" /></div>
                                    <div>
                                        <p className="text-xs font-black text-slate-900 uppercase">Recette : {f.parent?.name}</p>
                                        <p className="text-[10px] font-bold text-slate-400 italic">Scolarité • {f.month}</p>
                                    </div>
                                </div>
                                <span className="text-sm font-black text-emerald-600">+{f.amount} DH</span>
                            </div>
                        ))}
                        {payroll.slice(0, 2).map((p: any) => (
                            <div key={p.id} className="flex items-center justify-between p-5 bg-slate-50 rounded-3xl border border-slate-100 hover:border-red-200 transition-all">
                                <div className="flex items-center gap-4">
                                    <div className="h-10 w-10 bg-red-100 text-red-600 rounded-xl flex items-center justify-center"><ArrowDownRight className="h-5 w-5" /></div>
                                    <div>
                                        <p className="text-xs font-black text-slate-900 uppercase">Salaire : {p.user?.name}</p>
                                        <p className="text-[10px] font-bold text-slate-400 italic">Paiement mensuel • {p.month}</p>
                                    </div>
                                </div>
                                <span className="text-sm font-black text-red-600">-{p.amount + p.bonus} DH</span>
                            </div>
                        ))}
                    </div>
                </Card>

                <Card className="p-10 border-0 bg-slate-900 text-white rounded-[40px] relative overflow-hidden group">
                    <div className="absolute top-0 right-0 p-10 opacity-10"><Banknote className="h-40 w-40" /></div>
                    <div className="relative z-10 h-full flex flex-col justify-between">
                        <div>
                            <h4 className="text-2xl font-black tracking-tight mb-4 italic">Performance Mensuelle</h4>
                            <p className="text-slate-400 font-bold text-sm leading-relaxed mb-10">Votre établissement génère un solde net positif ce mois-ci. Continuez le suivi rigoureux des impayés.</p>
                        </div>
                        <div className="space-y-4">
                            <div className="flex justify-between text-[10px] font-black uppercase">
                                <span>Objectif Recouvrement</span>
                                <span className="text-emerald-400">82% atteint</span>
                            </div>
                            <div className="h-2 w-full bg-white/10 rounded-full overflow-hidden">
                                <div className="h-full w-[82%] bg-emerald-500 rounded-full shadow-lg shadow-emerald-500/20" />
                            </div>
                        </div>
                    </div>
                </Card>
            </div>
          </div>
      )}

      {activeTab === "INCOME" && (
          <Card className="p-0 border-0 shadow-sm rounded-[40px] bg-white overflow-hidden">
            <div className="p-8 border-b border-slate-50 flex flex-col sm:flex-row justify-between items-center gap-6 bg-slate-50/30">
                <h3 className="text-xl font-black text-slate-900 uppercase tracking-tight">Registre des Encaissements</h3>
                <div className="relative w-full sm:w-80">
                    <Search className="absolute left-4 top-1/2 -translate-y-1/2 h-4 w-4 text-slate-400" />
                    <input placeholder="Rechercher parent ou mois..." className="w-full pl-12 pr-4 py-3 bg-white border border-slate-100 rounded-2xl text-xs font-bold outline-none focus:ring-4 focus:ring-primary/5" />
                </div>
            </div>
            <div className="overflow-x-auto">
                <table className="w-full text-left">
                    <thead>
                        <tr className="text-[10px] uppercase font-black text-slate-400 border-b border-slate-50 tracking-widest">
                            <th className="px-8 py-5">Parent / Débiteur</th>
                            <th className="px-8 py-5">Élève</th>
                            <th className="px-8 py-5">Période</th>
                            <th className="px-8 py-5">Montant</th>
                            <th className="px-8 py-5">État</th>
                            <th className="px-8 py-5 text-right">Actions</th>
                        </tr>
                    </thead>
                    <tbody className="divide-y divide-slate-50">
                        {income.map((f: any) => (
                            <tr key={f.id} className="hover:bg-slate-50/50 transition-all">
                                <td className="px-8 py-6">
                                    <p className="text-sm font-black text-slate-900 uppercase">{f.parent?.name}</p>
                                    <p className="text-[9px] font-bold text-slate-400">{f.parent?.email}</p>
                                </td>
                                <td className="px-8 py-6">
                                    <span className="text-[10px] font-black px-3 py-1 bg-blue-50 text-blue-600 rounded-xl uppercase">{f.student?.name || 'Général'}</span>
                                </td>
                                <td className="px-8 py-6">
                                    <p className="text-xs font-bold text-slate-600 uppercase">{f.month}</p>
                                </td>
                                <td className="px-8 py-6">
                                    <p className="text-sm font-black text-slate-900">{f.amount.toLocaleString()} DH</p>
                                </td>
                                <td className="px-8 py-6">
                                    <span className={cn(
                                        "text-[9px] font-black px-3 py-1.5 rounded-xl uppercase tracking-widest border inline-flex items-center gap-2",
                                        f.status === 'PAID' ? 'bg-emerald-50 text-emerald-600 border-emerald-100' : 'bg-red-50 text-red-600 border-red-100'
                                    )}>
                                        {f.status === 'PAID' ? 'RÉGLÉ' : 'À PAYER'}
                                    </span>
                                </td>
                                <td className="px-8 py-6 text-right">
                                    {f.status === 'PENDING' && (
                                        <button
                                            onClick={() => handleMarkPaid(f.id)}
                                            className="p-2.5 bg-emerald-50 text-emerald-600 rounded-xl hover:bg-emerald-100 transition-all"
                                        >
                                            <CheckCircle2 className="h-4 w-4" />
                                        </button>
                                    )}
                                </td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            </div>
          </Card>
      )}

      {activeTab === "PAYROLL" && (
          <Card className="p-0 border-0 shadow-sm rounded-[40px] bg-white overflow-hidden">
            <div className="p-8 border-b border-slate-50 flex flex-col sm:flex-row justify-between items-center gap-6 bg-slate-50/30">
                <h3 className="text-xl font-black text-slate-900 uppercase tracking-tight">Gestion de la Paie</h3>
            </div>
            <div className="overflow-x-auto">
                <table className="w-full text-left">
                    <thead>
                        <tr className="text-[10px] uppercase font-black text-slate-400 border-b border-slate-50 tracking-widest">
                            <th className="px-8 py-5">Collaborateur</th>
                            <th className="px-8 py-5 text-center">Période</th>
                            <th className="px-8 py-5">Salaire Brut</th>
                            <th className="px-8 py-5">Primes</th>
                            <th className="px-8 py-5">Total Versé</th>
                            <th className="px-8 py-5 text-right">Date Virement</th>
                        </tr>
                    </thead>
                    <tbody className="divide-y divide-slate-50">
                        {payroll.map((p: any) => (
                            <tr key={p.id} className="hover:bg-slate-50/50 transition-all">
                                <td className="px-8 py-6">
                                    <p className="text-sm font-black text-slate-900 uppercase">{p.user?.name}</p>
                                    <p className="text-[9px] font-bold text-slate-400 tracking-widest">{p.user?.role}</p>
                                </td>
                                <td className="px-8 py-6 text-center">
                                    <span className="text-[10px] font-black text-slate-500 uppercase">{p.month}</span>
                                </td>
                                <td className="px-8 py-6">
                                    <p className="text-xs font-bold text-slate-600">{p.amount.toLocaleString()} DH</p>
                                </td>
                                <td className="px-8 py-6 text-emerald-600">
                                    <p className="text-xs font-black">+{p.bonus.toLocaleString()} DH</p>
                                </td>
                                <td className="px-8 py-6">
                                    <p className="text-sm font-black text-slate-900">{(p.amount + p.bonus).toLocaleString()} DH</p>
                                </td>
                                <td className="px-8 py-6 text-right">
                                    <p className="text-[10px] font-black text-slate-400 uppercase">{new Date(p.paidAt).toLocaleDateString()}</p>
                                </td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            </div>
          </Card>
      )}
    </div>
  )
}
