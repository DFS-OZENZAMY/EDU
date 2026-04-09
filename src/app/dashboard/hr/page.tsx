import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { ShieldCheck, Users, Wallet, Calendar, Plus } from "lucide-react"
import { Button } from "@/components/ui/button"

export default function HRPage() {
  return (
    <div className="p-6 space-y-10 animate-in fade-in duration-700">
      <div className="flex justify-between items-end border-b pb-8">
        <div>
          <h1 className="text-4xl font-black text-slate-900 tracking-tight italic uppercase">Gestion RH</h1>
          <p className="text-slate-500 font-bold mt-1 uppercase text-[10px] tracking-widest">Contrats, Paies et Performance du Personnel</p>
        </div>
        <Button className="rounded-2xl font-black uppercase tracking-widest text-[10px] h-12 px-8 shadow-xl bg-slate-900">
           <Plus className="w-4 h-4 mr-2" /> Recruter
        </Button>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
        {[
          { label: "Effectif Total", value: "48", icon: Users, color: "text-blue-600" },
          { label: "Masse Salariale", value: "285,000 DH", icon: Wallet, color: "text-emerald-600" },
          { label: "Congés Actuels", value: "3", icon: Calendar, color: "text-orange-600" },
        ].map((stat, i) => (
          <Card key={i} className="p-8 border-0 shadow-sm rounded-[32px] bg-white group hover:scale-[1.02] transition-transform">
             <div className="flex items-center justify-between">
                <div>
                   <p className="text-[10px] font-black text-slate-400 uppercase tracking-widest mb-1">{stat.label}</p>
                   <p className="text-3xl font-black text-slate-900">{stat.value}</p>
                </div>
                <stat.icon className={`h-10 w-10 ${stat.color} opacity-20`} />
             </div>
          </Card>
        ))}
      </div>

      <Card className="border-0 shadow-xl rounded-[40px] overflow-hidden bg-white">
        <div className="p-10">
           <h3 className="text-xl font-black text-slate-900 uppercase tracking-tight italic mb-8">Personnel Récent</h3>
           <div className="space-y-4">
              {[
                { name: "Siham Alaoui", role: "Enseignant", salary: "8,500 DH", status: "CDI" },
                { name: "Youssef Bennani", role: "Comptable", salary: "10,200 DH", status: "CDI" },
                { name: "Khadija Idrissi", role: "Assistance", salary: "4,500 DH", status: "CDD" },
              ].map((emp, i) => (
                <div key={i} className="flex items-center justify-between p-6 bg-slate-50 rounded-[24px] hover:bg-slate-100 transition-colors cursor-pointer group">
                   <div className="flex items-center gap-4">
                      <div className="h-12 w-12 bg-white rounded-2xl flex items-center justify-center font-black text-slate-400 shadow-sm group-hover:bg-slate-900 group-hover:text-white transition-all">
                         {emp.name.charAt(0)}
                      </div>
                      <div>
                         <p className="text-sm font-black text-slate-900">{emp.name}</p>
                         <p className="text-[10px] font-bold text-slate-400 uppercase tracking-widest">{emp.role}</p>
                      </div>
                   </div>
                   <div className="text-right">
                      <p className="text-sm font-black text-slate-900">{emp.salary}</p>
                      <span className="text-[9px] font-black bg-slate-200 text-slate-600 px-2 py-0.5 rounded-full">{emp.status}</span>
                   </div>
                </div>
              ))}
           </div>
        </div>
      </Card>
    </div>
  )
}
