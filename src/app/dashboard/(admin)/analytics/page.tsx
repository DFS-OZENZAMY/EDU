"use client"
import * as React from "react"
import { Card } from "@/components/ui/card"
import { BrainCircuit, TrendingUp, AlertCircle, Target, Users, GraduationCap, Clock, Award } from "lucide-react"
import { ResponsiveContainer, RadarChart, PolarGrid, PolarAngleAxis, PolarRadiusAxis, Radar, LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, AreaChart, Area } from 'recharts'
import { cn } from "@/lib/utils"

export default function AnalyticsPage() {
  const data = [
    { subject: 'Maths', score: 85, avg: 65, full: 100 },
    { subject: 'Physique', score: 72, avg: 60, full: 100 },
    { subject: 'Anglais', score: 92, avg: 75, full: 100 },
    { subject: 'Français', score: 68, avg: 70, full: 100 },
    { subject: 'Sport', score: 95, avg: 85, full: 100 },
  ];

  return (
    <div className="space-y-8 animate-in fade-in duration-500 pb-20">
      <div className="flex flex-col sm:flex-row justify-between items-end gap-6 border-b border-gray-200 pb-8">
        <div>
          <h2 className="text-4xl font-black text-slate-900 tracking-tight">AI Analytics</h2>
          <p className="text-slate-500 font-bold mt-1 uppercase text-xs tracking-widest">Predictive Performance & Dropout Risk Detection</p>
        </div>
        <div className="flex gap-3">
            <div className="flex items-center gap-2 bg-emerald-50 px-4 py-2 rounded-xl text-emerald-600 border border-emerald-100">
                <BrainCircuit className="h-4 w-4" />
                <span className="text-[10px] font-black uppercase">AI Engine: Online</span>
            </div>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          <Card className="lg:col-span-2 p-10 border-0 shadow-2xl shadow-slate-200/50 rounded-[40px] bg-white">
              <div className="flex justify-between items-center mb-10">
                  <h3 className="font-black text-slate-900 text-xl tracking-tight">Academic Distribution</h3>
                  <div className="flex gap-4">
                      <div className="flex items-center gap-2">
                          <div className="h-3 w-3 bg-blue-500 rounded-full" />
                          <span className="text-[10px] font-black text-slate-400 uppercase">This Class</span>
                      </div>
                      <div className="flex items-center gap-2">
                          <div className="h-3 w-3 bg-slate-200 rounded-full" />
                          <span className="text-[10px] font-black text-slate-400 uppercase">School Average</span>
                      </div>
                  </div>
              </div>
              <div className="h-[400px]">
                  <ResponsiveContainer width="100%" height="100%">
                      <RadarChart cx="50%" cy="50%" outerRadius="80%" data={data}>
                          <PolarGrid stroke="#f1f5f9" />
                          <PolarAngleAxis dataKey="subject" tick={{fill: '#94a3b8', fontSize: 10, fontWeight: 900}} />
                          <PolarRadiusAxis angle={30} domain={[0, 100]} tick={false} axisLine={false} />
                          <Radar name="Class" dataKey="score" stroke="#3b82f6" fill="#3b82f6" fillOpacity={0.5} />
                          <Radar name="School" dataKey="avg" stroke="#94a3b8" fill="#94a3b8" fillOpacity={0.2} />
                          <Tooltip contentStyle={{borderRadius: '16px', border: 'none', boxShadow: '0 20px 25px -5px rgb(0 0 0 / 0.1)'}} />
                      </RadarChart>
                  </ResponsiveContainer>
              </div>
          </Card>

          <div className="space-y-8">
              <Card className="p-8 border-0 shadow-sm rounded-[32px] bg-red-50 border-l-8 border-red-500">
                  <div className="flex justify-between items-start mb-6">
                      <div className="p-3 bg-red-100 text-red-600 rounded-xl">
                          <AlertCircle className="h-6 w-6" />
                      </div>
                      <span className="text-[10px] font-black bg-red-200 text-red-700 px-2 py-1 rounded-full uppercase">High Risk</span>
                  </div>
                  <h4 className="font-black text-red-900 text-lg mb-2 tracking-tight">Dropout Alert</h4>
                  <p className="text-xs text-red-700 font-bold opacity-80 leading-relaxed mb-6">
                      AI detected 4 students at risk of dropout based on recent attendance decline and grade volatility.
                  </p>
                  <button className="w-full py-4 bg-red-600 text-white rounded-2xl text-[10px] font-black uppercase tracking-widest hover:bg-red-700 transition-all shadow-lg shadow-red-600/20">
                      View Risk List
                  </button>
              </Card>

              <Card className="p-8 border-0 shadow-sm rounded-[32px] bg-blue-600 text-white relative overflow-hidden group">
                  <div className="absolute top-0 right-0 p-8 opacity-10">
                      <TrendingUp className="h-24 w-24" />
                  </div>
                  <div className="relative z-10">
                    <p className="text-[10px] font-black text-blue-100 uppercase tracking-widest mb-1">Grade Prediction</p>
                    <h4 className="text-2xl font-black tracking-tight mb-6">Next Exam Trend: +4.2%</h4>
                    <div className="flex items-center gap-4 p-4 bg-white/10 rounded-2xl backdrop-blur-md">
                        <BrainCircuit className="h-6 w-6" />
                        <p className="text-[10px] font-bold leading-tight">AI recommends focusing on Physics labs to improve results.</p>
                    </div>
                  </div>
              </Card>
          </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {[
              { label: "Completion Rate", value: "88%", icon: Target, color: "blue" },
              { label: "Active Engagement", value: "92%", icon: Users, color: "emerald" },
              { label: "Average Attendance", value: "96.4%", icon: Clock, color: "purple" },
              { label: "Distinction Ratio", value: "14%", icon: Award, color: "amber" },
          ].map((k, i) => (
              <Card key={i} className="p-6 border-0 shadow-sm rounded-3xl flex items-center gap-5">
                  <div className={cn(
                      "p-4 rounded-2xl",
                      k.color === 'blue' ? 'bg-blue-50 text-blue-600' :
                      k.color === 'emerald' ? 'bg-emerald-50 text-emerald-600' :
                      k.color === 'purple' ? 'bg-purple-50 text-purple-600' :
                      'bg-amber-50 text-amber-600'
                  )}>
                      <k.icon className="h-6 w-6" />
                  </div>
                  <div>
                      <p className="text-[10px] font-black text-slate-400 uppercase tracking-widest mb-1">{k.label}</p>
                      <p className="text-xl font-black text-slate-900">{k.value}</p>
                  </div>
              </Card>
          ))}
      </div>
    </div>
  )
}
