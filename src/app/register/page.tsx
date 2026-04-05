import Link from "next/link"
import { Button } from "@/components/ui/button"

export default function RegisterPage() {
  return (
    <div className="flex min-h-screen flex-col items-center justify-center bg-gray-50 px-4 py-12 sm:px-6 lg:px-8">
      <div className="w-full max-w-md space-y-8">
        <div>
          <Link href="/" className="flex justify-center items-center gap-2 mb-6">
            <div className="h-10 w-10 rounded-lg bg-primary flex items-center justify-center text-white font-bold text-2xl">E</div>
            <span className="text-2xl font-bold text-gray-900 tracking-tight">EDU</span>
          </Link>
          <h2 className="mt-6 text-center text-3xl font-bold tracking-tight text-gray-900">
            Créez votre compte EDU
          </h2>
          <p className="mt-2 text-center text-sm text-gray-600">
            Vous avez déjà un compte ?{" "}
            <Link href="/login" className="font-medium text-primary hover:text-blue-500">
              Connectez-vous
            </Link>
          </p>
        </div>
        <form className="mt-8 space-y-4" action="/dashboard" method="GET">
          <div className="space-y-4">
            <div>
              <label htmlFor="school-name" className="block text-sm font-medium leading-6 text-gray-900">
                Nom de l'établissement
              </label>
              <input
                id="school-name"
                name="school"
                type="text"
                required
                className="mt-2 block w-full rounded-md border-0 py-3 px-4 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-primary sm:text-sm sm:leading-6"
                placeholder="Ex: École Al-Qods"
              />
            </div>
            <div>
              <label htmlFor="full-name" className="block text-sm font-medium leading-6 text-gray-900">
                Nom complet de l'administrateur
              </label>
              <input
                id="full-name"
                name="name"
                type="text"
                required
                className="mt-2 block w-full rounded-md border-0 py-3 px-4 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-primary sm:text-sm sm:leading-6"
                placeholder="Votre nom complet"
              />
            </div>
            <div>
              <label htmlFor="email" className="block text-sm font-medium leading-6 text-gray-900">
                Email professionnel
              </label>
              <input
                id="email"
                name="email"
                type="email"
                required
                className="mt-2 block w-full rounded-md border-0 py-3 px-4 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-primary sm:text-sm sm:leading-6"
                placeholder="contact@ecole.ma"
              />
            </div>
            <div>
              <label htmlFor="whatsapp" className="block text-sm font-medium leading-6 text-gray-900">
                Numéro WhatsApp
              </label>
              <input
                id="whatsapp"
                name="whatsapp"
                type="tel"
                required
                className="mt-2 block w-full rounded-md border-0 py-3 px-4 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-primary sm:text-sm sm:leading-6"
                placeholder="+212 600 000 000"
              />
            </div>
            <div>
              <label htmlFor="password" className="block text-sm font-medium leading-6 text-gray-900">
                Mot de passe
              </label>
              <input
                id="password"
                name="password"
                type="password"
                required
                className="mt-2 block w-full rounded-md border-0 py-3 px-4 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-primary sm:text-sm sm:leading-6"
                placeholder="••••••••"
              />
            </div>
          </div>

          <div className="flex items-center">
            <input
              id="terms"
              name="terms"
              type="checkbox"
              required
              className="h-4 w-4 rounded border-gray-300 text-primary focus:ring-primary"
            />
            <label htmlFor="terms" className="ml-2 block text-sm text-gray-900">
              J'accepte les conditions d'utilisation
            </label>
          </div>

          <div>
            <Button type="submit" className="w-full py-6 text-lg font-bold">
              Commencer les 6 mois gratuits
            </Button>
          </div>
        </form>
      </div>
    </div>
  )
}
