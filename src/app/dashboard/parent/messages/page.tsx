"use client"
import * as React from "react"
import { MessagingUI } from "@/components/messaging/messaging-ui"

export default function ParentMessagesPage() {
  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <h1 className="text-2xl font-bold text-gray-900">Messagerie Parentale</h1>
        <div className="flex gap-2">
            <span className="px-3 py-1 bg-blue-100 text-blue-700 rounded-full text-xs font-medium">Support & Enseignants</span>
        </div>
      </div>

      <MessagingUI primaryColorClass="bg-blue-600" roleLabel="Parent" />
    </div>
  )
}
