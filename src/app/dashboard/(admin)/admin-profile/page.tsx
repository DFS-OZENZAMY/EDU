"use client"
import * as React from "react"
import { getSessionUser } from "@/actions/auth"
import { updateUserProfile } from "@/actions/profile"
import { Card } from "@/components/ui/card"
import { User, Mail, Shield, Calendar, Phone, Camera, Save, Loader2, CheckCircle2 } from "lucide-react"
import { Button } from "@/components/ui/button"
import { cn } from "@/lib/utils"

export default function ProfilePage() {
  const [user, setUser] = React.useState<any>(null)
  const [isSaving, setIsSaving] = React.useState(false)
  const [msg, setMsg] = React.useState<string | null>(null)

  React.useEffect(() => {
    getSessionUser().then(setUser)
  }, [])

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
      e.preventDefault()
      setIsSaving(true)
      const fd = new FormData(e.currentTarget)
      const res = await updateUserProfile(fd)
      if (res.success) {
          setMsg("Profil mis à jour avec succès")
          getSessionUser().then(setUser)
          setTimeout(() => setMsg(null), 3000)
      }
      setIsSaving(false)
  }

  if (!user) return <div className="h-full flex items-center justify-center font-black text-slate-300 animate-pulse">CHARGEMENT...</div>

  return (
    <div className="max-w-5xl mx-auto space-y-10 animate-in fade-in duration-500 pb-20">
      <div className="flex flex-col sm:flex-row justify-between items-end gap-6 border-b border-gray-100 pb-8">
        <div>
          <h2 className="text-4xl font-black text-slate-900 tracking-tight">Mon Profil</h2>
          <p className="text-slate-500 font-bold mt-1 uppercase text-xs tracking-widest">Gérez vos informations et préférences de sécurité</p>
        </div>
        {msg && (
            <div className="bg-emerald-50 text-emerald-600 px-4 py-2 rounded-xl text-[10px] font-black uppercase flex items-center gap-2 border border-emerald-100">
                <CheckCircle2 className="h-4 w-4" /> {msg}
            </div>
        )}
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-10">
        <Card className="p-10 border-0 shadow-xl shadow-slate-100 rounded-[40px] flex flex-col items-center text-center bg-white">
          <div className="relative group">
              <div className="h-32 w-32 rounded-[40px] bg-slate-900 text-white flex items-center justify-center text-4xl font-black shadow-2xl transition-transform group-hover:scale-105">
                {user.name.charAt(0)}
              </div>
              <button className="absolute -bottom-2 -right-2 p-3 bg-primary text-white rounded-2xl shadow-lg hover:scale-110 transition-all">
                  <Camera className="h-4 w-4" />
              </button>
          </div>
          <h3 className="font-black text-2xl text-slate-900 mt-8 tracking-tight">{user.name}</h3>
          <p className="text-[10px] text-primary font-black uppercase tracking-[0.2em] mt-2 bg-primary/5 px-4 py-1.5 rounded-full">{user.role}</p>

          <div className="mt-10 w-full pt-10 border-t border-slate-50 flex flex-col gap-3">
            <button className="text-[10px] font-black text-slate-400 hover:text-slate-600 uppercase tracking-widest transition-colors">Supprimer mon compte</button>
          </div>
        </Card>

        <Card className="lg:col-span-2 p-10 border-0 shadow-sm rounded-[40px] bg-white">
          <form onSubmit={handleSubmit} className="space-y-10">
            <div className="flex items-center gap-4 border-b border-slate-50 pb-6 mb-2">
                <div className="h-10 w-10 bg-slate-50 rounded-xl flex items-center justify-center text-slate-400">
                    <User className="h-5 w-5" />
                </div>
                <h4 className="font-black text-slate-900 uppercase tracking-tight text-sm">Informations Générales</h4>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-8">
              <div className="space-y-2">
                <label className="text-[10px] font-black text-slate-400 uppercase tracking-widest ml-1">Nom Complet</label>
                <div className="relative group">
                    <User className="absolute left-4 top-1/2 -translate-y-1/2 h-4 w-4 text-slate-300 group-focus-within:text-primary transition-colors" />
                    <input
                        name="name"
                        defaultValue={user.name}
                        className="w-full pl-12 pr-4 py-4 bg-slate-50 border-0 rounded-[20px] text-sm font-bold outline-none focus:ring-4 focus:ring-primary/5 focus:bg-white transition-all"
                    />
                </div>
              </div>
              <div className="space-y-2">
                <label className="text-[10px] font-black text-slate-400 uppercase tracking-widest ml-1">Adresse Email</label>
                <div className="relative group opacity-60">
                    <Mail className="absolute left-4 top-1/2 -translate-y-1/2 h-4 w-4 text-slate-300" />
                    <input
                        disabled
                        defaultValue={user.email}
                        className="w-full pl-12 pr-4 py-4 bg-slate-100 border-0 rounded-[20px] text-sm font-bold cursor-not-allowed"
                    />
                </div>
              </div>
              <div className="space-y-2">
                <label className="text-[10px] font-black text-slate-400 uppercase tracking-widest ml-1">Numéro de Téléphone</label>
                <div className="relative group">
                    <Phone className="absolute left-4 top-1/2 -translate-y-1/2 h-4 w-4 text-slate-300 group-focus-within:text-primary transition-colors" />
                    <input
                        name="phone"
                        defaultValue={user.phone}
                        className="w-full pl-12 pr-4 py-4 bg-slate-50 border-0 rounded-[20px] text-sm font-bold outline-none focus:ring-4 focus:ring-primary/5 focus:bg-white transition-all"
                    />
                </div>
              </div>
              <div className="space-y-2">
                <label className="text-[10px] font-black text-slate-400 uppercase tracking-widest ml-1">Date d'inscription</label>
                <div className="relative group opacity-60">
                    <Calendar className="absolute left-4 top-1/2 -translate-y-1/2 h-4 w-4 text-slate-300" />
                    <input
                        disabled
                        defaultValue={new Date(user.createdAt).toLocaleDateString('fr-FR', {day:'numeric', month:'long', year:'numeric'})}
                        className="w-full pl-12 pr-4 py-4 bg-slate-100 border-0 rounded-[20px] text-sm font-bold cursor-not-allowed"
                    />
                </div>
              </div>
            </div>

            <div className="pt-6 flex justify-end">
              <Button type="submit" className="bg-slate-900 text-white font-black px-10 py-7 rounded-2xl shadow-2xl shadow-slate-900/10 flex items-center gap-3 transition-all hover:bg-slate-800 active:scale-95" disabled={isSaving}>
                 {isSaving ? <Loader2 className="h-5 w-5 animate-spin" /> : <><Save className="h-5 w-5" /> ENREGISTRER LES MODIFICATIONS</>}
              </Button>
            </div>
          </form>
        </Card>
      </div>
    </div>
  )
}
