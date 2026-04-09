"use client"
import * as React from "react"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Truck, MapPin, Users, AlertCircle, Plus, Phone, Clock, ChevronRight, Navigation } from "lucide-react"
import { Button } from "@/components/ui/button"
import { getBusRoutes, createBusRoute } from "@/actions/transport"

export default function TransportPage() {
  const [routes, setRoutes] = React.useState<any[]>([])
  const [loading, setLoading] = React.useState(true)

  React.useEffect(() => {
    getBusRoutes().then(res => {
      setRoutes(res)
      setLoading(false)
    })
  }, [])

  return (
    <div className="p-6 space-y-10 animate-in fade-in duration-500">
      <div className="flex justify-between items-end border-b border-slate-200 pb-8">
        <div>
          <h1 className="text-4xl font-black text-slate-900 tracking-tight italic uppercase">Transport Scolaire</h1>
          <p className="text-slate-500 font-bold mt-1 uppercase text-xs tracking-widest">Gestion des lignes, conducteurs et itinéraires</p>
        </div>
        <Button className="rounded-2xl font-black uppercase tracking-widest text-[10px] h-12 px-8 shadow-xl bg-slate-900">
           <Plus className="w-4 h-4 mr-2" /> Nouvelle Ligne
        </Button>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
        {[
          { label: "Lignes Actives", value: routes.length.toString(), icon: Truck, color: "text-blue-600", bg: "bg-blue-50" },
          { label: "Élèves Transportés", value: routes.reduce((acc, r) => acc + (r._count?.students || 0), 0).toString(), icon: Users, color: "text-emerald-600", bg: "bg-emerald-50" },
          { label: "Taux de Remplissage", value: "78%", icon: Navigation, color: "text-purple-600", bg: "bg-purple-50" },
          { label: "Bus en Alerte", value: "0", icon: AlertCircle, color: "text-red-600", bg: "bg-red-50" },
        ].map((stat, i) => (
          <Card key={i} className="border-0 shadow-sm rounded-[32px] overflow-hidden">
            <CardContent className="pt-8">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-[10px] font-black text-slate-400 uppercase tracking-widest mb-1">{stat.label}</p>
                  <p className="text-3xl font-black text-slate-900">{stat.value}</p>
                </div>
                <div className={stat.bg + " p-4 rounded-2xl"}>
                   <stat.icon className={`w-6 h-6 ${stat.color}`} />
                </div>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-10">
        <div className="lg:col-span-2 space-y-6">
            <h3 className="text-xl font-black text-slate-900 uppercase tracking-tight italic flex items-center gap-3">
               <div className="w-2 h-8 bg-blue-600 rounded-full" />
               Itinéraires & Suivi
            </h3>

            <div className="grid grid-cols-1 gap-6">
               {routes.length === 0 && !loading && (
                 <Card className="p-12 text-center border-2 border-dashed border-slate-200 rounded-[40px] bg-slate-50/50">
                    <Truck className="w-12 h-12 text-slate-300 mx-auto mb-4" />
                    <p className="text-slate-500 font-bold uppercase text-[10px] tracking-widest">Aucune ligne configurée</p>
                 </Card>
               )}

               {routes.map((route) => (
                 <Card key={route.id} className="p-8 border-0 shadow-xl rounded-[40px] bg-white group hover:scale-[1.01] transition-all">
                    <div className="flex flex-col md:flex-row justify-between gap-6">
                       <div className="flex-1 space-y-4">
                          <div className="flex items-center justify-between">
                             <h4 className="text-2xl font-black text-slate-900 tracking-tighter uppercase italic">{route.name}</h4>
                             <span className="text-[10px] font-black bg-emerald-100 text-emerald-700 px-3 py-1 rounded-full uppercase tracking-widest">Opérationnel</span>
                          </div>

                          <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
                             <div className="space-y-1">
                                <p className="text-[9px] font-black text-slate-400 uppercase">Conducteur</p>
                                <p className="text-sm font-bold text-slate-900">{route.driverName || "Non assigné"}</p>
                             </div>
                             <div className="space-y-1">
                                <p className="text-[9px] font-black text-slate-400 uppercase">Matricule Bus</p>
                                <p className="text-sm font-bold text-slate-900">{route.busNumber || "---"}</p>
                             </div>
                             <div className="space-y-1">
                                <p className="text-[9px] font-black text-slate-400 uppercase">Occupation</p>
                                <p className="text-sm font-bold text-slate-900">{route._count?.students || 0} / {route.capacity} élèves</p>
                             </div>
                          </div>

                          <div className="pt-4 flex flex-wrap gap-2">
                             {route.stops?.map((stop: any, idx: number) => (
                               <div key={idx} className="flex items-center gap-2 bg-slate-50 border border-slate-100 px-3 py-1.5 rounded-xl">
                                  <MapPin className="w-3 h-3 text-blue-500" />
                                  <span className="text-[10px] font-bold text-slate-700">{stop.name}</span>
                                  <span className="text-[9px] text-slate-400 font-black">{stop.time}</span>
                               </div>
                             ))}
                          </div>
                       </div>

                       <div className="md:w-48 flex flex-col gap-3">
                          <Button variant="outline" className="w-full rounded-2xl font-black text-[10px] uppercase tracking-widest h-12">
                             <Users className="w-4 h-4 mr-2" /> Liste Élèves
                          </Button>
                          <Button className="w-full rounded-2xl font-black text-[10px] uppercase tracking-widest h-12 bg-slate-900">
                             <Navigation className="w-4 h-4 mr-2" /> Voir Carte
                          </Button>
                       </div>
                    </div>
                 </Card>
               ))}
            </div>
        </div>

        <div className="space-y-10">
            <Card className="p-8 border-0 shadow-sm rounded-[40px] bg-slate-900 text-white overflow-hidden relative">
               <div className="absolute top-0 right-0 p-8 opacity-10 rotate-12"><Navigation className="h-32 w-32" /></div>
               <div className="relative z-10">
                  <h3 className="text-xl font-black uppercase tracking-tight mb-4 italic">Suivi Live</h3>
                  <div className="p-4 bg-white/10 backdrop-blur-md rounded-2xl border border-white/20 mb-6">
                     <div className="flex items-center gap-4">
                        <div className="h-10 w-10 bg-emerald-500 rounded-xl flex items-center justify-center animate-pulse">
                           <Truck className="h-5 w-5 text-white" />
                        </div>
                        <div>
                           <p className="text-[10px] font-black text-emerald-400 uppercase tracking-widest">Bus B3 en route</p>
                           <p className="text-xs font-bold text-white">Prochain arrêt: Mâarif (5 min)</p>
                        </div>
                     </div>
                  </div>
                  <Button className="w-full bg-white text-slate-900 font-black uppercase text-[10px] tracking-widest h-12 rounded-2xl hover:bg-slate-100 transition-all">
                     Lancer le dashboard live
                  </Button>
               </div>
            </Card>

            <Card className="p-8 border-0 shadow-sm rounded-[40px] bg-white">
               <h4 className="font-black text-slate-900 uppercase tracking-tight mb-6 italic">Incidents & Alertes</h4>
               <div className="space-y-4">
                  {[
                    { title: "Retard Signalé", time: "08:15", bus: "Ligne 04", desc: "Embouteillages Boulevard Ghandi" },
                  ].map((alert, i) => (
                    <div key={i} className="p-4 bg-red-50 border border-red-100 rounded-2xl flex gap-4">
                       <div className="p-2 bg-red-100 rounded-xl h-fit">
                          <AlertCircle className="w-4 h-4 text-red-600" />
                       </div>
                       <div>
                          <p className="text-xs font-black text-slate-900 uppercase tracking-tighter">{alert.title}</p>
                          <p className="text-[10px] text-red-600 font-bold mb-2">{alert.bus} • {alert.time}</p>
                          <p className="text-[10px] text-slate-600 font-medium leading-relaxed">{alert.desc}</p>
                       </div>
                    </div>
                  ))}
                  <p className="text-center text-slate-400 text-[10px] font-bold uppercase tracking-widest py-4">Historique complet <ChevronRight className="inline w-3 h-3" /></p>
               </div>
            </Card>
        </div>
      </div>
    </div>
  )
}
