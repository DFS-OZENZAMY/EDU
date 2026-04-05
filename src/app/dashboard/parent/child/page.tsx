import { GraduationCap, Users, Calendar, MapPin, Award } from "lucide-react"

export default function ParentChildProfilePage() {
  return (
    <div className="max-w-4xl mx-auto space-y-8">
      <div className="bg-blue-600 rounded-3xl p-12 text-white flex flex-col md:flex-row items-center gap-8 shadow-xl relative overflow-hidden">
         <div className="relative z-10 w-32 h-32 rounded-full border-4 border-white/30 bg-blue-500 flex items-center justify-center text-5xl font-black shadow-inner">
            YB
         </div>
         <div className="relative z-10 text-center md:text-left">
            <h2 className="text-3xl font-extrabold mb-2">Youssef Bennani</h2>
            <div className="flex flex-wrap items-center justify-center md:justify-start gap-4">
               <span className="inline-flex items-center gap-1.5 px-3 py-1 bg-white/20 rounded-full text-xs font-bold backdrop-blur-md border border-white/20">
                  <GraduationCap className="h-4 w-4" />
                  Classe: CP - Section B
               </span>
               <span className="inline-flex items-center gap-1.5 px-3 py-1 bg-white/20 rounded-full text-xs font-bold backdrop-blur-md border border-white/20">
                  <Award className="h-4 w-4" />
                  Matricule: #2024-YB-01
               </span>
            </div>
         </div>
         <GraduationCap className="absolute -bottom-8 -right-8 h-48 w-48 text-white/10 -rotate-12 pointer-events-none" />
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
         <div className="bg-white p-8 rounded-3xl border border-blue-50 shadow-sm space-y-6">
            <h3 className="text-xl font-extrabold text-gray-900 border-b pb-4">Informations Scolaires</h3>
            <div className="space-y-4">
               <div className="flex items-center gap-4">
                  <div className="h-10 w-10 rounded-xl bg-blue-50 flex items-center justify-center text-blue-600"><Users className="h-5 w-5" /></div>
                  <div>
                     <p className="text-[10px] font-bold text-gray-400 uppercase tracking-widest">Enseignant Titulaire</p>
                     <p className="text-sm font-black text-gray-900 uppercase tracking-tighter">Ahmed Alaoui</p>
                  </div>
               </div>
               <div className="flex items-center gap-4">
                  <div className="h-10 w-10 rounded-xl bg-blue-50 flex items-center justify-center text-blue-600"><MapPin className="h-5 w-5" /></div>
                  <div>
                     <p className="text-[10px] font-bold text-gray-400 uppercase tracking-widest">Localisation</p>
                     <p className="text-sm font-black text-gray-900 uppercase tracking-tighter">Salle 12 • Bloc Primaire A</p>
                  </div>
               </div>
               <div className="flex items-center gap-4">
                  <div className="h-10 w-10 rounded-xl bg-blue-50 flex items-center justify-center text-blue-600"><Calendar className="h-5 w-5" /></div>
                  <div>
                     <p className="text-[10px] font-bold text-gray-400 uppercase tracking-widest">Date d'inscription</p>
                     <p className="text-sm font-black text-gray-900 uppercase tracking-tighter">05 Septembre 2023</p>
                  </div>
               </div>
            </div>
         </div>

         <div className="bg-slate-900 p-8 rounded-3xl text-white shadow-2xl relative group overflow-hidden cursor-pointer transition-transform hover:-translate-y-2">
            <h3 className="text-xl font-extrabold mb-6 flex items-center gap-2">
               <Award className="h-6 w-6 text-blue-500" />
               Badge de mérite
            </h3>
            <div className="flex items-center gap-6 mb-8 relative z-10">
               <div className="h-20 w-20 rounded-full bg-blue-600/30 border-2 border-blue-500 flex items-center justify-center ring-8 ring-blue-500/10">
                  <Award className="h-10 w-10 text-blue-500" />
               </div>
               <div>
                  <p className="text-2xl font-black mb-1">Élève Assidu</p>
                  <p className="text-xs text-slate-400 font-bold uppercase tracking-widest">Trimestre 1 • 2024</p>
               </div>
            </div>
            <p className="text-xs text-slate-500 font-medium leading-relaxed relative z-10">Ce badge récompense la ponctualité et le respect des règles de l'école.</p>
            <div className="absolute top-0 right-0 h-32 w-32 bg-blue-600/10 rounded-bl-full transition-all group-hover:scale-150" />
         </div>
      </div>
    </div>
  )
}
