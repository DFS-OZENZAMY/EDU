import { Settings } from "lucide-react"

export default function AdminSettingsPage() {
  return (
    <div className="max-w-4xl mx-auto space-y-8">
      <h2 className="text-2xl font-bold">Paramètres de l'Établissement</h2>
      <div className="bg-white rounded-2xl p-12 flex items-center justify-center border-2 border-dashed border-gray-100">
         <div className="text-center">
            <Settings className="h-16 w-16 text-gray-200 mx-auto mb-6 animate-spin-slow" />
            <h3 className="text-xl font-bold text-gray-900 mb-2">Configuration du SaaS</h3>
            <p className="text-gray-500 text-sm max-w-sm">Gérez ici vos informations de contact, logo, et paramètres du calendrier scolaire.</p>
         </div>
      </div>
    </div>
  )
}
