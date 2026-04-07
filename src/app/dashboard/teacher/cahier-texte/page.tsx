"use client"
import * as React from "react"
import { Card } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { BookOpen, Plus, Calendar, Save, Trash2, Clock, MapPin } from "lucide-react"
import { getMyData } from "@/actions/data"
import { createLessonLog, deleteLessonLog } from "@/actions/teacher"

export default function CahierTextePage() {
  const [classes, setClasses] = React.useState<any[]>([])
  const [logs, setLogs] = React.useState<any[]>([])
  const [showAddModal, setShowAddModal] = React.useState(false)
  const [isLoading, setIsLoading] = React.useState(false)

  React.useEffect(() => {
    fetchData()
  }, [])

  const fetchData = async () => {
    const data: any = await getMyData()
    if (data && data.classes && Array.isArray(data.classes)) {
        const teacherClasses = data.classes
        setClasses(teacherClasses)
        // Flatten logs from all classes for display
        const allLogs = teacherClasses.flatMap((c: any) => c.lessonLogs || []).sort((a: any, b: any) => new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime())
        setLogs(allLogs)
    }
  }

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault()
    setIsLoading(true)
    const formData = new FormData(e.currentTarget)
    const res = await createLessonLog(formData)
    if (res.success) {
        setShowAddModal(false)
        fetchData()
    }
    setIsLoading(false)
  }

  return (
    <div className="space-y-6">
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
        <div>
          <h2 className="text-2xl font-bold text-gray-900">Cahier de Texte</h2>
          <p className="text-gray-500">Documentez le contenu de vos séances et les devoirs assignés.</p>
        </div>
        <Button className="bg-green-600 hover:bg-green-700 flex items-center gap-2" onClick={() => setShowAddModal(true)}>
          <Plus className="h-4 w-4" />
          Nouvelle Séance
        </Button>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
         <div className="lg:col-span-2 space-y-6">
            {logs.map((log) => (
               <Card key={log.id} className="p-6 border-l-4 border-l-green-500 hover:shadow-md transition-shadow">
                  <div className="flex justify-between items-start mb-4">
                     <div>
                        <span className="text-[10px] font-black uppercase text-green-600 bg-green-50 px-2 py-1 rounded-md mb-2 inline-block tracking-widest">
                           {log.subject}
                        </span>
                        <h3 className="text-lg font-bold text-gray-900 leading-tight">{log.class?.name || 'Classe'}</h3>
                     </div>
                     <p className="text-xs font-bold text-gray-400 flex items-center gap-1">
                        <Calendar className="h-3 w-3" />
                        {new Date(log.date).toLocaleDateString('fr-FR')}
                     </p>
                  </div>
                  <div className="space-y-4">
                     <div>
                        <p className="text-[10px] font-bold text-gray-400 uppercase mb-1">Contenu de la séance</p>
                        <p className="text-sm text-gray-700 leading-relaxed bg-slate-50 p-3 rounded-xl border border-slate-100">
                           {log.content}
                        </p>
                     </div>
                     {log.homework && (
                        <div className="bg-orange-50 border border-orange-100 p-3 rounded-xl">
                           <p className="text-[10px] font-bold text-orange-600 uppercase mb-1 flex items-center gap-1">
                              <BookOpen className="h-3 w-3" /> Devoirs à faire
                           </p>
                           <p className="text-sm text-orange-900 italic font-medium">{log.homework}</p>
                        </div>
                     )}
                  </div>
                  <div className="mt-6 pt-4 border-t border-gray-50 flex justify-end gap-3">
                     <button className="text-xs font-bold text-gray-400 hover:text-gray-600">Modifier</button>
                     <button
                       onClick={async () => {
                         if(confirm('Supprimer cette séance ?')) {
                            await deleteLessonLog(log.id)
                            fetchData()
                         }
                       }}
                       className="text-xs font-bold text-red-400 hover:text-red-600"
                     >
                        Supprimer
                     </button>
                  </div>
               </Card>
            ))}

            {logs.length === 0 && (
                <div className="text-center py-20 bg-white rounded-3xl border-2 border-dashed border-gray-100">
                    <BookOpen className="h-12 w-12 text-gray-200 mx-auto mb-4" />
                    <p className="text-gray-400 font-medium italic">Aucune séance enregistrée pour le moment.</p>
                </div>
            )}
         </div>

         <div className="space-y-6">
            <Card className="p-6">
               <h4 className="font-bold text-gray-900 mb-4">Mes Classes</h4>
               <div className="space-y-3">
                  {classes.map((c) => (
                     <div key={c.id} className="flex items-center justify-between p-3 rounded-xl bg-gray-50 border border-gray-100 group hover:border-green-200 transition-colors">
                        <div>
                           <p className="text-sm font-bold text-gray-900">{c.name}</p>
                           <p className="text-[10px] text-gray-500 uppercase font-bold tracking-widest">{c.level}</p>
                        </div>
                        <div className="h-8 w-8 rounded-lg bg-white flex items-center justify-center text-green-600 shadow-sm opacity-0 group-hover:opacity-100 transition-opacity">
                           <Plus className="h-4 w-4" />
                        </div>
                     </div>
                  ))}
               </div>
            </Card>

            <Card className="p-6 bg-slate-900 text-white relative overflow-hidden group">
               <div className="relative z-10">
                  <h4 className="font-bold text-lg mb-2">Statistiques Mensuelles</h4>
                  <div className="space-y-4 mt-6">
                     <div>
                        <div className="flex justify-between text-[10px] font-bold uppercase mb-1 text-slate-400">
                           <span>Séances Documentées</span>
                           <span>{logs.length} / 24</span>
                        </div>
                        <div className="h-1.5 w-full bg-slate-800 rounded-full overflow-hidden">
                           <div className="h-full bg-green-500" style={{ width: `${(logs.length / 24) * 100}%` }} />
                        </div>
                     </div>
                  </div>
               </div>
               <Clock className="absolute -bottom-4 -right-4 h-24 w-24 text-white/5 rotate-12 transition-transform group-hover:scale-110" />
            </Card>
         </div>
      </div>

      {showAddModal && (
         <div className="fixed inset-0 bg-black/50 backdrop-blur-sm z-50 flex items-center justify-center p-4">
            <form onSubmit={handleSubmit}>
              <Card className="w-full max-w-xl p-8 space-y-6 animate-in zoom-in duration-150">
                 <div className="flex justify-between items-center border-b pb-4">
                    <h3 className="text-2xl font-black text-gray-900 uppercase tracking-tighter">Nouvelle Séance</h3>
                    <button type="button" onClick={() => setShowAddModal(false)} className="text-gray-400 hover:text-gray-600 font-bold">×</button>
                 </div>

                 <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <div className="md:col-span-2">
                       <label className="block text-[10px] font-black uppercase text-gray-400 tracking-widest mb-2">Sélectionner la classe</label>
                       <select name="classId" required className="w-full px-4 py-3 bg-gray-50 border border-gray-200 rounded-xl focus:ring-4 focus:ring-green-600/10 font-bold text-gray-900">
                          <option value="">Choisir une classe...</option>
                          {classes.map(c => <option key={c.id} value={c.id}>{c.name}</option>)}
                       </select>
                    </div>

                    <div>
                       <label className="block text-[10px] font-black uppercase text-gray-400 tracking-widest mb-2">Matière</label>
                       <input name="subject" required type="text" placeholder="ex: Français" className="w-full px-4 py-3 bg-gray-50 border border-gray-200 rounded-xl focus:ring-4 focus:ring-green-600/10 font-bold" />
                    </div>

                    <div>
                       <label className="block text-[10px] font-black uppercase text-gray-400 tracking-widest mb-2">Date</label>
                       <input name="date" type="date" defaultValue={new Date().toISOString().split('T')[0]} className="w-full px-4 py-3 bg-gray-50 border border-gray-200 rounded-xl focus:ring-4 focus:ring-green-600/10 font-bold" />
                    </div>

                    <div className="md:col-span-2">
                       <label className="block text-[10px] font-black uppercase text-gray-400 tracking-widest mb-2">Contenu détaillé du cours</label>
                       <textarea name="content" required rows={4} placeholder="Décrivez les chapitres abordés..." className="w-full px-4 py-3 bg-gray-50 border border-gray-200 rounded-xl focus:ring-4 focus:ring-green-600/10 font-medium text-sm"></textarea>
                    </div>

                    <div className="md:col-span-2">
                       <label className="block text-[10px] font-black uppercase text-gray-400 tracking-widest mb-2 italic">Devoirs (Optionnel)</label>
                       <textarea name="homework" rows={2} placeholder="Saisir les devoirs à faire pour la prochaine séance..." className="w-full px-4 py-3 bg-orange-50/30 border border-orange-100 rounded-xl focus:ring-4 focus:ring-orange-600/10 font-medium text-sm italic"></textarea>
                    </div>
                 </div>

                 <div className="flex justify-end gap-4 pt-4">
                    <Button type="button" variant="outline" onClick={() => setShowAddModal(false)} className="rounded-xl font-bold border-2">Annuler</Button>
                    <Button type="submit" disabled={isLoading} className="bg-green-600 hover:bg-green-700 rounded-xl px-8 font-black uppercase tracking-widest shadow-xl shadow-green-600/20 active:scale-95 transition-all">
                       {isLoading ? "Enregistrement..." : "Enregistrer la séance"}
                    </Button>
                 </div>
              </Card>
            </form>
         </div>
      )}
    </div>
  )
}
