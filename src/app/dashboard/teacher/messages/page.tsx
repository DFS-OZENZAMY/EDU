"use client"
import * as React from "react"
import { MessagingUI } from "@/components/messaging/messaging-ui"

export default function TeacherMessagesPage() {
  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <h1 className="text-2xl font-bold text-gray-900">Messages & Conversations</h1>
        <div className="flex gap-2">
            <span className="px-3 py-1 bg-green-100 text-green-700 rounded-full text-xs font-medium">Communication Directe</span>
        </div>
      </div>

      <MessagingUI primaryColorClass="bg-green-600" roleLabel="Enseignant" />
    </div>
  )
}
