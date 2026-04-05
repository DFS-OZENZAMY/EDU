"use client"
import * as React from "react"
import { Check } from "lucide-react"
import { Button } from "@/components/ui/button"
import { cn } from "@/lib/utils"

const tiers = [
  {
    name: "Saghir",
    description: "Crèches, jardins d'enfants & petites structures",
    price: "399",
    annualPrice: "4 000",
    features: [
      "Inscriptions & fiches élèves",
      "Gestion des classes",
      "Suivi des paiements",
      "Tableau de bord directeur",
      "Support WhatsApp & email (24h)",
      "jusqu'à 150 élèves",
    ],
    setup: "Mise en place : 500 DH (optionnelle)",
    cta: "Demander une démo",
    mostPopular: false,
  },
  {
    name: "Wassat",
    description: "Écoles primaires en croissance",
    price: "749",
    annualPrice: "7 500",
    features: [
      "Tout le socle (Inscriptions, Classes, Paiements, Dashboard)",
      "Notes & bulletins personnalisables",
      "Emploi du temps interactif",
      "Portail enseignants (notes & cahier de texte)",
      "Portail parents (notes, présences, emploi du temps)",
      "Support WhatsApp prioritaire",
      "jusqu'à 400 élèves",
    ],
    setup: "Mise en place : 500 DH",
    cta: "Demander une démo",
    mostPopular: true,
  },
  {
    name: "Kbir",
    description: "Écoles privées complètes (primaire + collège)",
    price: "1 050",
    annualPrice: "10 500",
    features: [
      "Tout le plan Wassat",
      "Analytiques avancées & tableaux de rentabilité",
      "Gestion multi-établissements",
      "Stockage illimité des ressources",
      "Application mobile marque blanche",
      "Support téléphonique dédié",
      "élèves illimités",
    ],
    setup: "Mise en place & formation : offerte",
    cta: "Demander une démo",
    mostPopular: false,
  },
]

export function Pricing() {
  const [billingCycle, setBillingCycle] = React.useState<"monthly" | "yearly">("monthly")

  return (
    <section id="tarifs" className="py-24 bg-gray-50">
      <div className="mx-auto max-w-7xl px-6 lg:px-8">
        <div className="text-center mb-16">
          <h2 className="text-primary font-semibold tracking-wide uppercase">Tarifs 2026</h2>
          <p className="mt-2 text-3xl font-bold tracking-tight text-gray-900 sm:text-4xl">
            Une formule pour chaque établissement
          </p>
          <p className="mt-4 text-lg text-gray-600">
             App mobile incluse. Déploiement en 48h. Démo personnalisée offerte.
          </p>
          <div className="mt-8 flex justify-center">
            <div className="relative flex rounded-full bg-gray-100 p-1">
              <button
                type="button"
                className={cn(
                  "relative rounded-full px-8 py-2 text-sm font-semibold transition-all",
                  billingCycle === "monthly" ? "bg-white text-primary shadow-sm" : "text-gray-500 hover:text-gray-700"
                )}
                onClick={() => setBillingCycle("monthly")}
              >
                Mensuel
              </button>
              <button
                type="button"
                className={cn(
                  "relative rounded-full px-8 py-2 text-sm font-semibold transition-all",
                  billingCycle === "yearly" ? "bg-white text-primary shadow-sm" : "text-gray-500 hover:text-gray-700"
                )}
                onClick={() => setBillingCycle("yearly")}
              >
                Annuel <span className="ml-1 text-green-600">-17%</span>
              </button>
            </div>
          </div>
        </div>

        <div className="grid grid-cols-1 gap-8 lg:grid-cols-3">
          {tiers.map((tier, index) => (
            <div
              key={index}
              className={cn(
                "relative flex flex-col p-8 rounded-3xl bg-white ring-1 ring-gray-200 transition-all hover:scale-[1.02]",
                tier.mostPopular && "ring-2 ring-primary shadow-xl"
              )}
            >
              {tier.mostPopular && (
                <p className="absolute top-0 -translate-y-1/2 left-1/2 -translate-x-1/2 rounded-full bg-primary px-3 py-1 text-sm font-semibold text-white">
                  Populaire
                </p>
              )}
              <h3 className="text-xl font-bold text-gray-900 mb-2">{tier.name}</h3>
              <p className="text-sm text-gray-500 mb-6 min-h-[40px]">{tier.description}</p>
              <div className="flex items-baseline gap-x-2 mb-8">
                <span className="text-4xl font-bold tracking-tight text-gray-900">
                  {billingCycle === "monthly" ? tier.price : tier.annualPrice} DH
                </span>
                <span className="text-sm font-semibold text-gray-500">
                  /{billingCycle === "monthly" ? "mois" : "an"}
                </span>
              </div>
              <ul role="list" className="space-y-4 text-sm text-gray-600 mb-8 flex-1">
                {tier.features.map((feature, i) => (
                  <li key={i} className="flex items-start gap-3">
                    <Check className="h-5 w-5 text-primary shrink-0" aria-hidden="true" />
                    <span>{feature}</span>
                  </li>
                ))}
              </ul>
              <div className="mb-6 py-4 border-t border-gray-100">
                 <p className="text-sm font-medium text-gray-500 italic">{tier.setup}</p>
              </div>
              <Button variant={tier.mostPopular ? "primary" : "outline"} className="w-full" asChild>
                <a href="#contact">{tier.cta}</a>
              </Button>
            </div>
          ))}
        </div>

        {/* Founding Offer Card */}
        <div className="mt-16 relative rounded-3xl bg-primary px-8 py-12 text-center text-white shadow-2xl overflow-hidden">
          <div className="relative z-10 mx-auto max-w-2xl">
            <h3 className="text-2xl font-bold sm:text-3xl">Offre fondateur — Places limitées</h3>
            <p className="mt-4 text-lg text-blue-100">
              6 mois 100% gratuits pour les 10 premières écoles. Vous accédez à toutes les fonctionnalités du plan correspondant à votre taille, sans frais et sans engagement.
            </p>
            <div className="mt-8 flex flex-col sm:flex-row items-center justify-center gap-6">
              <div className="bg-white/20 backdrop-blur-md px-6 py-4 rounded-2xl border border-white/30">
                 <p className="text-3xl font-bold">0 DH / 6 mois</p>
                 <p className="text-sm opacity-90">Il reste 10 places disponibles</p>
              </div>
              <Button variant="secondary" size="lg" className="h-16 px-8 shadow-xl" asChild>
                <a href="#contact">Demander une place fondateur</a>
              </Button>
            </div>
          </div>
          {/* Subtle background decoration */}
          <div className="absolute top-0 right-0 -mr-20 -mt-20 h-64 w-64 rounded-full bg-blue-400 opacity-20 blur-3xl" />
          <div className="absolute bottom-0 left-0 -ml-20 -mb-20 h-64 w-64 rounded-full bg-blue-300 opacity-20 blur-3xl" />
        </div>
      </div>
    </section>
  )
}
