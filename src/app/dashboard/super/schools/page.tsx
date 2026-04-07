"use client"
import * as React from "react"
import { Card } from "@/components/ui/card"
import { Building2, Globe, Users, ShieldCheck, Mail, MapPin, MoreVertical, ExternalLink } from "lucide-react"
import { getAllSchools, updateSchoolPlan } from "@/actions/super-admin"
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
    await fetchSchools()
    setIsUpdating(null)
  }

  return (
    <div className="space-y-8 animate-in fade-in duration-500 pb-20">
      <div className="flex flex-col sm:flex-row justify-between items-end gap-6 border-b border-gray-200 pb-8">
        <div>
          <h2 className="text-4xl font-black text-slate-900 tracking-tight">Institutional Catalog</h2>
          <p className="text-slate-500 font-bold mt-1 uppercase text-xs tracking-widest">Global School Directory & Tier Control</p>
        </div>
        <div className="flex gap-3">
            <button className="bg-slate-900 text-white px-6 py-3 rounded-xl text-[10px] font-black uppercase tracking-widest hover:bg-slate-800 shadow-xl shadow-slate-900/10 transition-all flex items-center gap-2">
                <ShieldCheck className="h-4 w-4" /> BATCH VERIFICATION
            </button>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-8">
        {schools.map((school) => (
          <Card key={school.id} className="border-0 shadow-xl shadow-slate-200/50 rounded-[32px] overflow-hidden bg-white p-0 group">
             <div className="relative h-24 bg-slate-900 overflow-hidden">
                <div className="absolute inset-0 opacity-20 bg-[radial-gradient(circle_at_center,_var(--tw-gradient-stops))] from-blue-500 via-transparent to-transparent animate-pulse" />
                <div className="absolute -bottom-10 left-8 h-20 w-20 bg-white rounded-3xl shadow-2xl flex items-center justify-center p-4 border-4 border-white overflow-hidden group-hover:scale-105 transition-transform duration-300">
                    {school.logo ? (
                        <img src={school.logo} alt="logo" className="w-full object-contain" />
                    ) : (
                        <Building2 className="h-8 w-8 text-blue-600" />
                    )}
                </div>
                <div className="absolute top-4 right-6 flex gap-2">
                    <button className="p-2 bg-white/10 hover:bg-white/20 rounded-xl text-white backdrop-blur-md transition-all">
                        <MoreVertical className="h-4 w-4" />
                    </button>
                </div>
             </div>

             <div className="pt-14 px-8 pb-8 space-y-6">
                <div>
                   <h3 className="text-xl font-black text-slate-900 flex items-center gap-2">
                       {school.name}
                       <span className="h-2 w-2 bg-emerald-500 rounded-full inline-block" />
                   </h3>
                   <p className="text-xs font-bold text-slate-400 mt-1 flex items-center gap-1">
                       <Globe className="h-3 w-3" /> {school.domain || "no-domain.edu"}
                   </p>
                </div>

                <div className="grid grid-cols-2 gap-4">
                    <div className="p-3 bg-slate-50 rounded-2xl">
                        <p className="text-[9px] font-black text-slate-400 uppercase tracking-widest mb-1">Students</p>
                        <p className="text-sm font-black text-slate-900 flex items-center gap-2">
                            <Users className="h-3 w-3 text-blue-500" /> {school._count.students}
                        </p>
                    </div>
                    <div className="p-3 bg-slate-50 rounded-2xl">
                        <p className="text-[9px] font-black text-slate-400 uppercase tracking-widest mb-1">Staff</p>
                        <p className="text-sm font-black text-slate-900 flex items-center gap-2">
                            <ShieldCheck className="h-3 w-3 text-blue-500" /> {school._count.users}
                        </p>
                    </div>
                </div>

                <div className="space-y-4 pt-2">
                    <p className="text-[9px] font-black text-slate-400 uppercase tracking-widest ml-1">Subscription Tier Control</p>
                    <div className="flex bg-gray-100 p-1.5 rounded-2xl gap-1">
                        {["FREE", "STANDARD", "PREMIUM", "ENTERPRISE"].map((tier) => (
                            <button
                                key={tier}
                                disabled={isUpdating === school.id}
                                onClick={() => handleUpdatePlan(school.id, tier as SubscriptionTier)}
                                className={cn(
                                    "flex-1 py-1.5 text-[9px] font-black rounded-xl transition-all duration-200",
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
                        <MapPin className="h-3 w-3" /> {school.city || "Not set"}
                    </div>
                    <button className="flex items-center gap-1 text-[10px] font-black text-blue-500 hover:underline uppercase tracking-widest">
                        Go to Instance <ExternalLink className="h-3 w-3" />
                    </button>
                </div>
             </div>
          </Card>
        ))}
        {schools.length === 0 && (
            <div className="col-span-full h-80 border-2 border-dashed border-gray-200 rounded-3xl flex flex-col items-center justify-center gap-4">
                 <Building2 className="h-12 w-12 text-gray-200" />
                 <p className="text-gray-400 font-bold">No schools found in platform catalog.</p>
            </div>
        )}
      </div>
    </div>
  )
}
