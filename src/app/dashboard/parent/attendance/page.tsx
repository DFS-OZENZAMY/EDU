"use client"
import * as React from "react"
import { Card } from "@/components/ui/card"
import { Calendar, CheckCircle, XCircle, AlertCircle, Clock, ClipboardCheck } from "lucide-react"
import { getMyData } from "@/actions/data"
import { cn } from "@/lib/utils"

export default function ParentAttendancePage() {
  const [students, setStudents] = React.useState<any[]>([])
  const [isLoading, setIsLoading] = React.useState(true)

  React.useEffect(() => {
    getMyData().then((res: any) => {
        if (res?.students) setStudents(res.students)
        setIsLoading(false)
    })
  }, [])

  if (isLoading) return <div className="h-full flex items-center justify-center font-black text-slate-300 animate-pulse uppercase tracking-widest">Récupération des présences...</div>

  if (students.length === 0) return (
      <div className="flex flex-col items-center justify-center h-96 bg-white rounded-[40px] text-center p-10">
          <ClipboardCheck className="h-16 w-16 text-slate-200 mb-6" />
          <h3 className="text-xl font-black text-slate-900 uppercase">Pas d'historique</h3>
          <p className="text-slate-400 font-bold max-w-xs text-sm mt-2">Le journal de présence sera disponible dès le premier appel.</p>
      </div>
  )

  return (
    <div className="max-w-5xl mx-auto space-y-12 animate-in fade-in duration-700 pb-20">
      {students.map((student) => {
          const attendance = student.attendance || []
          const presentCount = attendance.filter((a: any) => a.status === 'PRESENT').length
          const lateCount = attendance.filter((a: any) => a.status === 'LATE').length
          const absentCount = attendance.filter((a: any) => a.status === 'ABSENT').length
          const total = attendance.length
          const rate = total > 0 ? ((presentCount / total) * 100).toFixed(1) : "100"

          return (
            <div key={student.id} className="space-y-10 border-b border-slate-100 pb-12 last:border-0">
                <div className="flex flex-col md:flex-row justify-between items-end gap-6 border-b border-slate-100 pb-8">
                    <div>
                        <h2 className="text-4xl font-black text-slate-900 tracking-tighter">Présences : {student.name}</h2>
                        <p className="text-slate-400 text-sm font-bold uppercase tracking-widest mt-2 flex items-center gap-2">
                            <span className="h-2 w-2 bg-emerald-500 rounded-full animate-pulse" /> Ponctualité & Assiduité en temps réel
                        </p>
                    </div>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
                    <Card className="p-8 border-0 shadow-sm rounded-3xl bg-blue-600 text-white">
                        <p className="text-[10px] font-black text-blue-200 uppercase tracking-widest mb-1">Taux Global</p>
                        <p className="text-3xl font-black">{rate}%</p>
                    </Card>
                    <Card className="p-8 border-0 shadow-sm rounded-3xl bg-emerald-50 text-emerald-600">
                        <p className="text-[10px] font-black text-emerald-400 uppercase tracking-widest mb-1">Présent</p>
                        <p className="text-3xl font-black">{presentCount} <span className="text-sm font-bold opacity-60 italic">jours</span></p>
                    </Card>
                    <Card className="p-8 border-0 shadow-sm rounded-3xl bg-amber-50 text-amber-600">
                        <p className="text-[10px] font-black text-amber-400 uppercase tracking-widest mb-1">Retards</p>
                        <p className="text-3xl font-black">{lateCount} <span className="text-sm font-bold opacity-60 italic">fois</span></p>
                    </Card>
                    <Card className="p-8 border-0 shadow-sm rounded-3xl bg-red-50 text-red-600">
                        <p className="text-[10px] font-black text-red-400 uppercase tracking-widest mb-1">Absences</p>
                        <p className="text-3xl font-black">{absentCount} <span className="text-sm font-bold opacity-60 italic">jours</span></p>
                    </Card>
                </div>

                <Card className="overflow-hidden border-0 shadow-sm rounded-[40px] bg-white">
                    <div className="p-8 border-b border-slate-50 font-black text-slate-900 tracking-tight flex items-center gap-4 uppercase text-sm">
                        <div className="h-10 w-10 bg-slate-900 text-white rounded-xl flex items-center justify-center">
                            <Calendar className="h-5 w-5" />
                        </div>
                        Historique Complet du Mois
                    </div>
                    <div className="overflow-x-auto">
                        <table className="w-full text-left">
                            <thead className="bg-slate-50/50">
                                <tr className="text-[10px] uppercase font-black text-slate-400 border-b border-slate-50 tracking-[0.2em]">
                                    <th className="px-10 py-5">Date</th>
                                    <th className="px-10 py-5">Pointage / Heure</th>
                                    <th className="px-10 py-5">Matière / Session</th>
                                    <th className="px-10 py-5 text-right">Statut Final</th>
                                </tr>
                            </thead>
                            <tbody className="divide-y divide-slate-50">
                                {attendance.map((log: any, i: number) => (
                                    <tr key={i} className="hover:bg-slate-50/50 transition-all">
                                        <td className="px-10 py-6">
                                            <p className="font-black text-slate-900 text-sm uppercase tracking-tight">
                                                {new Date(log.date).toLocaleDateString('fr-FR', { weekday: 'long', day: 'numeric', month: 'long' })}
                                            </p>
                                        </td>
                                        <td className="px-10 py-6">
                                            <div className="flex items-center gap-2 text-slate-400">
                                                <Clock className="h-4 w-4" />
                                                <span className="text-xs font-bold">{new Date(log.date).toLocaleTimeString('fr-FR', {hour: '2-digit', minute:'2-digit'})}</span>
                                            </div>
                                        </td>
                                        <td className="px-10 py-6">
                                            <p className="text-xs font-bold text-slate-500 italic">Session Standard</p>
                                        </td>
                                        <td className="px-10 py-6 text-right">
                                            <span className={cn(
                                                "text-[9px] font-black px-3 py-1.5 rounded-xl uppercase tracking-widest border inline-flex items-center gap-2",
                                                log.status === 'PRESENT' ? 'bg-emerald-50 text-emerald-600 border-emerald-100' :
                                                log.status === 'LATE' ? 'bg-amber-50 text-amber-600 border-amber-100' :
                                                'bg-red-50 text-red-600 border-red-100'
                                            )}>
                                                {log.status === 'PRESENT' && <CheckCircle className="h-3 w-3" />}
                                                {log.status === 'LATE' && <AlertCircle className="h-3 w-3" />}
                                                {log.status === 'ABSENT' && <XCircle className="h-3 w-3" />}
                                                {log.status}
                                            </span>
                                        </td>
                                    </tr>
                                ))}
                                {attendance.length === 0 && (
                                    <tr>
                                        <td colSpan={4} className="px-10 py-20 text-center text-slate-300">
                                            <p className="text-[10px] font-black uppercase tracking-widest">Aucune donnée synchronisée</p>
                                        </td>
                                    </tr>
                                )}
                            </tbody>
                        </table>
                    </div>
                </Card>
            </div>
          )
      })}
    </div>
  )
}
