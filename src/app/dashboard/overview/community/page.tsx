import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Users, Heart, MessageCircle, Share2, Plus, Play, Image as ImageIcon } from "lucide-react"
import { Button } from "@/components/ui/button"

export default function CommunityPage() {
  const posts = [
    {
      author: "Administration Centrale",
      role: "Official",
      time: "2h",
      content: "Une journée mémorable lors de notre festival annuel des sciences ! Bravo à tous nos petits chercheurs. 🧪✨",
      likes: 124,
      comments: 18,
      image: "https://images.unsplash.com/photo-1564066330583-931f01ec9c7a?auto=format&fit=crop&w=800&q=80"
    },
    {
      author: "Coach Sportif",
      role: "Teacher",
      time: "5h",
      content: "Victoire de l'équipe de foot 3-1 contre l'école partenaire ! Les entraînements portent leurs fruits. ⚽️🏆",
      likes: 89,
      comments: 12,
      image: "https://images.unsplash.com/photo-1574629810360-7efbbe195018?auto=format&fit=crop&w=800&q=80"
    }
  ]

  return (
    <div className="max-w-4xl mx-auto p-6 space-y-10 animate-in fade-in slide-in-from-bottom-4 duration-700">
      <div className="flex flex-col md:flex-row justify-between items-end gap-6 border-b border-slate-200 pb-8">
        <div>
           <h1 className="text-4xl font-black text-slate-900 tracking-tight italic uppercase">Vie de l'École</h1>
           <p className="text-slate-500 font-bold mt-1 uppercase text-xs tracking-widest">Partagez les moments forts de notre communauté</p>
        </div>
        <Button className="rounded-2xl font-black uppercase tracking-widest text-[10px] h-12 px-8 shadow-xl bg-slate-900">
           <Plus className="w-4 h-4 mr-2" /> Publier un moment
        </Button>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
        <div className="md:col-span-3 space-y-10">
           {/* Create Post Mockup */}
           <Card className="p-6 border-0 shadow-xl rounded-[32px] bg-white">
              <div className="flex gap-4">
                 <div className="h-12 w-12 rounded-2xl bg-slate-100 flex items-center justify-center font-black text-slate-400">?</div>
                 <div className="flex-1">
                    <textarea
                      placeholder="Quoi de neuf dans votre classe ?"
                      className="w-full bg-slate-50 border-0 rounded-2xl p-4 text-sm font-medium focus:ring-2 focus:ring-slate-900 resize-none min-h-[100px]"
                    />
                    <div className="flex justify-between mt-4">
                       <div className="flex gap-2">
                          <Button variant="ghost" size="sm" className="rounded-xl font-bold text-xs"><ImageIcon className="w-4 h-4 mr-2" /> Photo</Button>
                          <Button variant="ghost" size="sm" className="rounded-xl font-bold text-xs"><Play className="w-4 h-4 mr-2" /> Vidéo</Button>
                       </div>
                       <Button className="rounded-xl font-black uppercase tracking-widest text-[9px] px-6">Publier</Button>
                    </div>
                 </div>
              </div>
           </Card>

           {/* Feed */}
           {posts.map((post, i) => (
             <Card key={i} className="border-0 shadow-2xl rounded-[40px] overflow-hidden bg-white group">
                <div className="p-8 space-y-6">
                   <div className="flex justify-between items-start">
                      <div className="flex gap-4">
                         <div className="h-12 w-12 bg-slate-900 rounded-2xl flex items-center justify-center font-black italic text-white shadow-lg">
                            {post.author.charAt(0)}
                         </div>
                         <div>
                            <p className="font-black text-slate-900 tracking-tight">{post.author}</p>
                            <div className="flex items-center gap-2">
                               <span className="text-[10px] font-black uppercase tracking-widest text-blue-600">{post.role}</span>
                               <span className="text-[10px] text-slate-400 font-bold">• il y a {post.time}</span>
                            </div>
                         </div>
                      </div>
                   </div>

                   <p className="text-slate-600 font-medium leading-relaxed">{post.content}</p>

                   {post.image && (
                     <div className="rounded-[32px] overflow-hidden border border-slate-100 shadow-inner">
                        <img src={post.image} alt="Moment" className="w-full h-[400px] object-cover hover:scale-105 transition-transform duration-700" />
                     </div>
                   )}

                   <div className="flex items-center gap-6 pt-2">
                      <button className="flex items-center gap-2 text-slate-400 hover:text-red-500 transition-colors">
                         <Heart className="w-5 h-5" />
                         <span className="text-xs font-black">{post.likes}</span>
                      </button>
                      <button className="flex items-center gap-2 text-slate-400 hover:text-blue-500 transition-colors">
                         <MessageCircle className="w-5 h-5" />
                         <span className="text-xs font-black">{post.comments}</span>
                      </button>
                      <button className="flex items-center gap-2 text-slate-400 ml-auto">
                         <Share2 className="w-5 h-5" />
                      </button>
                   </div>
                </div>
             </Card>
           ))}
        </div>

        <div className="space-y-8">
           <Card className="p-8 border-0 shadow-sm rounded-[40px] bg-slate-50">
              <h4 className="font-black text-slate-900 uppercase tracking-tight mb-6 italic">Membres Actifs</h4>
              <div className="space-y-4">
                 {[1,2,3,4].map(i => (
                   <div key={i} className="flex items-center gap-3">
                      <div className="h-8 w-8 rounded-full bg-white border border-slate-200" />
                      <div className="flex-1 min-w-0">
                         <p className="text-xs font-bold text-slate-900 truncate">Utilisateur {i}</p>
                         <p className="text-[10px] text-slate-400 font-medium">Parent d'élève</p>
                      </div>
                   </div>
                 ))}
              </div>
           </Card>

           <Card className="p-8 border-0 shadow-sm rounded-[40px] bg-gradient-to-br from-indigo-600 to-blue-700 text-white">
              <h4 className="font-black uppercase tracking-tight mb-4 italic">Concours du mois</h4>
              <p className="text-xs text-indigo-100 font-medium leading-relaxed mb-6">Partagez la plus belle oeuvre d'art de votre enfant et gagnez un badge exclusif !</p>
              <Button variant="secondary" className="w-full rounded-2xl text-[10px] font-black uppercase tracking-widest">Participer</Button>
           </Card>
        </div>
      </div>
    </div>
  )
}
