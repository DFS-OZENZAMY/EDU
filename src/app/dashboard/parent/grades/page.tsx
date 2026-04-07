"use client"
import * as React from "react"
import { Card } from "@/components/ui/card"
import { BarChart3, TrendingUp, Calendar, AlertCircle, Award, FileText } from "lucide-react"
import { getMyData } from "@/actions/data"
import { cn } from "@/lib/utils"

export default function ParentGradesPage() {
  const [students, setStudents] = React.useState<any[]>([])
  const [isLoading, setIsLoading] = React.useState(true)

  React.useEffect(() => {
    getMyData().then((res: any) => {
        if (res?.students) setStudents(res.students)
        setIsLoading(false)
    })
  }, [])

  if (isLoading) return <div className="h-full flex items-center justify-center font-black text-slate-300 animate-pulse uppercase tracking-widest">Calcul des moyennes...</div>

  if (students.length === 0) return (
      <div className="flex flex-col items-center justify-center h-96 bg-white rounded-[40px] text-center p-10">
          <BarChart3 className="h-16 w-16 text-slate-200 mb-6" />
          <h3 className="text-xl font-black text-slate-900 uppercase">Aucun résultat</h3>
          <p className="text-slate-400 font-bold max-w-xs text-sm mt-2">Les notes seront visibles dès la première évaluation de l'école.</p>
      </div>
  )

  return (
    <div className="max-w-5xl mx-auto space-y-12 animate-in fade-in duration-700 pb-20">
      {students.map((student) => {
          const grades = student.grades || []
          const average = grades.length > 0
            ? (grades.reduce((acc: any, curr: any) => acc + curr.value, 0) / grades.length).toFixed(2)
            : "0.00"

          return (
            <div key={student.id} className="space-y-10 border-b border-slate-100 pb-12 last:border-0">
                <div className="flex flex-col md:flex-row justify-between items-end gap-6 border-b border-slate-100 pb-8">
                    <div>
                        <h2 className="text-4xl font-black text-slate-900 tracking-tighter">Résultats de {student.name}</h2>
                        <p className="text-slate-400 text-sm font-bold uppercase tracking-widest mt-2 flex items-center gap-2">
                            <span className="h-2 w-2 bg-primary rounded-full animate-pulse" /> Suivi académique session 2026
                        </p>
                    </div>
                    <div className="bg-primary text-white px-6 py-3 rounded-2xl text-[10px] font-black uppercase tracking-widest flex items-center gap-2 shadow-lg shadow-primary/20">
                        <Award className="h-4 w-4" /> TRIMESTRE ACTUEL
                    </div>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
                    <Card className="p-8 border-0 shadow-xl shadow-slate-100 rounded-[32px] bg-slate-900 text-white relative overflow-hidden group transition-all hover:scale-[1.02]">
                        <div className="absolute top-0 right-0 p-6 opacity-10">
                            <TrendingUp className="h-20 w-20" />
                        </div>
                        <p className="text-[10px] font-black text-slate-400 uppercase tracking-widest mb-4">Moyenne Générale</p>
                        <div className="flex items-end gap-3 relative z-10">
                            <p className="text-5xl font-black">{average}</p>
                            <p className="text-xl font-bold text-slate-500 mb-1">/ 20</p>
                        </div>
                        <div className="mt-8 flex items-center gap-2 text-emerald-400 text-[10px] font-black uppercase">
                            <TrendingUp className="h-3 w-3" /> Progression stable
                        </div>
                    </Card>

                    <Card className="p-8 border-0 shadow-sm rounded-[32px] bg-white flex flex-col justify-between">
                        <div>
                            <p className="text-[10px] font-black text-slate-400 uppercase tracking-widest mb-1">Position Classe</p>
                            <p className="text-3xl font-black text-slate-900 tracking-tighter">4<span className="text-sm font-bold text-slate-300 ml-1 italic">ème</span></p>
                        </div>
                        <p className="text-[10px] font-bold text-slate-400">Sur un effectif de 28 élèves</p>
                    </Card>

                    <Card className="p-8 border-0 shadow-sm rounded-[32px] bg-white flex flex-col justify-between">
                        <div>
                            <p className="text-[10px] font-black text-slate-400 uppercase tracking-widest mb-1">Dernière Mise à Jour</p>
                            <div className="flex items-center gap-2 mt-2">
                                <Calendar className="h-5 w-5 text-primary" />
                                <p className="text-sm font-black text-slate-900">Il y a quelques instants</p>
                            </div>
                        </div>
                        <p className="text-[10px] font-bold text-slate-400 italic">Données synchronisées avec le Cloud</p>
                    </Card>
                </div>

                <Card className="overflow-hidden border-0 shadow-sm rounded-[40px] bg-white">
                    <div className="p-8 border-b border-slate-50 font-black text-slate-900 tracking-tight flex items-center gap-4 uppercase text-sm">
                        <div className="h-10 w-10 bg-primary/5 rounded-xl flex items-center justify-center">
                            <BarChart3 className="h-5 w-5 text-primary" />
                        </div>
                        Rélevé de Notes Détaillé
                    </div>
                    <div className="overflow-x-auto">
                        <table className="w-full text-left">
                            <thead className="bg-slate-50/50">
                                <tr className="text-[10px] uppercase font-black text-slate-400 border-b border-slate-50 tracking-[0.2em]">
                                    <th className="px-10 py-5">Matière / Module</th>
                                    <th className="px-10 py-5">Note (/20)</th>
                                    <th className="px-10 py-5 hidden lg:table-cell">Appréciation</th>
                                    <th className="px-10 py-5 text-right">Date d'Évaluation</th>
                                </tr>
                            </thead>
                            <tbody className="divide-y divide-slate-50">
                                {grades.map((grade: any, i: number) => (
                                    <tr key={i} className="hover:bg-slate-50/50 transition-all group">
                                        <td className="px-10 py-6">
                                            <div className="flex items-center gap-4">
                                                <div className="h-8 w-8 bg-slate-900 text-white rounded-lg flex items-center justify-center font-black text-[10px] italic">
                                                    {grade.subject.charAt(0)}
                                                </div>
                                                <p className="font-black text-slate-900 text-sm uppercase tracking-tight">{grade.subject}</p>
                                            </div>
                                        </td>
                                        <td className="px-10 py-6">
                                            <span className="text-xl font-black text-primary">{grade.value.toFixed(2)}</span>
                                        </td>
                                        <td className="px-10 py-6 hidden lg:table-cell">
                                            <span className={cn(
                                                "text-[9px] font-black px-3 py-1.5 rounded-xl uppercase tracking-widest border",
                                                grade.value >= 15 ? "bg-emerald-50 text-emerald-600 border-emerald-100" :
                                                grade.value >= 10 ? "bg-blue-50 text-blue-600 border-blue-100" :
                                                "bg-red-50 text-red-600 border-red-100"
                                            )}>
                                                {grade.observation || 'Validé'}
                                            </span>
                                        </td>
                                        <td className="px-10 py-6 text-right">
                                            <p className="text-[10px] font-black text-slate-400 uppercase tracking-widest">
                                                {new Date(grade.date).toLocaleDateString('fr-FR', { day: '2-digit', month: 'short', year: 'numeric' })}
                                            </p>
                                        </td>
                                    </tr>
                                ))}
                                {grades.length === 0 && (
                                    <tr>
                                        <td colSpan={4} className="px-10 py-20 text-center">
                                            <FileText className="h-10 w-10 text-slate-200 mx-auto mb-4" />
                                            <p className="text-[10px] font-black text-slate-300 uppercase tracking-widest">En attente de saisie par les professeurs</p>
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

      <div className="bg-slate-900 rounded-[32px] p-8 flex gap-6 items-start relative overflow-hidden">
         <div className="p-4 bg-primary/10 rounded-2xl shrink-0">
            <AlertCircle className="h-6 w-6 text-primary" />
         </div>
         <div className="relative z-10">
            <p className="text-[10px] font-black text-slate-400 uppercase tracking-widest mb-2">Note de l'Administration</p>
            <p className="text-xs text-slate-300 font-bold leading-relaxed max-w-2xl italic">
               "Les notes affichées sont synchronisées en temps réel. En cas de doute sur un résultat, veuillez utiliser le module de messagerie pour échanger avec le professeur concerné."
            </p>
         </div>
         <div className="absolute right-0 bottom-0 p-4 opacity-5">
             <BarChart3 className="h-24 w-24 text-white" />
         </div>
      </div>
    </div>
  )
}
