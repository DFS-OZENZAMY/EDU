"use client"
import * as React from "react"
import { Card } from "@/components/ui/card"
import { Wallet, CreditCard, Receipt, TrendingUp, AlertTriangle, CheckCircle2, ChevronRight, Download } from "lucide-react"
import { Button } from "@/components/ui/button"
import { getMyData } from "@/actions/data"
import { cn } from "@/lib/utils"

export default function ParentFinancePage() {
  const [fees, setFees] = React.useState<any[]>([])
  const [isLoading, setIsLoading] = React.useState(true)

  React.useEffect(() => {
    getMyData().then((res: any) => {
        if (res?.students?.[0]?.parent?.fees) {
            setFees(res.students[0].parent.fees)
        }
        setIsLoading(false)
    })
  }, [])

  if (isLoading) return <div className="h-full flex items-center justify-center font-black text-slate-300 animate-pulse uppercase tracking-widest">Calcul du solde...</div>

  const totalPaid = fees.filter(f => f.status === 'PAID').reduce((acc, curr) => acc + curr.amount, 0)
  const pending = fees.filter(f => f.status === 'PENDING').reduce((acc, curr) => acc + curr.amount, 0)

  return (
    <div className="space-y-10 animate-in fade-in duration-700 pb-20 max-w-6xl mx-auto">
      <div className="flex flex-col md:flex-row justify-between items-end gap-6 border-b border-slate-100 pb-8">
        <div>
          <h2 className="text-4xl font-black text-slate-900 tracking-tighter">Finance & Règlements</h2>
          <p className="text-slate-400 text-sm font-bold uppercase tracking-widest mt-2 flex items-center gap-2">
            <span className="h-2 w-2 bg-emerald-500 rounded-full" /> État de compte session 2026
          </p>
        </div>
        <button className="flex items-center gap-2 px-6 py-3 bg-white border border-slate-200 rounded-2xl text-[10px] font-black uppercase tracking-widest text-slate-600 hover:bg-slate-50 transition-all shadow-sm">
            <Download className="h-4 w-4" /> Relevé Annuel
        </button>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
         <Card className="p-8 bg-slate-900 text-white border-0 shadow-2xl rounded-[32px] relative overflow-hidden group">
            <div className="relative z-10">
                <p className="text-[10px] font-black text-slate-400 uppercase tracking-widest mb-4">Total Payé (Année)</p>
                <div className="flex items-end gap-2">
                    <p className="text-4xl font-black">{totalPaid.toLocaleString()} <span className="text-sm font-bold text-slate-500 tracking-normal">DH</span></p>
                </div>
                <div className="mt-8 flex items-center gap-2 text-emerald-400 text-[10px] font-black uppercase tracking-widest">
                    <CheckCircle2 className="h-3 w-3" /> Compte Sain
                </div>
            </div>
            <div className="absolute right-0 bottom-0 p-6 opacity-5">
                <TrendingUp className="h-24 w-24 text-white" />
            </div>
         </Card>

         <Card className="p-8 border-0 shadow-sm rounded-[32px] bg-white flex flex-col justify-between group hover:shadow-xl transition-all">
            <div className="space-y-4">
                <p className="text-[10px] font-black text-slate-400 uppercase tracking-widest">Solde en Attente</p>
                <p className={cn("text-3xl font-black tracking-tighter", pending > 0 ? "text-amber-500" : "text-slate-900")}>
                    {pending.toLocaleString()} <span className="text-sm font-bold text-slate-300 tracking-normal">DH</span>
                </p>
            </div>
            <div className="mt-6 pt-6 border-t border-slate-50 flex items-center justify-between">
                <span className="text-[9px] font-black text-slate-400 uppercase tracking-widest">Prochaine Échéance</span>
                <span className="text-[10px] font-bold text-slate-900">01 Juillet 2026</span>
            </div>
         </Card>

         <Card className="p-8 border-0 shadow-sm rounded-[32px] bg-white flex flex-col justify-between group hover:shadow-xl transition-all">
            <div className="space-y-4">
                <p className="text-[10px] font-black text-slate-400 uppercase tracking-widest">Dernier Règlement</p>
                <p className="text-xl font-black text-slate-900 uppercase">Juin 2026</p>
            </div>
            <div className="mt-6 pt-6 border-t border-slate-50">
                <button className="text-[10px] font-black text-primary uppercase tracking-widest hover:underline flex items-center gap-2">
                    VOIR LE REÇU <ChevronRight className="h-3 w-3" />
                </button>
            </div>
         </Card>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-10">
         <Card className="lg:col-span-2 overflow-hidden border-0 shadow-sm rounded-[40px] bg-white">
            <div className="p-8 border-b border-slate-50 font-black text-slate-900 tracking-tight flex items-center gap-4 uppercase text-sm">
               <div className="h-10 w-10 bg-primary/5 rounded-xl flex items-center justify-center">
                   <Receipt className="h-5 w-5 text-primary" />
               </div>
               Journal des Transactions
            </div>
            <div className="overflow-x-auto">
               <table className="w-full text-left">
                  <thead className="bg-slate-50/50">
                     <tr className="text-[10px] uppercase font-black text-slate-400 border-b border-slate-50 tracking-[0.2em]">
                        <th className="px-10 py-5">Période</th>
                        <th className="px-10 py-5">Montant</th>
                        <th className="px-10 py-5">Date Paiement</th>
                        <th className="px-10 py-5 text-right">Statut</th>
                     </tr>
                  </thead>
                  <tbody className="divide-y divide-slate-50">
                     {fees.map((t) => (
                        <tr key={t.id} className="hover:bg-slate-50/50 transition-all group">
                           <td className="px-10 py-6">
                               <p className="font-black text-slate-900 text-sm uppercase tracking-tight">Scolarité • {t.month}</p>
                           </td>
                           <td className="px-10 py-6">
                               <span className="text-base font-black text-slate-900">{t.amount} DH</span>
                           </td>
                           <td className="px-10 py-6">
                               <p className="text-[10px] font-bold text-slate-400 uppercase tracking-widest">
                                   {t.paidAt ? new Date(t.paidAt).toLocaleDateString('fr-FR', { day: '2-digit', month: 'short', year: 'numeric' }) : 'En attente'}
                               </p>
                           </td>
                           <td className="px-10 py-6 text-right">
                                <span className={cn(
                                    "text-[9px] font-black px-3 py-1.5 rounded-xl uppercase tracking-widest border inline-flex items-center gap-2",
                                    t.status === 'PAID' ? 'bg-emerald-50 text-emerald-600 border-emerald-100' : 'bg-red-50 text-red-600 border-red-100'
                                )}>
                                    <div className={cn("h-1.5 w-1.5 rounded-full", t.status === 'PAID' ? "bg-emerald-500" : "bg-red-500")} />
                                    {t.status === 'PAID' ? 'REGLÉ' : 'À PAYER'}
                                </span>
                           </td>
                        </tr>
                     ))}
                     {fees.length === 0 && (
                         <tr>
                             <td colSpan={4} className="px-10 py-20 text-center text-slate-300">
                                 <p className="text-[10px] font-black uppercase tracking-widest">Aucune transaction enregistrée</p>
                             </td>
                         </tr>
                     )}
                  </tbody>
               </table>
            </div>
         </Card>

         <div className="space-y-10">
            <Card className="p-10 border-0 bg-blue-50/50 border-l-8 border-blue-600 shadow-sm relative overflow-hidden">
               <div className="relative z-10">
                  <h4 className="font-black text-blue-900 uppercase tracking-tight mb-4">Informations RIB</h4>
                  <p className="text-xs text-blue-800 leading-relaxed mb-8 font-bold italic">
                     Utilisez ce RIB pour vos virements bancaires. Mentionnez le nom de l'enfant dans le motif.
                  </p>
                  <div className="bg-white p-6 rounded-[24px] border border-blue-100 shadow-inner">
                     <p className="text-[8px] font-black text-blue-400 uppercase mb-2 tracking-[0.2em]">RIB Établissement (SOCIÉTÉ GÉNÉRALE)</p>
                     <p className="text-sm font-black text-slate-900 font-mono tracking-tighter">007 123 4567890123 4567 8901</p>
                  </div>
                  <button className="w-full mt-8 py-4 bg-blue-600 text-white rounded-2xl text-[10px] font-black uppercase tracking-[0.2em] shadow-lg shadow-blue-600/20 hover:bg-blue-700 transition-all">
                      ENVOYER PREUVE DE VIREMENT
                  </button>
               </div>
            </Card>

            <Card className="p-10 bg-slate-900 text-white border-0 shadow-2xl rounded-[40px] flex items-center justify-between group cursor-pointer transition-all hover:scale-[1.02]">
               <div className="space-y-1">
                  <h4 className="font-black text-sm uppercase tracking-widest group-hover:text-primary transition-colors">Besoin d'aide ?</h4>
                  <p className="text-[10px] text-slate-400 font-bold uppercase tracking-tight">Contactez la Comptabilité</p>
               </div>
               <div className="h-12 w-12 rounded-2xl bg-white/5 border border-white/10 flex items-center justify-center transition-all group-hover:bg-primary group-hover:border-primary">
                  <ChevronRight className="h-6 w-6 text-white" />
               </div>
            </Card>
         </div>
      </div>
    </div>
  )
}
