"use client"
import * as React from "react"
import { Card } from "@/components/ui/card"
import { BarChart3, Search, Download, FileText, CheckCircle2 } from "lucide-react"
import { getAllStudents } from "@/actions/data"

export default function AdminGradesPage() {
  const [students, setStudents] = React.useState<any[]>([])

  React.useEffect(() => {
    getAllStudents().then(setStudents)
  }, [])

  return (
    <div className="space-y-6">
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
        <div>
          <h2 className="text-2xl font-bold text-gray-900">Notes & Bulletins</h2>
          <p className="text-gray-500">Validez les résultats et générez les bulletins officiels.</p>
        </div>
        <div className="flex gap-3">
           <button className="flex items-center gap-2 bg-white border border-gray-200 px-4 py-2 rounded-xl text-sm font-bold text-gray-700 hover:bg-gray-50 transition-all">
              <Download className="h-4 w-4" /> Exporter tout
           </button>
           <button className="flex items-center gap-2 bg-primary text-white px-6 py-2 rounded-xl text-sm font-bold shadow-lg hover:opacity-90 transition-all">
              <FileText className="h-4 w-4" /> Générer Bulletins
           </button>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
         <Card className="lg:col-span-2 overflow-hidden">
            <div className="p-4 border-b border-gray-100 flex items-center gap-4 bg-gray-50/50">
               <div className="relative flex-1">
                  <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-gray-400" />
                  <input type="text" placeholder="Rechercher un élève..." className="w-full pl-10 pr-4 py-2 bg-white border border-gray-200 rounded-lg text-sm" />
               </div>
            </div>
            <div className="overflow-x-auto">
               <table className="w-full text-left">
                  <thead className="bg-gray-50 text-gray-500 text-xs uppercase font-bold">
                     <tr>
                        <th className="px-6 py-4">Élève</th>
                        <th className="px-6 py-4">Classe</th>
                        <th className="px-6 py-4">Moyenne</th>
                        <th className="px-6 py-4">Dernière Note</th>
                        <th className="px-6 py-4">Statut</th>
                     </tr>
                  </thead>
                  <tbody className="divide-y divide-gray-100">
                     {students.map((student) => {
                        const lastGrade = student.grades?.[0]
                        const avg = student.grades?.length > 0
                            ? (student.grades.reduce((acc: any, g: any) => acc + g.value, 0) / student.grades.length).toFixed(2)
                            : '-'

                        return (
                           <tr key={student.id} className="hover:bg-gray-50 transition-colors">
                              <td className="px-6 py-4 font-medium text-gray-900">{student.name}</td>
                              <td className="px-6 py-4 text-sm text-gray-600">{student.class?.name || "N/A"}</td>
                              <td className="px-6 py-4 text-sm font-bold text-primary">{avg}/20</td>
                              <td className="px-6 py-4 text-sm text-gray-500">{lastGrade?.value ? `${lastGrade.value}/20` : '-'}</td>
                              <td className="px-6 py-4">
                                 <span className="flex items-center gap-1 text-[10px] font-bold text-green-600 bg-green-50 px-2 py-1 rounded-full w-fit uppercase">
                                    <CheckCircle2 className="h-3 w-3" /> Validé
                                 </span>
                              </td>
                           </tr>
                        )
                     })}
                     {students.length === 0 && (
                        <tr>
                           <td colSpan={5} className="px-6 py-8 text-center text-gray-500 italic text-sm">
                              Aucune donnée de notation disponible.
                           </td>
                        </tr>
                     )}
                  </tbody>
               </table>
            </div>
         </Card>

         <div className="space-y-6">
            <Card className="p-6">
               <h3 className="font-bold text-gray-900 text-lg mb-4">Moyennes par Niveau</h3>
               <div className="space-y-4">
                  {[
                     { level: "Primaire", avg: "15.4", color: "bg-blue-600" },
                     { level: "Collège", avg: "14.2", color: "bg-green-600" },
                     { level: "Lycée", avg: "13.8", color: "bg-purple-600" },
                  ].map((item, i) => (
                     <div key={i} className="space-y-2">
                        <div className="flex justify-between text-xs font-bold uppercase tracking-wider">
                           <span className="text-gray-500">{item.level}</span>
                           <span className="text-gray-900">{item.avg}/20</span>
                        </div>
                        <div className="h-2 w-full bg-gray-100 rounded-full overflow-hidden">
                           <div className={`h-full ${item.color}`} style={{ width: `${parseFloat(item.avg) * 5}%` }} />
                        </div>
                     </div>
                  ))}
               </div>
            </Card>

            <Card className="p-6 bg-slate-900 text-white">
               <h4 className="font-bold text-lg mb-2">Période en cours</h4>
               <p className="text-sm text-slate-400 mb-6 font-medium italic">Trimestre 2 - Janvier à Mars 2026</p>
               <button className="w-full py-3 bg-primary text-white font-bold rounded-xl text-sm hover:opacity-90 transition-opacity">
                  Clôturer le Trimestre
               </button>
            </Card>
         </div>
      </div>
    </div>
  )
}
