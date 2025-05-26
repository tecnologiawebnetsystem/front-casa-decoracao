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
  Plus,
  Edit,
  Eye,
  Download,
  Upload,
  AlertTriangle,
  TrendingDown,
  TrendingUp,
  Package,
  Truck,
  BarChart3,
  Calendar,
  MapPin,
  MoreHorizontal,
  Palette,
  Scissors,
  Sparkles,
  Archive,
} from "lucide-react"

const mockInventory = [
  {
    id: "INV-001",
    name: "Papel de Parede Floral Premium",
    category: "Papel de Parede",
    subcategory: "Premium",
    brand: "Decorart",
    sku: "PAP-FLOR-001",
    currentStock: 5,
    minStock: 10,
    maxStock: 50,
    unit: "rolo",
    costPrice: 89.9,
    salePrice: 179.9,
    supplier: "Fornecedor A",
    location: "Estoque A - Prateleira 1",
    lastMovement: new Date("2024-01-15"),
    movementType: "saída",
    status: "low_stock",
    image: "/placeholder.svg?height=60&width=60&text=Papel",
  },
  {
    id: "INV-002",
    name: "Cortina Blackout Premium",
    category: "Cortinas",
    subcategory: "Blackout",
    brand: "CortinaBrasil",
    sku: "COR-BLK-001",
    currentStock: 25,
    minStock: 15,
    maxStock: 100,
    unit: "metro",
    costPrice: 45.9,
    salePrice: 89.9,
    supplier: "Fornecedor B",
    location: "Estoque B - Seção 2",
    lastMovement: new Date("2024-01-16"),
    movementType: "entrada",
    status: "in_stock",
    image: "/placeholder.svg?height=60&width=60&text=Cortina",
  },
  {
    id: "INV-003",
    name: "Papel de Parede Geométrico",
    category: "Papel de Parede",
    subcategory: "Moderno",
    brand: "WallDesign",
    sku: "PAP-GEO-001",
    currentStock: 0,
    minStock: 8,
    maxStock: 40,
    unit: "rolo",
    costPrice: 65.9,
    salePrice: 129.9,
    supplier: "Fornecedor C",
    location: "Estoque A - Prateleira 3",
    lastMovement: new Date("2024-01-10"),
    movementType: "saída",
    status: "out_of_stock",
    image: "/placeholder.svg?height=60&width=60&text=Geométrico",
  },
  {
    id: "INV-004",
    name: "Acessórios para Cortinas",
    category: "Acessórios",
    subcategory: "Suportes",
    brand: "MetalFix",
    sku: "ACC-SUP-001",
    currentStock: 150,
    minStock: 50,
    maxStock: 200,
    unit: "peça",
    costPrice: 12.9,
    salePrice: 25.9,
    supplier: "Fornecedor D",
    location: "Estoque C - Gaveta 1",
    lastMovement: new Date("2024-01-17"),
    movementType: "entrada",
    status: "in_stock",
    image: "/placeholder.svg?height=60&width=60&text=Acessório",
  },
]

export default function AdminEstoque() {
  const [searchTerm, setSearchTerm] = useState("")
  const [selectedCategory, setSelectedCategory] = useState("all")
  const [inventory] = useState(mockInventory)

  const getStatusInfo = (status: string, currentStock: number, minStock: number) => {
    if (status === "out_of_stock" || currentStock === 0) {
      return { label: "Sem Estoque", color: "bg-red-100 text-red-800", icon: AlertTriangle }
    }
    if (status === "low_stock" || currentStock <= minStock) {
      return { label: "Estoque Baixo", color: "bg-yellow-100 text-yellow-800", icon: TrendingDown }
    }
    return { label: "Em Estoque", color: "bg-green-100 text-green-800", icon: TrendingUp }
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

  const inventoryStats = {
    totalItems: inventory.length,
    lowStock: inventory.filter((item) => item.currentStock <= item.minStock).length,
    outOfStock: inventory.filter((item) => item.currentStock === 0).length,
    totalValue: inventory.reduce((sum, item) => sum + item.currentStock * item.costPrice, 0),
  }

  const getCategoryIcon = (category: string) => {
    switch (category) {
      case "Papel de Parede":
        return Palette
      case "Cortinas":
        return Scissors
      case "Acessórios":
        return Sparkles
      default:
        return Package
    }
  }

  return (
    <ProfessionalAdminLayout>
      <div className="space-y-8">
        {/* Header */}
        <div className="flex flex-col lg:flex-row lg:items-center lg:justify-between gap-4">
          <div>
            <h1 className="text-3xl font-bold bg-gradient-to-r from-primary-600 to-secondary-600 bg-clip-text text-transparent">
              Gestão de Estoque
            </h1>
            <p className="text-neutral-600 mt-1">Controle inteligente de inventário e movimentações</p>
          </div>

          <div className="flex items-center gap-3">
            <Button variant="outline" size="sm">
              <Download className="h-4 w-4 mr-2" />
              Exportar
            </Button>
            <Button variant="outline" size="sm">
              <Upload className="h-4 w-4 mr-2" />
              Importar
            </Button>
            <Button className="bg-gradient-to-r from-primary-600 to-secondary-600">
              <Plus className="h-4 w-4 mr-2" />
              Novo Item
            </Button>
          </div>
        </div>

        {/* Stats Cards */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
          <Card className="border-0 shadow-lg">
            <CardContent className="p-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm font-medium text-neutral-600">Total de Itens</p>
                  <p className="text-3xl font-bold text-neutral-800">{inventoryStats.totalItems}</p>
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
                  <p className="text-sm font-medium text-neutral-600">Estoque Baixo</p>
                  <p className="text-3xl font-bold text-yellow-600">{inventoryStats.lowStock}</p>
                </div>
                <div className="p-3 bg-yellow-50 rounded-xl">
                  <TrendingDown className="h-6 w-6 text-yellow-600" />
                </div>
              </div>
            </CardContent>
          </Card>

          <Card className="border-0 shadow-lg">
            <CardContent className="p-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm font-medium text-neutral-600">Sem Estoque</p>
                  <p className="text-3xl font-bold text-red-600">{inventoryStats.outOfStock}</p>
                </div>
                <div className="p-3 bg-red-50 rounded-xl">
                  <AlertTriangle className="h-6 w-6 text-red-600" />
                </div>
              </div>
            </CardContent>
          </Card>

          <Card className="border-0 shadow-lg">
            <CardContent className="p-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm font-medium text-neutral-600">Valor Total</p>
                  <p className="text-2xl font-bold text-green-600">{formatCurrency(inventoryStats.totalValue)}</p>
                </div>
                <div className="p-3 bg-green-50 rounded-xl">
                  <BarChart3 className="h-6 w-6 text-green-600" />
                </div>
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Alerts */}
        {inventoryStats.outOfStock > 0 && (
          <Card className="border-0 shadow-lg border-l-4 border-l-red-500">
            <CardContent className="p-6">
              <div className="flex items-center gap-4">
                <div className="p-3 bg-red-50 rounded-xl">
                  <AlertTriangle className="h-6 w-6 text-red-600" />
                </div>
                <div>
                  <h3 className="font-semibold text-red-800">Atenção: Produtos sem estoque!</h3>
                  <p className="text-red-600">
                    {inventoryStats.outOfStock} produto(s) estão sem estoque. Reponha urgentemente para evitar perda de
                    vendas.
                  </p>
                </div>
                <Button variant="outline" className="ml-auto border-red-200 text-red-700 hover:bg-red-50">
                  Ver Produtos
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
            <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
              <Button variant="outline" className="h-20 flex-col gap-2">
                <Truck className="h-6 w-6" />
                <span>Nova Entrada</span>
              </Button>
              <Button variant="outline" className="h-20 flex-col gap-2">
                <Archive className="h-6 w-6" />
                <span>Nova Saída</span>
              </Button>
              <Button variant="outline" className="h-20 flex-col gap-2">
                <BarChart3 className="h-6 w-6" />
                <span>Relatório</span>
              </Button>
              <Button variant="outline" className="h-20 flex-col gap-2">
                <Calendar className="h-6 w-6" />
                <span>Inventário</span>
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
                    placeholder="Buscar por nome, SKU, categoria..."
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
                <Button variant="outline">Categoria</Button>
                <Button variant="outline">Status</Button>
                <Button variant="outline">Fornecedor</Button>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Inventory Table */}
        <Card className="border-0 shadow-lg">
          <CardHeader>
            <CardTitle>Inventário ({inventory.length} itens)</CardTitle>
          </CardHeader>
          <CardContent className="p-0">
            <div className="overflow-x-auto">
              <table className="w-full">
                <thead className="bg-neutral-50 border-b">
                  <tr>
                    <th className="text-left p-4 font-medium text-neutral-700">Produto</th>
                    <th className="text-left p-4 font-medium text-neutral-700">Categoria</th>
                    <th className="text-left p-4 font-medium text-neutral-700">Estoque</th>
                    <th className="text-left p-4 font-medium text-neutral-700">Preços</th>
                    <th className="text-left p-4 font-medium text-neutral-700">Localização</th>
                    <th className="text-left p-4 font-medium text-neutral-700">Última Movimentação</th>
                    <th className="text-left p-4 font-medium text-neutral-700">Status</th>
                    <th className="text-left p-4 font-medium text-neutral-700">Ações</th>
                  </tr>
                </thead>
                <tbody>
                  {inventory.map((item) => {
                    const statusInfo = getStatusInfo(item.status, item.currentStock, item.minStock)
                    const StatusIcon = statusInfo.icon
                    const CategoryIcon = getCategoryIcon(item.category)

                    return (
                      <tr key={item.id} className="border-b hover:bg-neutral-50 transition-colors">
                        <td className="p-4">
                          <div className="flex items-center gap-4">
                            <img
                              src={item.image || "/placeholder.svg"}
                              alt={item.name}
                              className="w-16 h-16 object-cover rounded-lg"
                            />
                            <div>
                              <p className="font-medium text-neutral-800 mb-1">{item.name}</p>
                              <p className="text-sm text-neutral-600">SKU: {item.sku}</p>
                              <p className="text-sm text-neutral-500">{item.brand}</p>
                            </div>
                          </div>
                        </td>
                        <td className="p-4">
                          <div className="flex items-center gap-2">
                            <CategoryIcon className="h-4 w-4 text-primary-600" />
                            <div>
                              <Badge variant="secondary" className="bg-primary-50 text-primary-700">
                                {item.category}
                              </Badge>
                              <p className="text-xs text-neutral-500 mt-1">{item.subcategory}</p>
                            </div>
                          </div>
                        </td>
                        <td className="p-4">
                          <div className="space-y-1">
                            <div className="flex items-center gap-2">
                              <span className="font-bold text-lg text-neutral-800">{item.currentStock}</span>
                              <span className="text-sm text-neutral-600">{item.unit}</span>
                            </div>
                            <div className="text-xs text-neutral-500">
                              Min: {item.minStock} • Max: {item.maxStock}
                            </div>
                            <div className="w-full bg-neutral-200 rounded-full h-2">
                              <div
                                className={`h-2 rounded-full ${
                                  item.currentStock <= item.minStock
                                    ? "bg-red-500"
                                    : item.currentStock <= item.minStock * 1.5
                                      ? "bg-yellow-500"
                                      : "bg-green-500"
                                }`}
                                style={{ width: `${Math.min((item.currentStock / item.maxStock) * 100, 100)}%` }}
                              />
                            </div>
                          </div>
                        </td>
                        <td className="p-4">
                          <div className="space-y-1">
                            <div className="text-sm text-neutral-600">Custo:</div>
                            <div className="font-medium text-neutral-800">{formatCurrency(item.costPrice)}</div>
                            <div className="text-sm text-neutral-600">Venda:</div>
                            <div className="font-bold text-green-600">{formatCurrency(item.salePrice)}</div>
                          </div>
                        </td>
                        <td className="p-4">
                          <div className="space-y-1">
                            <div className="flex items-center gap-2 text-sm">
                              <MapPin className="h-3 w-3 text-neutral-400" />
                              <span className="text-neutral-700">{item.location}</span>
                            </div>
                            <p className="text-xs text-neutral-500">{item.supplier}</p>
                          </div>
                        </td>
                        <td className="p-4">
                          <div className="space-y-1">
                            <p className="text-sm text-neutral-700">{formatDate(item.lastMovement)}</p>
                            <Badge
                              variant="outline"
                              className={`text-xs ${
                                item.movementType === "entrada"
                                  ? "border-green-300 text-green-700"
                                  : "border-red-300 text-red-700"
                              }`}
                            >
                              {item.movementType === "entrada" ? "Entrada" : "Saída"}
                            </Badge>
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
