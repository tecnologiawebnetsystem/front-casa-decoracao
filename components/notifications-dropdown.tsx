"use client"

import { useState } from "react"
import { Bell, X, Check, Clock, Package, CreditCard, Truck, Wrench, Calendar, AlertTriangle } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Card, CardContent } from "@/components/ui/card"
import { ScrollArea } from "@/components/ui/scroll-area"
import { Separator } from "@/components/ui/separator"
import { useNotifications, type Notification } from "@/contexts/notifications-context"
import Link from "next/link"

export default function NotificationsDropdown() {
  const { notifications, unreadCount, markAsRead, markAllAsRead, deleteNotification } = useNotifications()
  const [isOpen, setIsOpen] = useState(false)

  const getNotificationIcon = (type: string) => {
    switch (type) {
      case "order":
        return Package
      case "payment":
        return CreditCard
      case "shipping":
        return Truck
      case "installation":
        return Wrench
      case "measurement":
        return Calendar
      case "system":
        return AlertTriangle
      default:
        return Bell
    }
  }

  const getPriorityColor = (priority: string) => {
    switch (priority) {
      case "urgent":
        return "text-red-600 bg-red-50"
      case "high":
        return "text-orange-600 bg-orange-50"
      case "medium":
        return "text-blue-600 bg-blue-50"
      case "low":
        return "text-green-600 bg-green-50"
      default:
        return "text-neutral-600 bg-neutral-50"
    }
  }

  const formatTime = (date: Date) => {
    const now = new Date()
    const diff = now.getTime() - date.getTime()
    const minutes = Math.floor(diff / (1000 * 60))
    const hours = Math.floor(diff / (1000 * 60 * 60))
    const days = Math.floor(diff / (1000 * 60 * 60 * 24))

    if (minutes < 60) {
      return `${minutes}m atrás`
    } else if (hours < 24) {
      return `${hours}h atrás`
    } else {
      return `${days}d atrás`
    }
  }

  const handleNotificationClick = (notification: Notification) => {
    if (!notification.read) {
      markAsRead(notification.id)
    }
    setIsOpen(false)
  }

  return (
    <div className="relative">
      <Button
        variant="ghost"
        size="sm"
        className="relative"
        onClick={() => setIsOpen(!isOpen)}
        aria-label={`Notificações ${unreadCount > 0 ? `(${unreadCount} não lidas)` : ""}`}
      >
        <Bell className="h-5 w-5" />
        {unreadCount > 0 && (
          <Badge className="absolute -top-1 -right-1 h-5 w-5 p-0 flex items-center justify-center bg-red-500 text-white text-xs">
            {unreadCount > 99 ? "99+" : unreadCount}
          </Badge>
        )}
      </Button>

      {isOpen && (
        <>
          {/* Overlay */}
          <div className="fixed inset-0 z-40" onClick={() => setIsOpen(false)} />

          {/* Dropdown */}
          <Card className="absolute right-0 top-full mt-2 w-96 z-50 shadow-xl border-0">
            <div className="p-4 border-b">
              <div className="flex items-center justify-between">
                <h3 className="font-semibold text-lg">Notificações</h3>
                <div className="flex items-center gap-2">
                  {unreadCount > 0 && (
                    <Button variant="ghost" size="sm" onClick={markAllAsRead}>
                      <Check className="h-4 w-4 mr-1" />
                      Marcar todas como lidas
                    </Button>
                  )}
                  <Button variant="ghost" size="sm" onClick={() => setIsOpen(false)}>
                    <X className="h-4 w-4" />
                  </Button>
                </div>
              </div>
            </div>

            <ScrollArea className="max-h-96">
              <CardContent className="p-0">
                {notifications.length === 0 ? (
                  <div className="p-8 text-center">
                    <Bell className="h-12 w-12 mx-auto text-neutral-300 mb-4" />
                    <p className="text-neutral-500">Nenhuma notificação</p>
                  </div>
                ) : (
                  <div className="space-y-1">
                    {notifications.map((notification, index) => {
                      const Icon = getNotificationIcon(notification.type)
                      const priorityColor = getPriorityColor(notification.priority)

                      return (
                        <div key={notification.id}>
                          <div
                            className={`p-4 hover:bg-neutral-50 cursor-pointer transition-colors ${
                              !notification.read ? "bg-blue-50/50" : ""
                            }`}
                            onClick={() => handleNotificationClick(notification)}
                          >
                            <div className="flex gap-3">
                              <div className={`p-2 rounded-lg ${priorityColor}`}>
                                <Icon className="h-4 w-4" />
                              </div>

                              <div className="flex-1 min-w-0">
                                <div className="flex items-start justify-between gap-2">
                                  <h4
                                    className={`font-medium text-sm ${
                                      !notification.read ? "text-neutral-900" : "text-neutral-700"
                                    }`}
                                  >
                                    {notification.title}
                                  </h4>
                                  <div className="flex items-center gap-1">
                                    {!notification.read && (
                                      <div className="w-2 h-2 bg-blue-500 rounded-full flex-shrink-0" />
                                    )}
                                    <Button
                                      variant="ghost"
                                      size="sm"
                                      className="h-6 w-6 p-0 opacity-0 group-hover:opacity-100"
                                      onClick={(e) => {
                                        e.stopPropagation()
                                        deleteNotification(notification.id)
                                      }}
                                    >
                                      <X className="h-3 w-3" />
                                    </Button>
                                  </div>
                                </div>

                                <p className="text-sm text-neutral-600 mt-1">{notification.message}</p>

                                <div className="flex items-center justify-between mt-2">
                                  <div className="flex items-center gap-1 text-xs text-neutral-500">
                                    <Clock className="h-3 w-3" />
                                    {formatTime(notification.timestamp)}
                                  </div>

                                  {notification.actionUrl && notification.actionLabel && (
                                    <Link href={notification.actionUrl}>
                                      <Button variant="ghost" size="sm" className="h-6 text-xs">
                                        {notification.actionLabel}
                                      </Button>
                                    </Link>
                                  )}
                                </div>
                              </div>
                            </div>
                          </div>
                          {index < notifications.length - 1 && <Separator />}
                        </div>
                      )
                    })}
                  </div>
                )}
              </CardContent>
            </ScrollArea>

            {notifications.length > 0 && (
              <div className="p-4 border-t">
                <Link href="/notificacoes">
                  <Button variant="outline" className="w-full" onClick={() => setIsOpen(false)}>
                    Ver Todas as Notificações
                  </Button>
                </Link>
              </div>
            )}
          </Card>
        </>
      )}
    </div>
  )
}
