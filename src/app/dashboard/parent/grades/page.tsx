"use client"
import * as React from "react"
import { Card } from "@/components/ui/card"
import { BarChart3, TrendingUp, Calendar, AlertCircle, Award } from "lucide-react"
import { getMyData } from "@/actions/data"

export default function ParentGradesPage() {
  const [student, setStudent] = React.useState<any>(null)
  const [grades, setGrades] = React.useState<any[]>([])

  React.useEffect(() => {
    getMyData().then((res: any) => {
        if (res?.students?.length > 0) {
            setStudent(res.students[0])
            setGrades(res.students[0].grades || [])
        }
    })
  }, [])

  const average = grades.length > 0
    ? (grades.reduce((acc, curr) => acc + curr.value, 0) / grades.length).toFixed(2)
    : "0.00"

  return (
    <div className="space-y-6 md:space-y-8">
      <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4">
        <div>
          <h2 className="text-2xl font-black text-gray-900 tracking-tight">Résultats de {student?.name || 'votre enfant'}</h2>
          <p className="text-gray-500 text-sm font-medium italic">Suivi académique en temps réel - Année 2025/2026</p>
        </div>
        <div className="flex gap-2">
            <div className="bg-blue-100 text-blue-700 px-4 py-2 rounded-xl text-xs font-black uppercase tracking-widest flex items-center gap-2">
                <Award className="h-4 w-4" />
                Trimestre 2
            </div>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
         <Card className="p-6 border-l-8 border-l-blue-600 shadow-sm">
            <p className="text-[10px] font-black text-gray-400 uppercase tracking-widest mb-1">Moyenne Générale</p>
            <div className="flex items-center gap-4">
               <p className="text-3xl font-black text-gray-900">{average} <span className="text-sm font-bold text-gray-400">/ 20</span></p>
               <span className="flex items-center text-green-600 text-[10px] font-black bg-green-50 px-2 py-1 rounded-full uppercase tracking-tighter">
                  <TrendingUp className="h-3 w-3 mr-1" /> Stable
               </span>
            </div>
         </Card>
         <Card className="p-6 border-l-8 border-l-purple-600 shadow-sm">
            <p className="text-[10px] font-black text-gray-400 uppercase tracking-widest mb-1">Rang estimé</p>
            <p className="text-3xl font-black text-gray-900">2ème <span className="text-sm font-bold text-gray-400">sur 28</span></p>
         </Card>
         <Card className="p-6 border-l-8 border-l-green-600 shadow-sm">
            <p className="text-[10px] font-black text-gray-400 uppercase tracking-widest mb-1">Dernière mise à jour</p>
            <div className="flex items-center gap-2">
               <Calendar className="h-5 w-5 text-green-600" />
               <p className="text-sm font-bold text-gray-900">Aujourd'hui, {new Date().toLocaleTimeString([], {hour: '2-digit', minute:'2-digit'})}</p>
            </div>
         </Card>
      </div>

      <Card className="overflow-hidden border-gray-100 shadow-sm">
         <div className="p-6 border-b border-gray-100 font-black text-gray-900 tracking-tight flex items-center gap-3 bg-gray-50/30">
            <div className="p-2 bg-blue-50 rounded-xl">
                <BarChart3 className="h-5 w-5 text-blue-600" />
            </div>
            Détail des notes par matière
         </div>
         <div className="overflow-x-auto">
            <table className="w-full text-left">
               <thead className="bg-gray-50/50">
                  <tr className="text-[10px] uppercase font-black text-gray-400 border-b border-gray-100 tracking-widest">
                     <th className="px-6 py-4">Matière</th>
                     <th className="px-6 py-4">Note / 20</th>
                     <th className="px-6 py-4 hidden sm:table-cell">Observation du Professeur</th>
                     <th className="px-6 py-4 text-right">Date de saisie</th>
                  </tr>
               </thead>
               <tbody className="divide-y divide-gray-100">
                  {grades.map((grade: any, i: number) => (
                     <tr key={i} className="hover:bg-blue-50/30 transition-all group">
                        <td className="px-6 py-4">
                            <p className="font-bold text-gray-900 text-sm tracking-tight uppercase">{grade.subject}</p>
                            <p className="text-[10px] text-gray-400 font-bold uppercase tracking-tighter sm:hidden">Obs: {grade.observation || 'Validé'}</p>
                        </td>
                        <td className="px-6 py-4">
                           <span className="text-lg font-black text-blue-700">{grade.value.toFixed(2)}</span>
                        </td>
                        <td className="px-6 py-4 hidden sm:table-cell">
                           <span className={`text-xs font-bold px-3 py-1.5 rounded-xl border ${
                              grade.value >= 16 ? "bg-green-50 text-green-700 border-green-100" :
                              grade.value >= 12 ? "bg-blue-50 text-blue-700 border-blue-100" :
                              "bg-orange-50 text-orange-700 border-orange-100"
                           }`}>
                              {grade.observation || 'Travail validé'}
                           </span>
                        </td>
                        <td className="px-6 py-4 text-right text-[10px] font-black text-gray-400 uppercase tracking-widest">
                           {new Date(grade.date).toLocaleDateString('fr-FR', { day: '2-digit', month: 'short' })}
                        </td>
                     </tr>
                  ))}
                  {grades.length === 0 && (
                    <tr>
                        <td colSpan={4} className="px-6 py-16 text-center text-gray-400 italic text-sm font-medium">
                            Aucun résultat n'a encore été publié par les professeurs.
                        </td>
                    </tr>
                  )}
               </tbody>
            </table>
         </div>
      </Card>

      <div className="bg-blue-50 border-2 border-dashed border-blue-200 rounded-2xl p-6 flex gap-4 items-start shadow-inner">
         <div className="p-3 bg-blue-100 rounded-2xl shrink-0">
            <AlertCircle className="h-6 w-6 text-blue-600" />
         </div>
         <div>
            <p className="text-xs font-black text-blue-900 uppercase tracking-widest mb-1.5">Note de l'Administration</p>
            <p className="text-sm text-blue-800 italic leading-relaxed font-medium">
               "Les notes affichées sur cette plateforme sont synchronisées directement avec les cahiers de notes des professeurs. Pour toute réclamation, veuillez contacter le professeur de la matière via la messagerie."
            </p>
         </div>
      </div>
    </div>
  )
}
