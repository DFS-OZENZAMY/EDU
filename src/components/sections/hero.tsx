import { Button } from "@/components/ui/button"
import { Play } from "lucide-react"

export function Hero() {
  return (
    <section className="relative overflow-hidden bg-white pt-24 pb-32">
      <div className="mx-auto max-w-7xl px-6 lg:px-8">
        <div className="mx-auto max-w-2xl text-center">
          <div className="mb-8 flex justify-center">
            <span className="relative rounded-full px-3 py-1 text-sm leading-6 text-gray-600 ring-1 ring-gray-900/10 hover:ring-gray-900/20">
              🇲🇦 Conçu spécifiquement pour le Maroc
            </span>
          </div>
          <h1 className="text-4xl font-bold tracking-tight text-gray-900 sm:text-6xl">
            Libérez-vous de la paperasse et des retards de paiement
          </h1>
          <p className="mt-6 text-lg leading-8 text-gray-600">
            Arrêtez de courir après les paiements en retard. Arrêtez de refaire les mêmes tableaux chaque semaine.
            Minassa s'occupe de tout ça — déployé en 48h, sans engagement.
          </p>
          <div className="mt-10 flex items-center justify-center gap-x-6">
            <Button size="lg" asChild>
              <a href="#contact">Voir Minassa en action →</a>
            </Button>
            <Button variant="ghost" size="lg" className="flex items-center gap-2">
              <div className="flex h-10 w-10 items-center justify-center rounded-full bg-red-100 text-red-600">
                <Play className="h-5 w-5 fill-current" />
              </div>
              <span className="text-sm font-semibold leading-6 text-gray-900">Voir la démo en 2 min</span>
            </Button>
          </div>
        </div>
        <div className="mt-16 flow-root sm:mt-24">
          <div className="-m-2 rounded-xl bg-gray-900/5 p-2 ring-1 ring-inset ring-gray-900/10 lg:-m-4 lg:rounded-2xl lg:p-4">
            <div className="bg-white rounded-lg shadow-2xl border border-gray-200 overflow-hidden">
               {/* Dashboard Mockup Representation */}
               <div className="h-[400px] w-full bg-slate-50 flex flex-col">
                  <div className="h-12 bg-white border-b flex items-center px-4 gap-4">
                     <div className="h-3 w-3 rounded-full bg-red-400" />
                     <div className="h-3 w-3 rounded-full bg-yellow-400" />
                     <div className="h-3 w-3 rounded-full bg-green-400" />
                  </div>
                  <div className="flex-1 flex">
                     <div className="w-48 border-r bg-white p-4 space-y-4">
                        <div className="h-4 w-3/4 bg-gray-100 rounded" />
                        <div className="h-4 w-full bg-gray-200 rounded" />
                        <div className="h-4 w-5/6 bg-gray-100 rounded" />
                     </div>
                     <div className="flex-1 p-8 grid grid-cols-3 gap-6">
                        <div className="col-span-3 h-8 w-48 bg-gray-200 rounded mb-4" />
                        <div className="h-32 bg-white border rounded-xl shadow-sm p-4" />
                        <div className="h-32 bg-white border rounded-xl shadow-sm p-4" />
                        <div className="h-32 bg-white border rounded-xl shadow-sm p-4" />
                        <div className="col-span-2 h-48 bg-white border rounded-xl shadow-sm p-4" />
                        <div className="h-48 bg-white border rounded-xl shadow-sm p-4" />
                     </div>
                  </div>
               </div>
            </div>
          </div>
        </div>

        <div className="mt-20 grid grid-cols-1 gap-4 sm:grid-cols-3 text-center">
           <div className="p-4">
              <p className="text-sm font-semibold text-primary">Accès fondateur offert</p>
              <p className="text-lg font-bold text-gray-900">6 mois gratuits pour les 10 premières écoles</p>
           </div>
           <div className="p-4 border-x border-gray-100">
              <p className="text-sm font-semibold text-primary">Déploiement rapide</p>
              <p className="text-lg font-bold text-gray-900">En 48h, accompagnement inclus</p>
           </div>
           <div className="p-4">
              <p className="text-sm font-semibold text-primary">Totale liberté</p>
              <p className="text-lg font-bold text-gray-900">Sans engagement ni carte bancaire</p>
           </div>
        </div>
      </div>
    </section>
  )
}
