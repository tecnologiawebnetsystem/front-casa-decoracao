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
  Download,
  Plus,
  TrendingUp,
  CreditCard,
  Calendar,
  Eye,
  Edit,
  MoreHorizontal,
  ArrowUpRight,
  ArrowDownRight,
  PieChart,
  BarChart3,
  Receipt,
  Banknote,
  Clock,
  CheckCircle,
  AlertCircle,
  XCircle,
} from "lucide-react"

const mockTransactions = [
  {
    id: "TXN-001",
    type: "receita",
    description: "Venda - Papel de Parede Premium",
    customer: "Maria Silva",
    orderId: "ORD-2024-001",
    amount: 2099.9,
    method: "cartao_credito",
    status: "confirmado",
    date: new Date("2024-01-18"),
    dueDate: new Date("2024-01-18"),
    category: "vendas",
  },
  {
    id: "TXN-002",
    type: "despesa",
    description: "Compra de Materiais - Fornecedor A",
    supplier: "Decorart Ltda",
    amount: 1250.0,
    method: "transferencia",
    status: "pago",
    date: new Date("2024-01-17"),
    dueDate: new Date("2024-01-17"),
    category: "materiais",
  },
  {
    id: "TXN-003",
    type: "receita",
    description: "Venda - Cortinas Blackout",
    customer: "João Santos",
    orderId: "ORD-2024-002",
    amount: 1899.9,
    method: "pix",
    status: "pendente",
    date: new Date("2024-01-16"),
    dueDate: new Date("2024-01-20"),
    category: "vendas",
  },
  {
    id: "TXN-004",
    type: "despesa",
    description: "Salário - Carlos Oliveira",
    employee: "Carlos Oliveira",
    amount: 3500.0,
    method: "transferencia",
    status: "pago",
    date: new Date("2024-01-15"),
    dueDate: new Date("2024-01-15"),
    category: "salarios",
  },
  {
    id: "TXN-005",
    type: "despesa",
    description: "Aluguel do Escritório",
    amount: 2800.0,
    method: "boleto",
    status: "vencido",
    date: new Date("2024-01-10"),
    dueDate: new Date("2024-01-10"),
    category: "operacional",
  },
]

export default function AdminFinanceiro() {
  const [searchTerm, setSearchTerm] = useState("")
  const [selectedPeriod, setSelectedPeriod] = useState("30d")
  const [transactions] = useState(mockTransactions)

  const getStatusInfo = (status: string) => {
    const statusMap = {
      confirmado: { label: "Confirmado", color: "bg-green-100 text-green-800", icon: CheckCircle },
      pago: { label: "Pago", color: "bg-green-100 text-green-800", icon: CheckCircle },
      pendente: { label: "Pendente", color: "bg-yellow-100 text-yellow-800", icon: Clock },
      vencido: { label: "Vencido", color: "bg-red-100 text-red-800", icon: AlertCircle },
      cancelado: { label: "Cancelado", color: "bg-gray-100 text-gray-800", icon: XCircle },
    } as const

    return statusMap[status as keyof typeof statusMap] || statusMap.pendente
  }

  const getMethodInfo = (method: string) => {
    const methodMap = {
      cartao_credito: { label: "Cartão de Crédito", icon: CreditCard },
      cartao_debito: { label: "Cartão de Débito", icon: CreditCard },
      pix: { label: "PIX", icon: Banknote },
      transferencia: { label: "Transferência", icon: Banknote },
      boleto: { label: "Boleto", icon: Receipt },
      dinheiro: { label: "Dinheiro", icon: Banknote },
    } as const

    return methodMap[method as keyof typeof methodMap] || methodMap.pix
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

  // Cálculos financeiros
  const totalReceitas = transactions.filter((t) => t.type === "receita").reduce((sum, t) => sum + t.amount, 0)

  const totalDespesas = transactions.filter((t) => t.type === "despesa").reduce((sum, t) => sum + t.amount, 0)

  const lucroLiquido = totalReceitas - totalDespesas

  const receitasPendentes = transactions
    .filter((t) => t.type === "receita" && t.status === "pendente")
    .reduce((sum, t) => sum + t.amount, 0)

  const despesasVencidas = transactions
    .filter((t) => t.type === "despesa" && t.status === "vencido")
    .reduce((sum, t) => sum + t.amount, 0)

  const financialStats = {
    totalReceitas,
    totalDespesas,
    lucroLiquido,
    receitasPendentes,
    despesasVencidas,
    transacoes: transactions.length,
  }

  return (
    <ProfessionalAdminLayout>
      <div className="space-y-8">
        {/* Header */}
        <div className="flex flex-col lg:flex-row lg:items-center lg:justify-between gap-4">
          <div>
            <h1 className="text-3xl font-bold bg-gradient-to-r from-primary-600 to-secondary-600 bg-clip-text text-transparent">
              Gestão Financeira
            </h1>
            <p className="text-neutral-600 mt-1">Controle completo das finanças e fluxo de caixa</p>
          </div>

          <div className="flex items-center gap-3">
            <Button variant="outline" size="sm">
              <Download className="h-4 w-4 mr-2" />
              Relatório Financeiro
            </Button>
            <Button variant="outline" size="sm">
              <PieChart className="h-4 w-4 mr-2" />
              Dashboard
            </Button>
            <Button className="bg-gradient-to-r from-primary-600 to-secondary-600">
              <Plus className="h-4 w-4 mr-2" />
              Nova Transação
            </Button>
          </div>
        </div>

        {/* Financial Overview */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          <Card className="border-0 shadow-lg col-span-1 md:col-span-3">
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <BarChart3 className="h-5 w-5 text-primary-600" />
                Resumo Financeiro - Últimos 30 dias
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="grid grid-cols-1 md:grid-cols-6 gap-6">
                <div className="text-center p-4 bg-green-50 rounded-xl">
                  <div className="flex items-center justify-center gap-2 mb-2">
                    <ArrowUpRight className="h-5 w-5 text-green-600" />
                    <span className="text-sm font-medium text-green-700">Receitas</span>
                  </div>
                  <p className="text-2xl font-bold text-green-600">{formatCurrency(financialStats.totalReceitas)}</p>
                </div>

                <div className="text-center p-4 bg-red-50 rounded-xl">
                  <div className="flex items-center justify-center gap-2 mb-2">
                    <ArrowDownRight className="h-5 w-5 text-red-600" />
                    <span className="text-sm font-medium text-red-700">Despesas</span>
                  </div>
                  <p className="text-2xl font-bold text-red-600">{formatCurrency(financialStats.totalDespesas)}</p>
                </div>

                <div className="text-center p-4 bg-primary-50 rounded-xl">
                  <div className="flex items-center justify-center gap-2 mb-2">
                    <TrendingUp className="h-5 w-5 text-primary-600" />
                    <span className="text-sm font-medium text-primary-700">Lucro Líquido</span>
                  </div>
                  <p
                    className={`text-2xl font-bold ${financialStats.lucroLiquido >= 0 ? "text-green-600" : "text-red-600"}`}
                  >
                    {formatCurrency(financialStats.lucroLiquido)}
                  </p>
                </div>

                <div className="text-center p-4 bg-yellow-50 rounded-xl">
                  <div className="flex items-center justify-center gap-2 mb-2">
                    <Clock className="h-5 w-5 text-yellow-600" />
                    <span className="text-sm font-medium text-yellow-700">A Receber</span>
                  </div>
                  <p className="text-2xl font-bold text-yellow-600">
                    {formatCurrency(financialStats.receitasPendentes)}
                  </p>
                </div>

                <div className="text-center p-4 bg-orange-50 rounded-xl">
                  <div className="flex items-center justify-center gap-2 mb-2">
                    <AlertCircle className="h-5 w-5 text-orange-600" />
                    <span className="text-sm font-medium text-orange-700">Vencidas</span>
                  </div>
                  <p className="text-2xl font-bold text-orange-600">
                    {formatCurrency(financialStats.despesasVencidas)}
                  </p>
                </div>

                <div className="text-center p-4 bg-neutral-50 rounded-xl">
                  <div className="flex items-center justify-center gap-2 mb-2">
                    <Receipt className="h-5 w-5 text-neutral-600" />
                    <span className="text-sm font-medium text-neutral-700">Transações</span>
                  </div>
                  <p className="text-2xl font-bold text-neutral-600">{financialStats.transacoes}</p>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Alerts */}
        {financialStats.despesasVencidas > 0 && (
          <Card className="border-0 shadow-lg border-l-4 border-l-red-500">
            <CardContent className="p-6">
              <div className="flex items-center gap-4">
                <div className="p-3 bg-red-50 rounded-xl">
                  <AlertCircle className="h-6 w-6 text-red-600" />
                </div>
                <div>
                  <h3 className="font-semibold text-red-800">Atenção: Despesas vencidas!</h3>
                  <p className="text-red-600">
                    Você tem {formatCurrency(financialStats.despesasVencidas)} em despesas vencidas. Regularize para
                    evitar juros.
                  </p>
                </div>
                <Button variant="outline" className="ml-auto border-red-200 text-red-700 hover:bg-red-50">
                  Ver Despesas
                </Button>
              </div>
            </CardContent>
          </Card>
        )}

        {/* Quick Actions */}
        <Card className="border-0 shadow-lg">
          <CardHeader>
            <CardTitle>Ações Rápidas</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="grid grid-cols-1 md:grid-cols-5 gap-4">
              <Button variant="outline" className="h-20 flex-col gap-2">
                <ArrowUpRight className="h-6 w-6 text-green-600" />
                <span>Nova Receita</span>
              </Button>
              <Button variant="outline" className="h-20 flex-col gap-2">
                <ArrowDownRight className="h-6 w-6 text-red-600" />
                <span>Nova Despesa</span>
              </Button>
              <Button variant="outline" className="h-20 flex-col gap-2">
                <Receipt className="h-6 w-6" />
                <span>Gerar Boleto</span>
              </Button>
              <Button variant="outline" className="h-20 flex-col gap-2">
                <PieChart className="h-6 w-6" />
                <span>Relatórios</span>
              </Button>
              <Button variant="outline" className="h-20 flex-col gap-2">
                <Calendar className="h-6 w-6" />
                <span>Fluxo de Caixa</span>
              </Button>
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
                    placeholder="Buscar transações por descrição, cliente, fornecedor..."
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
                <Button variant="outline">Tipo</Button>
                <Button variant="outline">Status</Button>
                <Button variant="outline">Período</Button>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Transactions Table */}
        <Card className="border-0 shadow-lg">
          <CardHeader>
            <CardTitle>Transações Recentes ({transactions.length})</CardTitle>
          </CardHeader>
          <CardContent className="p-0">
            <div className="overflow-x-auto">
              <table className="w-full">
                <thead className="bg-neutral-50 border-b">
                  <tr>
                    <th className="text-left p-4 font-medium text-neutral-700">Transação</th>
                    <th className="text-left p-4 font-medium text-neutral-700">Tipo</th>
                    <th className="text-left p-4 font-medium text-neutral-700">Valor</th>
                    <th className="text-left p-4 font-medium text-neutral-700">Método</th>
                    <th className="text-left p-4 font-medium text-neutral-700">Data</th>
                    <th className="text-left p-4 font-medium text-neutral-700">Status</th>
                    <th className="text-left p-4 font-medium text-neutral-700">Ações</th>
                  </tr>
                </thead>
                <tbody>
                  {transactions.map((transaction) => {
                    const statusInfo = getStatusInfo(transaction.status)
                    const methodInfo = getMethodInfo(transaction.method)
                    const StatusIcon = statusInfo.icon
                    const MethodIcon = methodInfo.icon

                    return (
                      <tr key={transaction.id} className="border-b hover:bg-neutral-50 transition-colors">
                        <td className="p-4">
                          <div className="space-y-1">
                            <p className="font-medium text-neutral-800">{transaction.description}</p>
                            <p className="text-sm text-neutral-600">ID: {transaction.id}</p>
                            {transaction.customer && (
                              <p className="text-sm text-neutral-500">Cliente: {transaction.customer}</p>
                            )}
                            {transaction.supplier && (
                              <p className="text-sm text-neutral-500">Fornecedor: {transaction.supplier}</p>
                            )}
                            {transaction.orderId && (
                              <p className="text-sm text-primary-600">Pedido: {transaction.orderId}</p>
                            )}
                          </div>
                        </td>
                        <td className="p-4">
                          <div className="flex items-center gap-2">
                            {transaction.type === "receita" ? (
                              <ArrowUpRight className="h-4 w-4 text-green-600" />
                            ) : (
                              <ArrowDownRight className="h-4 w-4 text-red-600" />
                            )}
                            <Badge
                              variant="secondary"
                              className={
                                transaction.type === "receita" ? "bg-green-50 text-green-700" : "bg-red-50 text-red-700"
                              }
                            >
                              {transaction.type === "receita" ? "Receita" : "Despesa"}
                            </Badge>
                          </div>
                          <p className="text-xs text-neutral-500 mt-1 capitalize">{transaction.category}</p>
                        </td>
                        <td className="p-4">
                          <p
                            className={`text-xl font-bold ${
                              transaction.type === "receita" ? "text-green-600" : "text-red-600"
                            }`}
                          >
                            {transaction.type === "receita" ? "+" : "-"}
                            {formatCurrency(transaction.amount)}
                          </p>
                        </td>
                        <td className="p-4">
                          <div className="flex items-center gap-2">
                            <MethodIcon className="h-4 w-4 text-neutral-500" />
                            <span className="text-sm text-neutral-700">{methodInfo.label}</span>
                          </div>
                        </td>
                        <td className="p-4">
                          <div className="space-y-1">
                            <p className="text-sm text-neutral-700">{formatDate(transaction.date)}</p>
                            {transaction.dueDate && (
                              <p className="text-xs text-neutral-500">Venc: {formatDate(transaction.dueDate)}</p>
                            )}
                          </div>
                        </td>
                        <td className="p-4">
                          <Badge className={statusInfo.color}>
                            <StatusIcon className="h-3 w-3 mr-1" />
                            {statusInfo.label}
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
