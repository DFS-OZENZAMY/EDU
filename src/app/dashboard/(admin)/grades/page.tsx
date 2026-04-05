import { BarChart3 } from "lucide-react"

export default function AdminGradesPage() {
  return (
    <div className="flex flex-col items-center justify-center h-96 bg-white rounded-3xl border-2 border-dashed border-gray-100 shadow-sm">
      <div className="h-20 w-20 rounded-2xl bg-primary/5 flex items-center justify-center text-primary mb-6 ring-8 ring-primary/5 transition-transform hover:scale-110">
        <BarChart3 className="h-10 w-10" />
      </div>
      <h3 className="text-2xl font-black text-gray-900 mb-2 uppercase tracking-tighter">Gestion des Notes & Bulletins</h3>
      <p className="text-gray-500 text-sm max-w-sm text-center font-medium leading-relaxed">
        Ce module permettra de générer les bulletins trimestriels, de suivre les moyennes générales par classe et de valider les saisies des professeurs.
      </p>
      <div className="mt-8 flex gap-4">
        <div className="h-2 w-2 rounded-full bg-primary animate-bounce [animation-delay:-0.3s]" />
        <div className="h-2 w-2 rounded-full bg-primary animate-bounce [animation-delay:-0.15s]" />
        <div className="h-2 w-2 rounded-full bg-primary animate-bounce" />
      </div>
    </div>
  )
}
