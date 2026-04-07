"use client"
import * as React from "react"
import { Card } from "@/components/ui/card"
import { Wallet, CreditCard, TrendingUp, ArrowDownRight, Printer, CheckCircle2, AlertCircle, Search, Download } from "lucide-react"
import { getFinancialStats, markAsPaid } from "@/actions/finance"
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from 'recharts'
import { cn } from "@/lib/utils"

export default function FinancePage() {
  const [stats, setStats] = React.useState<any>(null)
  const [searchTerm, setSearchTerm] = React.useState("")

  React.useEffect(() => {
    getFinancialStats().then(setStats)
  }, [])

  if (!stats) return <div className="h-full flex items-center justify-center font-black text-slate-400">LOADING FINANCIAL DATA...</div>

  const handlePaid = async (id: number) => {
    await markAsPaid(id)
    const newStats = await getFinancialStats()
    setStats(newStats)
  }

  const kpis = [
    { name: "Total Collected", value: stats.totalCollected.toLocaleString() + " DH", icon: Wallet, color: "text-emerald-600", bg: "bg-emerald-50" },
    { name: "Pending Fees", value: stats.pendingFees.toLocaleString() + " DH", icon: AlertCircle, color: "text-amber-600", bg: "bg-amber-50" },
    { name: "Next Payout", value: "14,500 DH", icon: CreditCard, color: "text-blue-600", bg: "bg-blue-50" },
    { name: "Growth Rate", value: "+18.2%", icon: TrendingUp, color: "text-indigo-600", bg: "bg-indigo-50" },
  ]

  return (
    <div className="space-y-8 animate-in fade-in duration-500 pb-20">
      <div className="flex flex-col sm:flex-row justify-between items-end gap-6 border-b border-gray-200 pb-8">
        <div>
          <h2 className="text-4xl font-black text-slate-900 tracking-tight">School Finance</h2>
          <p className="text-slate-500 font-bold mt-1 uppercase text-xs tracking-widest">Revenue Tracking & Tuition Management</p>
        </div>
        <div className="flex gap-3">
            <button className="bg-white border border-gray-200 px-4 py-3 rounded-2xl text-[10px] font-black text-slate-600 hover:bg-gray-50 transition-all flex items-center gap-2">
                <Download className="h-4 w-4" /> EXPORT PDF
            </button>
            <button className="bg-emerald-600 text-white px-6 py-3 rounded-2xl text-[10px] font-black uppercase tracking-widest hover:bg-emerald-700 shadow-xl shadow-emerald-600/10 transition-all flex items-center gap-2">
                <Wallet className="h-4 w-4" /> GENERATE BATCH
            </button>
        </div>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
        {kpis.map((stat, i) => (
          <Card key={i} className="p-6 border-0 shadow-sm rounded-3xl group transition-all hover:shadow-xl hover:shadow-slate-200/50">
             <div className="flex justify-between items-start mb-6">
                <div className={`${stat.bg} ${stat.color} p-4 rounded-2xl transition-transform group-hover:scale-110`}>
                   <stat.icon className="h-6 w-6" />
                </div>
                <div className="flex items-center gap-1 text-emerald-600 text-[10px] font-black bg-emerald-50 px-2 py-1 rounded-full">
                   <TrendingUp className="h-3 w-3" />
                   +4.1%
                </div>
             </div>
             <div>
                <p className="text-[11px] font-black text-slate-400 uppercase tracking-widest leading-none mb-3">{stat.name}</p>
                <p className="text-2xl font-black text-slate-900 tracking-tighter">{stat.value}</p>
             </div>
          </Card>
        ))}
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
         <Card className="lg:col-span-2 p-8 border-0 shadow-sm rounded-3xl min-h-[400px] flex flex-col">
            <div className="flex justify-between items-center mb-10">
               <div>
                  <h3 className="font-black text-slate-900 text-xl tracking-tight">Revenue Stream</h3>
                  <p className="text-xs text-slate-400 font-bold uppercase tracking-widest mt-1">Monthly collection history</p>
               </div>
            </div>
            <div className="flex-1 w-full h-full min-h-[300px]">
                <ResponsiveContainer width="100%" height="100%">
                    <BarChart data={stats.monthlyRevenue}>
                        <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#f1f5f9" />
                        <XAxis
                            dataKey="name"
                            axisLine={false}
                            tickLine={false}
                            tick={{fill: '#94a3b8', fontSize: 10, fontWeight: 900}}
                            dy={10}
                        />
                        <YAxis
                            axisLine={false}
                            tickLine={false}
                            tick={{fill: '#94a3b8', fontSize: 10, fontWeight: 900}}
                        />
                        <Tooltip
                            cursor={{fill: '#f8fafc'}}
                            contentStyle={{borderRadius: '16px', border: 'none', boxShadow: '0 20px 25px -5px rgb(0 0 0 / 0.1)', padding: '12px'}}
                        />
                        <Bar dataKey="value" fill="#10b981" radius={[8, 8, 0, 0]} barSize={60} />
                    </BarChart>
                </ResponsiveContainer>
            </div>
         </Card>

         <Card className="p-8 border-0 shadow-sm rounded-3xl flex flex-col overflow-hidden relative">
            <div className="absolute top-0 right-0 p-8 opacity-5">
                <CreditCard className="h-32 w-32" />
            </div>
            <h3 className="font-black text-slate-900 text-xl tracking-tight mb-8">Quick Payouts</h3>
            <div className="space-y-6">
                <div className="p-6 bg-slate-900 rounded-3xl text-white relative overflow-hidden group">
                    <div className="absolute top-0 right-0 w-32 h-32 bg-white/5 rounded-full -mr-16 -mt-16 group-hover:scale-110 transition-transform" />
                    <p className="text-[10px] font-black text-slate-400 uppercase tracking-widest mb-1">Available for withdrawal</p>
                    <p className="text-3xl font-black tracking-tighter mb-8">42,800.00 DH</p>
                    <button className="w-full py-4 bg-emerald-500 text-white rounded-2xl text-xs font-black uppercase tracking-widest hover:bg-emerald-400 transition-all shadow-lg shadow-emerald-500/20">
                        Transfer to Account
                    </button>
                </div>
                <div className="space-y-4 pt-2">
                    <p className="text-[10px] font-black text-slate-400 uppercase tracking-widest ml-1">Recent Bank Feeds</p>
                    <div className="space-y-3">
                        {[
                            { name: "Stripe Transfer", date: "Today", amount: "+4,500 DH" },
                            { name: "Subscription Fee", date: "Yesterday", amount: "-1,200 DH" },
                        ].map((t, i) => (
                            <div key={i} className="flex justify-between items-center p-3 bg-gray-50 rounded-2xl">
                                <div>
                                    <p className="text-xs font-black text-slate-900">{t.name}</p>
                                    <p className="text-[10px] font-bold text-slate-400">{t.date}</p>
                                </div>
                                <p className={cn("text-xs font-black", t.amount.startsWith('+') ? 'text-emerald-600' : 'text-red-500')}>{t.amount}</p>
                            </div>
                        ))}
                    </div>
                </div>
            </div>
         </Card>
      </div>

      <Card className="p-8 border-0 shadow-sm rounded-3xl overflow-hidden">
        <div className="flex flex-col md:flex-row justify-between items-center gap-6 mb-10">
            <div>
                <h3 className="font-black text-slate-900 text-xl tracking-tight">Tuition Register</h3>
                <p className="text-xs font-bold text-slate-400 uppercase tracking-widest mt-1">Real-time payment status</p>
            </div>
            <div className="relative w-full md:w-80">
                <Search className="absolute left-4 top-1/2 -translate-y-1/2 h-4 w-4 text-gray-400" />
                <input
                    type="text"
                    placeholder="Search Parent, Month..."
                    className="w-full pl-12 pr-4 py-3 bg-gray-50 border-0 rounded-2xl text-sm font-bold outline-none focus:ring-2 focus:ring-emerald-500/10"
                    value={searchTerm}
                    onChange={(e) => setSearchTerm(e.target.value)}
                />
            </div>
        </div>

        <div className="overflow-x-auto">
            <table className="w-full text-left">
                <thead>
                    <tr className="border-b border-gray-100">
                        <th className="pb-4 text-[10px] font-black text-slate-400 uppercase tracking-widest px-4">Parent / Payer</th>
                        <th className="pb-4 text-[10px] font-black text-slate-400 uppercase tracking-widest px-4">Period</th>
                        <th className="pb-4 text-[10px] font-black text-slate-400 uppercase tracking-widest px-4">Amount</th>
                        <th className="pb-4 text-[10px] font-black text-slate-400 uppercase tracking-widest px-4">Status</th>
                        <th className="pb-4 text-[10px] font-black text-slate-400 uppercase tracking-widest px-4 text-right">Actions</th>
                    </tr>
                </thead>
                <tbody className="divide-y divide-gray-50">
                    {stats.recentInvoices.map((fee: any) => (
                        <tr key={fee.id} className="hover:bg-gray-50 transition-all group cursor-pointer">
                            <td className="py-5 px-4">
                                <div className="flex items-center gap-3">
                                    <div className="h-10 w-10 bg-slate-100 text-slate-600 rounded-2xl flex items-center justify-center font-black text-xs uppercase tracking-tighter">
                                        {fee.parent.name.charAt(0)}
                                    </div>
                                    <span className="text-sm font-black text-slate-900">{fee.parent.name}</span>
                                </div>
                            </td>
                            <td className="py-5 px-4 text-xs font-black text-slate-400 uppercase">{fee.month}</td>
                            <td className="py-5 px-4 text-sm font-black text-slate-900">{fee.amount} DH</td>
                            <td className="py-5 px-4">
                                <span className={cn(
                                    "text-[9px] px-3 py-1.5 rounded-xl font-black uppercase tracking-widest border",
                                    fee.status === 'PAID'
                                        ? 'bg-emerald-50 text-emerald-600 border-emerald-100'
                                        : 'bg-amber-50 text-amber-600 border-amber-100'
                                )}>
                                    {fee.status}
                                </span>
                            </td>
                            <td className="py-5 px-4 text-right">
                                <div className="flex items-center justify-end gap-2">
                                    {fee.status === 'PENDING' && (
                                        <button
                                            onClick={() => handlePaid(fee.id)}
                                            className="p-2 bg-emerald-50 text-emerald-600 rounded-xl hover:bg-emerald-100 transition-all shadow-sm"
                                        >
                                            <CheckCircle2 className="h-4 w-4" />
                                        </button>
                                    )}
                                    <button className="p-2 bg-slate-50 text-slate-400 rounded-xl hover:bg-slate-100 transition-all">
                                        <Printer className="h-4 w-4" />
                                    </button>
                                </div>
                            </td>
                        </tr>
                    ))}
                </tbody>
            </table>
        </div>
      </Card>
    </div>
  )
}
