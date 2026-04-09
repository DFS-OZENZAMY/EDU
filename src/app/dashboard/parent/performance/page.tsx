"use client"
import * as React from "react"
import { Card } from "@/components/ui/card"
import { BarChart3, TrendingUp, TrendingDown, BookOpen, Calculator, Award, Calendar, ChevronRight, FileBarChart } from "lucide-react"
import { cn } from "@/lib/utils"
import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
  AreaChart,
  Area
} from "recharts"

const performanceData = [
  { month: "Sep", avg: 14.5, classAvg: 12.8 },
  { month: "Oct", avg: 15.2, classAvg: 13.0 },
  { month: "Nov", avg: 14.8, classAvg: 12.5 },
  { month: "Dec", avg: 16.1, classAvg: 13.2 },
  { month: "Jan", avg: 15.9, classAvg: 13.1 },
  { month: "Feb", avg: 16.8, classAvg: 13.5 },
]

const subjectBreakdown = [
  { name: "Mathématiques", student: 16.5, class: 13.2, trend: "UP", coef: 5 },
  { name: "Français", student: 15.0, class: 12.5, trend: "STABLE", coef: 4 },
  { name: "Arabe", student: 17.5, class: 14.0, trend: "UP", coef: 4 },
  { name: "Physique", student: 14.0, class: 12.0, trend: "DOWN", coef: 4 },
]

export default function PerformanceDashboardPage() {
  return (
    <div className="space-y-10 animate-in fade-in duration-500 pb-20">
      <div className="flex flex-col sm:flex-row justify-between items-end gap-6 border-b border-gray-200 pb-8">
        <div>
          <h2 className="text-4xl font-black text-slate-900 tracking-tight uppercase italic">Tableau de Bord Académique</h2>
          <p className="text-slate-500 font-bold mt-1 uppercase text-xs tracking-widest text-center sm:text-left">Analyse comparative des performances et tendances</p>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          <Card className="p-8 border-0 shadow-sm rounded-3xl bg-primary text-white flex flex-col justify-between relative overflow-hidden group">
             <div className="relative z-10">
                <p className="text-[10px] font-black text-blue-200 uppercase tracking-widest mb-1">Moyenne Générale</p>
                <h4 className="text-4xl font-black italic">16.25 <span className="text-sm">/ 20</span></h4>
             </div>
             <div className="mt-6 flex items-center gap-2 text-emerald-400 text-[10px] font-black uppercase">
                <TrendingUp className="h-3 w-3" /> +1.2 pts vs Trim.1
             </div>
             <Calculator className="absolute -bottom-4 -right-4 h-24 w-24 opacity-10 rotate-12 group-hover:scale-110 transition-transform" />
          </Card>

          <Card className="p-8 border-0 shadow-sm rounded-3xl bg-white flex flex-col justify-between">
             <div>
                <p className="text-[10px] font-black text-slate-400 uppercase tracking-widest mb-1">Rang Classe</p>
                <h4 className="text-3xl font-black text-slate-900">3ème <span className="text-xs text-slate-300">sur 32</span></h4>
             </div>
             <div className="mt-6 flex items-center gap-2 text-blue-600 text-[10px] font-black uppercase">
                Top 10% de l'établissement
             </div>
          </Card>

          <Card className="p-8 border-0 shadow-sm rounded-3xl bg-white flex flex-col justify-between border-b-8 border-emerald-500">
             <div>
                <p className="text-[10px] font-black text-slate-400 uppercase tracking-widest mb-1">Félicitations</p>
                <h4 className="text-3xl font-black text-slate-900 flex items-center gap-3">Accordées <Award className="h-6 w-6 text-amber-400" /></h4>
             </div>
             <p className="text-[10px] font-bold text-slate-400 mt-6 uppercase italic">Conseil de classe du 12/03</p>
          </Card>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-10">
         <Card className="lg:col-span-2 p-10 border-0 shadow-sm rounded-[40px] bg-white">
            <h3 className="text-xl font-black text-slate-900 uppercase tracking-tight mb-10 flex items-center gap-3">
               <TrendingUp className="h-6 w-6 text-primary" /> Évolution des Moyennes
            </h3>
            <div className="h-[400px] w-full">
                <ResponsiveContainer width="100%" height="100%">
                    <AreaChart data={performanceData}>
                        <defs>
                            <linearGradient id="colorAvg" x1="0" y1="0" x2="0" y2="1">
                                <stop offset="5%" stopColor="#1e40af" stopOpacity={0.1}/>
                                <stop offset="95%" stopColor="#1e40af" stopOpacity={0}/>
                            </linearGradient>
                        </defs>
                        <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#f1f5f9" />
                        <XAxis
                            dataKey="month"
                            axisLine={false}
                            tickLine={false}
                            tick={{fontSize: 10, fontWeight: 'bold', fill: '#94a3b8'}}
                        />
                        <YAxis
                            domain={[0, 20]}
                            axisLine={false}
                            tickLine={false}
                            tick={{fontSize: 10, fontWeight: 'bold', fill: '#94a3b8'}}
                        />
                        <Tooltip
                            contentStyle={{borderRadius: '16px', border: 'none', boxShadow: '0 10px 15px -3px rgba(0,0,0,0.1)', fontSize: '12px'}}
                        />
                        <Area type="monotone" dataKey="avg" stroke="#1e40af" strokeWidth={4} fillOpacity={1} fill="url(#colorAvg)" name="Moyenne Élève" />
                        <Area type="monotone" dataKey="classAvg" stroke="#94a3b8" strokeWidth={2} strokeDasharray="5 5" fill="transparent" name="Moyenne Classe" />
                    </AreaChart>
                </ResponsiveContainer>
            </div>
         </Card>

         <div className="space-y-10">
            <Card className="p-10 border-0 shadow-sm rounded-[40px] bg-white">
               <h3 className="text-sm font-black text-slate-900 uppercase tracking-widest mb-8">Points Forts & Axes</h3>
               <div className="space-y-8">
                  {subjectBreakdown.map((subject, i) => (
                     <div key={i} className="group cursor-default">
                        <div className="flex justify-between items-end mb-2">
                           <div>
                              <p className="text-[11px] font-black text-slate-900 uppercase">{subject.name}</p>
                              <p className="text-[9px] font-bold text-slate-400 uppercase italic">Coef {subject.coef}</p>
                           </div>
                           <div className="text-right">
                              <p className="text-sm font-black text-slate-900">{subject.student} / 20</p>
                              <span className={cn(
                                 "text-[8px] font-black px-1.5 py-0.5 rounded uppercase",
                                 subject.trend === 'UP' ? 'text-emerald-600 bg-emerald-50' : subject.trend === 'DOWN' ? 'text-red-600 bg-red-50' : 'text-blue-600 bg-blue-50'
                              )}>{subject.trend}</span>
                           </div>
                        </div>
                        <div className="h-1.5 w-full bg-slate-50 rounded-full overflow-hidden">
                           <div
                              className={cn(
                                 "h-full rounded-full transition-all duration-1000",
                                 subject.student >= 15 ? "bg-emerald-500" : subject.student >= 10 ? "bg-blue-500" : "bg-red-500"
                              )}
                              style={{ width: `${(subject.student / 20) * 100}%` }}
                           />
                        </div>
                     </div>
                  ))}
               </div>
               <button className="w-full mt-10 py-4 border-2 border-slate-50 rounded-2xl text-[10px] font-black uppercase tracking-[0.2em] text-slate-400 hover:border-primary/20 hover:text-primary transition-all flex items-center justify-center gap-2">
                  BULLETIN TRIMESTRIEL PDF <FileBarChart className="h-3 w-3" />
               </button>
            </Card>
         </div>
      </div>
    </div>
  )
}
