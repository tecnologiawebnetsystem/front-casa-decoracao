"use client"

import { useState } from "react"
import ProfessionalAdminLayout from "@/components/admin/professional-admin-layout"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import {
  Plus,
  Search,
  Filter,
  Edit,
  Eye,
  Download,
  Upload,
  MoreHorizontal,
  Package,
  TrendingUp,
  AlertTriangle,
  Star,
} from "lucide-react"
import { mockProducts } from "@/lib/mock-data"

export default function ProfessionalAdminProdutos() {
  const [searchTerm, setSearchTerm] = useState("")
  const [products] = useState(mockProducts)
  const [selectedProducts, setSelectedProducts] = useState<string[]>([])

  const filteredProducts = products.filter(
    (product) =>
      product.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      product.category.toLowerCase().includes(searchTerm.toLowerCase()),
  )

  const formatPrice = (price: number) => {
    return new Intl.NumberFormat("pt-BR", {
      style: "currency",
      currency: "BRL",
    }).format(price)
  }

  const productStats = {
    total: products.length,
    active: products.filter((p) => p.stock > 0).length,
    lowStock: products.filter((p) => p.stock <= 10).length,
    featured: products.filter((p) => p.featured).length,
  }

  return (
    <ProfessionalAdminLayout>
      <div className="space-y-8">
        {/* Header */}
        <div className="flex flex-col lg:flex-row lg:items-center lg:justify-between gap-4">
          <div>
            <h1 className="text-3xl font-bold bg-gradient-to-r from-primary-600 to-secondary-600 bg-clip-text text-transparent">
              Gestão de Produtos
            </h1>
            <p className="text-neutral-600 mt-1">Gerencie seu catálogo completo de produtos</p>
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
              Novo Produto
            </Button>
          </div>
        </div>

        {/* Stats Cards */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
          <Card className="border-0 shadow-lg">
            <CardContent className="p-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm font-medium text-neutral-600">Total de Produtos</p>
                  <p className="text-3xl font-bold text-neutral-800">{productStats.total}</p>
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
                  <p className="text-sm font-medium text-neutral-600">Produtos Ativos</p>
                  <p className="text-3xl font-bold text-green-600">{productStats.active}</p>
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
                  <p className="text-sm font-medium text-neutral-600">Estoque Baixo</p>
                  <p className="text-3xl font-bold text-orange-600">{productStats.lowStock}</p>
                </div>
                <div className="p-3 bg-orange-50 rounded-xl">
                  <AlertTriangle className="h-6 w-6 text-orange-600" />
                </div>
              </div>
            </CardContent>
          </Card>

          <Card className="border-0 shadow-lg">
            <CardContent className="p-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm font-medium text-neutral-600">Em Destaque</p>
                  <p className="text-3xl font-bold text-yellow-600">{productStats.featured}</p>
                </div>
                <div className="p-3 bg-yellow-50 rounded-xl">
                  <Star className="h-6 w-6 text-yellow-600" />
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
                    placeholder="Buscar produtos por nome, categoria, marca..."
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
                <Button variant="outline">Categoria</Button>
                <Button variant="outline">Status</Button>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Products Table */}
        <Card className="border-0 shadow-lg">
          <CardHeader>
            <CardTitle className="flex items-center justify-between">
              <span>Produtos ({filteredProducts.length})</span>
              {selectedProducts.length > 0 && (
                <div className="flex items-center gap-2">
                  <span className="text-sm text-neutral-600">{selectedProducts.length} selecionados</span>
                  <Button variant="outline" size="sm">
                    Ações em Lote
                  </Button>
                </div>
              )}
            </CardTitle>
          </CardHeader>
          <CardContent className="p-0">
            <div className="overflow-x-auto">
              <table className="w-full">
                <thead className="bg-neutral-50 border-b">
                  <tr>
                    <th className="text-left p-4 font-medium text-neutral-700">
                      <input type="checkbox" className="rounded border-neutral-300" />
                    </th>
                    <th className="text-left p-4 font-medium text-neutral-700">Produto</th>
                    <th className="text-left p-4 font-medium text-neutral-700">Categoria</th>
                    <th className="text-left p-4 font-medium text-neutral-700">Preço</th>
                    <th className="text-left p-4 font-medium text-neutral-700">Estoque</th>
                    <th className="text-left p-4 font-medium text-neutral-700">Status</th>
                    <th className="text-left p-4 font-medium text-neutral-700">Performance</th>
                    <th className="text-left p-4 font-medium text-neutral-700">Ações</th>
                  </tr>
                </thead>
                <tbody>
                  {filteredProducts.map((product) => (
                    <tr key={product.id} className="border-b hover:bg-neutral-50 transition-colors">
                      <td className="p-4">
                        <input type="checkbox" className="rounded border-neutral-300" />
                      </td>
                      <td className="p-4">
                        <div className="flex items-center gap-4">
                          <div className="relative">
                            <img
                              src={product.images[0] || "/placeholder.svg"}
                              alt={product.name}
                              className="w-16 h-16 object-cover rounded-lg"
                            />
                            {product.featured && (
                              <div className="absolute -top-1 -right-1 w-5 h-5 bg-yellow-500 rounded-full flex items-center justify-center">
                                <Star className="h-3 w-3 text-white" />
                              </div>
                            )}
                          </div>
                          <div>
                            <p className="font-medium text-neutral-800 mb-1">{product.name}</p>
                            <p className="text-sm text-neutral-600">ID: {product.id}</p>
                            <p className="text-sm text-neutral-500">{product.brand}</p>
                          </div>
                        </div>
                      </td>
                      <td className="p-4">
                        <Badge variant="secondary" className="bg-primary-50 text-primary-700">
                          {product.category}
                        </Badge>
                        <p className="text-xs text-neutral-500 mt-1">{product.subcategory}</p>
                      </td>
                      <td className="p-4">
                        <div>
                          <p className="font-bold text-neutral-800">{formatPrice(product.price)}</p>
                          {product.originalPrice && (
                            <p className="text-sm text-neutral-500 line-through">
                              {formatPrice(product.originalPrice)}
                            </p>
                          )}
                        </div>
                      </td>
                      <td className="p-4">
                        <div className="flex items-center gap-2">
                          <span
                            className={`px-3 py-1 rounded-full text-xs font-medium ${
                              product.stock > 10
                                ? "bg-green-100 text-green-800"
                                : product.stock > 0
                                  ? "bg-yellow-100 text-yellow-800"
                                  : "bg-red-100 text-red-800"
                            }`}
                          >
                            {product.stock} un.
                          </span>
                        </div>
                      </td>
                      <td className="p-4">
                        <Badge variant={product.featured ? "default" : "secondary"}>
                          {product.featured ? "Destaque" : "Normal"}
                        </Badge>
                      </td>
                      <td className="p-4">
                        <div className="space-y-1">
                          <div className="flex items-center gap-2">
                            <Star className="h-3 w-3 text-yellow-500" />
                            <span className="text-sm font-medium">{product.rating}</span>
                            <span className="text-xs text-neutral-500">({product.reviews})</span>
                          </div>
                          <div className="text-xs text-green-600 font-medium">+12% vendas</div>
                        </div>
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
                  ))}
                </tbody>
              </table>
            </div>
          </CardContent>
        </Card>
      </div>
    </ProfessionalAdminLayout>
  )
}
