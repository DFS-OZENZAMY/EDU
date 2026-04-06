"use client"
import * as React from "react"
import { Card } from "@/components/ui/card"
import { Wallet, CreditCard, Receipt, TrendingUp, AlertTriangle, CheckCircle2, ChevronRight } from "lucide-react"
import { Button } from "@/components/ui/button"
import { getSession } from "@/actions/auth"
import { prisma } from "@/lib/prisma"

export default function ParentFinancePage() {
  const [fees, setFees] = React.useState<any[]>([])

  React.useEffect(() => {
    getSession().then(async (user: any) => {
        if (user) {
            const res = await prisma.fee.findMany({
                where: { parentId: user.id },
                orderBy: { id: 'desc' }
            })
            setFees(res)
        }
    })
  }, [])
  return (
    <div className="space-y-8">
      <div>
        <h2 className="text-2xl font-bold text-gray-900">Suivi Financier</h2>
        <p className="text-gray-500">Gérez vos règlements et accédez à vos factures.</p>
      </div>

      {/* Financial Overview Cards */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
         <Card className="p-6 bg-primary text-white border-0 shadow-lg relative overflow-hidden group transition-all hover:scale-[1.02]">
            <div className="relative z-10 flex flex-col justify-between h-full">
               <div className="flex justify-between items-start mb-6">
                  <div className="h-10 w-10 rounded-xl bg-white/20 backdrop-blur-md flex items-center justify-center">
                     <Wallet className="h-6 w-6" />
                  </div>
                  <span className="text-xs font-bold bg-white/20 px-2 py-1 rounded-full uppercase">Avril 2024</span>
               </div>
               <div>
                  <p className="text-sm text-primary-100 mb-1">Reste à payer</p>
                  <p className="text-3xl font-extrabold tracking-tight">0.00 MAD</p>
               </div>
            </div>
            <TrendingUp className="absolute -bottom-6 -right-6 h-32 w-32 text-white/10 rotate-12 transition-transform group-hover:scale-110" />
         </Card>

         <Card className="p-6 border-l-4 border-l-green-500 shadow-sm flex flex-col justify-between">
            <div className="flex items-center gap-3 mb-6">
               <div className="h-10 w-10 rounded-xl bg-green-50 flex items-center justify-center text-green-600">
                  <CheckCircle2 className="h-6 w-6" />
               </div>
               <div>
                  <h4 className="font-bold text-gray-900 leading-tight">Total Payé</h4>
                  <p className="text-xs text-gray-500 uppercase font-medium">Année 2023-24</p>
               </div>
            </div>
            <p className="text-2xl font-bold text-green-600">9,850.00 MAD</p>
         </Card>

         <Card className="p-6 border-l-4 border-l-blue-500 shadow-sm flex flex-col justify-between">
            <div className="flex items-center gap-3 mb-6">
               <div className="h-10 w-10 rounded-xl bg-blue-50 flex items-center justify-center text-blue-600">
                  <CreditCard className="h-6 w-6" />
               </div>
               <div>
                  <h4 className="font-bold text-gray-900 leading-tight">Prochaine Échéance</h4>
                  <p className="text-xs text-gray-500 uppercase font-medium">Le 01/05/2024</p>
               </div>
            </div>
            <p className="text-2xl font-bold text-blue-600">1,200.00 MAD</p>
         </Card>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
         {/* Transaction History */}
         <Card className="lg:col-span-2 overflow-hidden border-gray-100">
            <div className="p-5 border-b flex items-center justify-between">
               <h4 className="font-bold text-gray-900 flex items-center gap-2">
                  <Receipt className="h-5 w-5 text-primary" />
                  Historique des Règlements
               </h4>
               <Button variant="outline" size="sm" className="text-xs">Télécharger le relevé</Button>
            </div>
            <div className="overflow-x-auto">
               <table className="w-full text-left">
                  <thead className="bg-gray-50 text-[10px] text-gray-400 uppercase font-black">
                     <tr>
                        <th className="px-6 py-4">Désignation</th>
                        <th className="px-6 py-4 text-right">Montant</th>
                        <th className="px-6 py-4">Date</th>
                        <th className="px-6 py-4">Mode</th>
                        <th className="px-6 py-4">Statut</th>
                        <th className="px-6 py-4">Actions</th>
                     </tr>
                  </thead>
                  <tbody className="divide-y divide-gray-100">
                     {fees.map((t) => (
                        <tr key={t.id} className="hover:bg-gray-50/80 transition-colors">
                           <td className="px-6 py-4 font-bold text-sm text-gray-900">Frais de scolarité - {t.month}</td>
                           <td className="px-6 py-4 text-sm text-right font-black text-gray-900">{t.amount} DH</td>
                           <td className="px-6 py-4 text-[11px] font-medium text-gray-500">{t.paidAt ? new Date(t.paidAt).toLocaleDateString() : '-'}</td>
                           <td className="px-6 py-4 text-[11px] font-bold text-gray-600 uppercase tracking-wider">Virement</td>
                           <td className="px-6 py-4">
                              <span className={`inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full text-[10px] font-black uppercase ${t.status === 'PAID' ? 'bg-green-50 text-green-700' : 'bg-red-50 text-red-700'}`}>
                                 <div className={`h-1.5 w-1.5 rounded-full ${t.status === 'PAID' ? 'bg-green-600' : 'bg-red-600'}`} />
                                 {t.status === 'PAID' ? 'Payé' : 'En attente'}
                              </span>
                           </td>
                           <td className="px-6 py-4 text-right">
                              <button className="p-2 text-gray-400 hover:text-primary transition-colors hover:bg-primary/5 rounded-lg">
                                 <ChevronRight className="h-4 w-4" />
                              </button>
                           </td>
                        </tr>
                     ))}
                  </tbody>
               </table>
            </div>
         </Card>

         {/* Alert & Payment Info */}
         <div className="space-y-6">
            <Card className="p-6 border-0 bg-amber-50 border-l-4 border-l-amber-500 shadow-sm relative group overflow-hidden">
               <AlertTriangle className="absolute -bottom-2 -right-2 h-16 w-16 text-amber-100 -rotate-12 transition-transform group-hover:scale-110" />
               <div className="relative z-10">
                  <h4 className="font-bold text-amber-900 mb-2">Informations de Paiement</h4>
                  <p className="text-xs text-amber-800/80 leading-relaxed mb-4 font-medium">
                     Nous privilégions les paiements par virement bancaire pour plus de rapidité et de traçabilité.
                  </p>
                  <div className="space-y-2 mb-4">
                     <div className="bg-white/50 p-3 rounded-xl border border-amber-200">
                        <p className="text-[10px] font-bold text-amber-900 uppercase mb-1">RIB Établissement</p>
                        <p className="text-xs font-black text-amber-950 font-mono tracking-tight">007 123 4567890123 45</p>
                     </div>
                  </div>
                  <Button className="w-full bg-amber-600 hover:bg-amber-700 text-xs font-bold h-9">Soumettre une preuve de virement</Button>
               </div>
            </Card>

            <Card className="p-5 border-0 shadow-xl bg-slate-900 text-white flex items-center justify-between group cursor-pointer transition-transform hover:-translate-y-1">
               <div className="space-y-1">
                  <h4 className="font-bold text-sm tracking-tight group-hover:text-primary transition-colors">Besoin d'aide ?</h4>
                  <p className="text-[10px] text-slate-400 font-medium">Contactez le service comptabilité</p>
               </div>
               <div className="h-10 w-10 rounded-xl bg-white/10 flex items-center justify-center transition-all group-hover:bg-primary/20">
                  <ChevronRight className="h-5 w-5 text-primary" />
               </div>
            </Card>
         </div>
      </div>
    </div>
  )
}
