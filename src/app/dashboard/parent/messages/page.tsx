"use client"
import * as React from "react"
import { Card } from "@/components/ui/card"
import { Send, Search, User, PlayCircle, MessageSquarePlus, ChevronRight } from "lucide-react"
import { Button } from "@/components/ui/button"

export default function ParentMessagesPage() {
  const [contacts, setContacts] = React.useState<any[]>([])
  const [selectedContact, setSelectedContact] = React.useState<any>(null)

  return (
    <div className="h-[calc(100vh-12rem)] flex gap-6">
      {/* Contact List */}
      <Card className="w-80 flex flex-col overflow-hidden border-gray-100 shadow-sm">
        <div className="p-5 border-b bg-gray-50/30">
           <div className="flex items-center justify-between mb-4">
              <h3 className="font-extrabold text-gray-900 text-lg">Messages</h3>
              <button className="p-2 bg-primary/10 text-primary rounded-xl hover:bg-primary/20 transition-colors">
                 <MessageSquarePlus className="h-5 w-5" />
              </button>
           </div>
           <div className="relative">
              <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-gray-400" />
              <input type="text" placeholder="Rechercher..." className="w-full pl-9 pr-4 py-2.5 bg-white border border-gray-100 rounded-xl text-sm shadow-sm" />
           </div>
        </div>
        <div className="flex-1 overflow-y-auto">
           {contacts.map((contact) => (
             <div
               key={contact.id}
               onClick={() => setSelectedContact(contact)}
               className={`p-5 border-b cursor-pointer transition-all ${selectedContact?.id === contact.id ? 'bg-primary/5 border-r-4 border-r-primary' : 'hover:bg-gray-50/80'}`}
             >
                <div className="flex justify-between items-start mb-1.5">
                   <p className="font-black text-sm text-gray-900 tracking-tight">{contact.name}</p>
                   <span className="text-[10px] font-bold text-gray-400">{contact.time}</span>
                </div>
                <div className="flex items-center justify-between">
                   <p className="text-xs text-gray-500 font-medium truncate max-w-[150px]">{contact.lastMsg}</p>
                   <span className="text-[10px] font-black text-primary uppercase tracking-widest">{contact.role.split(' ')[0]}</span>
                </div>
             </div>
           ))}
           {contacts.length === 0 && (
            <p className="p-8 text-center text-gray-400 text-xs italic">Aucune conversation</p>
           )}
        </div>
      </Card>

      {/* Chat Area */}
      <Card className="flex-1 flex flex-col overflow-hidden border-gray-100 shadow-xl">
        {selectedContact ? (
            <>
                <div className="p-5 border-b bg-white flex items-center justify-between z-10">
                <div className="flex items-center gap-4">
                    <div className="h-12 w-12 rounded-2xl bg-primary flex items-center justify-center text-white font-black text-xl shadow-lg shadow-primary/20 ring-4 ring-primary/5">
                        {selectedContact.name.split(' ')[1]?.charAt(0) || selectedContact.name.charAt(0)}
                    </div>
                    <div>
                        <p className="font-black text-gray-900 tracking-tight text-lg">{selectedContact.name}</p>
                        <div className="flex items-center gap-2">
                            <div className="h-2 w-2 rounded-full bg-green-500" />
                            <p className="text-xs text-gray-500 font-bold uppercase tracking-wider">{selectedContact.role}</p>
                        </div>
                    </div>
                </div>
                <Button variant="outline" size="sm" className="h-9 px-4 rounded-xl font-bold text-xs gap-2">
                    <User className="h-4 w-4" />
                    Profil
                </Button>
                </div>

                <div className="flex-1 p-8 overflow-y-auto space-y-6 bg-slate-50/50">
                <div className="flex justify-start">
                    <div className="bg-white p-4 rounded-3xl rounded-tl-none shadow-sm max-w-lg border border-gray-100 ring-4 ring-black/0 transition-all hover:ring-primary/5">
                        <p className="text-sm font-medium text-gray-800 leading-relaxed">{selectedContact.lastMsg}</p>
                        <p className="text-[10px] font-bold text-gray-400 mt-2 uppercase tracking-tighter">{selectedContact.time}</p>
                    </div>
                </div>
                </div>
            </>
        ) : (
            <div className="flex-1 flex items-center justify-center bg-slate-50/50 text-gray-400 italic text-sm">
                Sélectionnez une conversation pour commencer
            </div>
        )}

        <div className="p-6 border-t bg-white">
           <div className="flex gap-4 items-center">
              <div className="flex-1 relative">
                 <input
                   type="text"
                   placeholder="Écrivez votre message..."
                   className="w-full px-6 py-4 bg-gray-50 border-0 rounded-2xl focus:ring-4 focus:ring-primary/10 outline-none font-medium text-sm transition-all placeholder:text-gray-400"
                 />
                 <button className="absolute right-4 top-1/2 -translate-y-1/2 p-2 text-gray-400 hover:text-primary transition-colors">
                    <PlayCircle className="h-5 w-5 rotate-90" />
                 </button>
              </div>
              <Button className="bg-primary hover:bg-primary-hover h-14 w-14 p-0 rounded-2xl shadow-xl shadow-primary/20 transition-all active:scale-95 group">
                 <Send className="h-6 w-6 group-hover:translate-x-1 group-hover:-translate-y-1 transition-transform" />
              </Button>
           </div>
        </div>
      </Card>
    </div>
  )
}
