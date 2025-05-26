"use client"

import { useState } from "react"
import ProfessionalAdminLayout from "@/components/admin/professional-admin-layout"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import {
  Search,
  Filter,
  Edit,
  Eye,
  Mail,
  Phone,
  Calendar,
  Users,
  TrendingUp,
  Star,
  Crown,
  Download,
  UserPlus,
  MoreHorizontal,
} from "lucide-react"
import { mockCustomers } from "@/lib/mock-data"

export default function ProfessionalAdminClientes() {
  const [searchTerm, setSearchTerm] = useState("")
  const [customers] = useState(mockCustomers)

  const filteredCustomers = customers.filter(
    (customer) =>
      customer.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      customer.email.toLowerCase().includes(searchTerm.toLowerCase()),
  )

  const formatCurrency = (value: number) => {
    return new Intl.NumberFormat("pt-BR", {
      style: "currency",
      currency: "BRL",
    }).format(value)
  }

  const formatDate = (date: Date) => {
    return new Intl.DateTimeFormat("pt-BR").format(date)
  }

  const customerStats = {
    total: customers.length,
    newThisMonth: Math.floor(customers.length * 0.15),
    vip: customers.filter((c) => c.totalSpent > 5000).length,
    active: customers.filter((c) => c.totalSpent > 0).length,
  }

  const getCustomerTier = (totalSpent: number) => {
    if (totalSpent >= 10000) return { tier: "Diamante", color: "text-purple-600", bg: "bg-purple-50" }
    if (totalSpent >= 5000) return { tier: "Ouro", color: "text-yellow-600", bg: "bg-yellow-50" }
    if (totalSpent >= 2000) return { tier: "Prata", color: "text-gray-600", bg: "bg-gray-50" }
    return { tier: "Bronze", color: "text-orange-600", bg: "bg-orange-50" }
  }

  return (
    <ProfessionalAdminLayout>
      <div className="space-y-8">
        {/* Header */}
        <div className="flex flex-col lg:flex-row lg:items-center lg:justify-between gap-4">
          <div>
            <h1 className="text-3xl font-bold bg-gradient-to-r from-primary-600 to-secondary-600 bg-clip-text text-transparent">
              Gestão de Clientes
            </h1>
            <p className="text-neutral-600 mt-1">Gerencie relacionamentos e maximize o valor do cliente</p>
          </div>

          <div className="flex items-center gap-3">
            <Button variant="outline" size="sm">
              <Download className="h-4 w-4 mr-2" />
              Exportar Lista
            </Button>
            <Button className="bg-gradient-to-r from-primary-600 to-secondary-600">
              <UserPlus className="h-4 w-4 mr-2" />
              Novo Cliente
            </Button>
          </div>
        </div>

        {/* Stats Cards */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
          <Card className="border-0 shadow-lg">
            <CardContent className="p-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm font-medium text-neutral-600">Total de Clientes</p>
                  <p className="text-3xl font-bold text-neutral-800">{customerStats.total}</p>
                </div>
                <div className="p-3 bg-primary-50 rounded-xl">
                  <Users className="h-6 w-6 text-primary-600" />
                </div>
              </div>
            </CardContent>
          </Card>

          <Card className="border-0 shadow-lg">
            <CardContent className="p-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm font-medium text-neutral-600">Novos Este Mês</p>
                  <p className="text-3xl font-bold text-green-600">{customerStats.newThisMonth}</p>
                </div>
                <div className="p-3 bg-green-50 rounded-xl">
                  <TrendingUp className="h-6 w-6 text-green-600" />
                </div>
              </div>
            </CardContent>
          </Card>

          <Card className="border-0 shadow-lg">
            <CardContent className="p-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm font-medium text-neutral-600">Clientes VIP</p>
                  <p className="text-3xl font-bold text-yellow-600">{customerStats.vip}</p>
                </div>
                <div className="p-3 bg-yellow-50 rounded-xl">
                  <Crown className="h-6 w-6 text-yellow-600" />
                </div>
              </div>
            </CardContent>
          </Card>

          <Card className="border-0 shadow-lg">
            <CardContent className="p-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm font-medium text-neutral-600">Clientes Ativos</p>
                  <p className="text-3xl font-bold text-secondary-600">{customerStats.active}</p>
                </div>
                <div className="p-3 bg-secondary-50 rounded-xl">
                  <Star className="h-6 w-6 text-secondary-600" />
                </div>
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Top Customers */}
        <Card className="border-0 shadow-lg">
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Crown className="h-5 w-5 text-yellow-600" />
              Top 5 Clientes VIP
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              {customers
                .sort((a, b) => b.totalSpent - a.totalSpent)
                .slice(0, 5)
                .map((customer, index) => {
                  const tier = getCustomerTier(customer.totalSpent)
                  return (
                    <div key={customer.id} className="flex items-center justify-between p-4 bg-neutral-50 rounded-xl">
                      <div className="flex items-center gap-4">
                        <div className="relative">
                          <div className="w-12 h-12 bg-gradient-to-r from-primary-600 to-secondary-600 rounded-xl flex items-center justify-center text-white font-bold text-lg">
                            {customer.name.charAt(0)}
                          </div>
                          <div className="absolute -top-1 -right-1 w-6 h-6 bg-yellow-500 rounded-full flex items-center justify-center">
                            <span className="text-white text-xs font-bold">{index + 1}</span>
                          </div>
                        </div>
                        <div>
                          <div className="flex items-center gap-2">
                            <p className="font-medium text-neutral-800">{customer.name}</p>
                            <Badge className={`${tier.bg} ${tier.color} border-0`}>{tier.tier}</Badge>
                          </div>
                          <p className="text-sm text-neutral-600">{customer.email}</p>
                          <p className="text-xs text-neutral-500">{customer.loyaltyPoints} pontos de fidelidade</p>
                        </div>
                      </div>
                      <div className="text-right">
                        <p className="font-bold text-green-600 text-lg">{formatCurrency(customer.totalSpent)}</p>
                        <p className="text-sm text-neutral-600">Lifetime Value</p>
                      </div>
                    </div>
                  )
                })}
            </div>
          </CardContent>
        </Card>

        {/* Filters */}
        <Card className="border-0 shadow-lg">
          <CardContent className="p-6">
            <div className="flex flex-col sm:flex-row gap-4">
              <div className="flex-1">
                <div className="relative">
                  <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-neutral-400 h-4 w-4" />
                  <Input
                    placeholder="Buscar clientes por nome, email, telefone..."
                    value={searchTerm}
                    onChange={(e) => setSearchTerm(e.target.value)}
                    className="pl-10 bg-white border-neutral-200"
                  />
                </div>
              </div>
              <div className="flex gap-2">
                <Button variant="outline">
                  <Filter className="h-4 w-4 mr-2" />
                  Filtros Avançados
                </Button>
                <Button variant="outline">Tier</Button>
                <Button variant="outline">Período</Button>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Customers Table */}
        <Card className="border-0 shadow-lg">
          <CardHeader>
            <CardTitle>Lista de Clientes ({filteredCustomers.length})</CardTitle>
          </CardHeader>
          <CardContent className="p-0">
            <div className="overflow-x-auto">
              <table className="w-full">
                <thead className="bg-neutral-50 border-b">
                  <tr>
                    <th className="text-left p-4 font-medium text-neutral-700">Cliente</th>
                    <th className="text-left p-4 font-medium text-neutral-700">Tier</th>
                    <th className="text-left p-4 font-medium text-neutral-700">Contato</th>
                    <th className="text-left p-4 font-medium text-neutral-700">Cadastro</th>
                    <th className="text-left p-4 font-medium text-neutral-700">Lifetime Value</th>
                    <th className="text-left p-4 font-medium text-neutral-700">Pontos</th>
                    <th className="text-left p-4 font-medium text-neutral-700">Status</th>
                    <th className="text-left p-4 font-medium text-neutral-700">Ações</th>
                  </tr>
                </thead>
                <tbody>
                  {filteredCustomers.map((customer) => {
                    const tier = getCustomerTier(customer.totalSpent)
                    return (
                      <tr key={customer.id} className="border-b hover:bg-neutral-50 transition-colors">
                        <td className="p-4">
                          <div className="flex items-center gap-3">
                            <div className="w-10 h-10 bg-gradient-to-r from-primary-600 to-secondary-600 rounded-xl flex items-center justify-center text-white font-bold">
                              {customer.name.charAt(0)}
                            </div>
                            <div>
                              <p className="font-medium text-neutral-800">{customer.name}</p>
                              <p className="text-sm text-neutral-600">ID: {customer.id}</p>
                            </div>
                          </div>
                        </td>
                        <td className="p-4">
                          <Badge className={`${tier.bg} ${tier.color} border-0`}>{tier.tier}</Badge>
                        </td>
                        <td className="p-4">
                          <div className="space-y-1">
                            <div className="flex items-center gap-2 text-sm">
                              <Mail className="h-3 w-3 text-neutral-400" />
                              <span className="text-neutral-700">{customer.email}</span>
                            </div>
                            {customer.phone && (
                              <div className="flex items-center gap-2 text-sm">
                                <Phone className="h-3 w-3 text-neutral-400" />
                                <span className="text-neutral-700">{customer.phone}</span>
                              </div>
                            )}
                          </div>
                        </td>
                        <td className="p-4">
                          <div className="flex items-center gap-2 text-sm">
                            <Calendar className="h-3 w-3 text-neutral-400" />
                            <span className="text-neutral-700">{formatDate(customer.createdAt)}</span>
                          </div>
                        </td>
                        <td className="p-4">
                          <p className="font-bold text-green-600 text-lg">{formatCurrency(customer.totalSpent)}</p>
                        </td>
                        <td className="p-4">
                          <div className="flex items-center gap-2">
                            <Star className="h-4 w-4 text-yellow-500" />
                            <Badge variant="secondary" className="bg-yellow-50 text-yellow-700">
                              {customer.loyaltyPoints}
                            </Badge>
                          </div>
                        </td>
                        <td className="p-4">
                          <Badge
                            variant="default"
                            className={
                              customer.totalSpent > 0 ? "bg-green-100 text-green-800" : "bg-gray-100 text-gray-800"
                            }
                          >
                            {customer.totalSpent > 0 ? "Ativo" : "Inativo"}
                          </Badge>
                        </td>
                        <td className="p-4">
                          <div className="flex items-center gap-1">
                            <Button size="sm" variant="ghost" className="h-8 w-8 p-0">
                              <Eye className="h-4 w-4" />
                            </Button>
                            <Button size="sm" variant="ghost" className="h-8 w-8 p-0">
                              <Edit className="h-4 w-4" />
                            </Button>
                            <Button size="sm" variant="ghost" className="h-8 w-8 p-0">
                              <MoreHorizontal className="h-4 w-4" />
                            </Button>
                          </div>
                        </td>
                      </tr>
                    )
                  })}
                </tbody>
              </table>
            </div>
          </CardContent>
        </Card>
      </div>
    </ProfessionalAdminLayout>
  )
}
