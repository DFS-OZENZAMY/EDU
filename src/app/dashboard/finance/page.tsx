import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Wallet, TrendingUp, ArrowUpRight, ArrowDownRight } from "lucide-react"

export default function FinancePage() {
  return (
    <div className="p-6 space-y-6">
      <div className="flex justify-between items-center">
        <h1 className="text-2xl font-bold text-slate-900">Trésorerie & Finance</h1>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <Card>
          <CardHeader className="flex flex-row items-center justify-between pb-2 space-y-0">
            <CardTitle className="text-sm font-medium">Recettes du mois</CardTitle>
            <TrendingUp className="w-4 h-4 text-green-600" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">124,500 DH</div>
            <p className="text-xs text-muted-foreground">+12% par rapport au mois dernier</p>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="flex flex-row items-center justify-between pb-2 space-y-0">
            <CardTitle className="text-sm font-medium">Impayés</CardTitle>
            <ArrowDownRight className="w-4 h-4 text-red-600" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">12,400 DH</div>
            <p className="text-xs text-muted-foreground">8 familles en retard</p>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="flex flex-row items-center justify-between pb-2 space-y-0">
            <CardTitle className="text-sm font-medium">Dépenses</CardTitle>
            <ArrowUpRight className="w-4 h-4 text-blue-600" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">45,000 DH</div>
            <p className="text-xs text-muted-foreground">Salaires & Maintenance</p>
          </CardContent>
        </Card>
      </div>

      <Card>
        <CardHeader>
          <CardTitle>Transactions Récentes</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            {[1, 2, 3, 4, 5].map((i) => (
              <div key={i} className="flex items-center justify-between p-4 border rounded-lg hover:bg-slate-50 transition-colors">
                <div className="flex items-center gap-4">
                  <div className="p-2 bg-blue-100 rounded-full text-blue-600">
                    <Wallet className="w-4 h-4" />
                  </div>
                  <div>
                    <p className="font-semibold">Paiement Scolarité - Famille Alami</p>
                    <p className="text-xs text-slate-500">Aujourd'hui, 10:45</p>
                  </div>
                </div>
                <div className="text-right">
                  <p className="font-bold text-green-600">+2,500 DH</p>
                  <p className="text-[10px] bg-green-50 text-green-700 px-1.5 py-0.5 rounded-full inline-block">Confirmé</p>
                </div>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>
    </div>
  )
}
