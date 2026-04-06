"use client"
import * as React from "react"
import { Card } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Search, Save, Trash, Plus, CheckCircle2, AlertCircle } from "lucide-react"
import { getMyData } from "@/actions/data"
import { enterGrade } from "@/actions/teacher"

export default function TeacherGradesPage() {
  const [classes, setClasses] = React.useState<any[]>([])
  const [currentClassId, setCurrentClassId] = React.useState<number | null>(null)
  const [students, setStudents] = React.useState<any[]>([])
  const [currentExam, setCurrentExam] = React.useState("Contrôle N°2")
  const [currentSubject, setCurrentSubject] = React.useState("Mathématiques")
  const [isSaving, setIsSaving] = React.useState<number | null>(null)

  const subjects = [
    "Mathématiques", "Français", "Arabe", "Sciences",
    "Histoire-Géo", "Anglais", "Éducation Physique", "Arts Plastiques"
  ]

  React.useEffect(() => {
    getMyData().then((res: any) => {
        if (res?.classes) {
            setClasses(res.classes)
            if (res.classes.length > 0) {
                setCurrentClassId(res.classes[0].id)
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
        // No alert, just UI feedback (maybe a temporary checkmark)
        setTimeout(() => setIsSaving(null), 1000)
    } catch (err) {
        setIsSaving(null)
        alert("Erreur lors de l'enregistrement")
    }
  }

  const handleSaveAll = async () => {
    for (const student of students) {
        await handleSaveGrade(student.id)
    }
    alert("Toutes les notes ont été enregistrées avec succès !")
  }

  return (
    <div className="space-y-6">
      <div className="flex flex-col xl:flex-row justify-between items-start xl:items-center gap-4">
        <div>
          <h2 className="text-2xl font-black text-gray-900 tracking-tight">Saisie des Notes</h2>
          <p className="text-gray-500 text-sm font-medium">Gérez les évaluations et les résultats des élèves par matière.</p>
        </div>
        <div className="flex flex-wrap gap-3 w-full xl:w-auto">
           <select
             value={currentClassId || ""}
             onChange={(e) => {
                const id = parseInt(e.target.value)
                setCurrentClassId(id)
                setStudents(classes.find(c => c.id === id)?.students || [])
             }}
             className="flex-1 xl:flex-none px-4 py-3 bg-white border border-gray-100 rounded-xl text-sm font-bold focus:ring-4 focus:ring-green-600/10 outline-none"
           >
              {classes.map(c => (
                <option key={c.id} value={c.id}>{c.name}</option>
              ))}
           </select>
           <select
             value={currentSubject}
             onChange={(e) => setCurrentSubject(e.target.value)}
             className="flex-1 xl:flex-none px-4 py-3 bg-white border border-gray-100 rounded-xl text-sm font-bold focus:ring-4 focus:ring-green-600/10 outline-none text-green-700"
           >
              {subjects.map(s => <option key={s} value={s}>{s}</option>)}
           </select>
           <select
             value={currentExam}
             onChange={(e) => setCurrentExam(e.target.value)}
             className="flex-1 xl:flex-none px-4 py-3 bg-white border border-gray-100 rounded-xl text-sm font-bold focus:ring-4 focus:ring-green-600/10 outline-none"
           >
              <option>Contrôle N°1</option>
              <option>Contrôle N°2</option>
              <option>Contrôle N°3</option>
              <option>Examen Semestriel</option>
           </select>
           <Button variant="secondary" onClick={handleSaveAll} className="w-full xl:w-auto flex items-center gap-2">
              <Save className="h-4 w-4" /> Enregistrer tout
           </Button>
        </div>
      </div>

      <Card className="overflow-hidden border-gray-100 shadow-sm">
         <div className="p-4 md:p-6 border-b border-gray-100 flex flex-col md:flex-row justify-between items-center gap-4 bg-gray-50/30">
            <div className="relative flex-1 w-full md:max-w-md">
               <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-gray-400" />
               <input
                 type="text"
                 placeholder="Rechercher un élève..."
                 className="w-full pl-10 pr-4 py-3 bg-white border border-gray-100 rounded-xl text-sm focus:ring-4 focus:ring-green-600/10 outline-none"
               />
            </div>
            <div className="flex gap-2 w-full md:w-auto">
                <Button variant="outline" size="sm" className="flex-1 md:flex-none gap-2">
                    <Plus className="h-4 w-4" /> Import Excel
                </Button>
            </div>
         </div>
         <div className="overflow-x-auto">
            <table className="w-full text-left">
               <thead className="bg-gray-50/50">
                  <tr className="text-[10px] uppercase font-black text-gray-400 border-b border-gray-100 tracking-widest">
                     <th className="px-6 py-4">Élève</th>
                     <th className="px-6 py-4 w-32 md:w-40">Note / 20</th>
                     <th className="px-6 py-4 hidden md:table-cell">Observation</th>
                     <th className="px-6 py-4 text-right">Actions</th>
                  </tr>
               </thead>
               <tbody className="divide-y divide-gray-100">
                  {students.map((student) => (
                     <tr key={student.id} className="hover:bg-green-50/30 transition-all group">
                        <td className="px-6 py-4">
                            <div className="flex items-center gap-3">
                                <div className="h-8 w-8 rounded-full bg-green-100 text-green-700 flex items-center justify-center text-xs font-black shrink-0">
                                    {student.name.charAt(0)}
                                </div>
                                <span className="font-bold text-gray-900 text-sm">{student.name}</span>
                            </div>
                        </td>
                        <td className="px-6 py-4">
                           <div className="relative">
                               <input
                                 type="number"
                                 step="0.25"
                                 min="0"
                                 max="20"
                                 defaultValue={student.grades?.find((g: any) => g.subject === currentSubject)?.value || ""}
                                 id={`note-${student.id}`}
                                 className="w-full px-4 py-2 bg-white border border-gray-200 rounded-xl text-center font-black text-green-700 focus:ring-4 focus:ring-green-600/10 outline-none transition-all"
                               />
                           </div>
                        </td>
                        <td className="px-6 py-4 hidden md:table-cell">
                           <input
                             type="text"
                             placeholder="Ex: Excellent travail..."
                             defaultValue={student.grades?.find((g: any) => g.subject === currentSubject)?.observation || ""}
                             id={`obs-${student.id}`}
                             className="w-full px-4 py-2 bg-transparent border-0 rounded-xl focus:bg-white focus:ring-4 focus:ring-green-600/10 outline-none transition-all text-sm font-medium italic text-gray-500 focus:text-gray-900"
                           />
                        </td>
                        <td className="px-6 py-4 text-right">
                           <div className="flex justify-end items-center gap-2">
                              <button
                                onClick={() => handleSaveGrade(student.id)}
                                disabled={isSaving === student.id}
                                className={`p-2 rounded-xl transition-all ${
                                    isSaving === student.id
                                    ? "bg-green-100 text-green-700"
                                    : "text-gray-400 hover:text-green-600 hover:bg-green-50"
                                }`}
                              >
                                 {isSaving === student.id ? (
                                    <CheckCircle2 className="h-5 w-5 animate-in zoom-in duration-300" />
                                 ) : (
                                    <Save className="h-5 w-5" />
                                 )}
                              </button>
                              <button className="p-2 text-gray-400 hover:text-red-500 hover:bg-red-50 rounded-xl transition-all">
                                 <Trash className="h-5 w-5" />
                              </button>
                           </div>
                        </td>
                     </tr>
                  ))}
                  {students.length === 0 && (
                    <tr>
                        <td colSpan={4} className="px-6 py-12 text-center text-gray-400 italic text-sm">Sélectionnez une classe pour afficher les élèves.</td>
                    </tr>
                  )}
               </tbody>
            </table>
         </div>
         <div className="px-6 py-4 border-t border-gray-100 bg-gray-50/30 flex justify-between items-center">
            <p className="text-[10px] font-black text-gray-400 uppercase tracking-widest">Calcul de la moyenne auto-activé</p>
            <div className="flex items-center gap-2">
                <AlertCircle className="h-3 w-3 text-orange-400" />
                <p className="text-[10px] font-bold text-orange-400 uppercase">Période d'évaluation ouverte</p>
            </div>
         </div>
      </Card>
    </div>
  )
}
