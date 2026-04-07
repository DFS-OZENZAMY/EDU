"use client"
import * as React from "react"
import { useParams, useRouter } from "next/navigation"
import { Card } from "@/components/ui/card"
import {
    User, GraduationCap, Calendar, Phone, Mail,
    CreditCard, ArrowLeft, Edit3, Save, X,
    CheckCircle2, AlertTriangle, Clock, TrendingUp,
    FileText, Loader2
} from "lucide-react"
import { getStudentFullProfile, updateStudentProfile } from "@/actions/admin"
import { getAllClasses } from "@/actions/data"
import { Button } from "@/components/ui/button"
import { cn } from "@/lib/utils"

export default function StudentProfilePage() {
  const { id } = useParams()
  const router = useRouter()
  const [student, setStudent] = React.useState<any>(null)
  const [classes, setClasses] = React.useState<any[]>([])
  const [isEditing, setIsEditing] = React.useState(false)
  const [isLoading, setIsLoading] = React.useState(true)
  const [isSaving, setIsSaving] = React.useState(false)

  const fetchProfile = React.useCallback(async () => {
    setIsLoading(true)
    const data = await getStudentFullProfile(parseInt(id as string))
    if (!data) {
        router.push("/dashboard/students")
        return
    }
    setStudent(data)
    setIsLoading(false)
  }, [id, router])

  React.useEffect(() => {
    fetchProfile()
    getAllClasses().then(setClasses)
  }, [fetchProfile])

  const handleUpdate = async (e: React.FormEvent<HTMLFormElement>) => {
      e.preventDefault()
      setIsSaving(true)
      const formData = new FormData(e.currentTarget)
      const data = {
          name: formData.get("name"),
          birthday: formData.get("birthday"),
          classId: formData.get("classId"),
          parentId: student.parentId,
          parentName: formData.get("parentName"),
          parentPhone: formData.get("parentPhone"),
          parentCin: formData.get("parentCin"),
      }
      const res = await updateStudentProfile(student.id, data)
      if (res.success) {
          setIsEditing(false)
          fetchProfile()
      }
      setIsSaving(false)
  }

  if (isLoading) return <div className="h-full flex items-center justify-center font-black text-slate-300 uppercase tracking-widest animate-pulse">Chargement du dossier...</div>

  const average = student.grades && student.grades.length > 0
    ? (student.grades.reduce((acc: any, g: any) => acc + g.value, 0) / student.grades.length).toFixed(2)
    : "N/A"

  return (
    <div className="space-y-10 animate-in fade-in duration-500 pb-20">
      <div className="flex items-center justify-between border-b border-gray-100 pb-8">
        <div className="flex items-center gap-6">
            <button onClick={() => router.back()} className="p-3 bg-white border border-gray-100 rounded-2xl hover:bg-gray-50 transition-all shadow-sm">
                <ArrowLeft className="h-5 w-5 text-slate-500" />
            </button>
            <div>
                <h2 className="text-3xl font-black text-slate-900 tracking-tight">{student.name}</h2>
                <div className="flex items-center gap-3 mt-1">
                    <span className="text-xs font-black uppercase tracking-widest text-slate-400">Fiche Élève #{student.id}</span>
                    <span className="h-1 w-1 bg-slate-300 rounded-full" />
                    <span className="text-xs font-bold text-blue-600 px-2 py-0.5 bg-blue-50 rounded-full">{student.class?.name || "Sans Classe"}</span>
                </div>
            </div>
        </div>
        <button
            onClick={() => setIsEditing(!isEditing)}
            className={cn(
                "flex items-center gap-2 px-6 py-3 rounded-2xl text-[10px] font-black uppercase tracking-widest transition-all shadow-lg",
                isEditing ? "bg-slate-100 text-slate-600 shadow-none" : "bg-slate-900 text-white shadow-slate-900/10 hover:bg-slate-800"
            )}
        >
            {isEditing ? <><X className="h-4 w-4" /> ANNULER</> : <><Edit3 className="h-4 w-4" /> MODIFIER LE DOSSIER</>}
        </button>
      </div>

      <form onSubmit={handleUpdate} className="grid grid-cols-1 lg:grid-cols-3 gap-10">
        {/* Left Column: Stats & Recent */}
        <div className="space-y-10">
            <Card className="p-8 border-0 shadow-xl shadow-slate-200/50 rounded-[40px] bg-slate-900 text-white relative overflow-hidden">
                <div className="absolute top-0 right-0 p-8 opacity-10">
                    <TrendingUp className="h-24 w-24 text-primary" />
                </div>
                <p className="text-[10px] font-black text-slate-400 uppercase tracking-widest mb-2">Moyenne Générale</p>
                <div className="flex items-end gap-2 mb-6">
                    <span className="text-5xl font-black tracking-tighter">{average}</span>
                    <span className="text-xl font-bold text-slate-500 mb-1">/20</span>
                </div>
                <div className="p-4 bg-white/5 rounded-2xl border border-white/10 backdrop-blur-md">
                    <div className="flex items-center justify-between text-[10px] font-black uppercase mb-2">
                        <span>Rang Classe</span>
                        <span className="text-blue-400">#4 / 28</span>
                    </div>
                    <div className="h-1.5 w-full bg-white/10 rounded-full overflow-hidden">
                        <div className="h-full w-[85%] bg-blue-500" />
                    </div>
                </div>
            </Card>

            <Card className="p-8 border-0 shadow-sm rounded-[32px] bg-white">
                <h3 className="font-black text-slate-900 text-sm uppercase tracking-widest mb-8 flex items-center gap-2">
                    <Clock className="h-4 w-4 text-primary" /> ACTIVITÉ RÉCENTE
                </h3>
                <div className="space-y-6">
                    {student.attendance?.slice(0, 5).map((att: any, i: number) => (
                        <div key={i} className="flex gap-4 group">
                            <div className={cn(
                                "h-10 w-10 rounded-xl flex items-center justify-center shrink-0",
                                att.status === 'PRESENT' ? 'bg-emerald-50 text-emerald-600' : 'bg-red-50 text-red-600'
                            )}>
                                {att.status === 'PRESENT' ? <CheckCircle2 className="h-5 w-5" /> : <X className="h-5 w-5" />}
                            </div>
                            <div>
                                <p className="text-xs font-black text-slate-900 uppercase">{att.status}</p>
                                <p className="text-[10px] font-bold text-slate-400">{new Date(att.date).toLocaleDateString('fr-FR', { weekday: 'long', day: 'numeric', month: 'short' })}</p>
                            </div>
                        </div>
                    ))}
                    {(!student.attendance || student.attendance.length === 0) && <p className="text-center text-xs font-bold text-slate-300 italic py-10">Aucun historique de présence.</p>}
                </div>
            </Card>
        </div>

        {/* Center/Right Column: Main Info */}
        <div className="lg:col-span-2 space-y-10">
            <Card className="p-10 border-0 shadow-sm rounded-[40px] bg-white">
                <div className="flex items-center gap-4 mb-10 border-b border-slate-50 pb-6">
                    <div className="h-12 w-12 bg-blue-50 text-blue-600 rounded-2xl flex items-center justify-center">
                        <User className="h-6 w-6" />
                    </div>
                    <h3 className="text-xl font-black text-slate-900 tracking-tight">Cycle de Vie Académique</h3>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-10">
                    <div className="space-y-6">
                        <div>
                            <label className="text-[10px] font-black text-slate-400 uppercase tracking-widest ml-1">Nom de l'Élève</label>
                            {isEditing ? (
                                <input name="name" defaultValue={student.name} required className="w-full mt-2 px-5 py-3 bg-slate-50 border-0 rounded-2xl text-sm font-bold outline-none focus:ring-4 focus:ring-blue-500/5 focus:bg-white transition-all" />
                            ) : (
                                <p className="mt-2 text-lg font-black text-slate-900">{student.name}</p>
                            )}
                        </div>
                        <div>
                            <label className="text-[10px] font-black text-slate-400 uppercase tracking-widest ml-1">Date de Naissance</label>
                            {isEditing ? (
                                <input name="birthday" type="date" defaultValue={student.birthday ? new Date(student.birthday).toISOString().split('T')[0] : ''} className="w-full mt-2 px-5 py-3 bg-slate-50 border-0 rounded-2xl text-sm font-bold outline-none focus:ring-4 focus:ring-blue-500/5 focus:bg-white transition-all" />
                            ) : (
                                <p className="mt-2 text-lg font-black text-slate-900">
                                    {student.birthday ? new Date(student.birthday).toLocaleDateString('fr-FR', { day: 'numeric', month: 'long', year: 'numeric' }) : "Non renseignée"}
                                </p>
                            )}
                        </div>
                        <div>
                            <label className="text-[10px] font-black text-slate-400 uppercase tracking-widest ml-1">Classe Actuelle</label>
                            {isEditing ? (
                                <select name="classId" defaultValue={student.classId || ''} className="w-full mt-2 px-5 py-3 bg-slate-50 border-0 rounded-2xl text-sm font-bold outline-none focus:ring-4 focus:ring-blue-500/5 focus:bg-white transition-all appearance-none cursor-pointer">
                                    <option value="">Sans Classe</option>
                                    {classes.map(c => <option key={c.id} value={c.id}>{c.name}</option>)}
                                </select>
                            ) : (
                                <div className="mt-3 flex items-center gap-3">
                                    <div className="h-10 w-10 bg-primary/5 text-primary rounded-xl flex items-center justify-center">
                                        <GraduationCap className="h-5 w-5" />
                                    </div>
                                    <div>
                                        <p className="text-sm font-black text-slate-900 uppercase">{student.class?.name || "NON AFFECTÉ"}</p>
                                        <p className="text-[10px] font-bold text-slate-400">Titulaire: {student.class?.teacher?.name || "N/A"}</p>
                                    </div>
                                </div>
                            )}
                        </div>
                    </div>

                    <div className="space-y-6">
                        <div className="p-6 bg-slate-50 rounded-[32px] border border-slate-100 relative">
                            <h4 className="text-[10px] font-black text-slate-400 uppercase tracking-[0.2em] mb-4">Dossier Parent</h4>
                            <div className="space-y-4">
                                <div>
                                    <label className="text-[8px] font-black text-slate-400 uppercase">Nom du Parent</label>
                                    {isEditing ? (
                                        <input name="parentName" defaultValue={student.parent?.name} className="w-full mt-1 px-4 py-2 bg-white border border-slate-200 rounded-xl text-xs font-bold" />
                                    ) : (
                                        <p className="text-sm font-black text-slate-900">{student.parent?.name || "N/A"}</p>
                                    )}
                                </div>
                                <div>
                                    <label className="text-[8px] font-black text-slate-400 uppercase">Contact / Phone</label>
                                    {isEditing ? (
                                        <input name="parentPhone" defaultValue={student.parent?.phone} className="w-full mt-1 px-4 py-2 bg-white border border-slate-200 rounded-xl text-xs font-bold" />
                                    ) : (
                                        <p className="text-xs font-bold text-slate-500">{student.parent?.phone || "Non renseigné"}</p>
                                    )}
                                </div>
                                <div>
                                    <label className="text-[8px] font-black text-slate-400 uppercase">Identifiant National (CIN)</label>
                                    {isEditing ? (
                                        <input name="parentCin" defaultValue={student.parent?.cin} className="w-full mt-1 px-4 py-2 bg-white border border-slate-200 rounded-xl text-xs font-bold" />
                                    ) : (
                                        <p className="text-xs font-bold text-slate-500">{student.parent?.cin || "N/A"}</p>
                                    )}
                                </div>
                            </div>
                        </div>
                    </div>
                </div>

                {isEditing && (
                    <div className="mt-12 flex justify-end">
                        <Button type="submit" className="bg-primary text-white font-black px-10 py-6 rounded-2xl shadow-xl shadow-primary/20 flex items-center gap-2" disabled={isSaving}>
                            {isSaving ? <Loader2 className="h-5 w-5 animate-spin" /> : <><Save className="h-5 w-5" /> ENREGISTRER LES MODIFICATIONS</>}
                        </Button>
                    </div>
                )}
            </Card>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-10">
                <Card className="p-8 border-0 shadow-sm rounded-[32px] bg-white">
                    <div className="flex justify-between items-center mb-8">
                        <h3 className="font-black text-slate-900 text-sm uppercase tracking-widest flex items-center gap-2">
                            <FileText className="h-4 w-4 text-primary" /> HISTORIQUE NOTES
                        </h3>
                        <button type="button" className="text-[10px] font-black text-blue-600 hover:underline">TOUT VOIR</button>
                    </div>
                    <div className="space-y-4">
                        {student.grades?.slice(0, 4).map((g: any, i: number) => (
                            <div key={i} className="flex justify-between items-center p-3 bg-slate-50 rounded-2xl group hover:bg-blue-50 transition-colors">
                                <div>
                                    <p className="text-xs font-black text-slate-900 uppercase tracking-tight">{g.subject}</p>
                                    <p className="text-[9px] font-bold text-slate-400">{new Date(g.date).toLocaleDateString()}</p>
                                </div>
                                <span className="text-sm font-black text-slate-900">{g.value}/20</span>
                            </div>
                        ))}
                        {(!student.grades || student.grades.length === 0) && <p className="text-center text-xs font-bold text-slate-300 italic py-6">Pas de notes enregistrées.</p>}
                    </div>
                </Card>

                <Card className="p-8 border-0 shadow-sm rounded-[32px] bg-white">
                    <h3 className="font-black text-slate-900 text-sm uppercase tracking-widest mb-8 flex items-center gap-2">
                        <CreditCard className="h-4 w-4 text-primary" /> SITUATION FINANCIÈRE
                    </h3>
                    <div className="space-y-6">
                        <div className="flex justify-between items-end border-b border-slate-50 pb-4">
                            <div>
                                <p className="text-[10px] font-black text-slate-400 uppercase">Dernier Paiement</p>
                                <p className="text-xs font-bold text-slate-900">Mars 2026</p>
                            </div>
                            <span className="text-xs font-black text-emerald-600 px-3 py-1 bg-emerald-50 rounded-full uppercase tracking-tighter">Réglé</span>
                        </div>
                        <div className="flex justify-between items-end border-b border-slate-50 pb-4">
                            <div>
                                <p className="text-[10px] font-black text-slate-400 uppercase">Restant à percevoir</p>
                                <p className="text-xs font-bold text-slate-900">0.00 DH</p>
                            </div>
                            <button type="button" className="text-[10px] font-black text-blue-600 hover:underline uppercase">Vérifier</button>
                        </div>
                    </div>
                </Card>
            </div>
        </div>
      </form>
    </div>
  )
}
