"use client"
import * as React from "react"
import { Card } from "@/components/ui/card"
import { Building2, Globe, Users, ShieldCheck, Mail, MapPin, MoreVertical, ExternalLink, Phone, ShieldAlert, Zap } from "lucide-react"
import { getAllSchools, updateSchoolPlan, toggleSchoolStatus, updateSchoolModules } from "@/actions/super-admin"
import { cn } from "@/lib/utils"
import { SubscriptionTier } from "@prisma/client"

export default function SchoolsPage() {
  const [schools, setSchools] = React.useState<any[]>([])
  const [isUpdating, setIsUpdating] = React.useState<number | null>(null)

  const fetchSchools = () => getAllSchools().then(setSchools)

  React.useEffect(() => {
    fetchSchools()
  }, [])

  const handleUpdatePlan = async (schoolId: number, plan: SubscriptionTier) => {
    setIsUpdating(schoolId)
    await updateSchoolPlan(schoolId, plan)
    fetchSchools()
    setIsUpdating(null)
  }

  const handleToggleStatus = async (schoolId: number, currentStatus: boolean) => {
      setIsUpdating(schoolId)
      await toggleSchoolStatus(schoolId, !currentStatus)
      fetchSchools()
      setIsUpdating(null)
  }

  return (
    <div className="space-y-8 animate-in fade-in duration-500 pb-20">
      <div className="flex flex-col sm:flex-row justify-between items-end gap-6 border-b border-gray-200 pb-8">
        <div>
          <h2 className="text-4xl font-black text-slate-900 tracking-tight">Catalogue des Établissements</h2>
          <p className="text-slate-500 font-bold mt-1 uppercase text-xs tracking-widest">Contrôle global des instances et de la facturation</p>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-8">
        {schools.map((school) => (
          <Card key={school.id} className={cn(
              "border-0 shadow-xl rounded-[32px] overflow-hidden bg-white p-0 group transition-all",
              !school.isActive && "opacity-60 grayscale"
          )}>
             <div className="relative h-28 bg-slate-900 overflow-hidden">
                <div className="absolute inset-0 opacity-20 bg-[radial-gradient(circle_at_center,_var(--tw-gradient-stops))] from-blue-500 via-transparent to-transparent animate-pulse" />
                <div className="absolute -bottom-10 left-8 h-20 w-20 bg-white rounded-3xl shadow-2xl flex items-center justify-center p-4 border-4 border-white overflow-hidden group-hover:scale-105 transition-transform duration-300">
                    {school.logo ? (
                        <img src={school.logo} alt="logo" className="w-full object-contain" />
                    ) : (
                        <Building2 className="h-8 w-8 text-blue-600" />
                    )}
                </div>
                <div className="absolute top-4 right-6 flex gap-2">
                    <button
                        onClick={() => handleToggleStatus(school.id, school.isActive)}
                        disabled={isUpdating === school.id}
                        className={cn(
                            "p-2 rounded-xl text-white backdrop-blur-md transition-all",
                            school.isActive ? "bg-white/10 hover:bg-red-500/20" : "bg-emerald-500/50 hover:bg-emerald-500"
                        )}
                    >
                        {school.isActive ? <ShieldAlert className="h-4 w-4" /> : <ShieldCheck className="h-4 w-4" />}
                    </button>
                </div>
             </div>

             <div className="pt-14 px-8 pb-8 space-y-6">
                <div className="flex justify-between items-start">
                    <div>
                        <h3 className="text-xl font-black text-slate-900 flex items-center gap-2">
                            {school.name}
                            {school.isActive && <span className="h-2 w-2 bg-emerald-500 rounded-full inline-block shadow-sm shadow-emerald-400" />}
                        </h3>
                        <p className="text-xs font-bold text-slate-400 mt-1 flex items-center gap-1">
                            <Globe className="h-3 w-3" /> {school.domain || "instance-standard.edu"}
                        </p>
                    </div>
                    <div className={cn(
                        "text-[9px] px-3 py-1 rounded-full font-black uppercase tracking-widest",
                        school.plan === 'FREE' ? 'bg-slate-100 text-slate-500' :
                        school.plan === 'PREMIUM' ? 'bg-purple-50 text-purple-600 border border-purple-100' :
                        'bg-blue-50 text-blue-600 border border-blue-100'
                    )}>
                        {school.plan}
                    </div>
                </div>

                <div className="p-4 bg-slate-50 rounded-2xl space-y-2">
                    <p className="text-[9px] font-black text-slate-400 uppercase tracking-widest">Informations Fondateur</p>
                    <div className="flex items-center gap-3">
                        <div className="h-8 w-8 bg-white rounded-lg flex items-center justify-center shadow-sm">
                            <Users className="h-3 w-3 text-blue-500" />
                        </div>
                        <div className="min-w-0">
                            <p className="text-xs font-black text-slate-900 truncate">{school.ownerName || "Inconnu"}</p>
                            <p className="text-[10px] font-bold text-slate-400 flex items-center gap-1 truncate">
                                <Mail className="h-2.5 w-2.5" /> {school.ownerEmail || "N/A"}
                            </p>
                        </div>
                    </div>
                    <div className="flex items-center gap-2 text-[10px] font-bold text-slate-500 pl-1">
                        <Phone className="h-3 w-3 text-emerald-500" /> {school.ownerPhone || "Aucun téléphone"}
                    </div>
                </div>

                <div className="grid grid-cols-2 gap-4">
                    <div className="p-4 bg-blue-50/50 rounded-2xl border border-blue-100/50 text-center">
                        <p className="text-[9px] font-black text-blue-400 uppercase mb-1">Élèves</p>
                        <p className="text-lg font-black text-blue-600">{school._count.students}</p>
                    </div>
                    <div className="p-4 bg-purple-50/50 rounded-2xl border border-purple-100/50 text-center">
                        <p className="text-[9px] font-black text-purple-400 uppercase mb-1">Staff</p>
                        <p className="text-lg font-black text-purple-600">{school._count.users}</p>
                    </div>
                </div>

                <div className="space-y-4 pt-2">
                    <p className="text-[9px] font-black text-slate-400 uppercase tracking-widest ml-1">Changer de Formule</p>
                    <div className="flex bg-gray-100 p-1.5 rounded-2xl gap-1">
                        {["FREE", "STANDARD", "PREMIUM", "ENTERPRISE"].map((tier) => (
                            <button
                                key={tier}
                                disabled={isUpdating === school.id}
                                onClick={() => handleUpdatePlan(school.id, tier as SubscriptionTier)}
                                className={cn(
                                    "flex-1 py-2 text-[9px] font-black rounded-xl transition-all duration-200",
                                    school.plan === tier
                                        ? "bg-white text-blue-600 shadow-md border border-blue-50"
                                        : "text-gray-400 hover:text-gray-600"
                                )}
                            >
                                {tier.charAt(0)}
                            </button>
                        ))}
                    </div>
                </div>

                <div className="pt-4 border-t border-gray-50 flex items-center justify-between">
                    <div className="flex items-center gap-1 text-[10px] font-black text-slate-400 italic">
                        <MapPin className="h-3 w-3" /> {school.city || "Maroc"}
                    </div>
                    <button className="flex items-center gap-1 text-[10px] font-black text-blue-500 hover:underline uppercase tracking-widest">
                        GÉRER LES MODULES <Zap className="h-3 w-3" />
                    </button>
                </div>
             </div>
          </Card>
        ))}
      </div>
    </div>
  )
}
