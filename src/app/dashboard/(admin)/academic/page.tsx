"use client"
import * as React from "react"
import { Card } from "@/components/ui/card"
import { BarChart3, Book, Settings2, FileText, Download, ChevronRight, Calculator, PieChart, Info } from "lucide-react"
import { DataGrid } from "@/components/admin/data-grid"
import { cn } from "@/lib/utils"
import { Button } from "@/components/ui/button"

const subjects = [
  { id: 1, name: "Mathématiques", coef: 5, category: "Scientifique", sessions: 6 },
  { id: 2, name: "Français", coef: 4, category: "Littéraire", sessions: 5 },
  { id: 3, name: "Physique-Chimie", coef: 4, category: "Scientifique", sessions: 4 },
  { id: 4, name: "Arabe", coef: 4, category: "Littéraire", sessions: 5 },
  { id: 5, name: "Anglais", coef: 2, category: "Langues", sessions: 3 },
  { id: 6, name: "EPS", coef: 2, category: "Sport", sessions: 2 },
]

export default function AcademicManagementPage() {
  const [activeTab, setActiveTab] = React.useState<"SUBJECTS" | "BULLETINS" | "CONFIG">("SUBJECTS")
  const [selectedSubject, setSelectedSubject] = React.useState<any>(null)

  const columns = [
    { header: "Matière", accessor: "name", render: (val: any) => <span className="font-black text-slate-900">{val}</span> },
    { header: "Coefficient", accessor: "coef", render: (val: any) => <span className="font-bold text-blue-600">{val}</span> },
    { header: "Catégorie", accessor: "category" },
    { header: "H/Semaine", accessor: "sessions", render: (val: any) => `${val} heures` },
  ]

  return (
    <div className="h-[calc(100vh-100px)] flex flex-col gap-4 animate-in fade-in duration-500 overflow-hidden">
      {/* Pronote Header */}
      <div className="flex items-center justify-between bg-white border border-slate-200 rounded-lg px-6 py-3 shadow-sm shrink-0">
        <div className="flex items-center gap-4">
           <div className="h-10 w-10 bg-blue-600 rounded-xl flex items-center justify-center text-white text-xl">
              <Book className="h-6 w-6" />
           </div>
           <div>
              <h2 className="text-sm font-black uppercase tracking-widest text-slate-900 leading-none mb-1">Configuration Académique</h2>
              <p className="text-[10px] font-bold text-slate-400 uppercase tracking-tighter italic">Coefficients, Matières & Bulletins</p>
           </div>
        </div>
        <div className="flex bg-slate-100 p-1 rounded-lg border border-slate-200">
           {["SUBJECTS", "BULLETINS", "CONFIG"].map((t) => (
              <button
                key={t}
                onClick={() => setActiveTab(t as any)}
                className={cn(
                    "px-4 py-1.5 text-[9px] font-black uppercase tracking-widest rounded transition-all",
                    activeTab === t ? "bg-white shadow-sm text-blue-600" : "text-slate-400 hover:text-slate-600"
                )}
              >
                {t === "SUBJECTS" ? "Matières" : t === "BULLETINS" ? "Générateur Bulletins" : "Paramètres"}
              </button>
           ))}
        </div>
      </div>

      <div className="flex-1 flex gap-4 overflow-hidden">
         <div className={cn("flex-1 h-full transition-all duration-300", selectedSubject ? "md:w-2/3" : "w-full")}>
            {activeTab === "SUBJECTS" && (
                <DataGrid
                    title="Catalogue des Matières"
                    data={subjects}
                    columns={columns}
                    onRowClick={setSelectedSubject}
                    actions={
                        <Button className="bg-slate-900 text-white text-[9px] font-black py-1 h-7 rounded px-3 uppercase">Ajouter une matière</Button>
                    }
                />
            )}

            {activeTab === "BULLETINS" && (
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6 p-6 bg-white border border-slate-200 rounded-lg overflow-y-auto">
                    <Card className="p-8 border-dashed border-2 flex flex-col items-center justify-center text-center gap-6">
                        <div className="h-16 w-16 bg-blue-50 text-blue-600 rounded-full flex items-center justify-center"><Calculator className="h-8 w-8" /></div>
                        <div>
                            <h3 className="font-black text-slate-900 uppercase">Calcul des Moyennes</h3>
                            <p className="text-xs text-slate-500 max-w-xs mx-auto">Lancez le calcul automatique des moyennes pondérées pour le trimestre en cours.</p>
                        </div>
                        <Button className="bg-blue-600 text-white font-black uppercase text-[10px] py-6 px-10 rounded-xl">Exécuter le calcul</Button>
                    </Card>

                    <Card className="p-8 border-dashed border-2 flex flex-col items-center justify-center text-center gap-6">
                        <div className="h-16 w-16 bg-emerald-50 text-emerald-600 rounded-full flex items-center justify-center"><FileText className="h-8 w-8" /></div>
                        <div>
                            <h3 className="font-black text-slate-900 uppercase">Impression en Masse</h3>
                            <p className="text-xs text-slate-500 max-w-xs mx-auto">Générez les fichiers PDF de tous les bulletins de l'école (format Pronote).</p>
                        </div>
                        <Button className="bg-emerald-600 text-white font-black uppercase text-[10px] py-6 px-10 rounded-xl">Générer les PDF</Button>
                    </Card>
                </div>
            )}
         </div>

         {selectedSubject && activeTab === "SUBJECTS" && (
            <Card className="w-96 h-full border border-slate-200 shadow-xl overflow-y-auto rounded-lg bg-white flex flex-col animate-in slide-in-from-right-4">
               <div className="p-6 border-b border-slate-100 flex justify-between items-start sticky top-0 bg-white z-10">
                  <div>
                     <h3 className="text-xl font-black text-slate-900 leading-tight uppercase italic">{selectedSubject.name}</h3>
                     <p className="text-[10px] font-black text-blue-600 uppercase mt-1 tracking-widest">{selectedSubject.category}</p>
                  </div>
                  <button onClick={() => setSelectedSubject(null)} className="text-slate-300 hover:text-slate-900 transition-colors font-bold text-xl">×</button>
               </div>

               <div className="p-6 space-y-8 flex-1">
                  <div className="bg-slate-900 rounded-2xl p-6 text-white relative overflow-hidden">
                     <PieChart className="absolute -bottom-4 -right-4 h-20 w-20 opacity-10" />
                     <p className="text-[10px] font-black text-slate-400 uppercase tracking-widest mb-1">Poids de la matière</p>
                     <p className="text-4xl font-black italic">Coef. {selectedSubject.coef}</p>
                  </div>

                  <div>
                     <h4 className="text-[10px] font-black text-slate-400 uppercase tracking-widest mb-4 flex items-center gap-2">
                        <Info className="h-3 w-3" /> Distribution Horaire
                     </h4>
                     <div className="space-y-3">
                        <div className="flex justify-between items-center p-3 bg-slate-50 rounded-xl">
                            <span className="text-[10px] font-bold text-slate-500 uppercase">Cours Magistraux</span>
                            <span className="text-xs font-black">4h / semaine</span>
                        </div>
                        <div className="flex justify-between items-center p-3 bg-slate-50 rounded-xl">
                            <span className="text-[10px] font-bold text-slate-500 uppercase">Travaux Dirigés</span>
                            <span className="text-xs font-black">2h / semaine</span>
                        </div>
                     </div>
                  </div>

                  <div className="pt-6 mt-auto space-y-3">
                     <Button className="w-full bg-slate-900 text-white text-[10px] font-black uppercase rounded-xl py-6 tracking-widest">
                        Éditer les paramètres
                     </Button>
                     <Button variant="outline" className="w-full text-red-600 border-red-100 hover:bg-red-50 text-[10px] font-black uppercase rounded-xl py-6 tracking-widest">
                        Supprimer la matière
                     </Button>
                  </div>
               </div>
            </Card>
         )}
      </div>
    </div>
  )
}
