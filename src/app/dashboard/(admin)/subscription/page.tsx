"use client"
import * as React from "react"
import { Card } from "@/components/ui/card"
import { ShieldCheck, Zap, Globe, HardDrive, CheckCircle2, MoreVertical, CreditCard } from "lucide-react"
import { cn } from "@/lib/utils"

export default function SubscriptionPage() {
  const tiers = [
    { name: "Free", price: "0 DH", features: ["100 Students", "Basic SIS", "Email Support"], current: true, color: "slate" },
    { name: "Standard", price: "499 DH", features: ["500 Students", "Attendance + Grades", "SMS Alerts"], current: false, color: "blue" },
    { name: "Premium", price: "1,499 DH", features: ["Unlimited Students", "Financial Suite", "AI Predictor"], current: false, color: "emerald" },
    { name: "Enterprise", price: "Custom", features: ["SSO + API Access", "Dedicated Support", "Full Whitelabel"], current: false, color: "indigo" },
  ]

  return (
    <div className="space-y-8 animate-in fade-in duration-500 pb-20">
      <div className="flex flex-col sm:flex-row justify-between items-end gap-6 border-b border-gray-200 pb-8">
        <div>
          <h2 className="text-4xl font-black text-slate-900 tracking-tight">Platform Subscription</h2>
          <p className="text-slate-500 font-bold mt-1 uppercase text-xs tracking-widest">Billing Cycle & Feature Management</p>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-4 gap-8">
        {tiers.map((tier) => (
          <Card key={tier.name} className={cn(
              "p-10 border-0 shadow-2xl shadow-slate-200/50 rounded-[40px] flex flex-col relative overflow-hidden group transition-all hover:scale-[1.02]",
              tier.current && "ring-4 ring-blue-500/20 bg-white"
          )}>
            {tier.current && (
                <div className="absolute top-6 right-6 px-3 py-1 bg-blue-50 text-blue-600 rounded-full text-[10px] font-black uppercase tracking-widest border border-blue-100">
                    CURRENT PLAN
                </div>
            )}
            <div className="mb-10">
                <p className="text-xs font-black text-slate-400 uppercase tracking-[0.2em] mb-3">{tier.name}</p>
                <p className="text-3xl font-black text-slate-900 tracking-tighter">{tier.price} <span className="text-sm font-bold text-slate-400">/mo</span></p>
            </div>
            <div className="space-y-4 mb-12 flex-1">
                {tier.features.map((f, i) => (
                    <div key={i} className="flex items-center gap-3">
                        <CheckCircle2 className="h-4 w-4 text-emerald-500 shrink-0" />
                        <span className="text-xs font-bold text-slate-600 tracking-tight">{f}</span>
                    </div>
                ))}
            </div>
            <button className={cn(
                "w-full py-5 rounded-2xl text-[10px] font-black uppercase tracking-[0.2em] transition-all",
                tier.current
                    ? 'bg-slate-50 text-slate-400 cursor-default'
                    : 'bg-slate-900 text-white hover:bg-slate-800 shadow-xl shadow-slate-900/10 active:scale-95'
            )}>
                {tier.current ? 'ACTIVE INSTANCE' : 'UPGRADE SYSTEM'}
            </button>
          </Card>
        ))}
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
          <Card className="p-10 border-0 shadow-sm rounded-[40px] bg-slate-900 text-white relative overflow-hidden group">
              <div className="absolute top-0 right-0 p-10 opacity-10">
                  <Globe className="h-40 w-40" />
              </div>
              <div className="relative z-10">
                <h3 className="text-2xl font-black tracking-tight mb-8">Billing Information</h3>
                <div className="space-y-6">
                    <div className="flex items-center gap-4">
                        <div className="h-12 w-12 bg-white/10 rounded-2xl flex items-center justify-center text-white backdrop-blur-md">
                            <CreditCard className="h-6 w-6" />
                        </div>
                        <div>
                            <p className="text-[10px] font-black text-slate-400 uppercase tracking-widest">Payment Method</p>
                            <p className="text-sm font-bold tracking-tight">Visa ending in •••• 4242</p>
                        </div>
                    </div>
                    <div className="flex items-center gap-4">
                        <div className="h-12 w-12 bg-white/10 rounded-2xl flex items-center justify-center text-white backdrop-blur-md">
                            <Zap className="h-6 w-6" />
                        </div>
                        <div>
                            <p className="text-[10px] font-black text-slate-400 uppercase tracking-widest">Next Renewal</p>
                            <p className="text-sm font-bold tracking-tight">July 15, 2026 (0 DH - FREE Tier)</p>
                        </div>
                    </div>
                </div>
                <button className="mt-12 px-8 py-4 bg-white text-slate-900 rounded-2xl text-[10px] font-black uppercase tracking-widest hover:bg-blue-50 transition-all flex items-center gap-2">
                    UPDATE BILLING <Zap className="h-4 w-4 fill-current" />
                </button>
              </div>
          </Card>

          <Card className="p-10 border-0 shadow-sm rounded-[40px] bg-white flex flex-col justify-center">
              <h3 className="text-2xl font-black tracking-tight text-slate-900 mb-8">Platform Quotas</h3>
              <div className="space-y-8">
                  <div className="space-y-2">
                      <div className="flex justify-between items-end">
                          <p className="text-[10px] font-black text-slate-400 uppercase tracking-widest">Student Storage</p>
                          <p className="text-xs font-black text-slate-900">12 / 100</p>
                      </div>
                      <div className="h-3 bg-slate-100 rounded-full overflow-hidden p-0.5">
                          <div className="h-full w-[12%] bg-blue-500 rounded-full shadow-sm shadow-blue-500/50" />
                      </div>
                  </div>
                  <div className="space-y-2">
                      <div className="flex justify-between items-end">
                          <p className="text-[10px] font-black text-slate-400 uppercase tracking-widest">File Repository</p>
                          <p className="text-xs font-black text-slate-900">2.4 GB / 5 GB</p>
                      </div>
                      <div className="h-3 bg-slate-100 rounded-full overflow-hidden p-0.5">
                          <div className="h-full w-[48%] bg-purple-500 rounded-full shadow-sm shadow-purple-500/50" />
                      </div>
                  </div>
              </div>
              <p className="mt-8 text-xs font-bold text-slate-400 italic">Quota resets on next billing cycle. Upgrade to Standard for higher limits.</p>
          </Card>
      </div>
    </div>
  )
}
