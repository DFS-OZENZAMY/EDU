"use client"
import * as React from "react"
import { Card } from "@/components/ui/card"
import { GraduationCap, Users, Plus, Download, Search, Trash2, UserPlus } from "lucide-react"
import { getAllStudents } from "@/actions/data"
import { deleteStudent } from "@/actions/admin"
import Link from "next/link"

export default function StudentsPage() {
  const [students, setStudents] = React.useState<any[]>([])
  const [searchTerm, setSearchTerm] = React.useState("")

  const fetchStudents = () => getAllStudents().then(setStudents)

  React.useEffect(() => {
    fetchStudents()
  }, [])

  const handleDelete = async (id: number) => {
    if (confirm("Supprimer cet élève ?")) {
        await deleteStudent(id)
        fetchStudents()
    }
  }

  const filteredStudents = students.filter(s => {
    const nameMatch = s.name.toLowerCase().includes(searchTerm.toLowerCase())
    const classMatch = s.class?.name?.toLowerCase().includes(searchTerm.toLowerCase()) || false
    return nameMatch || classMatch
  })

  return (
    <div className="space-y-8 animate-in fade-in duration-500 pb-20">
      <div className="flex flex-col sm:flex-row justify-between items-end gap-6 border-b border-gray-200 pb-8">
        <div>
          <h2 className="text-4xl font-black text-slate-900 tracking-tight">Base de Données Élèves</h2>
          <p className="text-slate-500 font-bold mt-1 uppercase text-xs tracking-widest">Gestion académique et dossiers scolaires</p>
        </div>
        <div className="flex gap-3">
            <Link href="/dashboard/students/enroll" className="bg-blue-600 text-white px-6 py-3 rounded-2xl text-[10px] font-black uppercase tracking-widest hover:bg-blue-700 shadow-xl shadow-blue-600/10 transition-all flex items-center gap-2">
                <UserPlus className="h-4 w-4" /> NOUVELLE INSCRIPTION
            </Link>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {[
              { label: "Total Élèves", value: students.length, icon: GraduationCap, color: "blue" },
              { label: "Classes Actives", value: new Set(students.map(s => s.classId).filter(id => id !== null)).size, icon: Users, color: "purple" },
          ].map((k, i) => (
              <Card key={i} className="p-6 border-0 shadow-sm rounded-3xl flex items-center gap-5">
                  <div className={`p-4 rounded-2xl bg-${k.color}-50 text-${k.color}-600`}>
                      <k.icon className="h-6 w-6" />
                  </div>
                  <div>
                      <p className="text-[10px] font-black text-slate-400 uppercase tracking-widest mb-1">{k.label}</p>
                      <p className="text-xl font-black text-slate-900">{k.value}</p>
                  </div>
              </Card>
          ))}
      </div>

      <Card className="p-8 border-0 shadow-sm rounded-[40px] overflow-hidden">
        <div className="flex flex-col md:flex-row justify-between items-center gap-6 mb-10">
            <div className="relative w-full md:w-80">
                <Search className="absolute left-4 top-1/2 -translate-y-1/2 h-4 w-4 text-gray-400" />
                <input
                    type="text"
                    placeholder="Rechercher un élève, une classe..."
                    className="w-full pl-12 pr-4 py-3 bg-gray-50 border-0 rounded-2xl text-sm font-bold outline-none focus:ring-2 focus:ring-blue-500/10"
                    value={searchTerm}
                    onChange={(e) => setSearchTerm(e.target.value)}
                />
            </div>
            <button className="text-[10px] font-black uppercase tracking-widest text-slate-400 hover:text-slate-600 transition-colors flex items-center gap-2">
                <Download className="h-4 w-4" /> EXPORTER CSV
            </button>
        </div>

        <div className="overflow-x-auto">
            <table className="w-full text-left">
                <thead>
                    <tr className="border-b border-gray-100">
                        <th className="pb-4 text-[10px] font-black text-slate-400 uppercase tracking-widest px-4">Nom de l'Élève</th>
                        <th className="pb-4 text-[10px] font-black text-slate-400 uppercase tracking-widest px-4">Classe</th>
                        <th className="pb-4 text-[10px] font-black text-slate-400 uppercase tracking-widest px-4">Parent</th>
                        <th className="pb-4 text-[10px] font-black text-slate-400 uppercase tracking-widest px-4">Contact</th>
                        <th className="pb-4 text-[10px] font-black text-slate-400 uppercase tracking-widest px-4 text-right">Actions</th>
                    </tr>
                </thead>
                <tbody className="divide-y divide-gray-50">
                    {filteredStudents.map((student: any) => (
                        <tr key={student.id} className="hover:bg-gray-50 transition-all group">
                            <td className="py-5 px-4">
                                <div className="flex items-center gap-3">
                                    <div className="h-10 w-10 bg-slate-100 text-slate-600 rounded-2xl flex items-center justify-center font-black text-xs uppercase">
                                        {student.name.charAt(0)}
                                    </div>
                                    <span className="text-sm font-black text-slate-900">{student.name}</span>
                                </div>
                            </td>
                            <td className="py-5 px-4">
                                <span className="text-xs font-black px-3 py-1 bg-blue-50 text-blue-600 rounded-full uppercase tracking-tighter italic">
                                    {student.class?.name || "Sans classe"}
                                </span>
                            </td>
                            <td className="py-5 px-4 text-xs font-bold text-slate-600">{student.parent?.name || "Non lié"}</td>
                            <td className="py-5 px-4 text-xs font-bold text-slate-400">{student.parent?.phone || "N/A"}</td>
                            <td className="py-5 px-4 text-right">
                                <button
                                    onClick={() => handleDelete(student.id)}
                                    className="p-2 text-slate-300 hover:text-red-500 transition-colors"
                                >
                                    <Trash2 className="h-4 w-4" />
                                </button>
                            </td>
                        </tr>
                    ))}
                </tbody>
            </table>
            {filteredStudents.length === 0 && (
                <div className="py-20 text-center text-slate-300">
                    <GraduationCap className="h-12 w-12 mx-auto mb-4 opacity-20" />
                    <p className="text-xs font-black uppercase tracking-widest">Aucun élève trouvé</p>
                </div>
            )}
        </div>
      </Card>
    </div>
  )
}
