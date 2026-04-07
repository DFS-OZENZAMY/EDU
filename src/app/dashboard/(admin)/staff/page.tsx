"use client"
import * as React from "react"
import { Card } from "@/components/ui/card"
import { ShieldCheck, UserPlus, CreditCard, Clock, Search, MoreVertical, HardDrive, Download } from "lucide-react"
import { cn } from "@/lib/utils"

export default function StaffPage() {
  return (
    <div className="space-y-8 animate-in fade-in duration-500 pb-20">
      <div className="flex flex-col sm:flex-row justify-between items-end gap-6 border-b border-gray-200 pb-8">
        <div>
          <h2 className="text-4xl font-black text-slate-900 tracking-tight">Staff & Payroll</h2>
          <p className="text-slate-500 font-bold mt-1 uppercase text-xs tracking-widest">Employee Management & Leave Requests</p>
        </div>
        <div className="flex gap-3">
            <button className="bg-slate-900 text-white px-6 py-3 rounded-xl text-[10px] font-black uppercase tracking-widest flex items-center gap-2">
                <UserPlus className="h-4 w-4" /> ADD STAFF
            </button>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
        {[
          { label: "Active Employees", value: "32", icon: ShieldCheck, color: "blue" },
          { label: "Pending Leave", value: "4", icon: Clock, color: "purple" },
          { label: "Next Payroll", value: "July 28", icon: CreditCard, color: "emerald" },
        ].map((k, i) => (
          <Card key={i} className="p-8 rounded-[32px] border-0 shadow-sm flex items-center gap-6">
             <div className={`p-4 rounded-2xl bg-${k.color}-50 text-${k.color}-600`}>
                <k.icon className="h-6 w-6" />
             </div>
             <div>
                <p className="text-[10px] font-black text-slate-400 uppercase tracking-widest mb-1">{k.label}</p>
                <p className="text-2xl font-black text-slate-900">{k.value}</p>
             </div>
          </Card>
        ))}
      </div>

      <Card className="p-8 rounded-[40px] border-0 shadow-sm">
         <div className="flex items-center justify-between mb-8">
            <h3 className="font-black text-slate-900 text-xl tracking-tight">Staff List</h3>
            <div className="flex gap-2">
               <div className="relative">
                  <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-gray-400" />
                  <input type="text" placeholder="Search staff..." className="pl-10 pr-4 py-2 bg-gray-50 border-0 rounded-xl text-xs font-bold outline-none" />
               </div>
            </div>
         </div>
         <div className="h-60 flex flex-col items-center justify-center text-slate-300 gap-4">
            <ShieldCheck className="h-12 w-12 opacity-20" />
            <p className="text-xs font-black uppercase tracking-widest">No staff records found</p>
         </div>
      </Card>
    </div>
  )
}
