"use client"
import * as React from "react"
import { Card } from "@/components/ui/card"
import { Send, Search, User, UserCheck, ShieldCheck } from "lucide-react"
import { Button } from "@/components/ui/button"
import { getConversations, getAdminUsers, getParentContacts } from "@/actions/data"
import { sendMessage } from "@/actions/teacher"
import { getSessionUser } from "@/actions/auth"

interface MessagingUIProps {
    primaryColorClass: string;
    roleLabel: string;
}

export function MessagingUI({ primaryColorClass, roleLabel }: MessagingUIProps) {
  const [conversations, setConversations] = React.useState<any[]>([])
  const [selectedConv, setSelectedConv] = React.useState<any>(null)
  const [searchTerm, setSearchTerm] = React.useState("")
  const [contacts, setContacts] = React.useState<any[]>([])
  const [currentUser, setCurrentUser] = React.useState<any>(null)
  const [newMessage, setNewMessage] = React.useState("")
  const [mobileShowChat, setMobileShowChat] = React.useState(false)

  React.useEffect(() => {
    const init = async () => {
        const user = await getSessionUser()
        setCurrentUser(user)

        if (user?.role === 'PARENT') {
            const res = await getParentContacts()
            setContacts(res)
        } else {
            const res = await getAdminUsers()
            setContacts(res)
        }
        fetchConvs()
    }
    init()
  }, [])

  const fetchConvs = async () => {
    const res = await getConversations()
    setConversations(res)
    if (selectedConv) {
        const updated = res.find((c: any) => c.user.id === selectedConv.user.id)
        if (updated) setSelectedConv(updated)
    }
  }

  const handleSend = async () => {
    if (!newMessage.trim() || !selectedConv || !currentUser) return
    const fd = new FormData()
    fd.append("senderId", currentUser.id.toString())
    fd.append("receiverId", selectedConv.user.id.toString())
    fd.append("content", newMessage)
    await sendMessage(fd)
    setNewMessage("")
    fetchConvs()
  }

  const filteredContacts = contacts.filter(u =>
    u.id !== currentUser?.id &&
    (u.name.toLowerCase().includes(searchTerm.toLowerCase()) || u.email.toLowerCase().includes(searchTerm.toLowerCase()))
  )

  const handleSelectConv = (conv: any) => {
    setSelectedConv(conv)
    setMobileShowChat(true)
  }

  return (
    <div className="h-[calc(100vh-14rem)] md:h-[calc(100vh-12rem)] flex gap-6 relative">
      {/* Contact List */}
      <Card className={`w-full md:w-80 flex flex-col overflow-hidden border-gray-100 shadow-sm ${mobileShowChat ? 'hidden md:flex' : 'flex'}`}>
        <div className="p-4 border-b bg-gray-50/30">
           <div className="relative">
              <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-gray-400" />
              <input
                type="text"
                placeholder="Rechercher un contact..."
                className="w-full pl-9 pr-4 py-2 bg-white border border-gray-200 rounded-lg text-sm"
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
              />
           </div>
        </div>
        <div className="flex-1 overflow-y-auto">
           {searchTerm ? (
             filteredContacts.map((u) => (
               <div
                 key={u.id}
                 onClick={() => {
                    const existing = conversations.find(c => c.user.id === u.id)
                    handleSelectConv(existing || { user: u, messages: [] })
                    setSearchTerm("")
                 }}
                 className="p-4 border-b cursor-pointer hover:bg-gray-50 transition-colors"
               >
                  <p className="font-bold text-sm text-gray-900">{u.name}</p>
                  <p className="text-[10px] text-gray-500 uppercase">{u.role === 'SCHOOL_ADMIN' ? 'Direction' : 'Professeur'}</p>
               </div>
             ))
           ) : (
             conversations.map((conv) => (
                <div
                  key={conv.user.id}
                  onClick={() => handleSelectConv(conv)}
                  className={`p-4 border-b cursor-pointer transition-colors ${selectedConv?.user.id === conv.user.id ? primaryColorClass.replace('bg-', 'bg-') + '/10 border-r-4 border-r-' + primaryColorClass.replace('bg-', '') : 'hover:bg-gray-50'}`}
                >
                   <div className="flex justify-between items-start mb-1">
                      <p className="font-bold text-sm text-gray-900">{conv.user.name}</p>
                      <span className="text-[10px] text-gray-400">
                        {conv.messages.length > 0 ? new Date(conv.messages[conv.messages.length-1].createdAt).toLocaleTimeString([], {hour: '2-digit', minute:'2-digit'}) : ''}
                      </span>
                   </div>
                   <p className="text-xs text-gray-500 truncate">
                     {conv.messages.length > 0 ? conv.messages[conv.messages.length-1].content : 'Aucun message'}
                   </p>
                </div>
              ))
           )}
           {!searchTerm && conversations.length === 0 && (
            <div className="p-8 text-center space-y-4">
                 <p className="text-gray-400 text-xs italic">Démarrer une conversation avec la direction ou les professeurs.</p>
                 <div className="space-y-2">
                    {contacts.slice(0,3).map(c => (
                        <button key={c.id} onClick={() => handleSelectConv({user: c, messages: []})} className="w-full text-left p-3 bg-gray-50 rounded-xl text-xs font-bold text-slate-600 hover:bg-gray-100 flex items-center gap-3">
                            <div className="h-6 w-6 rounded-full bg-slate-900 text-white flex items-center justify-center text-[10px]">{c.name.charAt(0)}</div>
                            {c.name}
                        </button>
                    ))}
                 </div>
            </div>
           )}
        </div>
      </Card>

      {/* Chat Area */}
      <Card className={`flex-1 flex flex-col overflow-hidden border-gray-100 ${mobileShowChat ? 'flex' : 'hidden md:flex'}`}>
        {selectedConv ? (
            <>
                <div className="p-4 border-b bg-gray-50/50 flex items-center justify-between">
                    <div className="flex items-center gap-3">
                        <button
                            onClick={() => setMobileShowChat(false)}
                            className="md:hidden p-2 -ml-2 text-gray-500 hover:text-gray-700"
                        >
                            <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" /></svg>
                        </button>
                        <div className={`h-10 w-10 rounded-full flex items-center justify-center text-white font-bold ${primaryColorClass}`}>
                            {selectedConv.user.name.charAt(0)}
                        </div>
                        <div>
                            <p className="font-bold text-gray-900">{selectedConv.user.name}</p>
                            <p className="text-xs text-gray-500 capitalize">{selectedConv.user.role === 'SCHOOL_ADMIN' ? 'Direction' : 'Professeur'}</p>
                        </div>
                    </div>
                </div>

                <div className="flex-1 p-4 md:p-6 overflow-y-auto space-y-4 bg-slate-50/30 flex flex-col">
                    {selectedConv.messages.map((msg: any) => (
                        <div key={msg.id} className={`flex ${msg.senderId === currentUser?.id ? 'justify-end' : 'justify-start'}`}>
                            <div className={`p-3 rounded-2xl max-w-[85%] md:max-w-md shadow-sm border ${
                                msg.senderId === currentUser?.id
                                ? `${primaryColorClass} text-white rounded-tr-none`
                                : 'bg-white text-gray-800 border-gray-100 rounded-tl-none'
                            }`}>
                                <p className="text-sm">{msg.content}</p>
                                <p className={`text-[9px] mt-1 ${msg.senderId === currentUser?.id ? 'opacity-70' : 'text-gray-400'}`}>
                                    {new Date(msg.createdAt).toLocaleTimeString([], {hour: '2-digit', minute:'2-digit'})}
                                </p>
                            </div>
                        </div>
                    ))}
                    {selectedConv.messages.length === 0 && (
                        <p className="text-center text-gray-400 text-xs italic mt-10">Posez vos questions ici.</p>
                    )}
                </div>

                <div className="p-4 border-t bg-white">
                   <div className="flex gap-2">
                      <input
                        type="text"
                        placeholder="Écrivez votre message..."
                        className="flex-1 px-4 py-2 border rounded-xl focus:ring-2 focus:ring-primary/20 outline-none text-sm font-medium"
                        value={newMessage}
                        onChange={(e) => setNewMessage(e.target.value)}
                        onKeyDown={(e) => e.key === 'Enter' && handleSend()}
                      />
                      <Button
                        onClick={handleSend}
                        disabled={!newMessage.trim() || !selectedConv}
                        variant="primary"
                        className={`${primaryColorClass} hover:opacity-90 h-10 w-10 p-0 rounded-xl shadow-lg shadow-primary/20`}
                      >
                         <Send className="h-4 w-4" />
                      </Button>
                   </div>
                </div>
            </>
        ) : (
            <div className="flex-1 flex flex-col items-center justify-center bg-slate-50/30 text-gray-400 p-8 text-center">
                <MessageSquare className="h-12 w-12 mb-4 opacity-20" />
                <p className="italic text-sm">Sélectionnez un membre de l'école pour échanger.</p>
            </div>
        )}
      </Card>
    </div>
  )
}

function MessageSquare(props: any) {
  return (
    <svg
      {...props}
      xmlns="http://www.w3.org/2000/svg"
      width="24"
      height="24"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
    >
      <path d="M21 15a2 2 0 0 1-2 2H7l-4 4V5a2 2 0 0 1 2-2h14a2 2 0 0 1 2 2z" />
    </svg>
  )
}
