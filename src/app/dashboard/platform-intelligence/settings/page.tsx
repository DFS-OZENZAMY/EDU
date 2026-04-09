import { Card } from "@/components/ui/card"
import { Globe, Shield, Zap, Mail, Server } from "lucide-react"
import { Button } from "@/components/ui/button"

export default function SuperSettingsPage() {
  const configs = [
    { title: "Domain Management", desc: "Configure default subdomains and SSL settings.", icon: Globe, status: "Active" },
    { title: "Security Polices", desc: "Two-factor authentication and role permissions.", icon: Shield, status: "Strict" },
    { title: "Integration Services", desc: "API Webhooks and Stripe connection.", icon: Zap, status: "Enabled" },
    { title: "SMTP Configuration", desc: "System notifications and welcome emails.", icon: Mail, status: "Ready" },
    { title: "Server Health", desc: "Monitor database and background workers.", icon: Server, status: "99.9% Uptime" },
  ]

  return (
    <div className="space-y-8">
      <div>
        <h1 className="text-3xl font-black text-slate-900 tracking-tighter uppercase italic">
          Platform <span className="text-blue-600">Configuration</span>
        </h1>
        <p className="text-slate-500 font-bold text-sm mt-1 uppercase tracking-widest">Global SaaS Settings & Health</p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {configs.map((c, i) => (
          <Card key={i} className="p-8 border-0 shadow-2xl shadow-slate-200/50 rounded-[32px] group hover:bg-slate-900 transition-all duration-500 cursor-pointer">
            <div className="h-14 w-14 bg-blue-50 text-blue-600 rounded-2xl flex items-center justify-center mb-6 group-hover:bg-blue-500 group-hover:text-white transition-colors duration-500">
              <c.icon className="h-7 w-7" />
            </div>
            <h3 className="text-xl font-black text-slate-900 group-hover:text-white mb-2 transition-colors duration-500 uppercase tracking-tighter">{c.title}</h3>
            <p className="text-slate-500 group-hover:text-slate-400 font-medium text-sm mb-6 transition-colors duration-500 leading-relaxed italic">{c.desc}</p>
            <div className="flex justify-between items-center">
              <span className="px-3 py-1 bg-slate-50 text-slate-400 rounded-full text-[10px] font-black uppercase tracking-widest group-hover:bg-white/10 group-hover:text-blue-400 transition-all">
                {c.status}
              </span>
              <Button size="sm" variant="outline" className="rounded-xl font-bold group-hover:bg-white group-hover:text-slate-900 border-2 transition-all">Edit</Button>
            </div>
          </Card>
        ))}
      </div>

      <Card className="p-8 border-0 shadow-xl shadow-slate-200/50 rounded-3xl bg-blue-600 text-white overflow-hidden relative group">
        <div className="relative z-10 flex flex-col md:flex-row justify-between items-center gap-6 text-center md:text-left">
          <div>
            <h2 className="text-2xl font-black uppercase tracking-tighter">Emergency Maintenance Mode</h2>
            <p className="text-blue-100 font-bold italic mt-1">This will pause all institution activities across the platform.</p>
          </div>
          <Button variant="outline" className="bg-white text-red-600 hover:bg-red-50 border-0 rounded-2xl px-12 py-7 font-black uppercase tracking-widest shadow-xl transition-transform active:scale-95 shrink-0">
            ACTIVATE SYSTEM LOCKDOWN
          </Button>
        </div>
        <div className="absolute -bottom-8 -right-8 h-48 w-48 bg-white/10 rounded-full blur-3xl group-hover:scale-150 transition-transform duration-1000" />
      </Card>
    </div>
  )
}
