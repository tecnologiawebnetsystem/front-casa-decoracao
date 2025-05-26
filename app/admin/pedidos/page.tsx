"use client"

import { useState } from "react"
import ProfessionalAdminLayout from "@/components/admin/professional-admin-layout"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Card, CardContent } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import {
  Search,
  Filter,
  Eye,
  Edit,
  Download,
  Calendar,
  MapPin,
  Phone,
  Mail,
  Clock,
  DollarSign,
  Package,
  Truck,
  CheckCircle,
  AlertCircle,
  XCircle,
  Plus,
  MoreHorizontal,
  Palette,
  Scissors,
  Sparkles,
} from "lucide-react"

const mockOrders = [
  {
    id: "ORD-2024-001",
    customer: {
      name: "Maria Silva",
      email: "maria@email.com",
      phone: "(11) 99999-9999",
      address: "Rua das Flores, 123 - São Paulo/SP",
    },
    items: [
      { type: "Papel de Parede", description: "Papel Floral Premium", quantity: "15m²", price: 1299.9 },
      { type: "Instalação", description: "Mão de obra especializada", quantity: "1x", price: 800.0 },
    ],
    total: 2099.9,
    status: "measurement_scheduled",
    priority: "high",
    createdAt: new Date("2024-01-15"),
    scheduledDate: new Date("2024-01-20"),
    technician: "Carlos Oliveira",
    notes: "Cliente prefere instalação pela manhã",
  },
  {
    id: "ORD-2024-002",
    customer: {
      name: "João Santos",
      email: "joao@email.com",
      phone: "(11) 88888-8888",
      address: "Av. Paulista, 456 - São Paulo/SP",
    },
    items: [
      { type: "Cortinas", description: "Cortina Blackout Premium", quantity: "3x", price: 1599.9 },
      { type: "Instalação", description: "Instalação de cortinas", quantity: "1x", price: 300.0 },
    ],
    total: 1899.9,
    status: "in_production",
    priority: "medium",
    createdAt: new Date("2024-01-14"),
    scheduledDate: new Date("2024-01-25"),
    technician: "Fernanda Lima",
    notes: "Cortinas para sala e quartos",
  },
  {
    id: "ORD-2024-003",
    customer: {
      name: "Ana Costa",
      email: "ana@email.com",
      phone: "(11) 77777-7777",
      address: "Rua Augusta, 789 - São Paulo/SP",
    },
    items: [
      { type: "Papel de Parede", description: "Papel Geométrico", quantity: "20m²", price: 1799.9 },
      { type: "Cortinas", description: "Cortina Voil", quantity: "2x", price: 899.9 },
      { type: "Instalação", description: "Instalação completa", quantity: "1x", price: 500.0 },
    ],
    total: 3199.9,
    status: "installing_today",
    priority: "urgent",
    createdAt: new Date("2024-01-10"),
    scheduledDate: new Date("2024-01-18"),
    technician: "Roberto Silva",
    notes: "Projeto completo - sala e quarto",
  },
]

export default function AdminPedidos() {
  const [searchTerm, setSearchTerm] = useState("")
  const [selectedStatus, setSelectedStatus] = useState("all")
  const [orders] = useState(mockOrders)

  const getStatusInfo = (status: string) => {
    const statusMap = {
      pending: { label: "Pendente", color: "bg-yellow-100 text-yellow-800", icon: Clock },
      measurement_scheduled: { label: "Medição Agendada", color: "bg-blue-100 text-blue-800", icon: Calendar },
      in_production: { label: "Em Produção", color: "bg-purple-100 text-purple-800", icon: Package },
      installing_today: { label: "Instalação Hoje", color: "bg-orange-100 text-orange-800", icon: Truck },
      completed: { label: "Concluído", color: "bg-green-100 text-green-800", icon: CheckCircle },
      cancelled: { label: "Cancelado", color: "bg-red-100 text-red-800", icon: XCircle },
    } as const
    return statusMap[status as keyof typeof statusMap] || statusMap.pending
  }

  const getPriorityColor = (priority: string) => {
    const priorityMap = {
      low: "border-l-green-500",
      medium: "border-l-yellow-500",
      high: "border-l-orange-500",
      urgent: "border-l-red-500",
    } as const
    return priorityMap[priority as keyof typeof priorityMap] || priorityMap.medium
  }

  const formatCurrency = (value: number) => {
    return new Intl.NumberFormat("pt-BR", {
      style: "currency",
      currency: "BRL",
    }).format(value)
  }

  const formatDate = (date: Date) => {
    return new Intl.DateTimeFormat("pt-BR").format(date)
  }

  const orderStats = {
    total: orders.length,
    pending: orders.filter((o) => o.status === "pending").length,
    inProgress: orders.filter((o) => ["measurement_scheduled", "in_production"].includes(o.status)).length,
    today: orders.filter((o) => o.status === "installing_today").length,
    revenue: orders.reduce((sum, order) => sum + order.total, 0),
  }

  return (
    <ProfessionalAdminLayout>
      <div className="space-y-8">
        {/* Header */}
        <div className="flex flex-col lg:flex-row lg:items-center lg:justify-between gap-4">
          <div>
            <h1 className="text-3xl font-bold bg-gradient-to-r from-primary-600 to-secondary-600 bg-clip-text text-transparent">
              Gestão de Pedidos
            </h1>
            <p className="text-neutral-600 mt-1">Controle completo do pipeline de vendas e instalações</p>
          </div>

          <div className="flex items-center gap-3">
            <Button variant="outline" size="sm">
              <Download className="h-4 w-4 mr-2" />
              Exportar Relatório
            </Button>
            <Button className="bg-gradient-to-r from-primary-600 to-secondary-600">
              <Plus className="h-4 w-4 mr-2" />
              Novo Pedido
            </Button>
          </div>
        </div>

        {/* Stats Cards */}
        <div className="grid grid-cols-1 md:grid-cols-5 gap-6">
          <Card className="border-0 shadow-lg">
            <CardContent className="p-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm font-medium text-neutral-600">Total de Pedidos</p>
                  <p className="text-3xl font-bold text-neutral-800">{orderStats.total}</p>
                </div>
                <div className="p-3 bg-primary-50 rounded-xl">
                  <Package className="h-6 w-6 text-primary-600" />
                </div>
              </div>
            </CardContent>
          </Card>

          <Card className="border-0 shadow-lg">
            <CardContent className="p-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm font-medium text-neutral-600">Em Andamento</p>
                  <p className="text-3xl font-bold text-blue-600">{orderStats.inProgress}</p>
                </div>
                <div className="p-3 bg-blue-50 rounded-xl">
                  <Clock className="h-6 w-6 text-blue-600" />
                </div>
              </div>
            </CardContent>
          </Card>

          <Card className="border-0 shadow-lg">
            <CardContent className="p-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm font-medium text-neutral-600">Instalações Hoje</p>
                  <p className="text-3xl font-bold text-orange-600">{orderStats.today}</p>
                </div>
                <div className="p-3 bg-orange-50 rounded-xl">
                  <Truck className="h-6 w-6 text-orange-600" />
                </div>
              </div>
            </CardContent>
          </Card>

          <Card className="border-0 shadow-lg">
            <CardContent className="p-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm font-medium text-neutral-600">Pendentes</p>
                  <p className="text-3xl font-bold text-yellow-600">{orderStats.pending}</p>
                </div>
                <div className="p-3 bg-yellow-50 rounded-xl">
                  <AlertCircle className="h-6 w-6 text-yellow-600" />
                </div>
              </div>
            </CardContent>
          </Card>

          <Card className="border-0 shadow-lg">
            <CardContent className="p-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm font-medium text-neutral-600">Receita Total</p>
                  <p className="text-2xl font-bold text-green-600">{formatCurrency(orderStats.revenue)}</p>
                </div>
                <div className="p-3 bg-green-50 rounded-xl">
                  <DollarSign className="h-6 w-6 text-green-600" />
                </div>
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Filters */}
        <Card className="border-0 shadow-lg">
          <CardContent className="p-6">
            <div className="flex flex-col sm:flex-row gap-4">
              <div className="flex-1">
                <div className="relative">
                  <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-neutral-400 h-4 w-4" />
                  <Input
                    placeholder="Buscar por cliente, pedido, endereço..."
                    value={searchTerm}
                    onChange={(e) => setSearchTerm(e.target.value)}
                    className="pl-10 bg-white border-neutral-200"
                  />
                </div>
              </div>
              <div className="flex gap-2">
                <Button variant="outline">
                  <Filter className="h-4 w-4 mr-2" />
                  Filtros
                </Button>
                <Button variant="outline">Status</Button>
                <Button variant="outline">Prioridade</Button>
                <Button variant="outline">Período</Button>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Orders List */}
        <div className="space-y-6">
          {orders.map((order) => {
            const statusInfo = getStatusInfo(order.status)
            const StatusIcon = statusInfo.icon

            return (
              <Card
                key={order.id}
                className={`border-0 shadow-lg border-l-4 ${getPriorityColor(order.priority)} hover:shadow-xl transition-all duration-300`}
              >
                <CardContent className="p-6">
                  <div className="flex flex-col lg:flex-row lg:items-center lg:justify-between gap-6">
                    {/* Order Info */}
                    <div className="flex-1 space-y-4">
                      <div className="flex items-center justify-between">
                        <div className="flex items-center gap-4">
                          <div className="w-12 h-12 bg-gradient-to-r from-primary-100 to-secondary-100 rounded-xl flex items-center justify-center">
                            <Package className="h-6 w-6 text-primary-600" />
                          </div>
                          <div>
                            <h3 className="text-xl font-bold text-neutral-800">{order.id}</h3>
                            <p className="text-sm text-neutral-600">Criado em {formatDate(order.createdAt)}</p>
                          </div>
                        </div>
                        <div className="flex items-center gap-2">
                          <Badge className={statusInfo.color}>
                            <StatusIcon className="h-3 w-3 mr-1" />
                            {statusInfo.label}
                          </Badge>
                          <Badge
                            variant="outline"
                            className={`${order.priority === "urgent" ? "border-red-500 text-red-700" : order.priority === "high" ? "border-orange-500 text-orange-700" : "border-neutral-300"}`}
                          >
                            {order.priority === "urgent"
                              ? "Urgente"
                              : order.priority === "high"
                                ? "Alta"
                                : order.priority === "medium"
                                  ? "Média"
                                  : "Baixa"}
                          </Badge>
                        </div>
                      </div>

                      {/* Customer Info */}
                      <div className="grid grid-cols-1 md:grid-cols-2 gap-4 p-4 bg-neutral-50 rounded-xl">
                        <div>
                          <h4 className="font-semibold text-neutral-800 mb-2">Cliente</h4>
                          <div className="space-y-2">
                            <p className="font-medium text-neutral-700">{order.customer.name}</p>
                            <div className="flex items-center gap-2 text-sm text-neutral-600">
                              <Mail className="h-3 w-3" />
                              {order.customer.email}
                            </div>
                            <div className="flex items-center gap-2 text-sm text-neutral-600">
                              <Phone className="h-3 w-3" />
                              {order.customer.phone}
                            </div>
                            <div className="flex items-center gap-2 text-sm text-neutral-600">
                              <MapPin className="h-3 w-3" />
                              {order.customer.address}
                            </div>
                          </div>
                        </div>

                        <div>
                          <h4 className="font-semibold text-neutral-800 mb-2">Agendamento</h4>
                          <div className="space-y-2">
                            <div className="flex items-center gap-2 text-sm text-neutral-600">
                              <Calendar className="h-3 w-3" />
                              {formatDate(order.scheduledDate)}
                            </div>
                            <div className="flex items-center gap-2 text-sm text-neutral-600">
                              <Package className="h-3 w-3" />
                              Técnico: {order.technician}
                            </div>
                            {order.notes && <p className="text-sm text-neutral-600 italic">"{order.notes}"</p>}
                          </div>
                        </div>
                      </div>

                      {/* Items */}
                      <div>
                        <h4 className="font-semibold text-neutral-800 mb-3">Itens do Pedido</h4>
                        <div className="space-y-2">
                          {order.items.map((item, index) => (
                            <div
                              key={index}
                              className="flex items-center justify-between p-3 bg-white rounded-lg border"
                            >
                              <div className="flex items-center gap-3">
                                <div className="w-8 h-8 bg-primary-50 rounded-lg flex items-center justify-center">
                                  {item.type === "Papel de Parede" && <Palette className="h-4 w-4 text-primary-600" />}
                                  {item.type === "Cortinas" && <Scissors className="h-4 w-4 text-secondary-600" />}
                                  {item.type === "Instalação" && <Sparkles className="h-4 w-4 text-purple-600" />}
                                </div>
                                <div>
                                  <p className="font-medium text-neutral-800">{item.description}</p>
                                  <p className="text-sm text-neutral-600">
                                    {item.type} • {item.quantity}
                                  </p>
                                </div>
                              </div>
                              <p className="font-bold text-neutral-800">{formatCurrency(item.price)}</p>
                            </div>
                          ))}
                        </div>
                      </div>
                    </div>

                    {/* Actions & Total */}
                    <div className="lg:w-64 space-y-4">
                      <div className="text-center p-4 bg-gradient-to-r from-green-50 to-emerald-50 rounded-xl">
                        <p className="text-sm text-neutral-600 mb-1">Valor Total</p>
                        <p className="text-3xl font-bold text-green-600">{formatCurrency(order.total)}</p>
                      </div>

                      <div className="space-y-2">
                        <Button className="w-full" variant="default">
                          <Eye className="h-4 w-4 mr-2" />
                          Ver Detalhes
                        </Button>
                        <Button className="w-full" variant="outline">
                          <Edit className="h-4 w-4 mr-2" />
                          Editar Pedido
                        </Button>
                        <Button className="w-full" variant="outline">
                          <Calendar className="h-4 w-4 mr-2" />
                          Reagendar
                        </Button>
                        <Button className="w-full" variant="ghost">
                          <MoreHorizontal className="h-4 w-4 mr-2" />
                          Mais Ações
                        </Button>
                      </div>
                    </div>
                  </div>
                </CardContent>
              </Card>
            )
          })}
        </div>
      </div>
    </ProfessionalAdminLayout>
  )
}
