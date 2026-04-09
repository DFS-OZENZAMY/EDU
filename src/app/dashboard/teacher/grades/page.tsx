"use client"
import * as React from "react"
import { Card } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Search, Save, Trash, Plus, CheckCircle2, AlertCircle, ChevronDown, ListFilter, Download, Layout, Grid3X3, ArrowRight } from "lucide-react"
import { getMyData } from "@/actions/data"
import { enterGrade } from "@/actions/teacher"
import { cn } from "@/lib/utils"

export default function TeacherGradesPage() {
  const [classes, setClasses] = React.useState<any[]>([])
  const [selectedClass, setSelectedClass] = React.useState<any>(null)
  const [students, setStudents] = React.useState<any[]>([])
  const [currentSubject, setCurrentSubject] = React.useState("Mathématiques")
  const [activeExam, setActiveExam] = React.useState("Contrôle 2")
  const [isSaving, setIsSaving] = React.useState<number | null>(null)

  const subjects = ["Mathématiques", "Français", "Arabe", "Physique", "Anglais"]
  const exams = ["Contrôle 1", "Contrôle 2", "Contrôle 3", "EFM"]

  React.useEffect(() => {
    getMyData().then((res: any) => {
        if (res?.classes) {
            setClasses(res.classes)
            if (res.classes.length > 0) {
                setSelectedClass(res.classes[0])
                setStudents(res.classes[0].students)
            }
        }
    })
  }, [])

  const handleSaveGrade = async (studentId: number) => {
    setIsSaving(studentId)
    const note = (document.getElementById(`note-${studentId}`) as HTMLInputElement).value
    const obs = (document.getElementById(`obs-${studentId}`) as HTMLInputElement).value

    const fd = new FormData()
    fd.append("studentId", studentId.toString())
    fd.append("subject", currentSubject)
    fd.append("value", note)
    fd.append("observation", obs)

    try {
        await enterGrade(fd)
        setTimeout(() => setIsSaving(null), 800)
    } catch (err) {
        setIsSaving(null)
    }
  }

  return (
    <div className="h-[calc(100vh-100px)] flex flex-col gap-4 animate-in fade-in duration-500 overflow-hidden">
      {/* Dense Desktop Toolbar */}
      <div className="flex items-center justify-between bg-white border border-slate-200 rounded-lg px-6 py-3 shadow-sm shrink-0">
        <div className="flex items-center gap-6">
           <div className="flex items-center gap-3">
              <div className="h-10 w-10 bg-emerald-600 rounded-xl flex items-center justify-center text-white shadow-lg shadow-emerald-500/20">
                 <Layout className="h-5 w-5" />
              </div>
              <div>
                 <h2 className="text-sm font-black uppercase tracking-widest text-slate-900 leading-none mb-1">Carnet de Notes</h2>
                 <p className="text-[10px] font-bold text-slate-400 uppercase tracking-tighter italic">Saisie des résultats • Mode Desktop</p>
              </div>
           </div>

           <div className="h-8 w-px bg-slate-100 mx-2" />

           <div className="flex items-center gap-3 bg-slate-50 p-1 rounded-lg border border-slate-200">
              {exams.map(e => (
                 <button
                   key={e}
                   onClick={() => setActiveExam(e)}
                   className={cn(
                     "px-3 py-1.5 text-[9px] font-black uppercase rounded transition-all",
                     activeExam === e ? "bg-white shadow-sm text-emerald-600 ring-1 ring-emerald-100" : "text-slate-400 hover:text-slate-600"
                   )}
                 >
                    {e}
                 </button>
              ))}
           </div>
        </div>

        <div className="flex items-center gap-3">
            <Button variant="outline" className="h-8 text-[9px] font-black uppercase rounded-lg px-4 border-slate-200">
               <Download className="h-3.5 w-3.5" /> Exporter
            </Button>
            <Button className="h-8 bg-emerald-600 hover:bg-emerald-700 text-white text-[9px] font-black uppercase rounded-lg px-4 shadow-lg shadow-emerald-500/10">
               Enregistrer tout
            </Button>
        </div>
      </div>

      <div className="flex-1 flex gap-4 overflow-hidden">
         {/* Left Side: Class/Subject Selection */}
         <div className="w-64 h-full bg-white border border-slate-200 rounded-lg flex flex-col shrink-0">
            <div className="p-4 border-b border-slate-100 flex items-center justify-between">
                <span className="text-[10px] font-black uppercase text-slate-400 tracking-widest">Mes Classes</span>
                <ListFilter className="h-3.5 w-3.5 text-slate-300" />
            </div>
            <div className="flex-1 overflow-y-auto p-2 space-y-1">
                {classes.map(c => (
                    <button
                        key={c.id}
                        onClick={() => { setSelectedClass(c); setStudents(c.students); }}
                        className={cn(
                            "w-full text-left px-4 py-3 rounded-xl transition-all group flex items-center justify-between",
                            selectedClass?.id === c.id ? "bg-emerald-50 text-emerald-700 ring-1 ring-emerald-100" : "text-slate-500 hover:bg-slate-50"
                        )}
                    >
                        <div>
                            <p className="text-[10px] font-black uppercase">{c.name}</p>
                            <p className="text-[9px] font-bold opacity-60 uppercase">{c.level}</p>
                        </div>
                        {selectedClass?.id === c.id && <ArrowRight className="h-3 w-3" />}
                    </button>
                ))}
            </div>
            <div className="p-4 border-t border-slate-100 bg-slate-50/50">
               <label className="text-[9px] font-black uppercase text-slate-400 block mb-2">Discipline</label>
               <select
                 value={currentSubject}
                 onChange={(e) => setCurrentSubject(e.target.value)}
                 className="w-full bg-white border border-slate-200 rounded-lg px-3 py-2 text-[11px] font-black text-emerald-700 outline-none shadow-sm"
               >
                  {subjects.map(s => <option key={s}>{s}</option>)}
               </select>
            </div>
         </div>

         {/* Main Grading Grid */}
         <div className="flex-1 bg-white border border-slate-200 rounded-lg overflow-hidden flex flex-col shadow-sm">
            <div className="p-4 border-b border-slate-100 bg-slate-50/30 flex items-center justify-between">
               <div className="flex items-center gap-4">
                  <h3 className="text-xs font-black uppercase tracking-tight text-slate-500">
                     Liste Nominative : <span className="text-slate-900">{selectedClass?.name || "-"}</span>
                  </h3>
                  <div className="h-4 w-px bg-slate-200" />
                  <div className="flex items-center gap-1 bg-white border border-slate-200 rounded px-2 py-1">
                    <Search className="h-3 w-3 text-slate-300" />
                    <input placeholder="Filtrer..." className="bg-transparent border-0 text-[10px] outline-none w-32 font-bold" />
                  </div>
               </div>
               <div className="flex items-center gap-2">
                  <span className="text-[9px] font-bold text-slate-400 uppercase">Moyenne Classe : <span className="text-emerald-600">14.25</span></span>
               </div>
            </div>

            <div className="flex-1 overflow-auto">
               <table className="w-full text-left border-collapse">
                  <thead className="sticky top-0 z-10 bg-slate-50 shadow-sm border-b border-slate-200">
                     <tr>
                        <th className="px-6 py-2 text-[10px] font-black uppercase tracking-wider text-slate-400 w-12 border-r border-slate-200">#</th>
                        <th className="px-6 py-2 text-[10px] font-black uppercase tracking-wider text-slate-400 border-r border-slate-200">Nom & Prénom</th>
                        <th className="px-6 py-2 text-[10px] font-black uppercase tracking-wider text-slate-400 w-32 text-center border-r border-slate-200">Note / 20</th>
                        <th className="px-6 py-2 text-[10px] font-black uppercase tracking-wider text-slate-400">Appréciation / Observation</th>
                        <th className="px-6 py-2 text-[10px] font-black uppercase tracking-wider text-slate-400 w-16 text-center italic">État</th>
                     </tr>
                  </thead>
                  <tbody className="divide-y divide-slate-100">
                     {students.map((student, idx) => (
                        <tr key={student.id} className="hover:bg-slate-50 transition-colors group">
                           <td className="px-6 py-1.5 text-[10px] font-black text-slate-400 border-r border-slate-50">{idx + 1}</td>
                           <td className="px-6 py-1.5 border-r border-slate-50">
                              <div className="flex items-center gap-3">
                                 <div className="h-6 w-6 rounded bg-slate-900 text-white flex items-center justify-center text-[9px] font-black italic">
                                    {student.name.charAt(0)}
                                 </div>
                                 <span className="text-[11px] font-black text-slate-700 uppercase">{student.name}</span>
                              </div>
                           </td>
                           <td className="px-6 py-1.5 border-r border-slate-50">
                              <input
                                 type="number"
                                 id={`note-${student.id}`}
                                 className="w-full bg-slate-50 border border-slate-200 rounded text-center text-xs font-black text-emerald-600 py-1.5 focus:bg-white focus:ring-2 focus:ring-emerald-500/10 outline-none"
                                 placeholder="--"
                              />
                           </td>
                           <td className="px-6 py-1.5 border-r border-slate-50">
                              <input
                                 type="text"
                                 id={`obs-${student.id}`}
                                 className="w-full bg-transparent border-0 text-[10px] font-medium text-slate-500 italic py-1.5 focus:bg-slate-50 focus:text-slate-900 rounded px-2 outline-none"
                                 placeholder="Commentaire facultatif..."
                              />
                           </td>
                           <td className="px-6 py-1.5 text-center">
                              <button
                                onClick={() => handleSaveGrade(student.id)}
                                className={cn(
                                    "p-1.5 rounded transition-all",
                                    isSaving === student.id ? "text-emerald-500 scale-125" : "text-slate-200 hover:text-emerald-500"
                                )}
                              >
                                 <CheckCircle2 className="h-4 w-4" />
                              </button>
                           </td>
                        </tr>
                     ))}
                  </tbody>
               </table>
            </div>

            <div className="px-6 py-2 bg-slate-50 border-t border-slate-200 flex items-center justify-between text-[9px] font-bold text-slate-400 uppercase tracking-widest">
               <p>{students.length} Élèves dans cette classe</p>
               <div className="flex items-center gap-4">
                  <div className="flex items-center gap-1.5">
                     <div className="h-1.5 w-1.5 rounded-full bg-emerald-500" />
                     <span>Saisie Autorisée</span>
                  </div>
               </div>
            </div>
         </div>
      </div>
    </div>
  )
}
