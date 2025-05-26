"use client"

import { useState, useEffect } from "react"
import { Search, Filter, Grid, List, Heart, ShoppingCart, Star, Eye, Zap } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Card, CardContent } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Slider } from "@/components/ui/slider"
import { Checkbox } from "@/components/ui/checkbox"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Sheet, SheetContent, SheetHeader, SheetTitle, SheetTrigger } from "@/components/ui/sheet"
import Header from "@/components/header"
import Footer from "@/components/footer"
import { mockProducts, mockCategories } from "@/lib/mock-data"
import { useCart } from "@/contexts/cart-context"
import Link from "next/link"

export default function ProdutosPage() {
  const [products, setProducts] = useState(mockProducts)
  const [filteredProducts, setFilteredProducts] = useState(mockProducts)
  const [searchTerm, setSearchTerm] = useState("")
  const [selectedCategory, setSelectedCategory] = useState("all")
  const [priceRange, setPriceRange] = useState([0, 10000])
  const [selectedBrands, setSelectedBrands] = useState<string[]>([])
  const [selectedColors, setSelectedColors] = useState<string[]>([])
  const [selectedRooms, setSelectedRooms] = useState<string[]>([])
  const [sortBy, setSortBy] = useState("relevance")
  const [viewMode, setViewMode] = useState<"grid" | "list">("grid")
  const [showFilters, setShowFilters] = useState(false)

  const { addItem } = useCart()

  // Filtros únicos
  const brands = [...new Set(products.map((p) => p.brand))]
  const colors = [...new Set(products.map((p) => p.color))]
  const rooms = [...new Set(products.flatMap((p) => p.room))]

  useEffect(() => {
    let filtered = products

    // Filtro por busca
    if (searchTerm) {
      filtered = filtered.filter(
        (product) =>
          product.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
          product.description.toLowerCase().includes(searchTerm.toLowerCase()) ||
          product.tags.some((tag) => tag.toLowerCase().includes(searchTerm.toLowerCase())),
      )
    }

    // Filtro por categoria
    if (selectedCategory !== "all") {
      filtered = filtered.filter((product) => product.category === selectedCategory)
    }

    // Filtro por preço
    filtered = filtered.filter((product) => product.price >= priceRange[0] && product.price <= priceRange[1])

    // Filtro por marca
    if (selectedBrands.length > 0) {
      filtered = filtered.filter((product) => selectedBrands.includes(product.brand))
    }

    // Filtro por cor
    if (selectedColors.length > 0) {
      filtered = filtered.filter((product) => selectedColors.includes(product.color))
    }

    // Filtro por ambiente
    if (selectedRooms.length > 0) {
      filtered = filtered.filter((product) => product.room.some((room) => selectedRooms.includes(room)))
    }

    // Ordenação
    switch (sortBy) {
      case "price-low":
        filtered.sort((a, b) => a.price - b.price)
        break
      case "price-high":
        filtered.sort((a, b) => b.price - a.price)
        break
      case "rating":
        filtered.sort((a, b) => b.rating - a.rating)
        break
      case "newest":
        filtered.sort((a, b) => new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime())
        break
      default:
        // Relevância (produtos em destaque primeiro)
        filtered.sort((a, b) => (b.featured ? 1 : 0) - (a.featured ? 1 : 0))
    }

    setFilteredProducts(filtered)
  }, [searchTerm, selectedCategory, priceRange, selectedBrands, selectedColors, selectedRooms, sortBy, products])

  const formatPrice = (price: number) => {
    return new Intl.NumberFormat("pt-BR", {
      style: "currency",
      currency: "BRL",
    }).format(price)
  }

  const handleBrandChange = (brand: string, checked: boolean) => {
    if (checked) {
      setSelectedBrands([...selectedBrands, brand])
    } else {
      setSelectedBrands(selectedBrands.filter((b) => b !== brand))
    }
  }

  const handleColorChange = (color: string, checked: boolean) => {
    if (checked) {
      setSelectedColors([...selectedColors, color])
    } else {
      setSelectedColors(selectedColors.filter((c) => c !== color))
    }
  }

  const handleRoomChange = (room: string, checked: boolean) => {
    if (checked) {
      setSelectedRooms([...selectedRooms, room])
    } else {
      setSelectedRooms(selectedRooms.filter((r) => r !== room))
    }
  }

  const clearFilters = () => {
    setSearchTerm("")
    setSelectedCategory("all")
    setPriceRange([0, 10000])
    setSelectedBrands([])
    setSelectedColors([])
    setSelectedRooms([])
    setSortBy("relevance")
  }

  const FiltersContent = () => (
    <div className="space-y-6">
      {/* Categorias */}
      <div>
        <h3 className="font-semibold mb-3">Categorias</h3>
        <Select value={selectedCategory} onValueChange={setSelectedCategory}>
          <SelectTrigger>
            <SelectValue placeholder="Todas as categorias" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="all">Todas as categorias</SelectItem>
            {mockCategories.map((category) => (
              <SelectItem key={category.id} value={category.slug}>
                {category.name}
              </SelectItem>
            ))}
          </SelectContent>
        </Select>
      </div>

      {/* Faixa de Preço */}
      <div>
        <h3 className="font-semibold mb-3">Faixa de Preço</h3>
        <div className="px-2">
          <Slider value={priceRange} onValueChange={setPriceRange} max={10000} min={0} step={50} className="mb-2" />
          <div className="flex justify-between text-sm text-neutral-600">
            <span>{formatPrice(priceRange[0])}</span>
            <span>{formatPrice(priceRange[1])}</span>
          </div>
        </div>
      </div>

      {/* Marcas */}
      <div>
        <h3 className="font-semibold mb-3">Marcas</h3>
        <div className="space-y-2 max-h-40 overflow-y-auto">
          {brands.map((brand) => (
            <div key={brand} className="flex items-center space-x-2">
              <Checkbox
                id={`brand-${brand}`}
                checked={selectedBrands.includes(brand)}
                onCheckedChange={(checked) => handleBrandChange(brand, checked as boolean)}
              />
              <label htmlFor={`brand-${brand}`} className="text-sm">
                {brand}
              </label>
            </div>
          ))}
        </div>
      </div>

      {/* Cores */}
      <div>
        <h3 className="font-semibold mb-3">Cores</h3>
        <div className="space-y-2 max-h-40 overflow-y-auto">
          {colors.map((color) => (
            <div key={color} className="flex items-center space-x-2">
              <Checkbox
                id={`color-${color}`}
                checked={selectedColors.includes(color)}
                onCheckedChange={(checked) => handleColorChange(color, checked as boolean)}
              />
              <label htmlFor={`color-${color}`} className="text-sm">
                {color}
              </label>
            </div>
          ))}
        </div>
      </div>

      {/* Ambientes */}
      <div>
        <h3 className="font-semibold mb-3">Ambientes</h3>
        <div className="space-y-2 max-h-40 overflow-y-auto">
          {rooms.map((room) => (
            <div key={room} className="flex items-center space-x-2">
              <Checkbox
                id={`room-${room}`}
                checked={selectedRooms.includes(room)}
                onCheckedChange={(checked) => handleRoomChange(room, checked as boolean)}
              />
              <label htmlFor={`room-${room}`} className="text-sm">
                {room}
              </label>
            </div>
          ))}
        </div>
      </div>

      <Button onClick={clearFilters} variant="outline" className="w-full">
        Limpar Filtros
      </Button>
    </div>
  )

  return (
    <div className="min-h-screen bg-neutral-50">
      <Header />

      <div className="container mx-auto px-4 py-8">
        {/* Header da página */}
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-neutral-800 mb-2">Catálogo de Produtos</h1>
          <p className="text-neutral-600">Descubra nossa coleção completa de decoração</p>
        </div>

        {/* Barra de busca e filtros */}
        <div className="flex flex-col lg:flex-row gap-6">
          {/* Sidebar de filtros - Desktop */}
          <div className="hidden lg:block w-80 bg-white rounded-lg p-6 h-fit sticky top-4">
            <div className="flex items-center justify-between mb-6">
              <h2 className="text-lg font-semibold">Filtros</h2>
              <Filter className="h-5 w-5 text-neutral-500" />
            </div>
            <FiltersContent />
          </div>

          {/* Conteúdo principal */}
          <div className="flex-1">
            {/* Controles superiores */}
            <div className="bg-white rounded-lg p-4 mb-6">
              <div className="flex flex-col sm:flex-row gap-4 items-center justify-between">
                {/* Busca */}
                <div className="relative flex-1 max-w-md">
                  <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-neutral-400 h-4 w-4" />
                  <Input
                    placeholder="Buscar produtos..."
                    value={searchTerm}
                    onChange={(e) => setSearchTerm(e.target.value)}
                    className="pl-10"
                  />
                </div>

                <div className="flex items-center gap-4">
                  {/* Filtros mobile */}
                  <Sheet open={showFilters} onOpenChange={setShowFilters}>
                    <SheetTrigger asChild>
                      <Button variant="outline" className="lg:hidden">
                        <Filter className="h-4 w-4 mr-2" />
                        Filtros
                      </Button>
                    </SheetTrigger>
                    <SheetContent side="left" className="w-80">
                      <SheetHeader>
                        <SheetTitle>Filtros</SheetTitle>
                      </SheetHeader>
                      <div className="mt-6">
                        <FiltersContent />
                      </div>
                    </SheetContent>
                  </Sheet>

                  {/* Ordenação */}
                  <Select value={sortBy} onValueChange={setSortBy}>
                    <SelectTrigger className="w-48">
                      <SelectValue />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="relevance">Relevância</SelectItem>
                      <SelectItem value="price-low">Menor preço</SelectItem>
                      <SelectItem value="price-high">Maior preço</SelectItem>
                      <SelectItem value="rating">Melhor avaliado</SelectItem>
                      <SelectItem value="newest">Mais recente</SelectItem>
                    </SelectContent>
                  </Select>

                  {/* Modo de visualização */}
                  <div className="flex border rounded-lg">
                    <Button
                      variant={viewMode === "grid" ? "default" : "ghost"}
                      size="sm"
                      onClick={() => setViewMode("grid")}
                    >
                      <Grid className="h-4 w-4" />
                    </Button>
                    <Button
                      variant={viewMode === "list" ? "default" : "ghost"}
                      size="sm"
                      onClick={() => setViewMode("list")}
                    >
                      <List className="h-4 w-4" />
                    </Button>
                  </div>
                </div>
              </div>

              {/* Filtros ativos */}
              {(selectedBrands.length > 0 ||
                selectedColors.length > 0 ||
                selectedRooms.length > 0 ||
                selectedCategory !== "all") && (
                <div className="mt-4 flex flex-wrap gap-2">
                  {selectedCategory !== "all" && (
                    <Badge variant="secondary" className="cursor-pointer" onClick={() => setSelectedCategory("all")}>
                      {mockCategories.find((c) => c.slug === selectedCategory)?.name} ×
                    </Badge>
                  )}
                  {selectedBrands.map((brand) => (
                    <Badge
                      key={brand}
                      variant="secondary"
                      className="cursor-pointer"
                      onClick={() => handleBrandChange(brand, false)}
                    >
                      {brand} ×
                    </Badge>
                  ))}
                  {selectedColors.map((color) => (
                    <Badge
                      key={color}
                      variant="secondary"
                      className="cursor-pointer"
                      onClick={() => handleColorChange(color, false)}
                    >
                      {color} ×
                    </Badge>
                  ))}
                  {selectedRooms.map((room) => (
                    <Badge
                      key={room}
                      variant="secondary"
                      className="cursor-pointer"
                      onClick={() => handleRoomChange(room, false)}
                    >
                      {room} ×
                    </Badge>
                  ))}
                </div>
              )}
            </div>

            {/* Resultados */}
            <div className="mb-4">
              <p className="text-neutral-600">
                {filteredProducts.length} produto{filteredProducts.length !== 1 ? "s" : ""} encontrado
                {filteredProducts.length !== 1 ? "s" : ""}
              </p>
            </div>

            {/* Grid/Lista de produtos */}
            {viewMode === "grid" ? (
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
                {filteredProducts.map((product) => (
                  <Card key={product.id} className="group hover:shadow-lg transition-all duration-300">
                    <CardContent className="p-0">
                      <div className="relative overflow-hidden">
                        <img
                          src={product.images[0] || "/placeholder.svg?height=200&width=200"}
                          alt={product.name}
                          className="w-full h-48 object-cover group-hover:scale-105 transition-transform duration-300"
                        />
                        {product.originalPrice && (
                          <div className="absolute top-2 left-2 bg-red-500 text-white px-2 py-1 rounded text-xs font-bold">
                            {Math.round((1 - product.price / product.originalPrice) * 100)}% OFF
                          </div>
                        )}
                        {product.featured && (
                          <div className="absolute top-2 right-2 bg-yellow-500 text-white p-1 rounded">
                            <Zap className="h-3 w-3" />
                          </div>
                        )}
                        <div className="absolute top-2 right-2 flex flex-col gap-2 opacity-0 group-hover:opacity-100 transition-opacity">
                          <Button size="sm" variant="secondary" className="bg-white/90 hover:bg-white">
                            <Heart className="h-4 w-4" />
                          </Button>
                          <Link href={`/produto/${product.id}`}>
                            <Button size="sm" variant="secondary" className="bg-white/90 hover:bg-white">
                              <Eye className="h-4 w-4" />
                            </Button>
                          </Link>
                        </div>
                      </div>

                      <div className="p-4">
                        <h3 className="font-semibold text-sm mb-2 line-clamp-2">{product.name}</h3>

                        <div className="flex items-center gap-1 mb-2">
                          <div className="flex">
                            {[...Array(5)].map((_, i) => (
                              <Star
                                key={i}
                                className={`h-3 w-3 ${
                                  i < Math.floor(product.rating) ? "text-yellow-400 fill-current" : "text-neutral-300"
                                }`}
                              />
                            ))}
                          </div>
                          <span className="text-xs text-neutral-500">({product.reviews})</span>
                        </div>

                        <div className="mb-3">
                          {product.originalPrice && (
                            <span className="text-xs text-neutral-500 line-through">
                              {formatPrice(product.originalPrice)}
                            </span>
                          )}
                          <div className="text-lg font-bold text-primary-600">{formatPrice(product.price)}</div>
                        </div>

                        <div className="flex gap-2">
                          <Link href={`/produto/${product.id}`} className="flex-1">
                            <Button size="sm" variant="outline" className="w-full">
                              Ver Detalhes
                            </Button>
                          </Link>
                          <Button
                            size="sm"
                            onClick={() => addItem(product)}
                            className="bg-primary-600 hover:bg-primary-700"
                          >
                            <ShoppingCart className="h-4 w-4" />
                          </Button>
                        </div>
                      </div>
                    </CardContent>
                  </Card>
                ))}
              </div>
            ) : (
              <div className="space-y-4">
                {filteredProducts.map((product) => (
                  <Card key={product.id} className="hover:shadow-lg transition-shadow">
                    <CardContent className="p-6">
                      <div className="flex gap-6">
                        <div className="relative w-32 h-32 flex-shrink-0">
                          <img
                            src={product.images[0] || "/placeholder.svg?height=128&width=128"}
                            alt={product.name}
                            className="w-full h-full object-cover rounded-lg"
                          />
                          {product.originalPrice && (
                            <div className="absolute top-1 left-1 bg-red-500 text-white px-1 py-0.5 rounded text-xs font-bold">
                              {Math.round((1 - product.price / product.originalPrice) * 100)}% OFF
                            </div>
                          )}
                        </div>

                        <div className="flex-1">
                          <div className="flex justify-between items-start mb-2">
                            <h3 className="font-semibold text-lg">{product.name}</h3>
                            <div className="flex gap-2">
                              <Button size="sm" variant="ghost">
                                <Heart className="h-4 w-4" />
                              </Button>
                            </div>
                          </div>

                          <p className="text-neutral-600 text-sm mb-3 line-clamp-2">{product.description}</p>

                          <div className="flex items-center gap-1 mb-3">
                            <div className="flex">
                              {[...Array(5)].map((_, i) => (
                                <Star
                                  key={i}
                                  className={`h-4 w-4 ${
                                    i < Math.floor(product.rating) ? "text-yellow-400 fill-current" : "text-neutral-300"
                                  }`}
                                />
                              ))}
                            </div>
                            <span className="text-sm text-neutral-500">({product.reviews} avaliações)</span>
                          </div>

                          <div className="flex items-center justify-between">
                            <div>
                              {product.originalPrice && (
                                <span className="text-sm text-neutral-500 line-through mr-2">
                                  {formatPrice(product.originalPrice)}
                                </span>
                              )}
                              <span className="text-2xl font-bold text-primary-600">{formatPrice(product.price)}</span>
                            </div>

                            <div className="flex gap-2">
                              <Link href={`/produto/${product.id}`}>
                                <Button variant="outline">Ver Detalhes</Button>
                              </Link>
                              <Button onClick={() => addItem(product)} className="bg-primary-600 hover:bg-primary-700">
                                <ShoppingCart className="h-4 w-4 mr-2" />
                                Adicionar
                              </Button>
                            </div>
                          </div>
                        </div>
                      </div>
                    </CardContent>
                  </Card>
                ))}
              </div>
            )}

            {filteredProducts.length === 0 && (
              <div className="text-center py-12">
                <div className="text-6xl mb-4">🔍</div>
                <h3 className="text-xl font-semibold mb-2">Nenhum produto encontrado</h3>
                <p className="text-neutral-600 mb-4">Tente ajustar os filtros ou buscar por outros termos</p>
                <Button onClick={clearFilters}>Limpar Filtros</Button>
              </div>
            )}
          </div>
        </div>
      </div>

      <Footer />
    </div>
  )
}
