import { getSession } from "@/actions/auth"
import { Card } from "@/components/ui/card"
import { User, Mail, Shield, Calendar } from "lucide-react"

export default async function ProfilePage() {
  const user = await getSession()

  return (
    <div className="max-w-4xl mx-auto space-y-8">
      <div>
        <h2 className="text-2xl font-bold text-gray-900">Mon Profil</h2>
        <p className="text-gray-500">Gérez vos informations personnelles et votre compte.</p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
        <Card className="p-6 flex flex-col items-center text-center">
          <div className="h-24 w-24 rounded-full bg-primary/10 text-primary flex items-center justify-center text-3xl font-bold mb-4">
            {user?.name?.charAt(0)}
          </div>
          <h3 className="font-bold text-lg">{user?.name}</h3>
          <p className="text-sm text-gray-500 uppercase tracking-wider font-semibold">{user?.role}</p>
          <div className="mt-6 w-full pt-6 border-t border-gray-100 flex flex-col gap-2">
            <button className="text-sm font-bold text-primary hover:underline">Changer la photo</button>
          </div>
        </Card>

        <Card className="md:col-span-2 p-6 space-y-6">
          <h4 className="font-bold text-gray-900 border-b border-gray-100 pb-2">Informations Générales</h4>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
            <div className="flex items-start gap-3">
              <User className="h-5 w-5 text-gray-400 mt-0.5" />
              <div>
                <p className="text-xs text-gray-400 font-bold uppercase">Nom Complet</p>
                <p className="text-sm font-medium">{user?.name}</p>
              </div>
            </div>
            <div className="flex items-start gap-3">
              <Mail className="h-5 w-5 text-gray-400 mt-0.5" />
              <div>
                <p className="text-xs text-gray-400 font-bold uppercase">Email</p>
                <p className="text-sm font-medium">{user?.email}</p>
              </div>
            </div>
            <div className="flex items-start gap-3">
              <Shield className="h-5 w-5 text-gray-400 mt-0.5" />
              <div>
                <p className="text-xs text-gray-400 font-bold uppercase">Rôle</p>
                <p className="text-sm font-medium">{user?.role}</p>
              </div>
            </div>
            <div className="flex items-start gap-3">
              <Calendar className="h-5 w-5 text-gray-400 mt-0.5" />
              <div>
                <p className="text-xs text-gray-400 font-bold uppercase">Membre depuis</p>
                <p className="text-sm font-medium">{user?.createdAt ? new Date(user.createdAt).toLocaleDateString() : '-'}</p>
              </div>
            </div>
          </div>

          <div className="pt-4 flex justify-end">
            <button className="bg-primary text-white px-6 py-2 rounded-lg font-bold text-sm hover:opacity-90 transition-opacity">
               Modifier le profil
            </button>
          </div>
        </Card>
      </div>
    </div>
  )
}
