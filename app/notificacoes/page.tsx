"use client"

import type React from "react"

import { useState } from "react"
import { Bell, Package, CreditCard, Truck, Wrench, Calendar, AlertTriangle, Check, X } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { useNotifications } from "@/contexts/notifications-context"
import { useAuth } from "@/contexts/auth-context"
import Header from "@/components/header"
import Footer from "@/components/footer"
import CustomerLayout from "@/components/customer/customer-layout"
import Link from "next/link"

export default function NotificacoesPage() {
  const { notifications, markAsRead, markAllAsRead, deleteNotification } = useNotifications()
  const { user } = useAuth()
  const [filterType, setFilterType] = useState("all")
  const [filterRead, setFilterRead] = useState("all")

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
        return "border-l-red-500 bg-red-50"
      case "high":
        return "border-l-orange-500 bg-orange-50"
      case "medium":
        return "border-l-blue-500 bg-blue-50"
      case "low":
        return "border-l-green-500 bg-green-50"
      default:
        return "border-l-neutral-300 bg-neutral-50"
    }
  }

  const formatDateTime = (date: Date) => {
    return new Intl.DateTimeFormat("pt-BR", {
      day: "2-digit",
      month: "2-digit",
      year: "numeric",
      hour: "2-digit",
      minute: "2-digit",
    }).format(date)
  }

  const filteredNotifications = notifications.filter((notification) => {
    const typeMatch = filterType === "all" || notification.type === filterType
    const readMatch = filterRead === "all" || (filterRead === "read" ? notification.read : !notification.read)
    return typeMatch && readMatch
  })

  const notificationsByType = {
    all: notifications,
    order: notifications.filter((n) => n.type === "order"),
    payment: notifications.filter((n) => n.type === "payment"),
    shipping: notifications.filter((n) => n.type === "shipping"),
    installation: notifications.filter((n) => n.type === "installation"),
    measurement: notifications.filter((n) => n.type === "measurement"),
    promotion: notifications.filter((n) => n.type === "promotion"),
  }

  const unreadCount = notifications.filter((n) => !n.read).length

  if (!user) {
    return (
      <div className="min-h-screen bg-neutral-50">
        <Header />
        <div className="container mx-auto px-4 py-16 text-center">
          <h1 className="text-2xl font-bold mb-4">Acesso Restrito</h1>
          <p className="text-neutral-600 mb-6">Faça login para ver suas notificações</p>
          <Link href="/login">
            <Button>Fazer Login</Button>
          </Link>
        </div>
        <Footer />
      </div>
    )
  }

  const Layout =
    user.role === "customer"
      ? CustomerLayout
      : ({ children }: { children: React.ReactNode }) => <div className="container mx-auto px-4 py-8">{children}</div>

  return (
    <div className="min-h-screen bg-neutral-50">
      <Header />
      <Layout>
        <div className="space-y-6">
          {/* Header */}
          <div className="flex flex-col lg:flex-row lg:items-center lg:justify-between gap-4">
            <div>
              <h1 className="text-3xl font-bold text-neutral-800">Notificações</h1>
              <p className="text-neutral-600">
                Acompanhe todas as atualizações {unreadCount > 0 && `(${unreadCount} não lidas)`}
              </p>
            </div>

            {unreadCount > 0 && (
              <Button onClick={markAllAsRead} variant="outline">
                <Check className="h-4 w-4 mr-2" />
                Marcar todas como lidas
              </Button>
            )}
          </div>

          {/* Filtros */}
          <Card>
            <CardContent className="p-4">
              <div className="flex flex-col sm:flex-row gap-4">
                <Select value={filterType} onValueChange={setFilterType}>
                  <SelectTrigger className="w-48">
                    <SelectValue placeholder="Filtrar por tipo" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="all">Todos os tipos</SelectItem>
                    <SelectItem value="order">Pedidos</SelectItem>
                    <SelectItem value="payment">Pagamentos</SelectItem>
                    <SelectItem value="shipping">Entregas</SelectItem>
                    <SelectItem value="installation">Instalações</SelectItem>
                    <SelectItem value="measurement">Medições</SelectItem>
                    <SelectItem value="promotion">Promoções</SelectItem>
                  </SelectContent>
                </Select>

                <Select value={filterRead} onValueChange={setFilterRead}>
                  <SelectTrigger className="w-48">
                    <SelectValue placeholder="Filtrar por status" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="all">Todas</SelectItem>
                    <SelectItem value="unread">Não lidas</SelectItem>
                    <SelectItem value="read">Lidas</SelectItem>
                  </SelectContent>
                </Select>
              </div>
            </CardContent>
          </Card>

          {/* Tabs por tipo */}
          <Tabs defaultValue="all" className="space-y-6">
            <TabsList className="grid w-full grid-cols-7">
              <TabsTrigger value="all">Todas ({notificationsByType.all.length})</TabsTrigger>
              <TabsTrigger value="order">Pedidos ({notificationsByType.order.length})</TabsTrigger>
              <TabsTrigger value="payment">Pagamentos ({notificationsByType.payment.length})</TabsTrigger>
              <TabsTrigger value="shipping">Entregas ({notificationsByType.shipping.length})</TabsTrigger>
              <TabsTrigger value="installation">Instalações ({notificationsByType.installation.length})</TabsTrigger>
              <TabsTrigger value="measurement">Medições ({notificationsByType.measurement.length})</TabsTrigger>
              <TabsTrigger value="promotion">Promoções ({notificationsByType.promotion.length})</TabsTrigger>
            </TabsList>

            {Object.entries(notificationsByType).map(([type, typeNotifications]) => (
              <TabsContent key={type} value={type}>
                <div className="space-y-4">
                  {(type === "all" ? filteredNotifications : typeNotifications).map((notification) => {
                    const Icon = getNotificationIcon(notification.type)
                    const priorityColor = getPriorityColor(notification.priority)

                    return (
                      <Card
                        key={notification.id}
                        className={`border-l-4 ${priorityColor} ${!notification.read ? "shadow-lg" : ""} hover:shadow-lg transition-all`}
                      >
                        <CardContent className="p-6">
                          <div className="flex items-start gap-4">
                            <div className="p-3 bg-white rounded-lg shadow-sm">
                              <Icon className="h-6 w-6 text-primary-600" />
                            </div>

                            <div className="flex-1">
                              <div className="flex items-start justify-between gap-4">
                                <div>
                                  <h3
                                    className={`text-lg font-semibold ${
                                      !notification.read ? "text-neutral-900" : "text-neutral-700"
                                    }`}
                                  >
                                    {notification.title}
                                  </h3>
                                  <p className="text-neutral-600 mt-1">{notification.message}</p>
                                  <p className="text-sm text-neutral-500 mt-2">
                                    {formatDateTime(notification.timestamp)}
                                  </p>
                                </div>

                                <div className="flex items-center gap-2">
                                  {!notification.read && (
                                    <Badge variant="secondary" className="bg-blue-100 text-blue-800">
                                      Nova
                                    </Badge>
                                  )}
                                  <Badge
                                    variant="outline"
                                    className={
                                      notification.priority === "urgent"
                                        ? "border-red-500 text-red-700"
                                        : notification.priority === "high"
                                          ? "border-orange-500 text-orange-700"
                                          : "border-neutral-300"
                                    }
                                  >
                                    {notification.priority === "urgent"
                                      ? "Urgente"
                                      : notification.priority === "high"
                                        ? "Alta"
                                        : notification.priority === "medium"
                                          ? "Média"
                                          : "Baixa"}
                                  </Badge>
                                </div>
                              </div>

                              <div className="flex items-center gap-2 mt-4">
                                {notification.actionUrl && notification.actionLabel && (
                                  <Link href={notification.actionUrl}>
                                    <Button size="sm" className="bg-primary-600 hover:bg-primary-700">
                                      {notification.actionLabel}
                                    </Button>
                                  </Link>
                                )}

                                {!notification.read && (
                                  <Button variant="outline" size="sm" onClick={() => markAsRead(notification.id)}>
                                    <Check className="h-4 w-4 mr-1" />
                                    Marcar como lida
                                  </Button>
                                )}

                                <Button
                                  variant="ghost"
                                  size="sm"
                                  onClick={() => deleteNotification(notification.id)}
                                  className="text-red-600 hover:text-red-700 hover:bg-red-50"
                                >
                                  <X className="h-4 w-4 mr-1" />
                                  Excluir
                                </Button>
                              </div>
                            </div>
                          </div>
                        </CardContent>
                      </Card>
                    )
                  })}

                  {(type === "all" ? filteredNotifications : typeNotifications).length === 0 && (
                    <Card>
                      <CardContent className="p-12 text-center">
                        <Bell className="h-12 w-12 mx-auto text-neutral-300 mb-4" />
                        <h3 className="text-lg font-semibold text-neutral-600 mb-2">Nenhuma notificação</h3>
                        <p className="text-neutral-500">
                          {type === "all"
                            ? "Você não tem notificações no momento"
                            : `Nenhuma notificação do tipo "${type}"`}
                        </p>
                      </CardContent>
                    </Card>
                  )}
                </div>
              </TabsContent>
            ))}
          </Tabs>
        </div>
      </Layout>
      <Footer />
    </div>
  )
}
