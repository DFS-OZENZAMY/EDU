"use client"
import * as React from "react"
import { Card } from "@/components/ui/card"
import { Users, Heart, MessageSquare, Share2, Plus, Flame, Award, Globe, Newspaper, Calendar, MoreHorizontal, Camera } from "lucide-react"
import { cn } from "@/lib/utils"
import { Button } from "@/components/ui/button"

const posts = [
  {
    id: 1,
    author: "Administration Centrale",
    role: "ADMIN",
    content: "Nous sommes ravis d'annoncer l'ouverture du nouveau laboratoire de robotique ! Une étape majeure pour l'innovation au sein de notre établissement. 🚀",
    date: "Il y a 2 heures",
    likes: 24,
    comments: 5,
    type: "ANNOUNCEMENT",
    image: "https://images.unsplash.com/photo-1581092160562-40aa08e78837?auto=format&fit=crop&q=80&w=1000"
  },
  {
    id: 2,
    author: "Mme. Bennani",
    role: "ENSEIGNANT",
    content: "Bravo à la classe de CM2-A pour leur projet sur le recyclage ! Les élèves ont fait preuve d'une créativité incroyable. 🌿♻️",
    date: "Il y a 5 heures",
    likes: 42,
    comments: 12,
    type: "ACHIEVEMENT",
    image: null
  }
]

export default function CommunityPage() {
  return (
    <div className="space-y-10 animate-in fade-in duration-500 pb-20 max-w-4xl mx-auto">
      {/* Community Header */}
      <div className="flex flex-col sm:flex-row justify-between items-end gap-6 border-b border-gray-200 pb-8">
        <div>
          <h2 className="text-4xl font-black text-slate-900 tracking-tight uppercase italic">Vie de l'École</h2>
          <p className="text-slate-500 font-bold mt-1 uppercase text-xs tracking-widest">Le fil d'actualité et d'échange de notre communauté</p>
        </div>
        <button className="bg-primary text-white px-6 py-3 rounded-2xl text-[10px] font-black uppercase tracking-widest hover:bg-blue-700 shadow-xl shadow-primary/20 transition-all flex items-center gap-2">
            <Plus className="h-4 w-4" /> PUBLIER UN MESSAGE
        </button>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-10">
         {/* Feed */}
         <div className="lg:col-span-2 space-y-8">
            {posts.map((post) => (
                <Card key={post.id} className="p-0 border-0 shadow-sm rounded-[32px] bg-white overflow-hidden group">
                   <div className="p-8 pb-4">
                      <div className="flex justify-between items-start mb-6">
                         <div className="flex items-center gap-4">
                            <div className="h-12 w-12 rounded-2xl bg-slate-900 text-white flex items-center justify-center font-black italic shadow-lg">
                               {post.author.charAt(0)}
                            </div>
                            <div>
                               <h4 className="text-sm font-black text-slate-900 uppercase tracking-tight">{post.author}</h4>
                               <p className="text-[10px] font-bold text-blue-600 uppercase tracking-widest">{post.role}</p>
                            </div>
                         </div>
                         <button className="p-2 text-slate-300 hover:text-slate-900 transition-colors"><MoreHorizontal className="h-5 w-5" /></button>
                      </div>

                      <p className="text-sm font-medium text-slate-600 leading-relaxed mb-6">
                         {post.content}
                      </p>
                   </div>

                   {post.image && (
                      <div className="px-4 pb-4">
                         <div className="aspect-video w-full rounded-[24px] overflow-hidden bg-slate-100">
                            <img src={post.image} className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700" alt="Post content" />
                         </div>
                      </div>
                   )}

                   <div className="px-8 py-6 bg-slate-50/50 flex items-center justify-between border-t border-slate-50">
                      <div className="flex items-center gap-6">
                         <button className="flex items-center gap-2 text-slate-400 hover:text-red-500 transition-colors">
                            <Heart className="h-5 w-5" />
                            <span className="text-[10px] font-black">{post.likes}</span>
                         </button>
                         <button className="flex items-center gap-2 text-slate-400 hover:text-blue-500 transition-colors">
                            <MessageSquare className="h-5 w-5" />
                            <span className="text-[10px] font-black">{post.comments}</span>
                         </button>
                      </div>
                      <span className="text-[9px] font-black text-slate-300 uppercase tracking-widest">{post.date}</span>
                   </div>
                </Card>
            ))}
         </div>

         {/* Widgets */}
         <div className="space-y-8">
            <Card className="p-8 rounded-[40px] border-0 shadow-sm bg-slate-900 text-white relative overflow-hidden">
                <div className="absolute top-0 right-0 p-8 opacity-10"><Flame className="h-32 w-32" /></div>
                <div className="relative z-10">
                    <h3 className="text-xl font-black uppercase tracking-tight mb-6 italic">Top Contributeurs</h3>
                    <div className="space-y-6">
                       {[1, 2, 3].map((_, i) => (
                          <div key={i} className="flex items-center justify-between">
                             <div className="flex items-center gap-4">
                                <div className="h-8 w-8 rounded-xl bg-white/10 flex items-center justify-center text-[10px] font-black italic">#{i+1}</div>
                                <p className="text-xs font-black uppercase">Utilisateur</p>
                             </div>
                             <Award className="h-4 w-4 text-blue-400" />
                          </div>
                       ))}
                    </div>
                </div>
            </Card>

            <Card className="p-8 rounded-[40px] border-0 shadow-sm bg-white overflow-hidden">
                <h3 className="text-[10px] font-black text-slate-400 uppercase tracking-[0.2em] mb-6">Événements à venir</h3>
                <div className="space-y-6">
                    <div className="flex gap-4">
                       <div className="h-10 w-10 shrink-0 bg-blue-50 text-blue-600 rounded-2xl flex flex-col items-center justify-center border border-blue-100">
                          <span className="text-[10px] font-black leading-none">12</span>
                          <span className="text-[8px] font-bold uppercase">Avr</span>
                       </div>
                       <div>
                          <p className="text-xs font-black text-slate-900 uppercase leading-none mb-1">Fête de fin d'année</p>
                          <p className="text-[9px] font-bold text-slate-400 uppercase">Salle Polyvalente</p>
                       </div>
                    </div>
                </div>
                <button className="w-full mt-10 py-4 bg-slate-50 text-slate-900 text-[9px] font-black uppercase tracking-widest rounded-2xl hover:bg-slate-100 transition-colors">VOIR LE CALENDRIER</button>
            </Card>
         </div>
      </div>
    </div>
  )
}
