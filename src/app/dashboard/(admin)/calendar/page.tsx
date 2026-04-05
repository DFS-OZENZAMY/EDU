import { Calendar } from "lucide-react"

export default function AdminCalendarPage() {
  return (
    <div className="flex flex-col items-center justify-center h-96 bg-white rounded-3xl border-2 border-dashed border-gray-100 shadow-sm relative overflow-hidden">
      <div className="h-20 w-20 rounded-2xl bg-primary/5 flex items-center justify-center text-primary mb-6 ring-8 ring-primary/5 transition-transform hover:scale-110 relative z-10">
        <Calendar className="h-10 w-10" />
      </div>
      <h3 className="text-2xl font-black text-gray-900 mb-2 uppercase tracking-tighter relative z-10">Emploi du temps global</h3>
      <p className="text-gray-500 text-sm max-w-sm text-center font-medium leading-relaxed relative z-10">
        Accédez à la vue d'ensemble des plannings de tous les enseignants, élèves et occupations des salles de classe.
      </p>
      <div className="absolute -bottom-12 -right-12 h-64 w-64 bg-primary/5 rounded-full blur-3xl pointer-events-none transition-all group-hover:scale-150" />
    </div>
  )
}
