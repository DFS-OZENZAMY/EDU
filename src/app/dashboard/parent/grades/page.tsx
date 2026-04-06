"use client"
import * as React from "react"
import { Card } from "@/components/ui/card"
import { BarChart3, TrendingUp, Calendar, AlertCircle } from "lucide-react"
import { getMyData } from "@/actions/data"

export default function ParentGradesPage() {
  const [students, setStudents] = React.useState<any[]>([])

  React.useEffect(() => {
    getMyData().then((res: any) => {
        if (Array.isArray(res)) setStudents(res)
    })
  }, [])

  const student = students[0]
  const grades = student?.grades || []

  return (
    <div className="space-y-6">
      <div>
        <h2 className="text-2xl font-bold text-gray-900">Résultats de {student?.name || 'votre enfant'}</h2>
        <p className="text-gray-500 text-sm">Suivez l'évolution académique de votre enfant par matière.</p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
         <Card className="p-4 border-l-4 border-l-blue-500">
            <p className="text-sm text-gray-500">Moyenne Générale</p>
            <div className="flex items-center gap-4">
               <p className="text-2xl font-bold">17.45 / 20</p>
               <span className="flex items-center text-green-600 text-xs font-bold bg-green-50 px-2 py-0.5 rounded-full">
                  <TrendingUp className="h-3 w-3 mr-1" /> +0.4
               </span>
            </div>
         </Card>
         <Card className="p-4 border-l-4 border-l-purple-500">
            <p className="text-sm text-gray-500">Rang dans la classe</p>
            <p className="text-2xl font-bold">2ème <span className="text-sm font-normal text-gray-400">sur 28 élèves</span></p>
         </Card>
         <Card className="p-4 border-l-4 border-l-green-500">
            <p className="text-sm text-gray-500">Prochain Examen</p>
            <div className="flex items-center gap-2">
               <Calendar className="h-4 w-4 text-primary" />
               <p className="text-sm font-bold">Maths - 20 Avril</p>
            </div>
         </Card>
      </div>

      <Card>
         <div className="p-4 border-b border-gray-100 font-bold text-gray-900">
            Moyennes par matière - Trimestre 2
         </div>
         <div className="overflow-x-auto">
            <table className="w-full text-left">
               <thead className="bg-slate-50 text-slate-500 text-xs uppercase font-bold">
                  <tr>
                     <th className="px-6 py-4">Matière</th>
                     <th className="px-6 py-4">Moyenne / 20</th>
                     <th className="px-6 py-4">Appréciation</th>
                     <th className="px-6 py-4">Évolution</th>
                  </tr>
               </thead>
               <tbody className="divide-y divide-slate-100">
                  {grades.map((grade: any, i: number) => (
                     <tr key={i} className="hover:bg-slate-50 transition-colors">
                        <td className="px-6 py-4 font-medium text-gray-900">{grade.subject}</td>
                        <td className="px-6 py-4">
                           <span className="text-lg font-bold text-primary">{grade.value}</span>
                        </td>
                        <td className="px-6 py-4">
                           <span className={`text-xs font-bold px-2 py-1 rounded-full bg-blue-50 text-blue-700`}>
                              {grade.observation || 'Validé'}
                           </span>
                        </td>
                        <td className="px-6 py-4 text-sm text-gray-400">
                           {new Date(grade.date).toLocaleDateString()}
                        </td>
                     </tr>
                  ))}
                  {grades.length === 0 && (
                    <tr>
                        <td colSpan={4} className="px-6 py-8 text-center text-gray-500 italic text-sm">
                            Aucune note enregistrée pour le moment.
                        </td>
                    </tr>
                  )}
               </tbody>
            </table>
         </div>
      </Card>

      <div className="bg-blue-50 border border-blue-100 rounded-xl p-4 flex gap-3 items-start">
         <AlertCircle className="h-5 w-5 text-primary shrink-0 mt-0.5" />
         <div>
            <p className="text-sm font-bold text-primary">Commentaire du professeur principal</p>
            <p className="text-sm text-blue-800 italic leading-relaxed">
               "Youssef continue de progresser de manière régulière. Sa participation en classe est exemplaire, particulièrement en mathématiques. Il doit cependant rester concentré lors des séances de français pour maintenir ses acquis."
            </p>
         </div>
      </div>
    </div>
  )
}
