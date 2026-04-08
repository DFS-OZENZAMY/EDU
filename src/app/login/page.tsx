"use client"
import * as React from "react"
import Link from "next/link"
import { useRouter } from "next/navigation"
import { Card } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { GraduationCap, Mail, Lock, Loader2, ShieldCheck } from "lucide-react"
import { login } from "@/actions/auth"

export default function LoginPage() {
  const router = useRouter()
  const [role, setRole] = React.useState<string>("SCHOOL_ADMIN")
  const [email, setEmail] = React.useState("")
  const [password, setPassword] = React.useState("")
  const [isLoading, setIsLoading] = React.useState(false)
  const [error, setError] = React.useState<string | null>(null)

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault()
    setIsLoading(true)
    setError(null)

    const formData = new FormData()
    formData.append("email", email)
    formData.append("password", password)
    formData.append("role", role)

    try {
      const result = await login(formData)
      if (result?.error) {
        setError(result.error)
      } else if (result?.success && result.redirectTo) {
        router.push(result.redirectTo)
      }
    } catch (err) {
      setError("Une erreur est survenue")
    } finally {
      setIsLoading(false)
    }
  }

  return (
    <div className="min-h-screen bg-gray-50 flex items-center justify-center p-6">
      <Card className="w-full max-w-md p-8 space-y-8 shadow-2xl rounded-2xl border-0">
        <div className="text-center space-y-2">
          <div className="h-14 w-14 bg-primary rounded-2xl flex items-center justify-center text-white mx-auto mb-4 shadow-lg shadow-primary/20">
            <GraduationCap className="h-9 w-9" />
          </div>
          <h1 className="text-3xl font-black text-gray-900 tracking-tight">SaaS EDU</h1>
          <p className="text-gray-500 font-medium italic">Plateforme de Gestion Scolaire Cloud-Native</p>
        </div>

        {error && (
          <div className="bg-red-50 text-red-600 p-4 rounded-xl text-sm font-bold border border-red-100 animate-in fade-in slide-in-from-top-1">
            {error}
          </div>
        )}

        <form onSubmit={handleLogin} className="space-y-6">
          <div className="flex bg-gray-100 p-1.5 rounded-xl gap-1">
             {([
                 { id: "SCHOOL_ADMIN", label: "Admin" },
                 { id: "TEACHER", label: "Prof" },
                 { id: "PARENT", label: "Parent" },
                 { id: "SUPER_ADMIN", label: "SaaS" }
               ]).map((r) => (
               <button
                 key={r.id}
                 type="button"
                 onClick={() => setRole(r.id)}
                 className={`flex-1 py-2 text-[10px] uppercase tracking-widest font-black rounded-lg transition-all duration-200 ${
                   role === r.id ? 'bg-white text-primary shadow-md' : 'text-gray-400 hover:text-gray-600'
                 }`}
               >
                 {r.label}
               </button>
             ))}
          </div>

          <div className="space-y-4">
             <div>
                <label className="block text-[11px] font-black text-gray-400 uppercase tracking-wider mb-1.5 ml-1">Adresse Email</label>
                <div className="relative group">
                   <Mail className="absolute left-3.5 top-1/2 -translate-y-1/2 h-4 w-4 text-gray-400 group-focus-within:text-primary transition-colors" />
                   <input
                     type="email"
                     name="email"
                     required
                     className="w-full pl-11 pr-4 py-3 rounded-xl border border-gray-100 bg-gray-50/50 focus:bg-white focus:ring-4 focus:ring-primary/10 focus:border-primary transition-all outline-none text-sm font-medium"
                     placeholder="votre@ecole.edu.ma"
                     value={email}
                     onChange={(e) => setEmail(e.target.value)}
                   />
                </div>
             </div>
             <div>
                <label className="block text-[11px] font-black text-gray-400 uppercase tracking-wider mb-1.5 ml-1">Mot de passe</label>
                <div className="relative group">
                   <Lock className="absolute left-3.5 top-1/2 -translate-y-1/2 h-4 w-4 text-gray-400 group-focus-within:text-primary transition-colors" />
                   <input
                     type="password"
                     name="password"
                     required
                     className="w-full pl-11 pr-4 py-3 rounded-xl border border-gray-100 bg-gray-50/50 focus:bg-white focus:ring-4 focus:ring-primary/10 focus:border-primary transition-all outline-none text-sm font-medium"
                     placeholder="********"
                     value={password}
                     onChange={(e) => setPassword(e.target.value)}
                   />
                </div>
             </div>
          </div>

          <div className="flex items-center justify-between px-1">
              <label className="flex items-center gap-2 cursor-pointer group">
                  <input type="checkbox" className="w-4 h-4 rounded border-gray-300 text-primary focus:ring-primary/20" />
                  <span className="text-xs text-gray-500 font-medium group-hover:text-gray-700 transition-colors">Rester connecté</span>
              </label>
              <button type="button" className="text-xs text-primary font-bold hover:underline">Mot de passe oublié ?</button>
          </div>

          <Button type="submit" className="w-full bg-primary hover:bg-primary/90 text-white font-black py-7 rounded-xl shadow-lg shadow-primary/20 transition-all active:scale-[0.98]" disabled={isLoading}>
            {isLoading ? <Loader2 className="h-5 w-5 animate-spin mx-auto" /> : (
                <span className="flex items-center justify-center gap-2">
                    ACCÉDER À L'ESPACE <ShieldCheck className="h-5 w-5" />
                </span>
            )}
          </Button>

          <p className="text-center text-xs text-gray-400 font-medium">
              Pas encore client ? <Link href="/register" className="text-primary font-bold hover:underline">Inscrivez votre établissement</Link>
          </p>
        </form>
      </Card>
    </div>
  )
}
