import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Calendar, Clock, MapPin, Users, Plus } from "lucide-react"
import { Button } from "@/components/ui/button"

export default function TimetablePage() {
  const days = ["Lundi", "Mardi", "Mercredi", "Jeudi", "Vendredi", "Samedi"]
  const hours = ["08h00", "09h00", "10h00", "11h00", "12h00", "13h00", "14h00", "15h00", "16h00", "17h00"]

  return (
    <div className="p-6 space-y-10 animate-in fade-in duration-700 pb-20">
      <div className="flex justify-between items-end border-b pb-8">
        <div>
          <h1 className="text-4xl font-black text-slate-900 tracking-tight italic uppercase">Emploi du Temps</h1>
          <p className="text-slate-500 font-bold mt-1 uppercase text-[10px] tracking-widest">Planification des ressources et des salles</p>
        </div>
        <div className="flex gap-4">
           <Button variant="outline" className="rounded-2xl font-black uppercase tracking-widest text-[10px] h-12 px-6">Imprimer</Button>
           <Button className="rounded-2xl font-black uppercase tracking-widest text-[10px] h-12 px-8 shadow-xl bg-slate-900">
              <Plus className="w-4 h-4 mr-2" /> Générer
           </Button>
        </div>
      </div>

      <div className="bg-white rounded-[40px] shadow-2xl border-0 overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full border-collapse">
             <thead>
                <tr className="bg-slate-50">
                   <th className="p-6 border-b border-r border-slate-100 w-24"></th>
                   {days.map(day => (
                     <th key={day} className="p-6 border-b border-slate-100 text-[10px] font-black uppercase tracking-widest text-slate-400 min-w-[150px]">{day}</th>
                   ))}
                </tr>
             </thead>
             <tbody>
                {hours.map((hour, idx) => (
                   <tr key={idx}>
                      <td className="p-6 border-r border-b border-slate-100 text-[10px] font-black text-slate-400 bg-slate-50/50">{hour}</td>
                      {days.map(day => (
                        <td key={day} className="p-2 border-b border-slate-50 group hover:bg-slate-50/50 transition-colors">
                           {day === "Lundi" && hour === "09h00" && (
                             <div className="bg-blue-600 text-white p-4 rounded-2xl shadow-lg shadow-blue-600/20 transform hover:-translate-y-1 transition-transform cursor-pointer">
                                <p className="text-[9px] font-black uppercase opacity-70 mb-1">Mathématiques</p>
                                <p className="text-xs font-black italic">6ème A • Salle 12</p>
                             </div>
                           )}
                           {day === "Mardi" && hour === "11h00" && (
                             <div className="bg-emerald-600 text-white p-4 rounded-2xl shadow-lg shadow-emerald-600/20 transform hover:-translate-y-1 transition-transform cursor-pointer">
                                <p className="text-[9px] font-black uppercase opacity-70 mb-1">Français</p>
                                <p className="text-xs font-black italic">5ème B • Salle 04</p>
                             </div>
                           )}
                        </td>
                      ))}
                   </tr>
                ))}
             </tbody>
          </table>
        </div>
      </div>
    </div>
  )
}
