"use client"
import * as React from "react"
import Link from "next/link"
import { useRouter } from "next/navigation"
import { Button } from "@/components/ui/button"
import { GraduationCap, Mail, Lock, User, Phone, Building2, ShieldCheck, Loader2 } from "lucide-react"
import { register } from "@/actions/auth"

export default function RegisterPage() {
  const router = useRouter()
  const [error, setError] = React.useState<string | null>(null)
  const [isLoading, setIsLoading] = React.useState(false)

  const handleRegister = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault()
    setIsLoading(true)
    setError(null)
    const formData = new FormData(e.currentTarget)
    try {
      const result = await register(formData)
      if (result?.error) {
        setError(result.error)
      } else if (result?.success && result.redirectTo) {
        router.push(result.redirectTo)
      }
    } catch (err: any) {
      console.error("CLIENT REGISTRATION ERROR:", err)
      setError(err.message || "Une erreur est survenue lors de l'inscription")
    } finally {
      setIsLoading(false)
    }
  }

  return (
    <div className="min-h-screen bg-gray-50 flex items-center justify-center p-6 py-20">
      <div className="w-full max-w-2xl bg-white rounded-[40px] shadow-2xl overflow-hidden flex flex-col md:flex-row">
        <div className="bg-slate-900 md:w-1/3 p-10 text-white flex flex-col justify-between relative overflow-hidden">
            <div className="absolute top-0 right-0 p-10 opacity-10">
                <ShieldCheck className="h-40 w-40" />
            </div>
            <div className="relative z-10">
                <Link href="/" className="flex items-center gap-2 mb-10 group">
                    <div className="h-8 w-8 bg-blue-500 rounded-lg flex items-center justify-center font-black italic">E</div>
                    <span className="text-xl font-black tracking-tighter uppercase italic group-hover:text-blue-400 transition-colors">SaaS EDU</span>
                </Link>
                <h2 className="text-3xl font-black tracking-tight leading-tight mb-6">Prêt à digitaliser votre école ?</h2>
                <p className="text-slate-400 text-sm font-bold leading-relaxed mb-10">Rejoignez l'élite des établissements marocains avec notre solution cloud-native.</p>
                <div className="space-y-4">
                    <div className="flex items-center gap-3">
                        <div className="h-2 w-2 bg-blue-500 rounded-full" />
                        <p className="text-[10px] font-black uppercase tracking-widest text-slate-300 italic">Déploiement en 24h</p>
                    </div>
                    <div className="flex items-center gap-3">
                        <div className="h-2 w-2 bg-blue-500 rounded-full" />
                        <p className="text-[10px] font-black uppercase tracking-widest text-slate-300 italic">Support Prioritaire</p>
                    </div>
                </div>
            </div>
            <div className="relative z-10 pt-10">
                <p className="text-[10px] font-black text-slate-500 uppercase tracking-widest">© 2026 SaaS EDU</p>
            </div>
        </div>

        <div className="flex-1 p-10 md:p-14">
          <div className="mb-10">
            <h3 className="text-2xl font-black text-slate-900 tracking-tight">Nouvelle Instance</h3>
            <p className="text-slate-400 text-sm font-bold uppercase tracking-widest mt-1">Créez votre établissement en 2 minutes</p>
          </div>

          {error && (
            <div className="bg-red-50 text-red-600 p-5 rounded-2xl text-xs font-black border border-red-100 mb-8 animate-in fade-in slide-in-from-top-2">
                {error}
            </div>
          )}

          <form className="space-y-6" onSubmit={handleRegister}>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div className="space-y-1.5">
                    <label className="block text-[11px] font-black text-slate-400 uppercase tracking-widest ml-1">Nom de l'École</label>
                    <div className="relative group">
                        <Building2 className="absolute left-3.5 top-1/2 -translate-y-1/2 h-4 w-4 text-slate-300 group-focus-within:text-blue-500 transition-colors" />
                        <input
                            name="schoolName"
                            type="text"
                            required
                            className="w-full pl-11 pr-4 py-3 bg-slate-50 border-0 rounded-2xl text-xs font-bold outline-none focus:ring-4 focus:ring-blue-500/5 focus:bg-white transition-all"
                            placeholder="ex: Excellence Casablanca"
                        />
                    </div>
                </div>
                <div className="space-y-1.5">
                    <label className="block text-[11px] font-black text-slate-400 uppercase tracking-widest ml-1">Nom du Fondateur</label>
                    <div className="relative group">
                        <User className="absolute left-3.5 top-1/2 -translate-y-1/2 h-4 w-4 text-slate-300 group-focus-within:text-blue-500 transition-colors" />
                        <input
                            name="name"
                            type="text"
                            required
                            className="w-full pl-11 pr-4 py-3 bg-slate-50 border-0 rounded-2xl text-xs font-bold outline-none focus:ring-4 focus:ring-blue-500/5 focus:bg-white transition-all"
                            placeholder="Votre Nom Complet"
                        />
                    </div>
                </div>
                <div className="space-y-1.5">
                    <label className="block text-[11px] font-black text-slate-400 uppercase tracking-widest ml-1">Email Professionnel</label>
                    <div className="relative group">
                        <Mail className="absolute left-3.5 top-1/2 -translate-y-1/2 h-4 w-4 text-slate-300 group-focus-within:text-blue-500 transition-colors" />
                        <input
                            name="email"
                            type="email"
                            required
                            className="w-full pl-11 pr-4 py-3 bg-slate-50 border-0 rounded-2xl text-xs font-bold outline-none focus:ring-4 focus:ring-blue-500/5 focus:bg-white transition-all"
                            placeholder="contact@ecole.ma"
                        />
                    </div>
                </div>
                <div className="space-y-1.5">
                    <label className="block text-[11px] font-black text-slate-400 uppercase tracking-widest ml-1">Numéro Téléphone</label>
                    <div className="relative group">
                        <Phone className="absolute left-3.5 top-1/2 -translate-y-1/2 h-4 w-4 text-slate-300 group-focus-within:text-blue-500 transition-colors" />
                        <input
                            name="phone"
                            type="tel"
                            required
                            className="w-full pl-11 pr-4 py-3 bg-slate-50 border-0 rounded-2xl text-xs font-bold outline-none focus:ring-4 focus:ring-blue-500/5 focus:bg-white transition-all"
                            placeholder="+212 6..."
                        />
                    </div>
                </div>
                <div className="space-y-1.5 md:col-span-2">
                    <label className="block text-[11px] font-black text-slate-400 uppercase tracking-widest ml-1">Mot de Passe Sécurisé</label>
                    <div className="relative group">
                        <Lock className="absolute left-3.5 top-1/2 -translate-y-1/2 h-4 w-4 text-slate-300 group-focus-within:text-blue-500 transition-colors" />
                        <input
                            name="password"
                            type="password"
                            required
                            className="w-full pl-11 pr-4 py-3 bg-slate-50 border-0 rounded-2xl text-xs font-bold outline-none focus:ring-4 focus:ring-blue-500/5 focus:bg-white transition-all"
                            placeholder="********"
                        />
                    </div>
                </div>
            </div>

            <div className="pt-4">
                <label className="flex items-center gap-3 cursor-pointer group">
                    <input type="checkbox" required className="w-5 h-5 rounded-lg border-slate-200 text-blue-600 focus:ring-blue-500/20" />
                    <span className="text-[10px] font-black text-slate-400 uppercase tracking-widest group-hover:text-slate-600 transition-colors leading-none">J'accepte les conditions générales du SaaS EDU</span>
                </label>
            </div>

            <Button type="submit" className="w-full bg-slate-900 text-white font-black py-7 rounded-2xl shadow-xl shadow-slate-900/10 hover:bg-slate-800 transition-all active:scale-[0.98]" disabled={isLoading}>
              {isLoading ? <Loader2 className="h-5 w-5 animate-spin mx-auto" /> : (
                  <span className="flex items-center justify-center gap-2">
                      CRÉER MON ÉCOLE <ShieldCheck className="h-5 w-5" />
                  </span>
              )}
            </Button>

            <p className="text-center text-xs font-black text-slate-400 uppercase tracking-widest">
                Déjà client ? <Link href="/login" className="text-blue-600 hover:underline">Accès Console</Link>
            </p>
          </form>
        </div>
      </div>
    </div>
  )
}
