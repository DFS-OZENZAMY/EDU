"use client"
import * as React from "react"
import { Card } from "@/components/ui/card"
import { Users, Plus, Download, Search, Trash2, Edit3, UserPlus, Info, Layout, List, PanelsTopLeft, GraduationCap } from "lucide-react"
import { getAllClasses, getAdminUsers, getAllStudents } from "@/actions/data"
import { createClass, deleteClass, updateClass, assignStudentsToClass } from "@/actions/admin"
import { DataGrid } from "@/components/admin/data-grid"
import { cn } from "@/lib/utils"
import { Button } from "@/components/ui/button"

export default function ClassesPage() {
  const [classes, setClasses] = React.useState<any[]>([])
  const [selectedClass, setSelectedClass] = React.useState<any>(null)
  const [teachers, setTeachers] = React.useState<any[]>([])
  const [viewMode, setViewMode] = React.useState<"DESKTOP" | "WEB">("DESKTOP")

  const refreshData = React.useCallback(async () => {
    const [c, u] = await Promise.all([getAllClasses(), getAdminUsers()])
    setClasses(c)
    setTeachers(u.filter((user: any) => user.role === 'TEACHER'))
  }, [])

  React.useEffect(() => { refreshData() }, [refreshData])

  const columns = [
    { header: "Intitulé", accessor: "name", render: (val: any) => <span className="font-black text-slate-900">{val}</span> },
    { header: "Cycle", accessor: "level" },
    { header: "Titulaire", accessor: "teacher", render: (val: any) => val?.name || "NON ASSIGNÉ" },
    { header: "Salle", accessor: "room" },
    { header: "Effectif", accessor: "_count", render: (val: any) => (
        <div className="flex items-center gap-2">
            <div className="h-1.5 w-12 bg-slate-100 rounded-full overflow-hidden">
                <div className="h-full bg-blue-600" style={{ width: `${(val.students / 35) * 100}%` }} />
            </div>
            <span>{val.students}</span>
        </div>
    )},
  ]

  return (
    <div className="h-[calc(100vh-100px)] flex flex-col gap-4 animate-in fade-in duration-500 overflow-hidden">
      {/* Pronote Header */}
      <div className="flex items-center justify-between bg-white border border-slate-200 rounded-lg px-6 py-3 shadow-sm shrink-0">
        <div className="flex items-center gap-4">
           <div className="h-10 w-10 bg-indigo-600 rounded-xl flex items-center justify-center text-white">
              <Users className="h-6 w-6" />
           </div>
           <div>
              <h2 className="text-sm font-black uppercase tracking-widest text-slate-900 leading-none mb-1">Structure Pédagogique</h2>
              <p className="text-[10px] font-bold text-slate-400 uppercase tracking-tighter italic">Classes, Niveaux & Emplacements</p>
           </div>
        </div>
        <div className="flex items-center gap-3">
            <button className="bg-slate-900 text-white px-4 py-1.5 rounded text-[10px] font-black uppercase tracking-widest hover:bg-slate-800 transition-all flex items-center gap-2 shadow-sm">
                <Plus className="h-3.5 w-3.5" /> Nouvelle Classe
            </button>
        </div>
      </div>

      <div className="flex-1 flex gap-4 overflow-hidden">
         <div className={cn("flex-1 h-full transition-all duration-300", selectedClass ? "md:w-2/3" : "w-full")}>
            <DataGrid
                title="Registre des Classes"
                data={classes}
                columns={columns}
                onRowClick={setSelectedClass}
            />
         </div>

         {selectedClass && (
            <Card className="w-96 h-full border border-slate-200 shadow-xl overflow-y-auto rounded-lg bg-white flex flex-col animate-in slide-in-from-right-4">
               <div className="p-6 border-b border-slate-100 flex justify-between items-start sticky top-0 bg-white z-10">
                  <div>
                     <h3 className="text-xl font-black text-slate-900 leading-tight uppercase italic">{selectedClass.name}</h3>
                     <p className="text-[10px] font-black text-indigo-600 uppercase mt-1 tracking-widest">{selectedClass.level}</p>
                  </div>
                  <button onClick={() => setSelectedClass(null)} className="text-slate-300 hover:text-slate-900 transition-colors font-bold text-xl">×</button>
               </div>

               <div className="p-6 space-y-8 flex-1">
                  <div className="grid grid-cols-2 gap-4">
                     <div className="bg-slate-50 p-4 rounded-2xl border border-slate-100">
                        <p className="text-[9px] font-black text-slate-400 uppercase mb-1">Salle</p>
                        <p className="text-sm font-black text-slate-900">{selectedClass.room || "Non définie"}</p>
                     </div>
                     <div className="bg-slate-50 p-4 rounded-2xl border border-slate-100">
                        <p className="text-[9px] font-black text-slate-400 uppercase mb-1">Élèves</p>
                        <p className="text-sm font-black text-slate-900">{selectedClass._count.students} / 35</p>
                     </div>
                  </div>

                  <div>
                     <h4 className="text-[10px] font-black text-slate-400 uppercase tracking-widest mb-4 flex items-center gap-2">
                        <PanelsTopLeft className="h-3 w-3" /> Titulaire & Équipe
                     </h4>
                     <div className="flex items-center gap-4 p-4 bg-indigo-50/50 rounded-2xl border border-indigo-100">
                        <div className="h-10 w-10 rounded-xl bg-white border border-indigo-200 flex items-center justify-center font-black text-indigo-600 text-xs italic">
                           {selectedClass.teacher?.name.charAt(0) || "?"}
                        </div>
                        <div>
                           <p className="text-[10px] font-black text-indigo-600 uppercase tracking-widest mb-0.5">Professeur Titulaire</p>
                           <p className="text-xs font-bold text-slate-900">{selectedClass.teacher?.name || "Aucun titulaire assigné"}</p>
                        </div>
                     </div>
                  </div>

                  <div className="pt-6 mt-auto space-y-3">
                     <Button className="w-full bg-slate-900 text-white text-[10px] font-black uppercase rounded-xl py-6 tracking-widest">
                        Affecter des Élèves
                     </Button>
                     <div className="grid grid-cols-2 gap-3">
                        <Button variant="outline" className="text-[10px] font-black uppercase rounded-xl py-6 tracking-widest">Modifier</Button>
                        <Button className="text-[10px] font-black uppercase rounded-xl py-6 tracking-widest bg-red-600 hover:bg-red-700">Supprimer</Button>
                     </div>
                  </div>
               </div>
            </Card>
         )}
      </div>
    </div>
  )
}
