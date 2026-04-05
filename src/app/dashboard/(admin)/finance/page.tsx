import { Card } from "@/components/ui/card"
import { Wallet } from "lucide-react"

export default function AdminFinancePage() {
  return (
    <div className="flex items-center justify-center h-64 border-2 border-dashed border-gray-200 rounded-2xl">
      <div className="text-center">
        <Wallet className="h-12 w-12 text-gray-300 mx-auto mb-4" />
        <h3 className="text-lg font-bold text-gray-900">Module Finance (Admin)</h3>
        <p className="text-sm text-gray-500">Bientôt disponible : Gestion des encaissements et facturation.</p>
      </div>
    </div>
  )
}
