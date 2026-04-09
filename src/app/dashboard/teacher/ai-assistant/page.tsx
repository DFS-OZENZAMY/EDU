"use client"
import * as React from "react"
import { Card } from "@/components/ui/card"
import { BrainCircuit, Sparkles, Send, BookOpen, Lightbulb, MessageSquare, History, ChevronRight, Wand2, Star } from "lucide-react"
import { cn } from "@/lib/utils"
import { Button } from "@/components/ui/button"

export default function AIAssistantPage() {
  const [messages, setMessages] = React.useState([
    { role: 'assistant', text: "Bonjour ! Je suis votre assistant pédagogique IA. Je peux vous aider à préparer vos cours, créer des exercices ou analyser les progrès de vos classes. Que puis-je faire pour vous aujourd'hui ?" }
  ])
  const [input, setInput] = React.useState("")

  const suggestions = [
    { title: "Préparer un cours", icon: BookOpen, desc: "Générer un plan de séance sur les fractions." },
    { title: "Créer un quiz", icon: Sparkles, desc: "5 questions sur l'histoire du Maroc." },
    { title: "Analyse de classe", icon: Star, desc: "Identifier les élèves en difficulté en Français." },
  ]

  return (
    <div className="h-[calc(100vh-100px)] flex flex-col gap-4 animate-in fade-in duration-500 overflow-hidden">
      {/* AI Header */}
      <div className="flex items-center justify-between bg-slate-900 text-white rounded-2xl px-8 py-4 shadow-xl shrink-0 relative overflow-hidden">
        <div className="relative z-10 flex items-center gap-4">
           <div className="h-12 w-12 bg-blue-500 rounded-2xl flex items-center justify-center shadow-lg shadow-blue-500/50">
              <BrainCircuit className="h-7 w-7 text-white" />
           </div>
           <div>
              <h2 className="text-xl font-black uppercase tracking-tighter italic">Assistant Pédagogique <span className="text-blue-400">IA</span></h2>
              <p className="text-[10px] font-bold text-slate-400 uppercase tracking-widest">Propulsé par SaaS EDU Intelligence</p>
           </div>
        </div>
        <div className="absolute right-0 top-0 p-10 opacity-10"><Wand2 className="h-40 w-40" /></div>
      </div>

      <div className="flex-1 flex gap-6 overflow-hidden">
         {/* Main Chat Area */}
         <div className="flex-1 flex flex-col bg-white border border-slate-200 rounded-[32px] overflow-hidden shadow-sm">
            <div className="flex-1 overflow-y-auto p-8 space-y-6">
                {messages.map((msg, i) => (
                    <div key={i} className={cn(
                        "flex gap-4 max-w-[80%]",
                        msg.role === 'user' ? "ml-auto flex-row-reverse" : ""
                    )}>
                        <div className={cn(
                            "h-10 w-10 rounded-2xl flex items-center justify-center shrink-0 shadow-sm",
                            msg.role === 'assistant' ? "bg-blue-50 text-blue-600" : "bg-slate-900 text-white"
                        )}>
                            {msg.role === 'assistant' ? <BrainCircuit className="h-5 w-5" /> : <Star className="h-5 w-5" />}
                        </div>
                        <div className={cn(
                            "p-5 rounded-[24px] text-sm font-medium leading-relaxed",
                            msg.role === 'assistant' ? "bg-slate-50 text-slate-700 border border-slate-100" : "bg-blue-600 text-white shadow-lg"
                        )}>
                            {msg.text}
                        </div>
                    </div>
                ))}
            </div>

            {/* Input Area */}
            <div className="p-6 border-t border-slate-100 bg-slate-50/50">
                <div className="relative group">
                    <input
                        value={input}
                        onChange={(e) => setInput(e.target.value)}
                        placeholder="Posez une question ou demandez une ressource pédagogique..."
                        className="w-full pl-6 pr-16 py-5 bg-white border-2 border-slate-100 rounded-[24px] text-sm font-bold outline-none focus:border-blue-500/50 focus:ring-4 focus:ring-blue-500/5 transition-all shadow-sm"
                    />
                    <button className="absolute right-3 top-1/2 -translate-y-1/2 h-12 w-12 bg-blue-600 text-white rounded-2xl flex items-center justify-center shadow-lg shadow-blue-500/20 hover:scale-105 active:scale-95 transition-all">
                        <Send className="h-5 w-5" />
                    </button>
                </div>
            </div>
         </div>

         {/* Sidebar Suggestions */}
         <div className="w-80 flex flex-col gap-6 shrink-0">
            <Card className="p-6 border-0 shadow-sm rounded-[32px] bg-white">
                <h3 className="text-xs font-black text-slate-900 uppercase tracking-widest mb-6 flex items-center gap-2">
                   <Lightbulb className="h-4 w-4 text-amber-500" /> Suggestions
                </h3>
                <div className="space-y-4">
                    {suggestions.map((s, i) => (
                        <button key={i} className="w-full text-left p-4 rounded-2xl border border-slate-50 hover:bg-blue-50 hover:border-blue-100 transition-all group">
                            <div className="flex items-center gap-3 mb-2 text-blue-600">
                                <s.icon className="h-4 w-4" />
                                <span className="text-[10px] font-black uppercase tracking-widest">{s.title}</span>
                            </div>
                            <p className="text-[11px] font-bold text-slate-500 leading-tight group-hover:text-blue-900">{s.desc}</p>
                        </button>
                    ))}
                </div>
            </Card>

            <Card className="p-8 bg-blue-600 text-white rounded-[32px] relative overflow-hidden group flex-1">
                <div className="absolute top-0 right-0 p-6 opacity-10"><History className="h-24 w-24" /></div>
                <div className="relative z-10 flex flex-col h-full">
                    <h3 className="text-lg font-black uppercase tracking-tight mb-2 italic">Dernières Activités</h3>
                    <div className="mt-4 space-y-4 flex-1">
                        <p className="text-[10px] font-bold text-blue-100 leading-relaxed opacity-60 italic">Aucune archive pour le moment. Commencez à discuter pour sauvegarder vos idées.</p>
                    </div>
                    <button className="flex items-center gap-2 text-[10px] font-black uppercase tracking-widest text-white/80 hover:text-white transition-colors">
                        Voir tout l'historique <ChevronRight className="h-4 w-4" />
                    </button>
                </div>
            </Card>
         </div>
      </div>
    </div>
  )
}
