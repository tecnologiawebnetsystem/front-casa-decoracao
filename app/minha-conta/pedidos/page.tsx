"use client"

import { useState } from "react"
import { Package, Truck, Check, Clock, X, Eye, Download, MessageCircle } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Input } from "@/components/ui/input"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import Header from "@/components/header"
import Footer from "@/components/footer"
import CustomerLayout from "@/components/customer/customer-layout"

export default function MeusPedidosPage() {
  const [searchTerm, setSearchTerm] = useState("")
  const [statusFilter, setStatusFilter] = useState("all")

  const formatPrice = (price: number) => {
    return new Intl.NumberFormat("pt-BR", {
      style: "currency",
      currency: "BRL",
    }).format(price)
  }

  const formatDate = (date: string) => {
    return new Date(date).toLocaleDateString("pt-BR")
  }

  // Dados simulados dos pedidos
  const orders = [
    {
      id: "#12345",
      date: "2024-01-15",
      status: "delivered",
      total: 2599.9,
      items: [
        { name: "Papel de Parede Floral Premium", quantity: 2, price: 899.9 },
        { name: "Cortina Blackout Elegante", quantity: 1, price: 1200.0 },
      ],
      tracking: "BR123456789",
      estimatedDelivery: "2024-01-22",
    },
    {
      id: "#12346",
      date: "2024-01-20",
      status: "shipped",
      total: 1899.9,
      items: [{ name: "Papel de Parede Geométrico", quantity: 3, price: 1899.9 }],
      tracking: "BR987654321",
      estimatedDelivery: "2024-01-27",
    },
    {
      id: "#12347",
      date: "2024-01-25",
      status: "processing",
      total: 3299.9,
      items: [
        { name: "Cortina Dupla Camada", quantity: 2, price: 2999.9 },
        { name: "Instalação Profissional", quantity: 1, price: 300.0 },
      ],
      tracking: null,
      estimatedDelivery: "2024-02-05",
    },
    {
      id: "#12348",
      date: "2024-01-28",
      status: "pending",
      total: 899.9,
      items: [{ name: "Papel de Parede Infantil", quantity: 1, price: 899.9 }],
      tracking: null,
      estimatedDelivery: "2024-02-10",
    },
  ]

  const getStatusInfo = (status: string) => {
    switch (status) {
      case "pending":
        return { label: "Aguardando Pagamento", color: "bg-yellow-100 text-yellow-800", icon: Clock }
      case "processing":
        return { label: "Preparando", color: "bg-blue-100 text-blue-800", icon: Package }
      case "shipped":
        return { label: "Em Trânsito", color: "bg-purple-100 text-purple-800", icon: Truck }
      case "delivered":
        return { label: "Entregue", color: "bg-green-100 text-green-800", icon: Check }
      case "cancelled":
        return { label: "Cancelado", color: "bg-red-100 text-red-800", icon: X }
      default:
        return { label: "Desconhecido", color: "bg-neutral-100 text-neutral-800", icon: Package }
    }
  }

  const filteredOrders = orders.filter((order) => {
    const matchesSearch =
      order.id.toLowerCase().includes(searchTerm.toLowerCase()) ||
      order.items.some((item) => item.name.toLowerCase().includes(searchTerm.toLowerCase()))
    const matchesStatus = statusFilter === "all" || order.status === statusFilter
    return matchesSearch && matchesStatus
  })

  const ordersByStatus = {
    all: orders,
    pending: orders.filter((o) => o.status === "pending"),
    processing: orders.filter((o) => o.status === "processing"),
    shipped: orders.filter((o) => o.status === "shipped"),
    delivered: orders.filter((o) => o.status === "delivered"),
    cancelled: orders.filter((o) => o.status === "cancelled"),
  }

  return (
    <div className="min-h-screen bg-neutral-50">
      <Header />
      <CustomerLayout>
        <div className="space-y-6">
          <div>
            <h1 className="text-3xl font-bold text-neutral-800">Meus Pedidos</h1>
            <p className="text-neutral-600">Acompanhe o status dos seus pedidos</p>
          </div>

          {/* Filtros */}
          <Card>
            <CardContent className="p-4">
              <div className="flex flex-col sm:flex-row gap-4">
                <div className="flex-1">
                  <Input
                    placeholder="Buscar por número do pedido ou produto..."
                    value={searchTerm}
                    onChange={(e) => setSearchTerm(e.target.value)}
                  />
                </div>
                <Select value={statusFilter} onValueChange={setStatusFilter}>
                  <SelectTrigger className="w-48">
                    <SelectValue placeholder="Filtrar por status" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="all">Todos os status</SelectItem>
                    <SelectItem value="pending">Aguardando Pagamento</SelectItem>
                    <SelectItem value="processing">Preparando</SelectItem>
                    <SelectItem value="shipped">Em Trânsito</SelectItem>
                    <SelectItem value="delivered">Entregue</SelectItem>
                    <SelectItem value="cancelled">Cancelado</SelectItem>
                  </SelectContent>
                </Select>
              </div>
            </CardContent>
          </Card>

          {/* Tabs por status */}
          <Tabs defaultValue="all" className="space-y-6">
            <TabsList className="grid w-full grid-cols-6">
              <TabsTrigger value="all">Todos ({ordersByStatus.all.length})</TabsTrigger>
              <TabsTrigger value="pending">Pendente ({ordersByStatus.pending.length})</TabsTrigger>
              <TabsTrigger value="processing">Preparando ({ordersByStatus.processing.length})</TabsTrigger>
              <TabsTrigger value="shipped">Enviado ({ordersByStatus.shipped.length})</TabsTrigger>
              <TabsTrigger value="delivered">Entregue ({ordersByStatus.delivered.length})</TabsTrigger>
              <TabsTrigger value="cancelled">Cancelado ({ordersByStatus.cancelled.length})</TabsTrigger>
            </TabsList>

            {Object.entries(ordersByStatus).map(([status, orders]) => (
              <TabsContent key={status} value={status}>
                <div className="space-y-4">
                  {(status === "all" ? filteredOrders : orders).map((order) => {
                    const statusInfo = getStatusInfo(order.status)
                    const StatusIcon = statusInfo.icon

                    return (
                      <Card key={order.id} className="hover:shadow-lg transition-shadow">
                        <CardContent className="p-6">
                          <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-4">
                            {/* Informações do pedido */}
                            <div className="flex-1">
                              <div className="flex items-center gap-4 mb-3">
                                <h3 className="text-lg font-semibold">{order.id}</h3>
                                <Badge className={statusInfo.color}>
                                  <StatusIcon className="h-3 w-3 mr-1" />
                                  {statusInfo.label}
                                </Badge>
                              </div>

                              <div className="grid grid-cols-1 md:grid-cols-3 gap-4 text-sm">
                                <div>
                                  <p className="text-neutral-600">Data do Pedido</p>
                                  <p className="font-medium">{formatDate(order.date)}</p>
                                </div>
                                <div>
                                  <p className="text-neutral-600">Total</p>
                                  <p className="font-medium text-primary-600">{formatPrice(order.total)}</p>
                                </div>
                                <div>
                                  <p className="text-neutral-600">Previsão de Entrega</p>
                                  <p className="font-medium">{formatDate(order.estimatedDelivery)}</p>
                                </div>
                              </div>

                              {/* Itens do pedido */}
                              <div className="mt-4">
                                <p className="text-sm text-neutral-600 mb-2">Itens:</p>
                                <div className="space-y-1">
                                  {order.items.map((item, index) => (
                                    <p key={index} className="text-sm">
                                      {item.quantity}x {item.name}
                                    </p>
                                  ))}
                                </div>
                              </div>

                              {/* Código de rastreamento */}
                              {order.tracking && (
                                <div className="mt-3">
                                  <p className="text-sm text-neutral-600">Código de Rastreamento:</p>
                                  <p className="text-sm font-mono bg-neutral-100 px-2 py-1 rounded inline-block">
                                    {order.tracking}
                                  </p>
                                </div>
                              )}
                            </div>

                            {/* Ações */}
                            <div className="flex flex-col gap-2 min-w-[200px]">
                              <Button variant="outline" size="sm" className="w-full">
                                <Eye className="h-4 w-4 mr-2" />
                                Ver Detalhes
                              </Button>

                              {order.tracking && (
                                <Button variant="outline" size="sm" className="w-full">
                                  <Truck className="h-4 w-4 mr-2" />
                                  Rastrear Pedido
                                </Button>
                              )}

                              <Button variant="outline" size="sm" className="w-full">
                                <Download className="h-4 w-4 mr-2" />
                                Baixar Nota
                              </Button>

                              {order.status === "delivered" && (
                                <Button variant="outline" size="sm" className="w-full">
                                  <MessageCircle className="h-4 w-4 mr-2" />
                                  Avaliar
                                </Button>
                              )}

                              {order.status === "pending" && (
                                <Button size="sm" className="w-full bg-primary-600 hover:bg-primary-700">
                                  Pagar Agora
                                </Button>
                              )}
                            </div>
                          </div>
                        </CardContent>
                      </Card>
                    )
                  })}

                  {(status === "all" ? filteredOrders : orders).length === 0 && (
                    <Card>
                      <CardContent className="p-12 text-center">
                        <Package className="h-12 w-12 mx-auto text-neutral-300 mb-4" />
                        <h3 className="text-lg font-semibold text-neutral-600 mb-2">Nenhum pedido encontrado</h3>
                        <p className="text-neutral-500 mb-6">
                          {status === "all"
                            ? "Você ainda não fez nenhum pedido"
                            : `Nenhum pedido com status "${getStatusInfo(status).label}"`}
                        </p>
                        <Button className="bg-primary-600 hover:bg-primary-700">Fazer Primeiro Pedido</Button>
                      </CardContent>
                    </Card>
                  )}
                </div>
              </TabsContent>
            ))}
          </Tabs>
        </div>
      </CustomerLayout>
      <Footer />
    </div>
  )
}
