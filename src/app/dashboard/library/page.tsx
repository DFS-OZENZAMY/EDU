import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { BookOpen, Search, Filter, Plus, Book, Clock, Star } from "lucide-react"
import { Button } from "@/components/ui/button"

export default function LibraryPage() {
  return (
    <div className="p-6 space-y-10 animate-in fade-in duration-700 pb-20">
      <div className="flex justify-between items-end border-b pb-8">
        <div>
          <h1 className="text-4xl font-black text-slate-900 tracking-tight italic uppercase">Bibliothèque</h1>
          <p className="text-slate-500 font-bold mt-1 uppercase text-[10px] tracking-widest">Ressources Numériques et Catalogue Physique</p>
        </div>
        <Button className="rounded-2xl font-black uppercase tracking-widest text-[10px] h-12 px-8 shadow-xl bg-slate-900">
           <Plus className="w-4 h-4 mr-2" /> Ajouter Ouvrage
        </Button>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
         <div className="md:col-span-3 space-y-10">
            <div className="relative">
               <Search className="absolute left-6 top-1/2 -translate-y-1/2 h-5 w-5 text-slate-400" />
               <input
                 type="text"
                 placeholder="Titre, auteur, ou ISBN..."
                 className="w-full h-16 bg-white border-0 shadow-xl rounded-[24px] pl-16 pr-8 text-sm font-bold focus:ring-2 focus:ring-primary transition-all"
               />
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
               {[
                 { title: "Le Petit Prince", author: "Antoine de Saint-Exupéry", category: "Classique", stock: 5 },
                 { title: "L'Algèbre pour tous", author: "Jean Dupont", category: "Scolaire", stock: 12 },
                 { title: "L'Odyssée", author: "Homère", category: "Littérature", stock: 2 },
                 { title: "Sciences de la Vie", author: "Marie Curie", category: "Scolaire", stock: 8 },
                 { title: "Histoire du Maroc", author: "Ahmed Alami", category: "Histoire", stock: 4 },
                 { title: "Digital Marketing", author: "Seth Godin", category: "Tech", stock: 0 },
               ].map((book, i) => (
                 <Card key={i} className="group border-0 shadow-sm rounded-[32px] overflow-hidden bg-white hover:shadow-2xl transition-all cursor-pointer">
                    <div className="h-48 bg-slate-100 flex items-center justify-center relative overflow-hidden">
                       <Book className="h-16 w-16 text-slate-300 group-hover:scale-110 transition-transform duration-500" />
                       {book.stock === 0 && (
                         <div className="absolute top-4 right-4 bg-red-500 text-white text-[8px] font-black px-2 py-1 rounded-full uppercase">Indisponible</div>
                       )}
                    </div>
                    <div className="p-6">
                       <p className="text-[9px] font-black text-primary uppercase tracking-widest mb-1">{book.category}</p>
                       <h4 className="font-black text-slate-900 leading-tight mb-1">{book.title}</h4>
                       <p className="text-[10px] font-bold text-slate-400 italic mb-4">{book.author}</p>
                       <div className="flex justify-between items-center pt-4 border-t border-slate-50">
                          <span className="text-[10px] font-black text-slate-900">{book.stock} exemplaires</span>
                          <Button variant="ghost" size="sm" className="h-8 w-8 p-0 rounded-xl"><Plus className="h-4 w-4" /></Button>
                       </div>
                    </div>
                 </Card>
               ))}
            </div>
         </div>

         <div className="space-y-8">
            <Card className="p-8 border-0 shadow-sm rounded-[40px] bg-slate-900 text-white">
               <h3 className="font-black text-lg italic uppercase tracking-tight mb-6">Emprunts en cours</h3>
               <div className="space-y-6">
                  {[1, 2].map(i => (
                    <div key={i} className="flex gap-4">
                       <div className="h-10 w-10 bg-white/10 rounded-xl flex items-center justify-center"><Clock className="h-5 w-5" /></div>
                       <div>
                          <p className="text-xs font-black">Livre {i}</p>
                          <p className="text-[9px] text-slate-400 font-bold uppercase">Retour: 15/05/2024</p>
                       </div>
                    </div>
                  ))}
               </div>
            </Card>

            <Card className="p-8 border-0 shadow-sm rounded-[40px] bg-amber-50">
               <div className="flex items-center gap-2 mb-4">
                  <Star className="h-5 w-5 text-amber-500 fill-amber-500" />
                  <h4 className="font-black text-slate-900 uppercase text-xs">Meilleurs Lecteurs</h4>
               </div>
               <div className="space-y-4">
                  {["Yassine B.", "Meryem A.", "Kamal C."].map((name, i) => (
                    <div key={i} className="flex justify-between items-center text-xs font-bold">
                       <span className="text-slate-600">{name}</span>
                       <span className="text-amber-600 font-black">{12 - i*2} livres</span>
                    </div>
                  ))}
               </div>
            </Card>
         </div>
      </div>
    </div>
  )
}
