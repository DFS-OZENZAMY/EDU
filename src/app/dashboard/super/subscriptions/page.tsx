import { Card } from "@/components/ui/card"
import { CreditCard, ArrowUpRight, Clock, CheckCircle2, AlertCircle } from "lucide-react"

export default function SuperSubscriptionsPage() {
  const stats = [
    { label: "MRR", value: "14,250 DH", icon: ArrowUpRight, color: "text-green-600", bg: "bg-green-50" },
    { label: "Active Subs", value: "42", icon: CheckCircle2, color: "text-blue-600", bg: "bg-blue-50" },
    { label: "Pending", value: "3", icon: Clock, color: "text-orange-600", bg: "bg-orange-50" },
    { label: "Churn Rate", value: "2.4%", icon: AlertCircle, color: "text-red-600", bg: "bg-red-50" },
  ]

  return (
    <div className="space-y-8">
      <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4">
        <div>
          <h1 className="text-3xl font-black text-slate-900 tracking-tighter uppercase italic">
            Manage <span className="text-blue-600">Subscriptions</span>
          </h1>
          <p className="text-slate-500 font-bold text-sm mt-1 uppercase tracking-widest">Revenue and tier management</p>
        </div>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
        {stats.map((s, i) => (
          <Card key={i} className="p-6 border-0 shadow-xl shadow-slate-200/50 rounded-3xl group hover:scale-[1.02] transition-all">
            <div className="flex items-center gap-4">
              <div className={`h-12 w-12 ${s.bg} ${s.color} rounded-2xl flex items-center justify-center`}>
                <s.icon className="h-6 w-6" />
              </div>
              <div>
                <p className="text-[10px] font-black text-slate-400 uppercase tracking-widest">{s.label}</p>
                <p className="text-2xl font-black text-slate-900">{s.value}</p>
              </div>
            </div>
          </Card>
        ))}
      </div>

      <Card className="border-0 shadow-2xl shadow-slate-200/60 rounded-3xl overflow-hidden">
        <div className="p-8 border-b border-slate-50 flex justify-between items-center bg-white">
          <h3 className="font-black text-slate-900 uppercase tracking-tighter text-xl">Recent Transactions</h3>
        </div>
        <div className="overflow-x-auto">
          <table className="w-full text-left">
            <thead className="bg-slate-50/50">
              <tr className="text-[10px] font-black text-slate-400 uppercase tracking-widest border-b border-slate-100">
                <th className="px-8 py-5">School / Customer</th>
                <th className="px-8 py-5">Tier</th>
                <th className="px-8 py-5">Amount</th>
                <th className="px-8 py-5">Status</th>
                <th className="px-8 py-5">Date</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-50">
              <tr className="hover:bg-slate-50/50 transition-colors">
                <td className="px-8 py-6">
                  <p className="font-black text-slate-900">Groupe Scolaire Atlas</p>
                  <p className="text-xs text-slate-400 font-bold italic">atlas@domain.ma</p>
                </td>
                <td className="px-8 py-6">
                  <span className="px-3 py-1 bg-purple-50 text-purple-600 rounded-full text-[10px] font-black uppercase tracking-widest">Premium</span>
                </td>
                <td className="px-8 py-6 font-black text-slate-900">1,200 DH</td>
                <td className="px-8 py-6">
                  <span className="flex items-center gap-1.5 text-[10px] font-black text-green-600 uppercase">
                    <CheckCircle2 className="h-3 w-3" /> Paid
                  </span>
                </td>
                <td className="px-8 py-6 text-xs text-slate-400 font-bold tracking-widest">24 MAR 2024</td>
              </tr>
              <tr className="hover:bg-slate-50/50 transition-colors">
                <td className="px-8 py-6">
                  <p className="font-black text-slate-900">Institut Al-Andalous</p>
                  <p className="text-xs text-slate-400 font-bold italic">info@andalous.ma</p>
                </td>
                <td className="px-8 py-6">
                  <span className="px-3 py-1 bg-blue-50 text-blue-600 rounded-full text-[10px] font-black uppercase tracking-widest">Standard</span>
                </td>
                <td className="px-8 py-6 font-black text-slate-900">600 DH</td>
                <td className="px-8 py-6">
                  <span className="flex items-center gap-1.5 text-[10px] font-black text-green-600 uppercase">
                    <CheckCircle2 className="h-3 w-3" /> Paid
                  </span>
                </td>
                <td className="px-8 py-6 text-xs text-slate-400 font-bold tracking-widest">22 MAR 2024</td>
              </tr>
            </tbody>
          </table>
        </div>
      </Card>
    </div>
  )
}
