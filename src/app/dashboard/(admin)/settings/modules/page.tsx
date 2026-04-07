"use client"
import * as React from "react"
import { Card } from "@/components/ui/card"
import { ShieldCheck, Zap, ToggleLeft, ToggleRight, Layout, Users, GraduationCap, Wallet, ChefHat, MessageSquare, BarChart3, CreditCard } from "lucide-react"
import { getSchoolModules, updateLocalModules } from "@/actions/school-config"
import { cn } from "@/lib/utils"

export default function WorkspaceModulesPage() {
  const [modules, setModules] = React.useState<any>(null)
  const [isSaving, setIsSaving] = React.useState(false)

  React.useEffect(() => {
    getSchoolModules().then(setModules)
  }, [])

  const handleToggle = async (key: string) => {
    const newModules = { ...modules, [key]: !modules[key] }
    setModules(newModules)
    setIsSaving(true)
    await updateLocalModules(newModules)
    setIsSaving(false)
  }

  if (!modules) return null

  const availableModules = [
    { key: "SIS", name: "Gestion Élèves (SIS)", desc: "Inscriptions, dossiers et historique académique", icon: GraduationCap, color: "blue" },
    { key: "LMS", name: "Cahier de Texte (LMS)", desc: "Suivi des leçons, devoirs et ressources", icon: Layout, color: "purple" },
    { key: "FINANCE", name: "Module Financier", desc: "Paiements, facturation et suivi des frais", icon: Wallet, color: "emerald" },
    { key: "ANALYTICS", name: "AI Analytics", desc: "Prédiction de performance et alertes décrochage", icon: BarChart3, color: "indigo" },
    { key: "CANTEEN", name: "Gestion Cantine", desc: "Menus quotidiens et réservations", icon: ChefHat, color: "orange" },
    { key: "SUBSCRIPTION", name: "Gestion Abonnement", desc: "Facturation SaaS et contrôle de la formule", icon: CreditCard, color: "slate" },
  ]

  return (
    <div className="space-y-10 animate-in fade-in duration-500 pb-20 max-w-5xl mx-auto">
      <div className="flex flex-col sm:flex-row justify-between items-end gap-6 border-b border-gray-200 pb-8">
        <div>
          <h2 className="text-4xl font-black text-slate-900 tracking-tight">Configuration Workspace</h2>
          <p className="text-slate-500 font-bold mt-1 uppercase text-xs tracking-widest">Activez ou désactivez les modules pour votre établissement</p>
        </div>
        {isSaving && (
            <div className="flex items-center gap-2 text-blue-600 bg-blue-50 px-4 py-2 rounded-xl border border-blue-100 animate-pulse">
                <Zap className="h-4 w-4" />
                <span className="text-[10px] font-black uppercase">Synchronisation...</span>
            </div>
        )}
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
        {availableModules.map((m) => (
          <Card key={m.key} className={cn(
              "p-8 border-0 shadow-xl rounded-[32px] transition-all relative overflow-hidden group",
              modules[m.key] ? "bg-white shadow-slate-200/50" : "bg-slate-50 opacity-60"
          )}>
             <div className="flex justify-between items-start mb-6">
                <div className={cn(
                    "p-4 rounded-2xl transition-transform group-hover:scale-110",
                    m.color === 'blue' ? 'bg-blue-50 text-blue-600' :
                    m.color === 'purple' ? 'bg-purple-50 text-purple-600' :
                    m.color === 'emerald' ? 'bg-emerald-50 text-emerald-600' :
                    m.color === 'indigo' ? 'bg-indigo-50 text-indigo-600' :
                    m.color === 'amber' ? 'bg-amber-50 text-amber-600' :
                    'bg-orange-50 text-orange-600'
                )}>
                    <m.icon className="h-6 w-6" />
                </div>
                <button
                    onClick={() => handleToggle(m.key)}
                    className={cn(
                        "transition-colors",
                        modules[m.key] ? "text-emerald-500" : "text-slate-300"
                    )}
                >
                    {modules[m.key] ? <ToggleRight className="h-10 w-10" /> : <ToggleLeft className="h-10 w-10" />}
                </button>
             </div>
             <div>
                <h3 className="text-lg font-black text-slate-900 mb-1">{m.name}</h3>
                <p className="text-xs font-bold text-slate-400 leading-relaxed">{m.desc}</p>
             </div>
             {modules[m.key] && (
                 <div className="absolute top-0 right-0 p-2">
                     <span className="text-[8px] font-black uppercase tracking-widest text-emerald-500 bg-emerald-50 px-2 py-1 rounded-full">Actif</span>
                 </div>
             )}
          </Card>
        ))}
      </div>

      <Card className="p-10 border-0 shadow-sm rounded-[40px] bg-slate-900 text-white relative overflow-hidden">
          <div className="absolute top-0 right-0 p-10 opacity-10">
              <ShieldCheck className="h-40 w-40" />
          </div>
          <div className="relative z-10">
            <h3 className="text-2xl font-black tracking-tight mb-4">Gouvernance des Rôles</h3>
            <p className="text-slate-400 text-sm font-bold max-w-lg mb-8">Vous pouvez restreindre l'accès à certains modules pour des rôles spécifiques (ex: l'Accountant n'a pas accès au Cahier de Texte).</p>
            <button className="px-8 py-4 bg-white text-slate-900 rounded-2xl text-[10px] font-black uppercase tracking-widest hover:bg-blue-50 transition-all">
                Configurer les Permissions par Rôle
            </button>
          </div>
      </Card>
    </div>
  )
}
