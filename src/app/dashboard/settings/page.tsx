import { getSession } from "@/actions/auth"
import { Card } from "@/components/ui/card"
import { Lock, Bell, Shield, Eye } from "lucide-react"

export default async function SettingsPage() {
  const user = await getSession()

  return (
    <div className="max-w-4xl mx-auto space-y-8">
      <div>
        <h2 className="text-2xl font-bold text-gray-900">Paramètres</h2>
        <p className="text-gray-500">Configurez votre compte et vos préférences de sécurité.</p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
        <Card className="p-6 space-y-6">
          <div className="flex items-center gap-3 border-b border-gray-100 pb-4 mb-4">
            <Lock className="h-6 w-6 text-primary" />
            <h4 className="font-bold text-gray-900">Sécurité et Mot de passe</h4>
          </div>

          <div className="space-y-4">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">Mot de passe actuel</label>
              <input type="password" placeholder="••••••••" className="w-full px-4 py-2 rounded-lg border border-gray-200 text-sm focus:ring-2 focus:ring-primary/20" />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">Nouveau mot de passe</label>
              <input type="password" placeholder="••••••••" className="w-full px-4 py-2 rounded-lg border border-gray-200 text-sm focus:ring-2 focus:ring-primary/20" />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">Confirmer le nouveau mot de passe</label>
              <input type="password" placeholder="••••••••" className="w-full px-4 py-2 rounded-lg border border-gray-200 text-sm focus:ring-2 focus:ring-primary/20" />
            </div>
          </div>

          <div className="pt-4">
            <button className="bg-primary text-white px-6 py-2 rounded-lg font-bold text-sm hover:opacity-90 transition-opacity">
               Mettre à jour le mot de passe
            </button>
          </div>
        </Card>

        <Card className="p-6 space-y-6">
          <div className="flex items-center gap-3 border-b border-gray-100 pb-4 mb-4">
            <Bell className="h-6 w-6 text-blue-600" />
            <h4 className="font-bold text-gray-900">Notifications</h4>
          </div>

          <div className="space-y-4">
            {[
              { label: "Email pour les nouveaux messages", checked: true },
              { label: "Rapports hebdomadaires", checked: true },
              { label: "Alertes de sécurité", checked: true },
              { label: "Mises à jour système", checked: false },
            ].map((item, i) => (
              <div key={i} className="flex items-center justify-between">
                <span className="text-sm text-gray-700">{item.label}</span>
                <div className={`h-6 w-11 rounded-full relative transition-colors ${item.checked ? 'bg-primary' : 'bg-gray-200'}`}>
                  <div className={`absolute top-1 h-4 w-4 rounded-full bg-white transition-all ${item.checked ? 'left-6' : 'left-1'}`} />
                </div>
              </div>
            ))}
          </div>

          <div className="pt-4 flex justify-end">
            <button className="text-primary font-bold text-sm hover:underline transition-all">Enregistrer les préférences</button>
          </div>
        </Card>
      </div>
    </div>
  )
}
