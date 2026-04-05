import { GraduationCap } from "lucide-react"

export default function TeacherClassesPage() {
  return (
    <div className="space-y-6">
      <h2 className="text-2xl font-bold">Mes Classes (Professeur)</h2>
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
        {[
          { name: "CP - Section A", students: 24, room: "Salle 12" },
          { name: "CP - Section B", students: 25, room: "Salle 12" },
          { name: "CE1 - Section B", students: 22, room: "Salle 05" },
        ].map((cls, idx) => (
          <div key={idx} className="bg-white p-6 rounded-2xl shadow-sm border border-green-100 hover:shadow-md transition-all group">
             <div className="h-12 w-12 rounded-xl bg-green-50 text-green-600 flex items-center justify-center mb-4 transition-colors group-hover:bg-green-600 group-hover:text-white">
                <GraduationCap className="h-6 w-6" />
             </div>
             <h3 className="font-bold text-gray-900 text-lg mb-1">{cls.name}</h3>
             <p className="text-sm text-gray-500 mb-4">{cls.students} élèves • {cls.room}</p>
             <button className="w-full py-2 bg-green-50 text-green-600 font-bold rounded-lg text-xs hover:bg-green-600 hover:text-white transition-all">Consulter la liste</button>
          </div>
        ))}
      </div>
    </div>
  )
}
