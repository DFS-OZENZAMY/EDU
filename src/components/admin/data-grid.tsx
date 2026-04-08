"use client"
import * as React from "react"
import { cn } from "@/lib/utils"
import { Search, Filter, MoreHorizontal, ChevronDown, Download, Printer } from "lucide-react"

interface DataGridProps {
  title: string
  data: any[]
  columns: {
    header: string
    accessor: string
    render?: (val: any, row: any) => React.ReactNode
  }[]
  onRowClick?: (row: any) => void
  actions?: React.ReactNode
}

export function DataGrid({ title, data, columns, onRowClick, actions }: DataGridProps) {
  const [selectedRows, setSelectedRows] = React.useState<number[]>([])

  return (
    <div className="flex flex-col h-full bg-[#f0f2f5] border border-slate-200 rounded-lg overflow-hidden shadow-sm">
      {/* Pronote-style Toolbar */}
      <div className="flex items-center justify-between px-4 py-2 bg-white border-b border-slate-200 gap-4">
        <div className="flex items-center gap-4">
           <h3 className="text-xs font-black uppercase tracking-tight text-slate-500">{title}</h3>
           <div className="h-4 w-px bg-slate-200" />
           <div className="flex items-center gap-1 bg-slate-50 border border-slate-200 rounded px-2 py-1">
              <Search className="h-3 w-3 text-slate-400" />
              <input
                placeholder="Rechercher..."
                className="bg-transparent border-0 text-[11px] outline-none w-32 font-medium"
              />
           </div>
        </div>
        <div className="flex items-center gap-2">
           {actions}
           <button className="p-1.5 hover:bg-slate-100 rounded text-slate-500 transition-colors">
              <Filter className="h-3.5 w-3.5" />
           </button>
           <button className="p-1.5 hover:bg-slate-100 rounded text-slate-500 transition-colors">
              <Printer className="h-3.5 w-3.5" />
           </button>
           <button className="p-1.5 hover:bg-slate-100 rounded text-slate-500 transition-colors">
              <Download className="h-3.5 w-3.5" />
           </button>
        </div>
      </div>

      {/* Dense Table */}
      <div className="flex-1 overflow-auto bg-white">
        <table className="w-full text-left border-collapse table-fixed">
          <thead className="sticky top-0 z-20 bg-slate-50 shadow-sm">
            <tr className="border-b border-slate-200">
              <th className="w-10 px-4 py-2 text-center">
                <input type="checkbox" className="rounded border-slate-300" />
              </th>
              {columns.map((col, i) => (
                <th key={i} className="px-4 py-2 text-[10px] font-black uppercase tracking-wider text-slate-400 border-r border-slate-200 last:border-0">
                  <div className="flex items-center justify-between">
                    {col.header}
                    <ChevronDown className="h-3 w-3 opacity-30" />
                  </div>
                </th>
              ))}
            </tr>
          </thead>
          <tbody className="divide-y divide-slate-100">
            {data.map((row, idx) => (
              <tr
                key={idx}
                onClick={() => onRowClick?.(row)}
                className="hover:bg-blue-50/50 cursor-pointer transition-colors group"
              >
                <td className="px-4 py-1.5 text-center">
                   <input type="checkbox" className="rounded border-slate-300" />
                </td>
                {columns.map((col, ci) => (
                  <td key={ci} className="px-4 py-1.5 text-[11px] font-medium text-slate-600 border-r border-slate-50 last:border-0 truncate">
                    {col.render ? col.render(row[col.accessor], row) : (row[col.accessor] || "-")}
                  </td>
                ))}
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {/* Footer / Status Bar */}
      <div className="px-4 py-1 bg-slate-50 border-t border-slate-200 flex items-center justify-between text-[9px] font-bold text-slate-400 uppercase tracking-widest">
         <p>{data.length} Élément(s) affiché(s)</p>
         <p>Instance SaaS Active</p>
      </div>
    </div>
  )
}
