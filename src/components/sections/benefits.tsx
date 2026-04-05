import { Users, FileText, Smartphone, MessageSquare } from "lucide-react"

const benefits = [
  {
    title: "La fin du chaos administratif",
    description: "Vous passez encore des heures à chercher un dossier d'élève, à corriger un tableau Excel ou à relancer manuellement des parents pour des paiements en retard. Avec Minassa, tout est centralisé. Vous trouvez tout en 10 secondes.",
    icon: FileText
  },
  {
    title: "Moins de paperasse, plus d'enseignement",
    description: "Vos enseignants perdent un temps précieux à remplir des registres et des cahiers de texte. Minassa leur donne un outil simple, accessible depuis leur téléphone, pour saisir les notes et les absences en quelques clics.",
    icon: Users
  },
  {
    title: "Tout ce dont l'élève a besoin, au même endroit",
    description: "Emploi du temps, résultats, absences — l'élève n'a plus besoin de demander à la secrétaire ou d'attendre le bulletin papier. Tout est visible en temps réel depuis son téléphone.",
    icon: Smartphone
  },
  {
    title: "Les parents arrêtent d'appeler l'école",
    description: "Est-ce que mon fils était présent aujourd'hui ? — cette question, votre secrétaire ne la recevra plus. Les parents voient tout directement sur l'application : notes, présences, paiements, annonces.",
    icon: MessageSquare
  }
]

export function Benefits() {
  return (
    <section id="avantages" className="py-24 bg-gray-50">
      <div className="mx-auto max-w-7xl px-6 lg:px-8 text-center mb-16">
        <h2 className="text-primary font-semibold tracking-wide uppercase">Pourquoi Minassa</h2>
        <p className="mt-2 text-3xl font-bold tracking-tight text-gray-900 sm:text-4xl">
          Reconnaissez-vous votre école ici ?
        </p>
        <p className="mt-4 text-lg text-gray-600">
          Ces problèmes du quotidien ont une solution. Elle s'appelle Minassa.
        </p>
      </div>
      <div className="mx-auto max-w-7xl px-6 lg:px-8">
        <div className="grid grid-cols-1 gap-12 sm:grid-cols-2">
          {benefits.map((benefit, index) => (
            <div key={index} className="flex gap-x-6 p-6 rounded-2xl bg-white shadow-sm ring-1 ring-gray-200">
              <div className="flex h-12 w-12 shrink-0 items-center justify-center rounded-lg bg-primary text-white">
                <benefit.icon className="h-6 w-6" aria-hidden="true" />
              </div>
              <div>
                <h3 className="text-xl font-bold text-gray-900">{benefit.title}</h3>
                <p className="mt-2 text-gray-600 leading-relaxed">{benefit.description}</p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}
