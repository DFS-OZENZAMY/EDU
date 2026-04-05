"use client"
import * as React from "react"
import Link from "next/link"
import { useRouter } from "next/navigation"
import { Button } from "@/components/ui/button"
import { Shield, Users, UserCircle } from "lucide-react"

export default function LoginPage() {
  const router = useRouter()
  const [role, setRole] = React.useState<"admin" | "teacher" | "parent">("admin")

  const handleLogin = (e: React.FormEvent) => {
    e.preventDefault()
    if (role === "admin") router.push("/dashboard")
    else if (role === "teacher") router.push("/dashboard/teacher")
    else if (role === "parent") router.push("/dashboard/parent")
  }

  return (
    <div className="flex min-h-screen flex-col items-center justify-center bg-gray-50 px-4 py-12 sm:px-6 lg:px-8">
      <div className="w-full max-w-md space-y-8">
        <div>
          <Link href="/" className="flex justify-center items-center gap-2 mb-6">
            <div className="h-10 w-10 rounded-lg bg-primary flex items-center justify-center text-white font-bold text-2xl">E</div>
            <span className="text-2xl font-bold text-gray-900 tracking-tight">EDU</span>
          </Link>
          <h2 className="mt-6 text-center text-3xl font-bold tracking-tight text-gray-900">
            Connexion à votre espace
          </h2>
          <p className="mt-2 text-center text-sm text-gray-600">
            Choisissez votre profil pour accéder à votre espace
          </p>
        </div>

        <div className="grid grid-cols-3 gap-4 mb-8">
          <button
            onClick={() => setRole("admin")}
            className={`flex flex-col items-center gap-2 p-4 rounded-xl border-2 transition-all ${
              role === "admin" ? "border-primary bg-blue-50 text-primary" : "border-gray-100 bg-white text-gray-400 hover:border-gray-200"
            }`}
          >
            <Shield className="h-6 w-6" />
            <span className="text-xs font-bold uppercase">Admin</span>
          </button>
          <button
            onClick={() => setRole("teacher")}
            className={`flex flex-col items-center gap-2 p-4 rounded-xl border-2 transition-all ${
              role === "teacher" ? "border-primary bg-blue-50 text-primary" : "border-gray-100 bg-white text-gray-400 hover:border-gray-200"
            }`}
          >
            <Users className="h-6 w-6" />
            <span className="text-xs font-bold uppercase">Prof</span>
          </button>
          <button
            onClick={() => setRole("parent")}
            className={`flex flex-col items-center gap-2 p-4 rounded-xl border-2 transition-all ${
              role === "parent" ? "border-primary bg-blue-50 text-primary" : "border-gray-100 bg-white text-gray-400 hover:border-gray-200"
            }`}
          >
            <UserCircle className="h-6 w-6" />
            <span className="text-xs font-bold uppercase">Parent</span>
          </button>
        </div>

        <form className="mt-8 space-y-6" onSubmit={handleLogin}>
          <div className="-space-y-px rounded-md shadow-sm">
            <div>
              <label htmlFor="email-address" className="sr-only text-gray-900">
                Email
              </label>
              <input
                id="email-address"
                name="email"
                type="email"
                required
                className="relative block w-full rounded-t-md border-0 py-3 px-4 text-gray-900 ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:z-10 focus:ring-2 focus:ring-inset focus:ring-primary sm:text-sm sm:leading-6"
                placeholder="votre@email.com"
              />
            </div>
            <div>
              <label htmlFor="password" className="sr-only text-gray-900">
                Mot de passe
              </label>
              <input
                id="password"
                name="password"
                type="password"
                required
                className="relative block w-full rounded-b-md border-0 py-3 px-4 text-gray-900 ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:z-10 focus:ring-2 focus:ring-inset focus:ring-primary sm:text-sm sm:leading-6"
                placeholder="••••••••"
              />
            </div>
          </div>

          <div>
            <Button type="submit" className="w-full py-6 text-lg font-bold">
              Accéder à mon espace {role === "admin" ? "Directeur" : role === "teacher" ? "Enseignant" : "Parent"}
            </Button>
          </div>
        </form>
      </div>
    </div>
  )
}
