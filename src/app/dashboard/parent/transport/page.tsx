"use client"
import * as React from "react"
import { Card } from "@/components/ui/card"
import { Truck, MapPin, Clock, Phone, ShieldCheck, AlertCircle, Navigation, ChevronRight, User } from "lucide-react"
import { cn } from "@/lib/utils"
import { getMyData } from "@/actions/data"

export default function ParentTransportPage() {
  const [isBusMoving, setIsBusMoving] = React.useState(true)
  const [student, setStudent] = React.useState<any>(null)

  React.useEffect(() => {
    getMyData().then(res => {
      if (res?.students?.[0]) {
        setStudent(res.students[0])
      }
    })
  }, [])

  const route = student?.busRoute

  return (
    <div className="space-y-10 animate-in fade-in duration-500 pb-20">
      <div className="flex flex-col sm:flex-row justify-between items-end gap-6 border-b border-gray-200 pb-8">
        <div>
          <h2 className="text-4xl font-black text-slate-900 tracking-tight uppercase italic">Transport & Sécurité</h2>
          <p className="text-slate-500 font-bold mt-1 uppercase text-xs tracking-widest">Suivi GPS et informations sur la ligne scolaire</p>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-10">
         {/* Live Map Simulation */}
         <div className="lg:col-span-2 space-y-6">
            <Card className="p-0 border-0 shadow-2xl rounded-[40px] bg-slate-100 overflow-hidden relative min-h-[500px]">
               <div className="absolute inset-0 bg-blue-50 opacity-50 flex items-center justify-center">
                  {/* Grid pattern mock for map */}
                  <div className="w-full h-full" style={{backgroundImage: 'radial-gradient(#cbd5e1 1px, transparent 1px)', backgroundSize: '40px 40px'}} />
               </div>

               {/* Animated Bus Icon */}
               <div className={cn(
                  "absolute transition-all duration-1000",
                  isBusMoving ? "top-1/3 left-1/2" : "top-1/2 left-1/3"
               )}>
                  <div className="relative">
                    <div className="absolute -inset-4 bg-primary/20 rounded-full animate-ping" />
                    <div className="relative bg-primary text-white p-3 rounded-2xl shadow-2xl">
                        <Truck className="h-6 w-6" />
                    </div>
                  </div>
               </div>

               {/* Map Overlay info */}
               <div className="absolute bottom-10 left-10 right-10">
                  <Card className="p-6 bg-white/90 backdrop-blur-md border-0 shadow-2xl rounded-[32px] flex items-center justify-between">
                     <div className="flex items-center gap-6">
                        <div className="h-12 w-12 bg-slate-900 text-white rounded-2xl flex items-center justify-center font-black italic">
                          {route?.busNumber || "---"}
                        </div>
                        <div>
                           <p className="text-[10px] font-black text-primary uppercase tracking-widest mb-1">Ligne: {route?.name || "Non assignée"}</p>
                           <h4 className="text-lg font-black text-slate-900">
                             {isBusMoving ? "En mouvement..." : "À l'arrêt"}
                           </h4>
                        </div>
                     </div>
                     <div className="text-right">
                        <p className="text-[10px] font-black text-slate-400 uppercase tracking-widest mb-1">Arrivée Prévue</p>
                        <h4 className="text-lg font-black text-emerald-600 italic">~ 8 minutes</h4>
                     </div>
                  </Card>
               </div>

               <button
                onClick={() => setIsBusMoving(!isBusMoving)}
                className="absolute top-10 right-10 p-3 bg-white shadow-xl rounded-2xl hover:scale-110 transition-transform"
               >
                  <Navigation className="h-5 w-5 text-primary" />
               </button>
            </Card>
         </div>

         <div className="space-y-10">
            <Card className="p-8 border-0 shadow-sm rounded-[40px] bg-white">
                <div className="flex items-center gap-3 mb-8">
                    <div className="p-2 bg-blue-50 text-blue-600 rounded-xl"><User className="h-5 w-5" /></div>
                    <h4 className="font-black text-slate-900 uppercase tracking-tight">Conducteur & Ligne</h4>
                </div>
                <div className="space-y-6">
                   <div className="flex items-center gap-4">
                      <div className="h-12 w-12 rounded-full bg-slate-50 border border-slate-100 flex items-center justify-center">
                         <User className="h-6 w-6 text-slate-400" />
                      </div>
                      <div>
                         <p className="text-sm font-black text-slate-900 uppercase">{route?.driverName || "Non assigné"}</p>
                         <p className="text-[10px] font-bold text-slate-400 uppercase italic">Conducteur Ligne {route?.name}</p>
                      </div>
                   </div>
                   <div className="pt-6 border-t border-slate-50 space-y-4">
                      <div className="flex justify-between items-center">
                         <span className="text-[10px] font-black text-slate-400 uppercase">Numéro de ligne</span>
                         <span className="text-xs font-black">{route?.name || "Non assignée"}</span>
                      </div>
                      <div className="flex justify-between items-center">
                         <span className="text-[10px] font-black text-slate-400 uppercase">Immatriculation</span>
                         <span className="text-xs font-black">{route?.busNumber || "N/A"}</span>
                      </div>
                      <button className="w-full mt-4 flex items-center justify-center gap-2 bg-slate-900 text-white py-4 rounded-2xl text-[10px] font-black uppercase tracking-widest hover:bg-slate-800 transition-all">
                         <Phone className="h-4 w-4" /> APPELER LE CONVOYAGE
                      </button>
                   </div>
                </div>
            </Card>

            <Card className="p-8 rounded-[40px] border-0 shadow-sm bg-emerald-50 relative overflow-hidden group">
                <div className="absolute top-0 right-0 p-8 opacity-10 rotate-12"><ShieldCheck className="h-32 w-32 text-emerald-600" /></div>
                <div className="relative z-10">
                    <h3 className="text-xl font-black uppercase tracking-tight mb-4 italic text-emerald-900">Sécurité Garantie</h3>
                    <p className="text-emerald-700/80 font-medium text-xs leading-relaxed mb-6">Tous nos véhicules sont équipés de limitateurs de vitesse et d'un système de surveillance vidéo intérieur.</p>
                    <button className="flex items-center gap-2 text-[10px] font-black text-emerald-600 uppercase tracking-widest">Voir la charte de sécurité <ChevronRight className="h-4 w-4" /></button>
                </div>
            </Card>
         </div>
      </div>
    </div>
  )
}
