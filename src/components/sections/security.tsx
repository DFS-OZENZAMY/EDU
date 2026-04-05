import { ShieldCheck, History, HeadphonesIcon } from "lucide-react"

const securityPoints = [
  {
    title: "Hébergement Hautement Sécurisé",
    description: "Vos données sont isolées et protégées par des protocoles de chiffrement stricts pour garantir la confidentialité absolue des informations de vos élèves.",
    icon: ShieldCheck,
  },
  {
    title: "Sauvegardes Quotidiennes",
    description: "Vos historiques scolaires, notes et données financières sont sauvegardés automatiquement. Aucune perte de données possible.",
    icon: History,
  },
  {
    title: "Support Local Réactif",
    description: "Une équipe technique basée au Maroc, disponible sur WhatsApp ou par téléphone pour vous assister en français et en darija.",
    icon: HeadphonesIcon,
  },
]

export function Security() {
  return (
    <section id="securite" className="py-24 bg-white">
      <div className="mx-auto max-w-7xl px-6 lg:px-8">
        <div className="text-center mb-16">
          <h2 className="text-primary font-semibold tracking-wide uppercase">Fiabilité & Sécurité</h2>
          <p className="mt-2 text-3xl font-bold tracking-tight text-gray-900 sm:text-4xl">
            Vos données sont entre de bonnes mains
          </p>
          <p className="mt-4 text-lg text-gray-600 max-w-2xl mx-auto">
            Conçu pour répondre aux exigences strictes de sécurité des établissements scolaires.
          </p>
        </div>
        <div className="grid grid-cols-1 gap-12 sm:grid-cols-2 lg:grid-cols-3">
          {securityPoints.map((point, index) => (
            <div key={index} className="flex flex-col items-center text-center p-8 rounded-2xl bg-white border border-gray-100 hover:shadow-lg transition-all">
              <div className="mb-6 flex h-14 w-14 items-center justify-center rounded-2xl bg-primary/10 text-primary">
                <point.icon className="h-8 w-8" aria-hidden="true" />
              </div>
              <h3 className="text-xl font-bold text-gray-900 mb-4">{point.title}</h3>
              <p className="text-gray-600 leading-relaxed">{point.description}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}
