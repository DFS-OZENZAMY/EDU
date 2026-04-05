"use client"
import * as React from "react"
import { useRouter } from "next/navigation"
import { Card } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { GraduationCap, Mail, Lock, Loader2 } from "lucide-react"

export default function LoginPage() {
  const router = useRouter()
  const [role, setRole] = React.useState<"ADMIN" | "TEACHER" | "PARENT">("ADMIN")
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
      // In a real Server Action, you'd import and call it directly.
      // But we can also use a dynamic import or fetch for demonstration.
      const { login } = await import("@/actions/auth")
      const result = await login(formData)
      if (result?.error) setError(result.error)
    } catch (err) {
      setError("Une erreur est survenue")
    } finally {
      setIsLoading(false)
    }
  }

  return (
    <div className="min-h-screen bg-gray-50 flex items-center justify-center p-6">
      <Card className="w-full max-w-md p-8 space-y-8 shadow-xl">
        <div className="text-center space-y-2">
          <div className="h-12 w-12 bg-primary rounded-xl flex items-center justify-center text-white mx-auto mb-4">
            <GraduationCap className="h-8 w-8" />
          </div>
          <h1 className="text-3xl font-bold text-gray-900 tracking-tight uppercase">Connexion EDU</h1>
          <p className="text-gray-500">Accédez à votre espace de gestion scolaire.</p>
        </div>

        {error && (
          <div className="bg-red-50 text-red-600 p-4 rounded-lg text-sm font-medium border border-red-100">
            {error}
          </div>
        )}

        <form onSubmit={handleLogin} className="space-y-6">
          <div className="flex bg-gray-100 p-1 rounded-lg">
             {(["ADMIN", "TEACHER", "PARENT"] as const).map((r) => (
               <button
                 key={r}
                 type="button"
                 onClick={() => setRole(r)}
                 className={`flex-1 py-2 text-xs font-bold rounded-md transition-all ${
                   role === r ? 'bg-white text-primary shadow-sm' : 'text-gray-500 hover:text-gray-700'
                 }`}
               >
                 {r === 'ADMIN' ? 'Admin' : r === 'TEACHER' ? 'Prof' : 'Parent'}
               </button>
             ))}
          </div>

          <div className="space-y-4">
             <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Email</label>
                <div className="relative">
                   <Mail className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-gray-400" />
                   <input
                     type="email"
                     name="email"
                     required
                     className="w-full pl-10 pr-4 py-2 rounded-lg border border-gray-200 focus:ring-2 focus:ring-primary/20"
                     placeholder="votre@email.com"
                     value={email}
                     onChange={(e) => setEmail(e.target.value)}
                   />
                </div>
             </div>
             <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Mot de passe</label>
                <div className="relative">
                   <Lock className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-gray-400" />
                   <input
                     type="password"
                     name="password"
                     required
                     className="w-full pl-10 pr-4 py-2 rounded-lg border border-gray-200 focus:ring-2 focus:ring-primary/20"
                     placeholder="********"
                     value={password}
                     onChange={(e) => setPassword(e.target.value)}
                   />
                </div>
             </div>
          </div>

          <Button type="submit" className="w-full bg-primary font-bold py-6" disabled={isLoading}>
            {isLoading ? <Loader2 className="h-5 w-5 animate-spin" /> : "Se connecter"}
          </Button>
        </form>
      </Card>
    </div>
  )
}
