"use client"

import { createContext, useContext, useState, useEffect, type ReactNode } from "react"
import { useAuth } from "./auth-context"

export interface Notification {
  id: string
  type: "order" | "payment" | "shipping" | "installation" | "measurement" | "system" | "promotion"
  title: string
  message: string
  timestamp: Date
  read: boolean
  priority: "low" | "medium" | "high" | "urgent"
  actionUrl?: string
  actionLabel?: string
  orderId?: string
  metadata?: Record<string, any>
}

interface NotificationsContextType {
  notifications: Notification[]
  unreadCount: number
  markAsRead: (id: string) => void
  markAllAsRead: () => void
  addNotification: (notification: Omit<Notification, "id" | "timestamp" | "read">) => void
  deleteNotification: (id: string) => void
  getNotificationsByType: (type: string) => Notification[]
}

const NotificationsContext = createContext<NotificationsContextType | undefined>(undefined)

export function NotificationsProvider({ children }: { children: ReactNode }) {
  const { user } = useAuth()
  const [notifications, setNotifications] = useState<Notification[]>([])

  // Simular notificações baseadas no tipo de usuário
  useEffect(() => {
    if (!user) return

    const mockNotifications: Notification[] = []

    if (user.role === "admin") {
      // Notificações para administradores
      mockNotifications.push(
        {
          id: "1",
          type: "order",
          title: "Novo Pedido Recebido",
          message: "Pedido #12349 de Maria Silva - R$ 2.599,90",
          timestamp: new Date(Date.now() - 5 * 60 * 1000), // 5 min atrás
          read: false,
          priority: "high",
          actionUrl: "/admin/pedidos",
          actionLabel: "Ver Pedido",
          orderId: "12349",
        },
        {
          id: "2",
          type: "measurement",
          title: "Medição Agendada",
          message: "Medição para João Santos agendada para hoje às 14h",
          timestamp: new Date(Date.now() - 15 * 60 * 1000), // 15 min atrás
          read: false,
          priority: "urgent",
          actionUrl: "/admin/agendamentos",
          actionLabel: "Ver Agenda",
        },
        {
          id: "3",
          type: "installation",
          title: "Instalação Concluída",
          message: "Instalação do pedido #12347 finalizada com sucesso",
          timestamp: new Date(Date.now() - 2 * 60 * 60 * 1000), // 2h atrás
          read: true,
          priority: "medium",
          actionUrl: "/admin/pedidos",
          actionLabel: "Ver Detalhes",
          orderId: "12347",
        },
        {
          id: "4",
          type: "payment",
          title: "Pagamento Aprovado",
          message: "Pagamento do pedido #12348 foi aprovado",
          timestamp: new Date(Date.now() - 3 * 60 * 60 * 1000), // 3h atrás
          read: true,
          priority: "medium",
          orderId: "12348",
        },
        {
          id: "5",
          type: "system",
          title: "Estoque Baixo",
          message: "Papel de Parede Floral Premium com apenas 5 unidades",
          timestamp: new Date(Date.now() - 4 * 60 * 60 * 1000), // 4h atrás
          read: false,
          priority: "medium",
          actionUrl: "/admin/estoque",
          actionLabel: "Gerenciar Estoque",
        },
      )
    } else {
      // Notificações para clientes
      mockNotifications.push(
        {
          id: "c1",
          type: "order",
          title: "Pedido Confirmado",
          message: "Seu pedido #12345 foi confirmado e está sendo preparado",
          timestamp: new Date(Date.now() - 30 * 60 * 1000), // 30 min atrás
          read: false,
          priority: "high",
          actionUrl: "/minha-conta/pedidos",
          actionLabel: "Acompanhar Pedido",
          orderId: "12345",
        },
        {
          id: "c2",
          type: "measurement",
          title: "Medição Agendada",
          message: "Sua medição foi agendada para amanhã às 10h",
          timestamp: new Date(Date.now() - 2 * 60 * 60 * 1000), // 2h atrás
          read: false,
          priority: "high",
          actionUrl: "/minha-conta/agendamentos",
          actionLabel: "Ver Detalhes",
        },
        {
          id: "c3",
          type: "shipping",
          title: "Produto em Trânsito",
          message: "Seu pedido saiu para entrega - Código: BR123456789",
          timestamp: new Date(Date.now() - 1 * 24 * 60 * 60 * 1000), // 1 dia atrás
          read: true,
          priority: "medium",
          actionUrl: "/rastreamento",
          actionLabel: "Rastrear",
        },
        {
          id: "c4",
          type: "installation",
          title: "Instalação Agendada",
          message: "Instalação agendada para 25/01 às 14h",
          timestamp: new Date(Date.now() - 2 * 24 * 60 * 60 * 1000), // 2 dias atrás
          read: true,
          priority: "medium",
        },
        {
          id: "c5",
          type: "promotion",
          title: "Oferta Especial",
          message: "20% OFF em cortinas! Válido até domingo",
          timestamp: new Date(Date.now() - 3 * 24 * 60 * 60 * 1000), // 3 dias atrás
          read: false,
          priority: "low",
          actionUrl: "/categoria/cortinas",
          actionLabel: "Ver Ofertas",
        },
      )
    }

    setNotifications(mockNotifications)
  }, [user])

  const unreadCount = notifications.filter((n) => !n.read).length

  const markAsRead = (id: string) => {
    setNotifications((prev) => prev.map((n) => (n.id === id ? { ...n, read: true } : n)))
  }

  const markAllAsRead = () => {
    setNotifications((prev) => prev.map((n) => ({ ...n, read: true })))
  }

  const addNotification = (notification: Omit<Notification, "id" | "timestamp" | "read">) => {
    const newNotification: Notification = {
      ...notification,
      id: Date.now().toString(),
      timestamp: new Date(),
      read: false,
    }
    setNotifications((prev) => [newNotification, ...prev])
  }

  const deleteNotification = (id: string) => {
    setNotifications((prev) => prev.filter((n) => n.id !== id))
  }

  const getNotificationsByType = (type: string) => {
    return notifications.filter((n) => n.type === type)
  }

  return (
    <NotificationsContext.Provider
      value={{
        notifications,
        unreadCount,
        markAsRead,
        markAllAsRead,
        addNotification,
        deleteNotification,
        getNotificationsByType,
      }}
    >
      {children}
    </NotificationsContext.Provider>
  )
}

export function useNotifications() {
  const context = useContext(NotificationsContext)
  if (context === undefined) {
    throw new Error("useNotifications must be used within a NotificationsProvider")
  }
  return context
}
