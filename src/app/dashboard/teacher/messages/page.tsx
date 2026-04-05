"use client"
import * as React from "react"
import { Card } from "@/components/ui/card"
import { Send, Search, User } from "lucide-react"
import { Button } from "@/components/ui/button"

const contacts = [
  { id: 1, name: "Salma Bennani", role: "Parent", student: "Youssef Bennani", lastMsg: "Merci pour le retour.", time: "14:20" },
  { id: 2, name: "Administration", role: "Admin", lastMsg: "La réunion est reportée à 16h.", time: "10:05" },
  { id: 3, name: "Driss Alaoui", role: "Parent", student: "Sara Alaoui", lastMsg: "Bonjour, Sara sera absente...", time: "Hier" },
]

export default function TeacherMessagesPage() {
  const [selectedContact, setSelectedContact] = React.useState(contacts[0])

  return (
    <div className="h-[calc(100vh-12rem)] flex gap-6">
      {/* Contact List */}
      <Card className="w-80 flex flex-col overflow-hidden">
        <div className="p-4 border-b">
           <div className="relative">
              <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-gray-400" />
              <input type="text" placeholder="Rechercher..." className="w-full pl-9 pr-4 py-2 bg-gray-50 rounded-lg text-sm" />
           </div>
        </div>
        <div className="flex-1 overflow-y-auto">
           {contacts.map((contact) => (
             <div
               key={contact.id}
               onClick={() => setSelectedContact(contact)}
               className={`p-4 border-b cursor-pointer transition-colors ${selectedContact.id === contact.id ? 'bg-green-50 border-r-4 border-r-green-600' : 'hover:bg-gray-50'}`}
             >
                <div className="flex justify-between items-start mb-1">
                   <p className="font-bold text-sm text-gray-900">{contact.name}</p>
                   <span className="text-[10px] text-gray-400">{contact.time}</span>
                </div>
                <p className="text-xs text-gray-500 truncate">{contact.lastMsg}</p>
                {contact.student && <p className="text-[10px] text-green-600 font-medium mt-1">Élève: {contact.student}</p>}
             </div>
           ))}
        </div>
      </Card>

      {/* Chat Area */}
      <Card className="flex-1 flex flex-col overflow-hidden">
        <div className="p-4 border-b bg-gray-50/50 flex items-center justify-between">
           <div className="flex items-center gap-3">
              <div className="h-10 w-10 rounded-full bg-green-100 flex items-center justify-center text-green-700 font-bold">
                 {selectedContact.name.charAt(0)}
              </div>
              <div>
                 <p className="font-bold text-gray-900">{selectedContact.name}</p>
                 <p className="text-xs text-gray-500">{selectedContact.role} {selectedContact.student ? `• Parent de ${selectedContact.student}` : ''}</p>
              </div>
           </div>
        </div>

        <div className="flex-1 p-6 overflow-y-auto space-y-4 bg-slate-50/30">
           <div className="flex justify-start">
              <div className="bg-white p-3 rounded-2xl rounded-tl-none shadow-sm max-w-md border border-gray-100">
                 <p className="text-sm text-gray-800">{selectedContact.lastMsg}</p>
                 <p className="text-[10px] text-gray-400 mt-1">{selectedContact.time}</p>
              </div>
           </div>
           <div className="flex justify-end">
              <div className="bg-green-600 text-white p-3 rounded-2xl rounded-tr-none shadow-sm max-w-md">
                 <p className="text-sm">Bonjour, j'ai bien reçu votre message. Je ferai le nécessaire.</p>
                 <p className="text-[10px] text-green-100 mt-1">14:45</p>
              </div>
           </div>
        </div>

        <div className="p-4 border-t">
           <div className="flex gap-2">
              <input type="text" placeholder="Écrivez votre message..." className="flex-1 px-4 py-2 border rounded-xl focus:ring-2 focus:ring-green-500/20 outline-none" />
              <Button className="bg-green-600 hover:bg-green-700 h-10 w-10 p-0 rounded-xl">
                 <Send className="h-4 w-4" />
              </Button>
           </div>
        </div>
      </Card>
    </div>
  )
}
