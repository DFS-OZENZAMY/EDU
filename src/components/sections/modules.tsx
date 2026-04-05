import { GraduationCap, Briefcase, BarChart3, Calendar, CheckSquare, Wallet } from "lucide-react"

const modules = [
  {
    title: "Gestion des Élèves",
    description: "Centralisation des données, suivi des parcours, inscriptions et désinscriptions.",
    icon: GraduationCap,
  },
  {
    title: "Gestion du Personnel",
    description: "Informations du personnel enseignant et administratif, contrats, absences.",
    icon: Briefcase,
  },
  {
    title: "Notes et Matières",
    description: "Saisie et calcul des notes, gestion des matières, bulletins et relevés.",
    icon: BarChart3,
  },
  {
    title: "Gestion des Horaires",
    description: "Création et gestion simplifiée des emplois du temps pour classes et enseignants.",
    icon: Calendar,
  },
  {
    title: "Suivi des Présences",
    description: "Suivi quotidien, notifications automatiques aux parents, rapports détaillés.",
    icon: CheckSquare,
  },
  {
    title: "Gestion Financière",
    description: "Suivi des paiements, facturation, gestion des frais scolaires et comptabilité.",
    icon: Wallet,
  }
]

export function Modules() {
  return (
    <section id="modules" className="py-24 bg-white">
      <div className="mx-auto max-w-7xl px-6 lg:px-8">
        <div className="text-center mb-16">
          <h2 className="text-primary font-semibold tracking-wide uppercase">Fonctionnalités</h2>
          <p className="mt-2 text-3xl font-bold tracking-tight text-gray-900 sm:text-4xl">
            Des modules puissants pour chaque besoin de votre école
          </p>
          <p className="mt-4 text-lg text-gray-600 max-w-2xl mx-auto">
            De la gestion des élèves à la comptabilité, EDU couvre l'intégralité des besoins de votre établissement dans une seule plateforme centralisée.
          </p>
        </div>
        <div className="grid grid-cols-1 gap-8 sm:grid-cols-2 lg:grid-cols-3">
          {modules.map((module, index) => (
            <div key={index} className="relative p-8 rounded-2xl border border-gray-100 bg-slate-50 transition-all hover:shadow-lg hover:border-primary/20">
              <div className="mb-6 flex h-12 w-12 items-center justify-center rounded-lg bg-white shadow-sm text-primary">
                <module.icon className="h-6 w-6" aria-hidden="true" />
              </div>
              <h3 className="text-xl font-bold text-gray-900 mb-2">{module.title}</h3>
              <p className="text-gray-600 leading-relaxed">{module.description}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}
