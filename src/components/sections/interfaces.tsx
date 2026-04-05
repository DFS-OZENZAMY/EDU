"use client"
import * as React from "react"
import { Monitor, Smartphone } from "lucide-react"
import { cn } from "@/lib/utils"

const interfaces = [
  {
    title: "Administrateur",
    subtitle: "Tableau de bord complet",
    description: "Gestion centralisée et efficace de l'établissement avec accès à tous les modules et rapports.",
    devices: ["Web"],
  },
  {
    title: "Enseignant",
    subtitle: "Gestion de classe simplifiée",
    description: "Saisie des notes, suivi de présence et communication avec élèves et parents.",
    devices: ["Web", "Mobile"],
  },
  {
    title: "Élève",
    subtitle: "Accès à l'information scolaire",
    description: "Notes, horaires, suivi de présence et communication facile via web et application mobile.",
    devices: ["Web", "Mobile"],
  },
  {
    title: "Parent",
    subtitle: "Suivi en temps réel",
    description: "Progrès, notes et présence de vos enfants. Communication directe avec l'école.",
    devices: ["Web", "Mobile"],
  },
]

export function Interfaces() {
  const [active, setActive] = React.useState(0)

  return (
    <section id="interfaces" className="py-24 bg-gray-50 overflow-hidden">
      <div className="mx-auto max-w-7xl px-6 lg:px-8">
        <div className="text-center mb-16">
          <h2 className="text-primary font-semibold tracking-wide uppercase">Interfaces adaptées</h2>
          <p className="mt-2 text-3xl font-bold tracking-tight text-gray-900 sm:text-4xl">
            Une expérience intuitive pour chaque utilisateur
          </p>
          <p className="mt-4 text-lg text-gray-600 max-w-2xl mx-auto">
            Chaque profil dispose d'une interface dédiée, accessible sur web et mobile.
          </p>
        </div>

        <div className="flex flex-wrap justify-center gap-4 mb-12">
          {interfaces.map((item, index) => (
            <button
              key={index}
              onClick={() => setActive(index)}
              className={cn(
                "px-6 py-2 rounded-full font-semibold transition-all",
                active === index
                ? "bg-primary text-white shadow-lg"
                : "bg-white text-gray-600 hover:bg-gray-100"
              )}
            >
              {item.title}
            </button>
          ))}
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
          <div className="order-2 lg:order-1">
            <h3 className="text-2xl font-bold text-gray-900 mb-2">{interfaces[active].subtitle}</h3>
            <p className="text-lg text-gray-600 mb-8">{interfaces[active].description}</p>
            <div className="flex gap-4">
              {interfaces[active].devices.map(device => (
                <div key={device} className="flex items-center gap-2 bg-white px-4 py-2 rounded-lg border border-gray-200">
                  {device === "Web" ? <Monitor className="h-5 w-5 text-primary" /> : <Smartphone className="h-5 w-5 text-primary" />}
                  <span className="font-medium text-gray-700">{device}</span>
                </div>
              ))}
            </div>
          </div>
          <div className="order-1 lg:order-2">
            <div className="relative aspect-video bg-white rounded-2xl shadow-xl overflow-hidden border border-gray-100 p-2">
               {/* Mockup visualization based on active interface */}
               <div className="h-full w-full bg-slate-100 rounded-xl flex items-center justify-center">
                  <p className="text-gray-400 font-medium italic">Aperçu interface {interfaces[active].title}</p>
               </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}
