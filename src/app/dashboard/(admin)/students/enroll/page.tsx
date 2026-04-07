"use client"
import * as React from "react"
import { Card } from "@/components/ui/card"
import { UserPlus, Trash2, Calendar, Phone, CreditCard, Mail, GraduationCap, Plus, Loader2, AlertCircle } from "lucide-react"
import { enrollParentWithStudents } from "@/actions/enrollment"
import { getAllClasses } from "@/actions/data"
import { Button } from "@/components/ui/button"
import { useRouter } from "next/navigation"

export default function EnrollmentPage() {
  const router = useRouter()
  const [classes, setClasses] = React.useState<any[]>([])
  const [studentRows, setStudentRows] = React.useState<{id: string, index: number}[]>([{id: '1', index: 1}])
  const [isLoading, setIsLoading] = React.useState(false)
  const [error, setError] = React.useState<string | null>(null)

  React.useEffect(() => {
    getAllClasses().then(setClasses)
  }, [])

  const addStudent = () => {
      const nextIndex = studentRows.length > 0 ? Math.max(...studentRows.map(r => r.index)) + 1 : 1;
      setStudentRows([...studentRows, { id: Math.random().toString(36).substr(2, 9), index: nextIndex }])
  }

  const removeStudent = (id: string) => {
    if (studentRows.length > 1) {
        setStudentRows(studentRows.filter(r => r.id !== id))
    }
  }

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault()
    setIsLoading(true)
    setError(null)
    const formData = new FormData(e.currentTarget)

    // Add information about which indices to look for
    const indices = studentRows.map(r => r.index).join(',')
    formData.append('studentIndices', indices)

    try {
        const res = await enrollParentWithStudents(formData)
        if (res.success) {
            router.push("/dashboard/students")
        } else {
            setError(res.error || "Une erreur est survenue lors de l'inscription.")
            setIsLoading(false)
        }
    } catch (err) {
        console.error(err)
        setError("Erreur de connexion au serveur.")
        setIsLoading(false)
    }
  }

  return (
    <div className="max-w-4xl mx-auto space-y-10 animate-in fade-in duration-500 pb-20">
      <div className="border-b border-gray-200 pb-8">
        <h2 className="text-4xl font-black text-slate-900 tracking-tight">Inscription Parent & Enfants</h2>
        <p className="text-slate-500 font-bold mt-1 uppercase text-xs tracking-widest">Processus d'enrôlement multi-étapes unifié</p>
      </div>

      {error && (
          <div className="bg-red-50 text-red-600 p-6 rounded-[24px] border border-red-100 flex items-center gap-4 animate-in slide-in-from-top-4 duration-300">
              <AlertCircle className="h-6 w-6" />
              <p className="text-sm font-black uppercase tracking-tight">{error}</p>
          </div>
      )}

      <form onSubmit={handleSubmit} className="space-y-10">
        {/* Parent Info */}
        <Card className="p-10 border-0 shadow-xl shadow-slate-200/50 rounded-[40px] relative overflow-hidden">
            <div className="absolute top-0 right-0 p-10 opacity-5">
                <Phone className="h-32 w-32" />
            </div>
            <div className="relative z-10 space-y-8">
                <div className="flex items-center gap-4 mb-2">
                    <div className="h-10 w-10 bg-blue-50 text-blue-600 rounded-2xl flex items-center justify-center">
                        <CreditCard className="h-5 w-5" />
                    </div>
                    <h3 className="text-xl font-black text-slate-900 tracking-tight">Informations du Parent</h3>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                    <div className="space-y-2">
                        <label className="text-[10px] font-black text-slate-400 uppercase tracking-widest ml-1">Nom Complet du Parent</label>
                        <input name="parentName" required className="w-full px-5 py-4 bg-slate-50 border-0 rounded-2xl text-sm font-bold outline-none focus:ring-4 focus:ring-blue-500/5 focus:bg-white transition-all" placeholder="ex: Karim Mansouri" />
                    </div>
                    <div className="space-y-2">
                        <label className="text-[10px] font-black text-slate-400 uppercase tracking-widest ml-1">Carte d'Identité (CIN)</label>
                        <input name="parentCin" required className="w-full px-5 py-4 bg-slate-50 border-0 rounded-2xl text-sm font-bold outline-none focus:ring-4 focus:ring-blue-500/5 focus:bg-white transition-all" placeholder="ex: BE123456" />
                    </div>
                    <div className="space-y-2">
                        <label className="text-[10px] font-black text-slate-400 uppercase tracking-widest ml-1">Email de Contact</label>
                        <input name="parentEmail" type="email" required className="w-full px-5 py-4 bg-slate-50 border-0 rounded-2xl text-sm font-bold outline-none focus:ring-4 focus:ring-blue-500/5 focus:bg-white transition-all" placeholder="parent@email.com" />
                    </div>
                    <div className="space-y-2">
                        <label className="text-[10px] font-black text-slate-400 uppercase tracking-widest ml-1">Numéro de Téléphone</label>
                        <input name="parentPhone" type="tel" required className="w-full px-5 py-4 bg-slate-50 border-0 rounded-2xl text-sm font-bold outline-none focus:ring-4 focus:ring-blue-500/5 focus:bg-white transition-all" placeholder="+212 6..." />
                    </div>
                    <div className="space-y-2">
                        <label className="text-[10px] font-black text-slate-400 uppercase tracking-widest ml-1">Mot de Passe du Compte Parent</label>
                        <input name="parentPassword" type="password" required className="w-full px-5 py-4 bg-slate-50 border-0 rounded-2xl text-sm font-bold outline-none focus:ring-4 focus:ring-blue-500/5 focus:bg-white transition-all" placeholder="••••••••" />
                    </div>
                </div>
            </div>
        </Card>

        {/* Student Rows */}
        <div className="space-y-8">
            <div className="flex justify-between items-center px-4">
                <h3 className="text-xl font-black text-slate-900 tracking-tight">Liste des Enfants</h3>
                <button type="button" onClick={addStudent} className="flex items-center gap-2 bg-blue-50 text-blue-600 px-5 py-3 rounded-2xl text-[10px] font-black uppercase tracking-widest hover:bg-blue-100 transition-all">
                    <Plus className="h-4 w-4" /> AJOUTER UN ENFANT
                </button>
            </div>

            {studentRows.map((row, visualIndex) => (
                <Card key={row.id} className="p-10 border-0 shadow-lg shadow-slate-100 rounded-[32px] relative group border-l-8 border-blue-500">
                    <div className="flex justify-between items-center mb-8">
                        <div className="flex items-center gap-3">
                            <div className="h-8 w-8 bg-blue-500 text-white rounded-lg flex items-center justify-center font-black text-xs italic">{visualIndex + 1}</div>
                            <span className="text-sm font-black text-slate-900 uppercase tracking-widest">Élève #{visualIndex + 1}</span>
                        </div>
                        {studentRows.length > 1 && (
                            <button type="button" onClick={() => removeStudent(row.id)} className="p-2 text-slate-300 hover:text-red-500 transition-colors">
                                <Trash2 className="h-5 w-5" />
                            </button>
                        )}
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                        <div className="space-y-2">
                            <label className="text-[10px] font-black text-slate-400 uppercase tracking-widest ml-1">Nom Complet de l'Élève</label>
                            <input name={`studentName_${row.index}`} required className="w-full px-5 py-4 bg-slate-50 border-0 rounded-2xl text-sm font-bold outline-none focus:ring-4 focus:ring-blue-500/5 focus:bg-white transition-all" placeholder="Nom de l'enfant" />
                        </div>
                        <div className="space-y-2">
                            <label className="text-[10px] font-black text-slate-400 uppercase tracking-widest ml-1">Date de Naissance</label>
                            <input name={`studentBday_${row.index}`} type="date" required className="w-full px-5 py-4 bg-slate-50 border-0 rounded-2xl text-sm font-bold outline-none focus:ring-4 focus:ring-blue-500/5 focus:bg-white transition-all" />
                        </div>
                        <div className="space-y-2 md:col-span-2">
                            <label className="text-[10px] font-black text-slate-400 uppercase tracking-widest ml-1">Classe d'Affectation (Optionnel)</label>
                            <select name={`studentClass_${row.index}`} className="w-full px-5 py-4 bg-slate-50 border-0 rounded-2xl text-sm font-bold outline-none focus:ring-4 focus:ring-blue-500/5 focus:bg-white transition-all appearance-none cursor-pointer">
                                <option value="">Choisir une classe plus tard</option>
                                {classes.map(c => <option key={c.id} value={c.id}>{c.name}</option>)}
                            </select>
                        </div>
                    </div>
                </Card>
            ))}
        </div>

        <Button type="submit" className="w-full bg-slate-900 text-white font-black py-8 rounded-[32px] shadow-2xl shadow-slate-900/10 hover:bg-slate-800 transition-all active:scale-[0.98]" disabled={isLoading}>
            {isLoading ? <Loader2 className="h-6 w-6 animate-spin mx-auto" /> : (
                <span className="flex items-center justify-center gap-3">
                    FINALISER L'INSCRIPTION <GraduationCap className="h-6 w-6" />
                </span>
            )}
        </Button>
      </form>
    </div>
  )
}
