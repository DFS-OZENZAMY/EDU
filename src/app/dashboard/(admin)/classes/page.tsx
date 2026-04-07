"use client"
import * as React from "react"
import { Card } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Plus, Users, GraduationCap, Search, Settings2, Trash2, X, Edit3, UserPlus, CheckCircle2, ChevronRight, Loader2 } from "lucide-react"
import { getAllClasses, getAdminUsers, getAllStudents } from "@/actions/data"
import { createClass, deleteClass, updateClass, assignStudentsToClass } from "@/actions/admin"
import { cn } from "@/lib/utils"

export default function ClassesPage() {
  const [classes, setClasses] = React.useState<any[]>([])
  const [teachers, setTeachers] = React.useState<any[]>([])
  const [allStudents, setAllStudents] = React.useState<any[]>([])
  const [searchTerm, setSearchTerm] = React.useState("")

  const [modalMode, setModalMode] = React.useState<"NONE" | "ADD" | "EDIT" | "ASSIGN">("NONE")
  const [selectedClass, setSelectedClass] = React.useState<any>(null)
  const [selectedStudents, setSelectedStudents] = React.useState<number[]>([])
  const [isLoading, setIsLoading] = React.useState(false)

  const refreshData = React.useCallback(async () => {
    setIsLoading(true)
    const [c, u, s] = await Promise.all([getAllClasses(), getAdminUsers(), getAllStudents()])
    setClasses(c)
    setTeachers(u.filter((user: any) => user.role === 'TEACHER'))
    setAllStudents(s)
    setIsLoading(false)
  }, [])

  React.useEffect(() => {
    refreshData()
  }, [refreshData])

  const handleClassSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault()
    setIsLoading(true)
    const fd = new FormData(e.currentTarget)
    const data = {
        name: fd.get("name"),
        level: fd.get("level"),
        room: fd.get("room"),
        teacherId: fd.get("teacherId")
    }

    if (modalMode === "ADD") await createClass(fd)
    else if (modalMode === "EDIT") await updateClass(selectedClass.id, data)

    setModalMode("NONE")
    refreshData()
  }

  const handleAssignSubmit = async () => {
      setIsLoading(true)
      await assignStudentsToClass(selectedClass.id, selectedStudents)
      setModalMode("NONE")
      setSelectedStudents([])
      refreshData()
  }

  const filteredClasses = classes.filter(c =>
    c.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
    c.level.toLowerCase().includes(searchTerm.toLowerCase())
  )

  return (
    <div className="space-y-10 animate-in fade-in duration-500 pb-20">
      <div className="flex flex-col sm:flex-row justify-between items-end gap-6 border-b border-gray-200 pb-8">
        <div>
          <h2 className="text-4xl font-black text-slate-900 tracking-tight uppercase italic">Gestion des Classes</h2>
          <p className="text-slate-500 font-bold mt-1 uppercase text-xs tracking-widest">Pilotage des effectifs et affectations pédagogiques</p>
        </div>
        <button
            onClick={() => setModalMode("ADD")}
            className="bg-slate-900 text-white px-6 py-3 rounded-2xl text-[10px] font-black uppercase tracking-widest hover:bg-slate-800 shadow-xl shadow-slate-900/10 transition-all flex items-center gap-2"
        >
            <Plus className="h-4 w-4" /> CRÉER UNE CLASSE
        </button>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          {[
              { label: "Total Classes", value: classes.length, icon: GraduationCap, color: "blue" },
              { label: "Élèves Affectés", value: allStudents.filter(s => s.classId).length, icon: Users, color: "emerald" },
              { label: "Sans Classe", value: allStudents.filter(s => !s.classId).length, icon: AlertCircle, color: "red" },
          ].map((k, i) => (
              <Card key={i} className="p-6 border-0 shadow-sm rounded-3xl flex items-center gap-5 bg-white group hover:shadow-xl transition-all">
                  <div className={`p-4 rounded-2xl bg-${k.color}-50 text-${k.color}-600 transition-transform group-hover:scale-110`}>
                      <k.icon className="h-6 w-6" />
                  </div>
                  <div>
                      <p className="text-[10px] font-black text-slate-400 uppercase tracking-widest mb-1">{k.label}</p>
                      <p className="text-xl font-black text-slate-900">{k.value}</p>
                  </div>
              </Card>
          ))}
      </div>

      <Card className="p-8 border-0 shadow-sm rounded-[40px] bg-white overflow-hidden">
        <div className="flex flex-col md:flex-row justify-between items-center gap-6 mb-10">
            <h3 className="text-xl font-black text-slate-900 uppercase tracking-tight">Répertoire des Classes</h3>
            <div className="relative w-full md:w-80">
                <Search className="absolute left-4 top-1/2 -translate-y-1/2 h-4 w-4 text-gray-400" />
                <input
                    placeholder="Rechercher classe, niveau..."
                    className="w-full pl-12 pr-4 py-3 bg-slate-50 border-0 rounded-2xl text-xs font-bold outline-none focus:ring-4 focus:ring-primary/5"
                    value={searchTerm}
                    onChange={(e) => setSearchTerm(e.target.value)}
                />
            </div>
        </div>

        <div className="overflow-x-auto">
            <table className="w-full text-left">
                <thead>
                    <tr className="text-[10px] uppercase font-black text-slate-400 border-b border-slate-50 tracking-[0.2em]">
                        <th className="px-6 py-5">Classe</th>
                        <th className="px-6 py-5">Niveau</th>
                        <th className="px-6 py-5">Prof. Titulaire</th>
                        <th className="px-6 py-5">Salle</th>
                        <th className="px-6 py-5">Effectif</th>
                        <th className="px-6 py-5 text-right">Actions</th>
                    </tr>
                </thead>
                <tbody className="divide-y divide-slate-50">
                    {filteredClasses.map((cls) => (
                        <tr key={cls.id} className="hover:bg-slate-50/50 transition-all group">
                            <td className="px-6 py-6 font-black text-slate-900 uppercase tracking-tight text-sm">{cls.name}</td>
                            <td className="px-6 py-6">
                                <span className="text-[9px] font-black px-3 py-1.5 bg-blue-50 text-blue-600 rounded-xl uppercase border border-blue-100 italic">{cls.level}</span>
                            </td>
                            <td className="px-6 py-6 text-xs font-bold text-slate-600">{cls.teacher?.name || "Non assigné"}</td>
                            <td className="px-6 py-6 text-[10px] font-black text-slate-400 uppercase tracking-widest">{cls.room || "N/A"}</td>
                            <td className="px-6 py-6">
                                <div className="flex items-center gap-2">
                                    <div className="h-1.5 w-16 bg-slate-100 rounded-full overflow-hidden">
                                        <div className="h-full bg-primary" style={{ width: `${(cls._count.students / 30) * 100}%` }} />
                                    </div>
                                    <span className="text-[10px] font-black text-slate-900">{cls._count.students}</span>
                                </div>
                            </td>
                            <td className="px-6 py-6 text-right">
                                <div className="flex justify-end gap-2 opacity-0 group-hover:opacity-100 transition-opacity">
                                    <button
                                        onClick={() => { setSelectedClass(cls); setModalMode("ASSIGN"); }}
                                        className="p-2.5 bg-blue-50 text-blue-600 rounded-xl hover:bg-blue-100 transition-all shadow-sm"
                                        title="Affecter élèves"
                                    >
                                        <UserPlus className="h-4 w-4" />
                                    </button>
                                    <button
                                        onClick={() => { setSelectedClass(cls); setModalMode("EDIT"); }}
                                        className="p-2.5 bg-slate-50 text-slate-400 rounded-xl hover:bg-slate-100 transition-all shadow-sm"
                                        title="Modifier"
                                    >
                                        <Edit3 className="h-4 w-4" />
                                    </button>
                                    <button
                                        onClick={async () => { if(confirm('Supprimer ?')) { await deleteClass(cls.id); refreshData(); } }}
                                        className="p-2.5 bg-red-50 text-red-400 rounded-xl hover:bg-red-500 hover:text-white transition-all shadow-sm"
                                        title="Supprimer"
                                    >
                                        <Trash2 className="h-4 w-4" />
                                    </button>
                                </div>
                            </td>
                        </tr>
                    ))}
                </tbody>
            </table>
        </div>
      </Card>

      {/* Add/Edit Modal */}
      {(modalMode === "ADD" || modalMode === "EDIT") && (
          <div className="fixed inset-0 bg-slate-900/60 backdrop-blur-md z-50 flex items-center justify-center p-6">
              <Card className="w-full max-w-xl bg-white p-10 rounded-[40px] shadow-2xl animate-in zoom-in-95 duration-200">
                    <div className="flex justify-between items-center mb-10 border-b border-slate-50 pb-6">
                        <h3 className="text-2xl font-black text-slate-900 uppercase italic">
                            {modalMode === "ADD" ? "Nouvelle Classe" : "Modifier Classe"}
                        </h3>
                        <button onClick={() => setModalMode("NONE")}><X className="h-6 w-6" /></button>
                    </div>
                    <form onSubmit={handleClassSubmit} className="space-y-8">
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                            <div className="space-y-1">
                                <label className="text-[10px] font-black text-slate-400 uppercase tracking-widest ml-1">Intitulé de la classe</label>
                                <input name="name" required defaultValue={selectedClass?.name} className="w-full px-5 py-3 bg-slate-50 border-0 rounded-2xl text-sm font-bold outline-none focus:ring-4 focus:ring-primary/5" placeholder="ex: 2ème Année Bac" />
                            </div>
                            <div className="space-y-1">
                                <label className="text-[10px] font-black text-slate-400 uppercase tracking-widest ml-1">Cycle / Niveau</label>
                                <select name="level" required defaultValue={selectedClass?.level} className="w-full px-5 py-3 bg-slate-50 border-0 rounded-2xl text-sm font-bold outline-none focus:ring-4 focus:ring-primary/5">
                                    <option>Préscolaire</option>
                                    <option>Primaire</option>
                                    <option>Collège</option>
                                    <option>Lycée</option>
                                </select>
                            </div>
                            <div className="space-y-1">
                                <label className="text-[10px] font-black text-slate-400 uppercase tracking-widest ml-1">Local / Salle</label>
                                <input name="room" defaultValue={selectedClass?.room} className="w-full px-5 py-3 bg-slate-50 border-0 rounded-2xl text-sm font-bold outline-none focus:ring-4 focus:ring-primary/5" placeholder="ex: Salle 12" />
                            </div>
                            <div className="space-y-1">
                                <label className="text-[10px] font-black text-slate-400 uppercase tracking-widest ml-1">Professeur Titulaire</label>
                                <select name="teacherId" defaultValue={selectedClass?.teacherId || ""} className="w-full px-5 py-3 bg-slate-50 border-0 rounded-2xl text-sm font-bold outline-none focus:ring-4 focus:ring-primary/5">
                                    <option value="">Non assigné</option>
                                    {teachers.map(t => <option key={t.id} value={t.id}>{t.name}</option>)}
                                </select>
                            </div>
                        </div>
                        <Button type="submit" className="w-full bg-slate-900 text-white font-black py-7 rounded-[28px] shadow-2xl hover:bg-slate-800 uppercase tracking-widest">
                            {modalMode === "ADD" ? "VALIDER LA CRÉATION" : "ENREGISTRER LES MODIFICATIONS"}
                        </Button>
                    </form>
              </Card>
          </div>
      )}

      {/* Assign Students Modal */}
      {modalMode === "ASSIGN" && (
          <div className="fixed inset-0 bg-slate-900/60 backdrop-blur-md z-50 flex items-center justify-center p-6">
            <Card className="w-full max-w-2xl bg-white p-10 rounded-[40px] shadow-2xl animate-in zoom-in-95 duration-200 flex flex-col max-h-[80vh]">
                <div className="flex justify-between items-center mb-8 border-b border-slate-50 pb-6 shrink-0">
                    <div>
                        <h3 className="text-2xl font-black text-slate-900 uppercase italic">Affectation Élèves</h3>
                        <p className="text-[10px] font-black text-slate-400 uppercase tracking-widest mt-1">Cible : <span className="text-primary">{selectedClass.name}</span></p>
                    </div>
                    <button onClick={() => { setModalMode("NONE"); setSelectedStudents([]); }}><X className="h-6 w-6" /></button>
                </div>

                <div className="flex-1 overflow-y-auto space-y-4 pr-2 custom-scrollbar">
                    <p className="text-[10px] font-black text-slate-400 uppercase tracking-widest ml-1 mb-4">Sélectionnez les élèves à intégrer :</p>
                    {allStudents.filter(s => s.classId !== selectedClass.id).map(student => (
                        <label key={student.id} className={cn(
                            "flex items-center justify-between p-4 rounded-2xl border transition-all cursor-pointer group",
                            selectedStudents.includes(student.id) ? "border-primary bg-primary/5" : "border-slate-100 hover:bg-slate-50"
                        )}>
                            <div className="flex items-center gap-4">
                                <div className={cn(
                                    "h-10 w-10 rounded-xl flex items-center justify-center font-black text-xs transition-colors",
                                    selectedStudents.includes(student.id) ? "bg-primary text-white" : "bg-slate-100 text-slate-400"
                                )}>
                                    {student.name.charAt(0)}
                                </div>
                                <div>
                                    <p className="text-sm font-black text-slate-900 uppercase">{student.name}</p>
                                    <p className="text-[10px] font-bold text-slate-400 uppercase">{student.class?.name || "Sans classe"}</p>
                                </div>
                            </div>
                            <input
                                type="checkbox"
                                className="hidden"
                                checked={selectedStudents.includes(student.id)}
                                onChange={(e) => {
                                    if(e.target.checked) setSelectedStudents([...selectedStudents, student.id])
                                    else setSelectedStudents(selectedStudents.filter(id => id !== student.id))
                                }}
                            />
                            <div className={cn(
                                "h-6 w-6 rounded-full border-2 flex items-center justify-center transition-all",
                                selectedStudents.includes(student.id) ? "bg-primary border-primary" : "border-slate-200"
                            )}>
                                {selectedStudents.includes(student.id) && <CheckCircle2 className="h-4 w-4 text-white" />}
                            </div>
                        </label>
                    ))}
                </div>

                <div className="pt-8 mt-4 border-t border-slate-50 shrink-0">
                    <Button
                        onClick={handleAssignSubmit}
                        disabled={selectedStudents.length === 0}
                        className="w-full bg-slate-900 text-white font-black py-7 rounded-[28px] shadow-2xl hover:bg-slate-800 flex items-center justify-center gap-3 uppercase tracking-widest"
                    >
                        {isLoading ? <Loader2 className="h-5 w-5 animate-spin" /> : <>CONFIRMER L'AFFECTATION ({selectedStudents.length}) <ChevronRight className="h-5 w-5" /></>}
                    </Button>
                </div>
            </Card>
          </div>
      )}
    </div>
  )
}

function AlertCircle(props: any) {
    return (
      <svg
        {...props}
        xmlns="http://www.w3.org/2000/svg"
        width="24"
        height="24"
        viewBox="0 0 24 24"
        fill="none"
        stroke="currentColor"
        strokeWidth="2"
        strokeLinecap="round"
        strokeLinejoin="round"
      >
        <circle cx="12" cy="12" r="10" />
        <line x1="12" x2="12" y1="8" y2="12" />
        <line x1="12" x2="12.01" y1="16" y2="16" />
      </svg>
    )
  }
