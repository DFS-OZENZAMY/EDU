"use client"
import * as React from "react"
import { Card } from "@/components/ui/card"
import { Wallet, Search, Plus, Filter, MoreHorizontal, CheckCircle2, AlertCircle } from "lucide-react"
import { getAdminUsers } from "@/actions/data"

export default function AdminFinancePage() {
  const [parents, setParents] = React.useState<any[]>([])

  React.useEffect(() => {
    getAdminUsers().then(data => setParents(data.filter(u => u.role === 'PARENT')))
  }, [])

  return (
    <div className="space-y-6">
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
        <div>
          <h2 className="text-2xl font-bold text-gray-900">Gestion Financière</h2>
          <p className="text-gray-500">Suivez les paiements de scolarité et les frais annexes.</p>
        </div>
        <button className="flex items-center gap-2 bg-primary text-white px-6 py-2 rounded-xl text-sm font-bold shadow-lg hover:opacity-90 transition-all">
          <Plus className="h-4 w-4" />
          Nouvelle Facture
        </button>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <Card className="p-6 border-l-4 border-l-green-500">
           <p className="text-sm text-gray-500">Recettes ce mois</p>
           <p className="text-2xl font-bold">124,500 DH</p>
        </Card>
        <Card className="p-6 border-l-4 border-l-red-500">
           <p className="text-sm text-gray-500">Impayés</p>
           <p className="text-2xl font-bold">12,400 DH</p>
        </Card>
        <Card className="p-6 border-l-4 border-l-blue-500">
           <p className="text-sm text-gray-500">Taux de recouvrement</p>
           <p className="text-2xl font-bold">91%</p>
        </Card>
      </div>

      <Card className="overflow-hidden">
        <div className="p-4 border-b border-gray-100 flex items-center gap-4">
           <div className="relative flex-1 max-w-md">
              <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-gray-400" />
              <input type="text" placeholder="Rechercher un parent..." className="w-full pl-10 pr-4 py-2 bg-gray-50 border-0 rounded-lg text-sm" />
           </div>
        </div>
        <div className="overflow-x-auto">
          <table className="w-full text-left">
            <thead className="bg-gray-50 text-gray-500 text-xs uppercase font-bold">
              <tr>
                <th className="px-6 py-4">Parent</th>
                <th className="px-6 py-4">Mois</th>
                <th className="px-6 py-4">Montant</th>
                <th className="px-6 py-4">Statut</th>
                <th className="px-6 py-4">Date de paiement</th>
                <th className="px-6 py-4">Actions</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-100">
              {parents.map((parent) => (
                parent.fees?.map((fee: any) => (
                  <tr key={fee.id} className="hover:bg-gray-50 transition-colors">
                    <td className="px-6 py-4 font-medium text-gray-900">{parent.name}</td>
                    <td className="px-6 py-4 text-sm text-gray-600">{fee.month}</td>
                    <td className="px-6 py-4 text-sm font-bold">{fee.amount} DH</td>
                    <td className="px-6 py-4">
                       {fee.status === 'PAID' ? (
                         <span className="flex items-center gap-1 text-xs font-bold text-green-600 bg-green-50 px-2 py-1 rounded-full w-fit">
                            <CheckCircle2 className="h-3 w-3" /> Payé
                         </span>
                       ) : (
                         <span className="flex items-center gap-1 text-xs font-bold text-red-600 bg-red-50 px-2 py-1 rounded-full w-fit">
                            <AlertCircle className="h-3 w-3" /> En attente
                         </span>
                       )}
                    </td>
                    <td className="px-6 py-4 text-sm text-gray-500">
                      {fee.paidAt ? new Date(fee.paidAt).toLocaleDateString() : '-'}
                    </td>
                    <td className="px-6 py-4">
                       <button className="text-gray-400 hover:text-gray-600"><MoreHorizontal className="h-5 w-5" /></button>
                    </td>
                  </tr>
                ))
              ))}
              {parents.every(p => !p.fees || p.fees.length === 0) && (
                <tr>
                  <td colSpan={6} className="px-6 py-8 text-center text-gray-500 italic text-sm">
                     Aucun historique de paiement disponible.
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        </div>
      </Card>
    </div>
  )
}
