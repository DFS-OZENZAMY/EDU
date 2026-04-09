import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Zap, AlertCircle, CheckCircle2, Search, Filter, Plus } from "lucide-react"
import { Button } from "@/components/ui/button"

export default function VieScolairePage() {
  return (
    <div className="p-6 space-y-10 animate-in fade-in duration-700 pb-20">
      <div className="flex justify-between items-end border-b pb-8">
        <div>
          <h1 className="text-4xl font-black text-slate-900 tracking-tight italic uppercase">Vie Scolaire</h1>
          <p className="text-slate-500 font-bold mt-1 uppercase text-[10px] tracking-widest">Absences, Retards et Discipline</p>
        </div>
        <Button className="rounded-2xl font-black uppercase tracking-widest text-[10px] h-12 px-8 shadow-xl bg-red-600 hover:bg-red-700">
           <Zap className="w-4 h-4 mr-2" /> Signaler Incident
        </Button>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
        {[
          { label: "Absences Jour", value: "14", icon: AlertCircle, color: "text-red-600", bg: "bg-red-50" },
          { label: "Retards", value: "8", icon: Zap, color: "text-orange-600", bg: "bg-orange-50" },
          { label: "Sanctions", value: "2", icon: AlertCircle, color: "text-slate-900", bg: "bg-slate-100" },
          { label: "Justifiés", value: "12", icon: CheckCircle2, color: "text-emerald-600", bg: "bg-emerald-50" },
        ].map((stat, i) => (
          <Card key={i} className="p-8 border-0 shadow-sm rounded-[32px] bg-white">
             <div className="flex items-center justify-between">
                <div>
                   <p className="text-[10px] font-black text-slate-400 uppercase tracking-widest mb-1">{stat.label}</p>
                   <p className="text-3xl font-black text-slate-900">{stat.value}</p>
                </div>
                <div className={`${stat.bg} ${stat.color} p-4 rounded-2xl`}>
                   <stat.icon className="h-6 w-6" />
                </div>
             </div>
          </Card>
        ))}
      </div>

      <Card className="border-0 shadow-xl rounded-[40px] overflow-hidden bg-white">
        <div className="p-10">
           <div className="flex justify-between items-center mb-10">
              <h3 className="text-xl font-black text-slate-900 uppercase tracking-tight italic">Journal des Incidents</h3>
              <div className="flex gap-2">
                 <div className="relative">
                    <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-slate-400" />
                    <input type="text" placeholder="Rechercher élève..." className="pl-10 pr-4 py-2 bg-slate-50 border-0 rounded-xl text-xs font-medium focus:ring-2 focus:ring-slate-900" />
                 </div>
                 <Button variant="outline" size="sm" className="rounded-xl"><Filter className="w-4 h-4" /></Button>
              </div>
           </div>

           <div className="space-y-4">
              {[
                { name: "Sami Alami", type: "Absence", class: "3ème A", time: "08:15", status: "Non Justifié" },
                { name: "Lina Bennani", type: "Retard", class: "6ème B", time: "08:45", status: "Justifié" },
                { name: "Omar Idrissi", type: "Discipline", class: "4ème C", time: "10:30", status: "Avertissement" },
              ].map((item, i) => (
                <div key={i} className="flex items-center justify-between p-6 bg-slate-50 rounded-[24px] hover:bg-slate-100 transition-colors cursor-pointer border border-transparent hover:border-slate-200">
                   <div className="flex items-center gap-6">
                      <div className={cn(
                        "h-12 w-12 rounded-2xl flex items-center justify-center font-black text-white shadow-lg",
                        item.type === "Absence" ? "bg-red-500" : item.type === "Retard" ? "bg-orange-500" : "bg-slate-900"
                      )}>
                         {item.type.charAt(0)}
                      </div>
                      <div>
                         <p className="text-sm font-black text-slate-900">{item.name}</p>
                         <p className="text-[10px] font-bold text-slate-400 uppercase tracking-widest">{item.class} • {item.time}</p>
                      </div>
                   </div>
                   <div className="text-right">
                      <p className="text-xs font-black text-slate-900 mb-1">{item.type}</p>
                      <span className={cn(
                        "text-[9px] font-black px-2 py-0.5 rounded-full uppercase tracking-widest",
                        item.status === "Justifié" ? "bg-emerald-100 text-emerald-700" : "bg-red-100 text-red-700"
                      )}>{item.status}</span>
                   </div>
                </div>
              ))}
           </div>
        </div>
      </Card>
    </div>
  )
}
