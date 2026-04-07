"use client"
import * as React from "react"
import { GraduationCap, Users, Calendar, MapPin, Award, Search, FileText } from "lucide-react"
import { getMyData } from "@/actions/data"
import { Card } from "@/components/ui/card"
import { cn } from "@/lib/utils"

export default function ParentChildProfilePage() {
  const [students, setStudents] = React.useState<any[]>([])
  const [isLoading, setIsLoading] = React.useState(true)

  React.useEffect(() => {
    getMyData().then((res: any) => {
        if (res?.students) setStudents(res.students)
        setIsLoading(false)
    })
  }, [])

  if (isLoading) return <div className="h-full flex items-center justify-center font-black text-slate-300 animate-pulse uppercase tracking-widest">Chargement...</div>

  if (students.length === 0) return (
    <div className="flex flex-col items-center justify-center h-96 border-0 shadow-sm rounded-[40px] bg-white text-center p-10">
        <Users className="h-16 w-16 text-slate-200 mb-6" />
        <h3 className="text-xl font-black text-slate-900 mb-2 uppercase">Aucun enfant trouvé</h3>
        <p className="text-slate-400 font-bold max-w-xs text-sm">Veuillez contacter l'administration pour lier les dossiers de vos enfants.</p>
    </div>
  )

  return (
    <div className="max-w-5xl mx-auto space-y-12 animate-in fade-in duration-700 pb-20">
      {students.map((student) => (
          <div key={student.id} className="space-y-10 border-b border-slate-100 pb-12 last:border-0">
            <div className="bg-slate-900 rounded-[40px] p-12 text-white flex flex-col md:flex-row items-center gap-10 shadow-2xl relative overflow-hidden">
                <div className="relative z-10 w-40 h-40 rounded-[48px] border-4 border-white/10 bg-white/5 flex items-center justify-center text-6xl font-black shadow-2xl backdrop-blur-md">
                    {student.name.charAt(0)}
                </div>
                <div className="relative z-10 text-center md:text-left space-y-4">
                    <h2 className="text-5xl font-black tracking-tighter leading-none">{student.name}</h2>
                    <div className="flex flex-wrap items-center justify-center md:justify-start gap-4">
                    <span className="inline-flex items-center gap-2 px-4 py-2 bg-white/10 rounded-2xl text-[10px] font-black uppercase tracking-widest backdrop-blur-md border border-white/10">
                        <GraduationCap className="h-4 w-4 text-primary" />
                        CLASSE : {student.class?.name || "NON DÉFINIE"}
                    </span>
                    <span className="inline-flex items-center gap-2 px-4 py-2 bg-white/10 rounded-2xl text-[10px] font-black uppercase tracking-widest backdrop-blur-md border border-white/10">
                        <Award className="h-4 w-4 text-amber-400" />
                        MATRICULE : #{2024000 + student.id}
                    </span>
                    </div>
                </div>
                <GraduationCap className="absolute -bottom-10 -right-10 h-64 w-64 text-white/5 -rotate-12 pointer-events-none" />
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-10">
                <Card className="p-10 border-0 shadow-sm rounded-[40px] bg-white space-y-10">
                    <h3 className="text-xl font-black text-slate-900 uppercase tracking-tight flex items-center gap-3">
                        <FileText className="h-6 w-6 text-primary" /> Dossier Académique
                    </h3>
                    <div className="space-y-8">
                        <div className="flex items-center gap-5 group">
                            <div className="h-12 w-12 rounded-2xl bg-blue-50 flex items-center justify-center text-blue-600 transition-transform group-hover:scale-110"><Users className="h-6 w-6" /></div>
                            <div>
                                <p className="text-[10px] font-black text-slate-400 uppercase tracking-widest mb-1">Enseignant Titulaire</p>
                                <p className="text-sm font-black text-slate-900 uppercase">{student.class?.teacher?.name || "NON ATTRIBUÉ"}</p>
                            </div>
                        </div>
                        <div className="flex items-center gap-5 group">
                            <div className="h-12 w-12 rounded-2xl bg-purple-50 flex items-center justify-center text-purple-600 transition-transform group-hover:scale-110"><MapPin className="h-6 w-6" /></div>
                            <div>
                                <p className="text-[10px] font-black text-slate-400 uppercase tracking-widest mb-1">Localisation / Salle</p>
                                <p className="text-sm font-black text-slate-900 uppercase">{student.class?.room || "LABO 1"}</p>
                            </div>
                        </div>
                        <div className="flex items-center gap-5 group">
                            <div className="h-12 w-12 rounded-2xl bg-emerald-50 flex items-center justify-center text-emerald-600 transition-transform group-hover:scale-110"><Calendar className="h-6 w-6" /></div>
                            <div>
                                <p className="text-[10px] font-black text-slate-400 uppercase tracking-widest mb-1">Cycle d'Études</p>
                                <p className="text-sm font-black text-slate-900 uppercase">{student.class?.level || "PRIMAIRE"}</p>
                            </div>
                        </div>
                    </div>
                </Card>

                <div className="space-y-10">
                    <Card className="p-10 bg-slate-900 border-0 shadow-2xl rounded-[40px] text-white relative group overflow-hidden cursor-pointer transition-all hover:scale-[1.02]">
                        <h3 className="text-xl font-black uppercase tracking-tight mb-8 flex items-center gap-3">
                            <Award className="h-6 w-6 text-primary" /> Badge de Mérite
                        </h3>
                        <div className="flex items-center gap-8 relative z-10">
                            <div className="h-24 w-24 rounded-[32px] bg-primary/20 border-2 border-primary/40 flex items-center justify-center ring-8 ring-primary/5 shadow-2xl">
                                <Award className="h-12 w-12 text-primary" />
                            </div>
                            <div>
                                <p className="text-3xl font-black tracking-tighter mb-1">Excellent !</p>
                                <p className="text-[10px] text-slate-400 font-black uppercase tracking-[0.2em]">Session 2026 • TRIM 2</p>
                            </div>
                        </div>
                        <p className="text-xs text-slate-500 font-bold leading-relaxed mt-10 relative z-10">Félicitations pour votre ponctualité exemplaire et votre engagement dans toutes les activités scolaires.</p>
                        <div className="absolute top-0 right-0 h-40 w-40 bg-primary/10 rounded-bl-full transition-all duration-500 group-hover:scale-150" />
                    </Card>

                    <button className="w-full py-5 bg-white border border-slate-100 rounded-[32px] shadow-sm text-[10px] font-black uppercase tracking-[0.2em] text-slate-400 hover:text-primary transition-all">
                        TÉLÉCHARGER LE CERTIFICAT DE SCOLARITÉ
                    </button>
                </div>
            </div>
          </div>
      ))}
    </div>
  )
}
