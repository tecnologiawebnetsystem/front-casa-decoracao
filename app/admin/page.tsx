"use client"

import { useAuth } from "@/contexts/auth-context"
import { useRouter } from "next/navigation"
import { useEffect, useState } from "react"
import ProfessionalAdminLayout from "@/components/admin/professional-admin-layout"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import {
  Palette,
  Scissors,
  Sparkles,
  DollarSign,
  TrendingUp,
  ArrowUpRight,
  ArrowDownRight,
  Eye,
  Calendar,
  Clock,
  Star,
  Ruler,
  ShoppingCart,
} from "lucide-react"

export default function SpecializedAdminDashboard() {
  const { user } = useAuth()
  const router = useRouter()
  const [timeRange, setTimeRange] = useState("7d")

  useEffect(() => {
    if (!user || user.role !== "admin") {
      router.push("/login")
    }
  }, [user, router])

  if (!user || user.role !== "admin") {
    return null
  }

  const stats = [
    {
      title: "Receita Total",
      value: "R$ 847.2K",
      change: "+12.5%",
      trend: "up",
      icon: DollarSign,
      color: "from-green-500 to-emerald-600",
      bgColor: "bg-green-50",
      textColor: "text-green-700",
    },
    {
      title: "Pedidos Ativos",
      value: "1,247",
      change: "+8.2%",
      trend: "up",
      icon: ShoppingCart,
      color: "from-primary-500 to-primary-600",
      bgColor: "bg-primary-50",
      textColor: "text-primary-700",
    },
    {
      title: "Medições Agendadas",
      value: "89",
      change: "+15.3%",
      trend: "up",
      icon: Ruler,
      color: "from-secondary-500 to-secondary-600",
      bgColor: "bg-secondary-50",
      textColor: "text-secondary-700",
    },
    {
      title: "Instalações Hoje",
      value: "12",
      change: "+5.1%",
      trend: "up",
      icon: Scissors,
      color: "from-orange-500 to-orange-600",
      bgColor: "bg-orange-50",
      textColor: "text-orange-700",
    },
  ]

  const categoryStats = [
    {
      category: "Papel de Parede",
      sales: "R$ 342K",
      orders: 156,
      growth: "+18%",
      icon: Palette,
      color: "text-primary-600",
    },
    {
      category: "Cortinas",
      sales: "R$ 298K",
      orders: 89,
      growth: "+12%",
      icon: Scissors,
      color: "text-secondary-600",
    },
    {
      category: "Decoração",
      sales: "R$ 207K",
      orders: 234,
      growth: "+25%",
      icon: Sparkles,
      color: "text-purple-600",
    },
  ]

  const recentOrders = [
    {
      id: "#ORD-2024-001",
      customer: "Maria Silva",
      value: "R$ 2.299,90",
      status: "Medição Agendada",
      time: "2 min atrás",
      type: "Papel de Parede",
    },
    {
      id: "#ORD-2024-002",
      customer: "João Santos",
      value: "R$ 1.899,90",
      status: "Em Produção",
      time: "5 min atrás",
      type: "Cortinas",
    },
    {
      id: "#ORD-2024-003",
      customer: "Ana Costa",
      value: "R$ 3.199,90",
      status: "Instalação Hoje",
      time: "12 min atrás",
      type: "Papel + Cortinas",
    },
    {
      id: "#ORD-2024-004",
      customer: "Carlos Lima",
      value: "R$ 899,90",
      status: "Entregue",
      time: "1h atrás",
      type: "Decoração",
    },
  ]

  const upcomingServices = [
    {
      time: "09:00",
      type: "Medição",
      customer: "Maria Silva",
      address: "Rua das Flores, 123",
      technician: "Carlos Oliveira",
    },
    {
      time: "14:00",
      type: "Instalação",
      customer: "João Santos",
      address: "Av. Paulista, 456",
      technician: "Fernanda Lima",
    },
    {
      time: "16:30",
      type: "Consultoria",
      customer: "Ana Costa",
      address: "Rua Augusta, 789",
      technician: "Ana Costa",
    },
  ]

  return (
    <ProfessionalAdminLayout>
      <div className="space-y-8">
        {/* Header */}
        <div className="flex flex-col lg:flex-row lg:items-center lg:justify-between gap-4">
          <div>
            <h1 className="text-3xl font-bold bg-gradient-to-r from-primary-600 to-secondary-600 bg-clip-text text-transparent">
              Dashboard - Casa Decoração
            </h1>
            <p className="text-neutral-600 mt-1">Papel de Parede • Cortinas • Decoração</p>
          </div>

          <div className="flex items-center gap-3">
            <div className="flex items-center gap-2 text-sm text-neutral-600">
              <Clock className="h-4 w-4" />
              Última atualização: agora
            </div>
            <Button variant="outline" size="sm">
              <Calendar className="h-4 w-4 mr-2" />
              Últimos 7 dias
            </Button>
            <Button className="bg-gradient-to-r from-primary-600 to-secondary-600">
              <Eye className="h-4 w-4 mr-2" />
              Relatório Completo
            </Button>
          </div>
        </div>

        {/* Main Stats */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {stats.map((stat, index) => (
            <Card
              key={index}
              className="relative overflow-hidden border-0 shadow-lg hover:shadow-xl transition-all duration-300"
            >
              <div className={`absolute inset-0 bg-gradient-to-br ${stat.color} opacity-5`} />
              <CardContent className="p-6">
                <div className="flex items-center justify-between mb-4">
                  <div className={`p-3 rounded-xl ${stat.bgColor}`}>
                    <stat.icon className={`h-6 w-6 ${stat.textColor}`} />
                  </div>
                  <div
                    className={`flex items-center gap-1 text-sm font-medium ${
                      stat.trend === "up" ? "text-green-600" : "text-red-600"
                    }`}
                  >
                    {stat.trend === "up" ? (
                      <ArrowUpRight className="h-4 w-4" />
                    ) : (
                      <ArrowDownRight className="h-4 w-4" />
                    )}
                    {stat.change}
                  </div>
                </div>
                <div>
                  <p className="text-sm font-medium text-neutral-600 mb-1">{stat.title}</p>
                  <p className="text-3xl font-bold text-neutral-800">{stat.value}</p>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>

        {/* Category Performance */}
        <Card className="border-0 shadow-lg">
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <TrendingUp className="h-5 w-5 text-primary-600" />
              Performance por Categoria
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              {categoryStats.map((category, index) => (
                <div key={index} className="p-6 bg-neutral-50 rounded-xl">
                  <div className="flex items-center gap-3 mb-4">
                    <category.icon className={`h-6 w-6 ${category.color}`} />
                    <h3 className="font-semibold text-neutral-800">{category.category}</h3>
                  </div>
                  <div className="space-y-2">
                    <div className="flex justify-between">
                      <span className="text-sm text-neutral-600">Vendas</span>
                      <span className="font-bold text-green-600">{category.sales}</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-sm text-neutral-600">Pedidos</span>
                      <span className="font-medium">{category.orders}</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-sm text-neutral-600">Crescimento</span>
                      <span className="font-medium text-green-600">{category.growth}</span>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
          {/* Recent Orders */}
          <Card className="border-0 shadow-lg">
            <CardHeader>
              <CardTitle className="flex items-center justify-between">
                <span className="flex items-center gap-2">
                  <ShoppingCart className="h-5 w-5 text-primary-600" />
                  Pedidos Recentes
                </span>
                <Button variant="ghost" size="sm">
                  Ver Todos
                </Button>
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {recentOrders.map((order, index) => (
                  <div
                    key={index}
                    className="flex items-center justify-between p-4 bg-neutral-50 rounded-xl hover:bg-neutral-100 transition-colors"
                  >
                    <div className="flex items-center gap-4">
                      <div className="w-12 h-12 bg-gradient-to-r from-primary-100 to-secondary-100 rounded-xl flex items-center justify-center">
                        {order.type === "Papel de Parede" && <Palette className="h-5 w-5 text-primary-600" />}
                        {order.type === "Cortinas" && <Scissors className="h-5 w-5 text-secondary-600" />}
                        {order.type === "Decoração" && <Sparkles className="h-5 w-5 text-purple-600" />}
                        {order.type === "Papel + Cortinas" && <Star className="h-5 w-5 text-yellow-600" />}
                      </div>
                      <div>
                        <p className="font-medium text-neutral-800">{order.id}</p>
                        <p className="text-sm text-neutral-600">{order.customer}</p>
                        <p className="text-xs text-neutral-500">{order.time}</p>
                      </div>
                    </div>
                    <div className="text-right">
                      <p className="font-bold text-neutral-800">{order.value}</p>
                      <span
                        className={`text-xs px-3 py-1 rounded-full font-medium ${
                          order.status === "Medição Agendada"
                            ? "bg-blue-100 text-blue-800"
                            : order.status === "Em Produção"
                              ? "bg-yellow-100 text-yellow-800"
                              : order.status === "Instalação Hoje"
                                ? "bg-purple-100 text-purple-800"
                                : "bg-green-100 text-green-800"
                        }`}
                      >
                        {order.status}
                      </span>
                    </div>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>

          {/* Upcoming Services */}
          <Card className="border-0 shadow-lg">
            <CardHeader>
              <CardTitle className="flex items-center justify-between">
                <span className="flex items-center gap-2">
                  <Calendar className="h-5 w-5 text-secondary-600" />
                  Serviços de Hoje
                </span>
                <Button variant="ghost" size="sm">
                  Ver Agenda
                </Button>
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {upcomingServices.map((service, index) => (
                  <div
                    key={index}
                    className="flex items-center gap-4 p-4 bg-neutral-50 rounded-xl hover:bg-neutral-100 transition-colors"
                  >
                    <div className="w-16 h-16 bg-gradient-to-r from-secondary-100 to-primary-100 rounded-xl flex items-center justify-center">
                      <div className="text-center">
                        <div className="text-xs text-neutral-600">Hoje</div>
                        <div className="font-bold text-primary-600">{service.time}</div>
                      </div>
                    </div>
                    <div className="flex-1">
                      <div className="flex items-center gap-2 mb-1">
                        <span
                          className={`px-2 py-1 rounded-full text-xs font-medium ${
                            service.type === "Medição"
                              ? "bg-blue-100 text-blue-800"
                              : service.type === "Instalação"
                                ? "bg-green-100 text-green-800"
                                : "bg-purple-100 text-purple-800"
                          }`}
                        >
                          {service.type}
                        </span>
                      </div>
                      <h4 className="font-medium text-neutral-800">{service.customer}</h4>
                      <p className="text-sm text-neutral-600">{service.address}</p>
                      <p className="text-xs text-neutral-500">Técnico: {service.technician}</p>
                    </div>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </ProfessionalAdminLayout>
  )
}
