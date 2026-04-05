"use client"
import * as React from "react"
import { GraduationCap } from "lucide-react"
import { getMyData } from "@/actions/data"

export default function TeacherClassesPage() {
  const [classes, setClasses] = React.useState<any[]>([])

  React.useEffect(() => {
    getMyData().then((data: any) => {
        if (Array.isArray(data)) setClasses(data)
    })
  }, [])

  return (
    <div className="space-y-6">
      <h2 className="text-2xl font-bold">Mes Classes (Professeur)</h2>
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
        {classes.map((cls, idx) => (
          <div key={idx} className="bg-white p-6 rounded-2xl shadow-sm border border-green-100 hover:shadow-md transition-all group">
             <div className="h-12 w-12 rounded-xl bg-green-50 text-green-600 flex items-center justify-center mb-4 transition-colors group-hover:bg-green-600 group-hover:text-white">
                <GraduationCap className="h-6 w-6" />
             </div>
             <h3 className="font-bold text-gray-900 text-lg mb-1">{cls.name}</h3>
             <p className="text-sm text-gray-500 mb-4">{cls.students?.length || 0} élèves • {cls.room}</p>
             <button className="w-full py-2 bg-green-50 text-green-600 font-bold rounded-lg text-xs hover:bg-green-600 hover:text-white transition-all">Consulter la liste</button>
          </div>
        ))}
        {classes.length === 0 && (
            <p className="text-gray-500 italic">Aucune classe assignée.</p>
        )}
      </div>
    </div>
  )
}
