import { Card } from "@/components/ui/card"
import { Users, BarChart3, Wallet, Bell, CheckCircle2, AlertCircle } from "lucide-react"

export default function ParentDashboardPage() {
  return (
    <div className="space-y-8">
      {/* Overview Banner */}
      <div className="bg-blue-600 rounded-2xl p-8 text-white flex justify-between items-center overflow-hidden relative">
        <div className="relative z-10">
          <h2 className="text-2xl font-bold mb-2">Bonjour Mme Salma !</h2>
          <p className="text-blue-100 max-w-md">Tout va bien pour Youssef cette semaine. 100% de présence enregistrée.</p>
        </div>
        <Users className="h-32 w-32 text-white/10 absolute -right-4 -bottom-4 rotate-12" />
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
         <div className="lg:col-span-2 space-y-8">
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
               <Card className="p-6">
                  <div className="flex justify-between items-start mb-6">
                     <div className="bg-green-50 text-green-600 p-2 rounded-lg">
                        <CheckCircle2 className="h-6 w-6" />
                     </div>
                     <span className="text-[10px] font-bold text-green-600 uppercase">A jour</span>
                  </div>
                  <h4 className="font-bold text-gray-900">Paiement Scolarité</h4>
                  <p className="text-2xl font-bold text-gray-900 mt-2">Avril 2026</p>
                  <p className="text-xs text-gray-500 mt-1">Payé le 02/04/2026</p>
               </Card>
               <Card className="p-6">
                  <div className="flex justify-between items-start mb-6">
                     <div className="bg-blue-50 text-blue-600 p-2 rounded-lg">
                        <BarChart3 className="h-6 w-6" />
                     </div>
                     <span className="text-[10px] font-bold text-blue-600 uppercase">Trimestre 2</span>
                  </div>
                  <h4 className="font-bold text-gray-900">Moyenne Générale</h4>
                  <p className="text-2xl font-bold text-gray-900 mt-2">17.45 / 20</p>
                  <p className="text-xs text-gray-500 mt-1">2ème sur 28 élèves</p>
               </Card>
            </div>

            {/* Recent Grades */}
            <Card className="p-6">
               <h3 className="font-bold text-gray-900 text-lg mb-6">Derniers Résultats</h3>
               <div className="space-y-4">
                  {[
                     { subject: "Mathématiques", title: "Contrôle N°2", grade: "18.5/20", date: "Hier", status: "Très Bien" },
                     { subject: "Français", title: "Dictée", grade: "16/20", date: "12 Avril", status: "Bien" },
                     { subject: "Arabe", title: "Expression Orale", grade: "19/20", date: "10 Avril", status: "Excellent" },
                  ].map((item, i) => (
                     <div key={i} className="flex items-center justify-between p-4 rounded-xl border border-gray-100 hover:bg-slate-50 transition-colors">
                        <div>
                           <p className="text-xs font-bold text-blue-600 uppercase tracking-tight">{item.subject}</p>
                           <p className="text-sm font-bold text-gray-900">{item.title}</p>
                           <p className="text-[10px] text-gray-500">{item.date}</p>
                        </div>
                        <div className="text-right">
                           <p className="text-lg font-bold text-gray-900">{item.grade}</p>
                           <p className="text-[10px] font-bold text-green-600 italic">{item.status}</p>
                        </div>
                     </div>
                  ))}
               </div>
            </Card>
         </div>

         <div className="space-y-8">
            <Card className="p-6">
               <h3 className="font-bold text-gray-900 text-lg mb-6">Notifications</h3>
               <div className="space-y-4">
                  {[
                     { text: "Réunion parents-profs ce Vendredi à 17h.", type: "urgent" },
                     { text: "Excursion scolaire prévue pour le 25 Mai.", type: "info" },
                     { text: "Nouveau cahier de texte disponible (Français).", type: "update" },
                  ].map((notif, i) => (
                     <div key={i} className={`p-4 rounded-xl flex gap-3 ${
                        notif.type === "urgent" ? "bg-red-50 text-red-700 border border-red-100" : "bg-gray-50 text-gray-700 border border-gray-100"
                     }`}>
                        <Bell className="h-5 w-5 shrink-0" />
                        <p className="text-xs font-medium leading-relaxed">{notif.text}</p>
                     </div>
                  ))}
               </div>
            </Card>

            <Card className="p-6 bg-gradient-to-br from-blue-700 to-indigo-800 text-white border-0">
               <h4 className="font-bold text-lg mb-2">Cantine & Transport</h4>
               <p className="text-xs text-blue-200 mb-6 leading-relaxed italic">Vérifiez le menu de la semaine et suivez le bus scolaire en temps réel.</p>
               <div className="space-y-2">
                  <button className="w-full py-2 bg-white/20 hover:bg-white/30 rounded-lg text-xs font-bold transition-all backdrop-blur-sm">Menu de la semaine</button>
                  <button className="w-full py-2 bg-white/20 hover:bg-white/30 rounded-lg text-xs font-bold transition-all backdrop-blur-sm">Suivi Bus Temps Réel</button>
               </div>
            </Card>
         </div>
      </div>
    </div>
  )
}
