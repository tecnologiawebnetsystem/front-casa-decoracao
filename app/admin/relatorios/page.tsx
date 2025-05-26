"use client"

import { useState } from "react"
import ProfessionalAdminLayout from "@/components/admin/professional-admin-layout"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import {
  Download,
  Calendar,
  TrendingUp,
  BarChart3,
  PieChart,
  FileText,
  Users,
  Package,
  DollarSign,
  Eye,
  Filter,
  ArrowUpRight,
  ArrowDownRight,
  Palette,
  Scissors,
  Sparkles,
  Star,
  Target,
  Zap,
} from "lucide-react"

const reportCategories = [
  {
    id: "vendas",
    title: "Relatórios de Vendas",
    description: "Análise completa de performance de vendas",
    icon: TrendingUp,
    color: "from-green-500 to-emerald-600",
    reports: [
      { name: "Vendas por Período", description: "Análise temporal das vendas", type: "chart" },
      { name: "Top Produtos", description: "Produtos mais vendidos", type: "table" },
      { name: "Performance por Vendedor", description: "Ranking de vendedores", type: "chart" },
      { name: "Conversão de Leads", description: "Taxa de conversão", type: "metric" },
    ],
  },
  {
    id: "financeiro",
    title: "Relatórios Financeiros",
    description: "Controle financeiro e fluxo de caixa",
    icon: DollarSign,
    color: "from-blue-500 to-cyan-600",
    reports: [
      { name: "Fluxo de Caixa", description: "Entradas e saídas", type: "chart" },
      { name: "DRE Simplificado", description: "Demonstrativo de resultados", type: "table" },
      { name: "Contas a Receber", description: "Valores pendentes", type: "table" },
      { name: "Análise de Margem", description: "Margem por produto", type: "chart" },
    ],
  },
  {
    id: "estoque",
    title: "Relatórios de Estoque",
    description: "Gestão e controle de inventário",
    icon: Package,
    color: "from-purple-500 to-violet-600",
    reports: [
      { name: "Giro de Estoque", description: "Velocidade de rotação", type: "chart" },
      { name: "Produtos em Falta", description: "Itens sem estoque", type: "table" },
      { name: "Curva ABC", description: "Classificação de produtos", type: "chart" },
      { name: "Previsão de Compras", description: "Sugestões de reposição", type: "table" },
    ],
  },
  {
    id: "clientes",
    title: "Relatórios de Clientes",
    description: "Análise de comportamento e satisfação",
    icon: Users,
    color: "from-orange-500 to-red-600",
    reports: [
      { name: "Perfil de Clientes", description: "Segmentação demográfica", type: "chart" },
      { name: "Lifetime Value", description: "Valor vitalício do cliente", type: "table" },
      { name: "Churn Rate", description: "Taxa de cancelamento", type: "metric" },
      { name: "Satisfação", description: "Pesquisas e avaliações", type: "chart" },
    ],
  },
]

const quickMetrics = [
  {
    title: "Vendas Hoje",
    value: "R$ 12.450",
    change: "+18%",
    trend: "up",
    icon: TrendingUp,
    color: "text-green-600",
  },
  {
    title: "Pedidos Ativos",
    value: "47",
    change: "+12%",
    trend: "up",
    icon: Package,
    color: "text-blue-600",
  },
  {
    title: "Clientes Novos",
    value: "8",
    change: "+25%",
    trend: "up",
    icon: Users,
    color: "text-purple-600",
  },
  {
    title: "Ticket Médio",
    value: "R$ 1.890",
    change: "+5%",
    trend: "up",
    icon: Target,
    color: "text-orange-600",
  },
]

export default function AdminRelatorios() {
  const [selectedPeriod, setSelectedPeriod] = useState("30d")
  const [selectedCategory, setSelectedCategory] = useState("all")

  return (
    <ProfessionalAdminLayout>
      <div className="space-y-8">
        {/* Header */}
        <div className="flex flex-col lg:flex-row lg:items-center lg:justify-between gap-4">
          <div>
            <h1 className="text-3xl font-bold bg-gradient-to-r from-primary-600 to-secondary-600 bg-clip-text text-transparent">
              Central de Relatórios
            </h1>
            <p className="text-neutral-600 mt-1">Insights inteligentes para tomada de decisões estratégicas</p>
          </div>

          <div className="flex items-center gap-3">
            <Button variant="outline" size="sm">
              <Calendar className="h-4 w-4 mr-2" />
              Últimos 30 dias
            </Button>
            <Button variant="outline" size="sm">
              <Filter className="h-4 w-4 mr-2" />
              Filtros
            </Button>
            <Button className="bg-gradient-to-r from-primary-600 to-secondary-600">
              <Download className="h-4 w-4 mr-2" />
              Exportar Tudo
            </Button>
          </div>
        </div>

        {/* Quick Metrics */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
          {quickMetrics.map((metric, index) => (
            <Card key={index} className="border-0 shadow-lg hover:shadow-xl transition-all duration-300">
              <CardContent className="p-6">
                <div className="flex items-center justify-between mb-4">
                  <div className="p-3 bg-neutral-50 rounded-xl">
                    <metric.icon className={`h-6 w-6 ${metric.color}`} />
                  </div>
                  <div
                    className={`flex items-center gap-1 text-sm font-medium ${
                      metric.trend === "up" ? "text-green-600" : "text-red-600"
                    }`}
                  >
                    {metric.trend === "up" ? (
                      <ArrowUpRight className="h-4 w-4" />
                    ) : (
                      <ArrowDownRight className="h-4 w-4" />
                    )}
                    {metric.change}
                  </div>
                </div>
                <div>
                  <p className="text-sm font-medium text-neutral-600 mb-1">{metric.title}</p>
                  <p className="text-3xl font-bold text-neutral-800">{metric.value}</p>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>

        {/* Performance Overview */}
        <Card className="border-0 shadow-lg">
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <BarChart3 className="h-5 w-5 text-primary-600" />
              Performance Geral - Últimos 30 dias
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              <div className="p-6 bg-gradient-to-r from-green-50 to-emerald-50 rounded-xl">
                <div className="flex items-center gap-3 mb-4">
                  <Palette className="h-6 w-6 text-green-600" />
                  <h3 className="font-semibold text-green-800">Papel de Parede</h3>
                </div>
                <div className="space-y-2">
                  <div className="flex justify-between">
                    <span className="text-sm text-green-700">Vendas</span>
                    <span className="font-bold text-green-800">R$ 342K</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-sm text-green-700">Pedidos</span>
                    <span className="font-medium text-green-800">156</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-sm text-green-700">Crescimento</span>
                    <Badge className="bg-green-100 text-green-800">+18%</Badge>
                  </div>
                </div>
              </div>

              <div className="p-6 bg-gradient-to-r from-blue-50 to-cyan-50 rounded-xl">
                <div className="flex items-center gap-3 mb-4">
                  <Scissors className="h-6 w-6 text-blue-600" />
                  <h3 className="font-semibold text-blue-800">Cortinas</h3>
                </div>
                <div className="space-y-2">
                  <div className="flex justify-between">
                    <span className="text-sm text-blue-700">Vendas</span>
                    <span className="font-bold text-blue-800">R$ 298K</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-sm text-blue-700">Pedidos</span>
                    <span className="font-medium text-blue-800">89</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-sm text-blue-700">Crescimento</span>
                    <Badge className="bg-blue-100 text-blue-800">+12%</Badge>
                  </div>
                </div>
              </div>

              <div className="p-6 bg-gradient-to-r from-purple-50 to-violet-50 rounded-xl">
                <div className="flex items-center gap-3 mb-4">
                  <Sparkles className="h-6 w-6 text-purple-600" />
                  <h3 className="font-semibold text-purple-800">Decoração</h3>
                </div>
                <div className="space-y-2">
                  <div className="flex justify-between">
                    <span className="text-sm text-purple-700">Vendas</span>
                    <span className="font-bold text-purple-800">R$ 207K</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-sm text-purple-700">Pedidos</span>
                    <span className="font-medium text-purple-800">234</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-sm text-purple-700">Crescimento</span>
                    <Badge className="bg-purple-100 text-purple-800">+25%</Badge>
                  </div>
                </div>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Report Categories */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
          {reportCategories.map((category) => (
            <Card key={category.id} className="border-0 shadow-lg hover:shadow-xl transition-all duration-300">
              <CardHeader>
                <CardTitle className="flex items-center gap-3">
                  <div className={`p-3 bg-gradient-to-r ${category.color} rounded-xl`}>
                    <category.icon className="h-6 w-6 text-white" />
                  </div>
                  <div>
                    <h3 className="text-xl font-bold text-neutral-800">{category.title}</h3>
                    <p className="text-sm text-neutral-600">{category.description}</p>
                  </div>
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-3">
                  {category.reports.map((report, index) => (
                    <div
                      key={index}
                      className="flex items-center justify-between p-4 bg-neutral-50 rounded-xl hover:bg-neutral-100 transition-colors cursor-pointer"
                    >
                      <div className="flex items-center gap-3">
                        <div className="w-8 h-8 bg-white rounded-lg flex items-center justify-center">
                          {report.type === "chart" && <BarChart3 className="h-4 w-4 text-primary-600" />}
                          {report.type === "table" && <FileText className="h-4 w-4 text-secondary-600" />}
                          {report.type === "metric" && <Zap className="h-4 w-4 text-yellow-600" />}
                        </div>
                        <div>
                          <p className="font-medium text-neutral-800">{report.name}</p>
                          <p className="text-sm text-neutral-600">{report.description}</p>
                        </div>
                      </div>
                      <div className="flex items-center gap-2">
                        <Button size="sm" variant="ghost">
                          <Eye className="h-4 w-4" />
                        </Button>
                        <Button size="sm" variant="ghost">
                          <Download className="h-4 w-4" />
                        </Button>
                      </div>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
          ))}
        </div>

        {/* Custom Reports */}
        <Card className="border-0 shadow-lg">
          <CardHeader>
            <CardTitle className="flex items-center justify-between">
              <span className="flex items-center gap-2">
                <Star className="h-5 w-5 text-yellow-600" />
                Relatórios Personalizados
              </span>
              <Button className="bg-gradient-to-r from-primary-600 to-secondary-600">Criar Relatório</Button>
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              <div className="p-6 border-2 border-dashed border-neutral-200 rounded-xl text-center">
                <PieChart className="h-12 w-12 text-neutral-400 mx-auto mb-4" />
                <h3 className="font-medium text-neutral-800 mb-2">Análise de Margem por Cliente</h3>
                <p className="text-sm text-neutral-600 mb-4">Identifique os clientes mais lucrativos</p>
                <Button variant="outline" size="sm">
                  Gerar Relatório
                </Button>
              </div>

              <div className="p-6 border-2 border-dashed border-neutral-200 rounded-xl text-center">
                <BarChart3 className="h-12 w-12 text-neutral-400 mx-auto mb-4" />
                <h3 className="font-medium text-neutral-800 mb-2">Sazonalidade de Vendas</h3>
                <p className="text-sm text-neutral-600 mb-4">Padrões de vendas ao longo do ano</p>
                <Button variant="outline" size="sm">
                  Gerar Relatório
                </Button>
              </div>

              <div className="p-6 border-2 border-dashed border-neutral-200 rounded-xl text-center">
                <TrendingUp className="h-12 w-12 text-neutral-400 mx-auto mb-4" />
                <h3 className="font-medium text-neutral-800 mb-2">ROI por Canal de Marketing</h3>
                <p className="text-sm text-neutral-600 mb-4">Efetividade dos investimentos em marketing</p>
                <Button variant="outline" size="sm">
                  Gerar Relatório
                </Button>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>
    </ProfessionalAdminLayout>
  )
}
