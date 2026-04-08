"use client"
import * as React from "react"
import { Card } from "@/components/ui/card"
import { GraduationCap, Users, Plus, Download, Search, Trash2, UserPlus, Info, Layout, List, PanelsTopLeft } from "lucide-react"
import { getAllStudents } from "@/actions/data"
import { deleteStudent } from "@/actions/admin"
import Link from "next/link"
import { DataGrid } from "@/components/admin/data-grid"
import { cn } from "@/lib/utils"
import { Button } from "@/components/ui/button"

export default function StudentsPage() {
  const [students, setStudents] = React.useState<any[]>([])
  const [selectedStudent, setSelectedStudent] = React.useState<any>(null)
  const [viewMode, setViewMode] = React.useState<"DESKTOP" | "WEB">("DESKTOP")

  const fetchStudents = () => getAllStudents().then(setStudents)

  React.useEffect(() => {
    fetchStudents()
  }, [])

  const columns = [
    { header: "Nom Complet", accessor: "name", render: (val: any) => <span className="font-black text-slate-900">{val}</span> },
    { header: "Classe", accessor: "class", render: (val: any) => val?.name || "N/A" },
    { header: "Parent", accessor: "parent", render: (val: any) => val?.name || "-" },
    { header: "Contact", accessor: "parent", render: (val: any) => val?.phone || "-" },
    { header: "Sexe", accessor: "gender", render: () => "M" },
    { header: "Date Naiss.", accessor: "birthday", render: (val: any) => val ? new Date(val).toLocaleDateString() : "-" },
  ]

  return (
    <div className="h-[calc(100vh-100px)] flex flex-col gap-4 animate-in fade-in duration-500 overflow-hidden">
      {/* Pronote Header */}
      <div className="flex items-center justify-between bg-white border border-slate-200 rounded-lg px-6 py-3 shadow-sm shrink-0">
        <div className="flex items-center gap-4">
           <div className="h-10 w-10 bg-slate-900 rounded-xl flex items-center justify-center text-white">
              <GraduationCap className="h-6 w-6" />
           </div>
           <div>
              <h2 className="text-sm font-black uppercase tracking-widest text-slate-900 leading-none mb-1">Ressources & Dossiers Élèves</h2>
              <p className="text-[10px] font-bold text-slate-400 uppercase tracking-tighter italic">Base de données académique • Instance SaaS active</p>
           </div>
        </div>
        <div className="flex items-center gap-2 bg-slate-50 p-1 rounded-lg border border-slate-200">
           <button
             onClick={() => setViewMode("DESKTOP")}
             className={cn("p-1.5 rounded transition-all", viewMode === "DESKTOP" ? "bg-white shadow-sm text-blue-600" : "text-slate-400")}
           >
              <Layout className="h-4 w-4" />
           </button>
           <button
             onClick={() => setViewMode("WEB")}
             className={cn("p-1.5 rounded transition-all", viewMode === "WEB" ? "bg-white shadow-sm text-blue-600" : "text-slate-400")}
           >
              <List className="h-4 w-4" />
           </button>
        </div>
      </div>

      <div className="flex-1 flex gap-4 overflow-hidden">
         {/* Main Grid Area */}
         <div className={cn("flex-1 h-full transition-all duration-300", selectedStudent ? "md:w-2/3" : "w-full")}>
            <DataGrid
                title="Registre des Élèves"
                data={students}
                columns={columns}
                onRowClick={setSelectedStudent}
                actions={
                  <Link href="/dashboard/students/enroll" className="bg-blue-600 text-white px-3 py-1 rounded text-[10px] font-black uppercase tracking-widest hover:bg-blue-700 transition-all flex items-center gap-1.5 shadow-sm">
                      <UserPlus className="h-3 w-3" /> Inscription
                  </Link>
                }
            />
         </div>

         {/* Pronote Side Panel (Detail View) */}
         {selectedStudent && (
            <Card className="w-96 h-full border border-slate-200 shadow-xl overflow-y-auto rounded-lg bg-white flex flex-col animate-in slide-in-from-right-4">
               <div className="p-6 border-b border-slate-100 flex justify-between items-start sticky top-0 bg-white z-10">
                  <div className="flex items-center gap-4">
                     <div className="h-16 w-16 bg-slate-900 rounded-2xl flex items-center justify-center text-white text-xl font-black italic shadow-lg">
                        {selectedStudent.name.charAt(0)}
                     </div>
                     <div>
                        <h3 className="font-black text-slate-900 leading-tight">{selectedStudent.name}</h3>
                        <p className="text-[10px] font-black text-blue-600 uppercase mt-1 italic tracking-widest">{selectedStudent.class?.name || "SANS CLASSE"}</p>
                     </div>
                  </div>
                  <button onClick={() => setSelectedStudent(null)} className="text-slate-300 hover:text-slate-900 transition-colors">×</button>
               </div>

               <div className="p-6 space-y-8">
                  <div>
                     <h4 className="text-[10px] font-black text-slate-400 uppercase tracking-widest mb-4 flex items-center gap-2">
                        <Info className="h-3 w-3" /> Fiche Signalétique
                     </h4>
                     <div className="space-y-4">
                        <div className="flex justify-between border-b border-slate-50 pb-2">
                           <span className="text-[10px] font-bold text-slate-400 uppercase">Identifiant</span>
                           <span className="text-[10px] font-black">#EL-{selectedStudent.id}</span>
                        </div>
                        <div className="flex justify-between border-b border-slate-50 pb-2">
                           <span className="text-[10px] font-bold text-slate-400 uppercase">Email Parent</span>
                           <span className="text-[10px] font-black">{selectedStudent.parent?.email || "-"}</span>
                        </div>
                        <div className="flex justify-between border-b border-slate-50 pb-2">
                           <span className="text-[10px] font-bold text-slate-400 uppercase">Contact Urgence</span>
                           <span className="text-[10px] font-black text-red-500 font-bold">{selectedStudent.parent?.phone || "-"}</span>
                        </div>
                     </div>
                  </div>

                  <div>
                     <h4 className="text-[10px] font-black text-slate-400 uppercase tracking-widest mb-4 flex items-center gap-2">
                        <PanelsTopLeft className="h-3 w-3" /> Suivi Académique
                     </h4>
                     <div className="bg-slate-50 rounded-2xl p-4 border border-slate-100">
                        <p className="text-[10px] font-bold text-slate-500 leading-relaxed italic">
                           Dossier académique en cours. 12 évaluations enregistrées au 1er trimestre.
                        </p>
                     </div>
                  </div>

                  <div className="pt-6 grid grid-cols-2 gap-3">
                     <Button variant="outline" className="text-[10px] font-black uppercase rounded-xl py-6 tracking-widest">Modifier</Button>
                     <Button className="text-[10px] font-black uppercase rounded-xl py-6 tracking-widest bg-red-600 hover:bg-red-700">Supprimer</Button>
                  </div>
               </div>
            </Card>
         )}
      </div>
    </div>
  )
}
