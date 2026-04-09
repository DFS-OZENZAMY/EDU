"use client"
import * as React from "react"
import { Card } from "@/components/ui/card"
import { ShieldCheck, Users, Lock, ChevronRight, CheckCircle2, XCircle, Info, Settings2 } from "lucide-react"
import { cn } from "@/lib/utils"
import { Button } from "@/components/ui/button"

const roles = [
  { id: "TEACHER", name: "Enseignants", count: 12, modules: ["SIS", "LMS", "HR", "MESSAGING"] },
  { id: "ACCOUNTANT", name: "Comptabilité", count: 2, modules: ["FINANCE", "HR", "MESSAGING"] },
  { id: "STAFF", name: "Personnel Administratif", count: 5, modules: ["SIS", "CANTEEN", "TRANSPORT", "MESSAGING"] },
]

const availableModules = [
  { key: "SIS", name: "Gestion des Élèves", desc: "Dossiers, inscriptions et classes" },
  { key: "LMS", name: "Pédagogie & Notes", desc: "Saisie notes, cahier de texte" },
  { key: "FINANCE", name: "Trésorerie", desc: "Paiements, facturation" },
  { key: "HR", name: "Ressources Humaines", desc: "Profils employés, paie" },
  { key: "TRANSPORT", name: "Transport Scolaire", desc: "Lignes et flottes" },
  { key: "CANTEEN", name: "Cantine", desc: "Menus et suivis" },
  { key: "MESSAGING", name: "Communication", desc: "Messagerie interne" },
]

export default function PermissionsManagementPage() {
  const [selectedRole, setSelectedRole] = React.useState(roles[0])

  return (
    <div className="space-y-10 animate-in fade-in duration-500 pb-20">
      <div className="flex flex-col sm:flex-row justify-between items-end gap-6 border-b border-gray-200 pb-8">
        <div>
          <h2 className="text-4xl font-black text-slate-900 tracking-tight uppercase italic">Contrôle d'Accès</h2>
          <p className="text-slate-500 font-bold mt-1 uppercase text-xs tracking-widest text-center sm:text-left">Gestion granulaire des habilitations par profil métier</p>
        </div>
      </div>

      <div className="flex-1 flex flex-col lg:flex-row gap-10 overflow-hidden min-h-[600px]">
         {/* Role Selection */}
         <div className="w-full lg:w-96 space-y-4 shrink-0">
            <h3 className="text-[10px] font-black uppercase text-slate-400 tracking-widest ml-1 mb-4">Profils de l'Établissement</h3>
            {roles.map((role) => (
                <button
                    key={role.id}
                    onClick={() => setSelectedRole(role)}
                    className={cn(
                        "w-full text-left p-6 rounded-[32px] border transition-all relative group overflow-hidden",
                        selectedRole.id === role.id ? "bg-slate-900 border-slate-900 text-white shadow-2xl" : "bg-white border-slate-100 hover:bg-slate-50 text-slate-900 shadow-sm"
                    )}
                >
                    <div className="relative z-10 flex items-center justify-between">
                        <div>
                            <p className={cn("text-[9px] font-black uppercase tracking-[0.2em] mb-1", selectedRole.id === role.id ? "text-blue-400" : "text-slate-400")}>{role.count} Collaborateur(s)</p>
                            <h4 className="text-xl font-black italic">{role.name}</h4>
                        </div>
                        <ShieldCheck className={cn("h-6 w-6", selectedRole.id === role.id ? "text-blue-400" : "text-slate-200")} />
                    </div>
                    {selectedRole.id === role.id && <div className="absolute top-0 right-0 p-8 opacity-10"><Lock className="h-24 w-24" /></div>}
                </button>
            ))}
         </div>

         {/* Module Permissions Grid */}
         <Card className="flex-1 p-10 border-0 shadow-sm rounded-[48px] bg-white overflow-hidden relative border-t-8 border-t-blue-600">
            <div className="flex justify-between items-center mb-10">
                <div>
                    <h3 className="text-2xl font-black text-slate-900 tracking-tighter uppercase italic">Habilitations : {selectedRole.name}</h3>
                    <p className="text-xs font-bold text-slate-400 mt-1 uppercase tracking-widest">Activez ou désactivez l'accès aux briques applicatives</p>
                </div>
                <Button className="bg-slate-900 text-white font-black py-4 px-8 rounded-2xl uppercase text-[10px] tracking-widest">Enregistrer la matrice</Button>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                {availableModules.map((module) => {
                    const hasAccess = selectedRole.modules.includes(module.key)
                    return (
                        <div key={module.key} className={cn(
                            "p-6 rounded-[32px] border-2 transition-all flex items-center justify-between group",
                            hasAccess ? "border-emerald-100 bg-emerald-50/20" : "border-slate-50 bg-slate-50/30 grayscale opacity-60"
                        )}>
                            <div className="flex items-center gap-6">
                                <div className={cn(
                                    "h-12 w-12 rounded-2xl flex items-center justify-center transition-all group-hover:scale-110",
                                    hasAccess ? "bg-white text-emerald-600 shadow-sm shadow-emerald-500/10" : "bg-white text-slate-300"
                                )}>
                                    {hasAccess ? <CheckCircle2 className="h-6 w-6" /> : <XCircle className="h-6 w-6" />}
                                </div>
                                <div>
                                    <h5 className="text-sm font-black text-slate-900 uppercase tracking-tight">{module.name}</h5>
                                    <p className="text-[10px] font-bold text-slate-400 uppercase tracking-tighter mt-1">{module.desc}</p>
                                </div>
                            </div>
                            <div className="flex items-center">
                                <div className={cn(
                                    "w-12 h-6 rounded-full relative transition-all cursor-pointer",
                                    hasAccess ? "bg-emerald-500" : "bg-slate-300"
                                )}>
                                    <div className={cn(
                                        "absolute top-1 w-4 h-4 rounded-full bg-white transition-all shadow-sm",
                                        hasAccess ? "left-7" : "left-1"
                                    )} />
                                </div>
                            </div>
                        </div>
                    )
                })}
            </div>

            <div className="mt-12 bg-blue-50 p-6 rounded-[32px] border border-blue-100 flex items-start gap-4">
                <Info className="h-5 w-5 text-blue-600 shrink-0 mt-0.5" />
                <div>
                    <p className="text-xs font-bold text-blue-900 leading-relaxed italic">
                        Les modifications apportées à cette matrice de permissions seront effectives dès la prochaine reconnexion des collaborateurs concernés.
                    </p>
                </div>
            </div>
         </Card>
      </div>
    </div>
  )
}
