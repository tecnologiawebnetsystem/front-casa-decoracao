"use client"

import { useState, useEffect } from "react"
import { useParams } from "next/navigation"
import { Star, Heart, ShoppingCart, Share2, Ruler, Truck, Shield, Plus, Minus, Zap, Eye } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Separator } from "@/components/ui/separator"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import Header from "@/components/header"
import Footer from "@/components/footer"
import { mockProducts } from "@/lib/mock-data"
import { useCart } from "@/contexts/cart-context"
import Link from "next/link"
import type { Product } from "@/lib/types"

export default function ProdutoPage() {
  const params = useParams()
  const { addItem } = useCart()
  const [product, setProduct] = useState<Product | null>(null)
  const [selectedImage, setSelectedImage] = useState(0)
  const [quantity, setQuantity] = useState(1)
  const [selectedVariant, setSelectedVariant] = useState("")
  const [customMeasurements, setCustomMeasurements] = useState({
    width: "",
    height: "",
    area: "",
  })
  const [isWishlisted, setIsWishlisted] = useState(false)
  const [showMeasurementForm, setShowMeasurementForm] = useState(false)

  useEffect(() => {
    const foundProduct = mockProducts.find((p) => p.id === params.id)
    setProduct(foundProduct || null)
  }, [params.id])

  if (!product) {
    return (
      <div className="min-h-screen bg-neutral-50">
        <Header />
        <div className="container mx-auto px-4 py-8">
          <div className="text-center">
            <h1 className="text-2xl font-bold mb-4">Produto não encontrado</h1>
            <Link href="/produtos">
              <Button>Voltar ao catálogo</Button>
            </Link>
          </div>
        </div>
        <Footer />
      </div>
    )
  }

  const formatPrice = (price: number) => {
    return new Intl.NumberFormat("pt-BR", {
      style: "currency",
      currency: "BRL",
    }).format(price)
  }

  const handleAddToCart = () => {
    addItem(product, quantity)
    // Aqui você pode adicionar uma notificação de sucesso
  }

  const calculateArea = () => {
    const width = Number.parseFloat(customMeasurements.width)
    const height = Number.parseFloat(customMeasurements.height)
    if (width && height) {
      const area = ((width * height) / 10000).toFixed(2) // converter cm² para m²
      setCustomMeasurements((prev) => ({ ...prev, area }))
    }
  }

  const relatedProducts = mockProducts.filter((p) => p.id !== product.id && p.category === product.category).slice(0, 4)

  return (
    <div className="min-h-screen bg-neutral-50">
      <Header />

      <div className="container mx-auto px-4 py-8">
        {/* Breadcrumb */}
        <div className="flex items-center gap-2 text-sm text-neutral-600 mb-6">
          <Link href="/" className="hover:text-primary-600">
            Início
          </Link>
          <span>/</span>
          <Link href="/produtos" className="hover:text-primary-600">
            Produtos
          </Link>
          <span>/</span>
          <span className="text-neutral-800">{product.name}</span>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 mb-12">
          {/* Galeria de Imagens */}
          <div className="space-y-4">
            <div className="relative bg-white rounded-lg overflow-hidden">
              <img
                src={product.images[selectedImage] || "/placeholder.svg?height=500&width=500"}
                alt={product.name}
                className="w-full h-96 object-cover"
              />
              {product.originalPrice && (
                <div className="absolute top-4 left-4 bg-red-500 text-white px-3 py-1 rounded-full text-sm font-bold">
                  {Math.round((1 - product.price / product.originalPrice) * 100)}% OFF
                </div>
              )}
              {product.featured && (
                <div className="absolute top-4 right-4 bg-yellow-500 text-white p-2 rounded-full">
                  <Zap className="h-4 w-4" />
                </div>
              )}
            </div>

            {/* Miniaturas */}
            {product.images.length > 1 && (
              <div className="flex gap-2 overflow-x-auto">
                {product.images.map((image, index) => (
                  <button
                    key={index}
                    onClick={() => setSelectedImage(index)}
                    className={`flex-shrink-0 w-20 h-20 rounded-lg overflow-hidden border-2 ${
                      selectedImage === index ? "border-primary-600" : "border-neutral-200"
                    }`}
                  >
                    <img
                      src={image || "/placeholder.svg?height=80&width=80"}
                      alt={`${product.name} ${index + 1}`}
                      className="w-full h-full object-cover"
                    />
                  </button>
                ))}
              </div>
            )}

            {/* Botões de ação da imagem */}
            <div className="flex gap-2">
              <Button variant="outline" className="flex-1">
                <Eye className="h-4 w-4 mr-2" />
                Visualizar em AR
              </Button>
              <Button variant="outline" className="flex-1">
                <Ruler className="h-4 w-4 mr-2" />
                Simular no Ambiente
              </Button>
            </div>
          </div>

          {/* Informações do Produto */}
          <div className="space-y-6">
            <div>
              <div className="flex items-center gap-2 mb-2">
                <Badge variant="secondary">{product.brand}</Badge>
                <Badge variant="outline">{product.category}</Badge>
              </div>
              <h1 className="text-3xl font-bold text-neutral-800 mb-4">{product.name}</h1>

              {/* Avaliações */}
              <div className="flex items-center gap-2 mb-4">
                <div className="flex">
                  {[...Array(5)].map((_, i) => (
                    <Star
                      key={i}
                      className={`h-5 w-5 ${
                        i < Math.floor(product.rating) ? "text-yellow-400 fill-current" : "text-neutral-300"
                      }`}
                    />
                  ))}
                </div>
                <span className="text-sm text-neutral-600">
                  {product.rating} ({product.reviews} avaliações)
                </span>
              </div>

              {/* Preço */}
              <div className="mb-6">
                {product.originalPrice && (
                  <span className="text-lg text-neutral-500 line-through mr-3">
                    {formatPrice(product.originalPrice)}
                  </span>
                )}
                <span className="text-4xl font-bold text-primary-600">{formatPrice(product.price)}</span>
                <p className="text-sm text-neutral-600 mt-1">ou 12x de {formatPrice(product.price / 12)} sem juros</p>
              </div>

              {/* Descrição curta */}
              <p className="text-neutral-700 mb-6">{product.description}</p>
            </div>

            {/* Opções do produto */}
            <div className="space-y-4">
              {/* Cor */}
              <div>
                <Label className="text-sm font-medium mb-2 block">Cor: {product.color}</Label>
                <div className="flex gap-2">
                  <div
                    className="w-8 h-8 rounded-full border-2 border-primary-600 cursor-pointer"
                    style={{ backgroundColor: product.color.toLowerCase() }}
                  />
                </div>
              </div>

              {/* Medidas personalizadas para papel de parede e cortinas */}
              {(product.category === "papel-de-parede" || product.category === "cortinas") && (
                <div>
                  <div className="flex items-center justify-between mb-2">
                    <Label className="text-sm font-medium">Medidas Personalizadas</Label>
                    <Button variant="ghost" size="sm" onClick={() => setShowMeasurementForm(!showMeasurementForm)}>
                      {showMeasurementForm ? "Ocultar" : "Personalizar"}
                    </Button>
                  </div>

                  {showMeasurementForm && (
                    <Card className="p-4">
                      <div className="grid grid-cols-2 gap-4">
                        <div>
                          <Label htmlFor="width">Largura (cm)</Label>
                          <Input
                            id="width"
                            type="number"
                            value={customMeasurements.width}
                            onChange={(e) => setCustomMeasurements((prev) => ({ ...prev, width: e.target.value }))}
                            placeholder="Ex: 300"
                          />
                        </div>
                        <div>
                          <Label htmlFor="height">Altura (cm)</Label>
                          <Input
                            id="height"
                            type="number"
                            value={customMeasurements.height}
                            onChange={(e) => setCustomMeasurements((prev) => ({ ...prev, height: e.target.value }))}
                            placeholder="Ex: 250"
                          />
                        </div>
                      </div>
                      <div className="mt-4">
                        <Button onClick={calculateArea} variant="outline" size="sm">
                          Calcular Área
                        </Button>
                        {customMeasurements.area && (
                          <p className="text-sm text-neutral-600 mt-2">Área total: {customMeasurements.area} m²</p>
                        )}
                      </div>
                    </Card>
                  )}
                </div>
              )}

              {/* Quantidade */}
              <div>
                <Label className="text-sm font-medium mb-2 block">Quantidade</Label>
                <div className="flex items-center gap-3">
                  <Button
                    variant="outline"
                    size="sm"
                    onClick={() => setQuantity(Math.max(1, quantity - 1))}
                    disabled={quantity <= 1}
                  >
                    <Minus className="h-4 w-4" />
                  </Button>
                  <span className="w-12 text-center font-medium">{quantity}</span>
                  <Button variant="outline" size="sm" onClick={() => setQuantity(quantity + 1)}>
                    <Plus className="h-4 w-4" />
                  </Button>
                </div>
              </div>
            </div>

            {/* Botões de ação */}
            <div className="space-y-3">
              <Button onClick={handleAddToCart} className="w-full bg-primary-600 hover:bg-primary-700 text-lg py-6">
                <ShoppingCart className="h-5 w-5 mr-2" />
                Adicionar ao Carrinho - {formatPrice(product.price * quantity)}
              </Button>

              <div className="grid grid-cols-2 gap-3">
                <Button
                  variant="outline"
                  onClick={() => setIsWishlisted(!isWishlisted)}
                  className={isWishlisted ? "text-red-600 border-red-600" : ""}
                >
                  <Heart className={`h-4 w-4 mr-2 ${isWishlisted ? "fill-current" : ""}`} />
                  {isWishlisted ? "Favoritado" : "Favoritar"}
                </Button>
                <Button variant="outline">
                  <Share2 className="h-4 w-4 mr-2" />
                  Compartilhar
                </Button>
              </div>
            </div>

            {/* Informações de entrega */}
            <Card className="p-4">
              <div className="space-y-3">
                <div className="flex items-center gap-3">
                  <Truck className="h-5 w-5 text-green-600" />
                  <div>
                    <p className="font-medium">Frete Grátis</p>
                    <p className="text-sm text-neutral-600">Para compras acima de R$ 299</p>
                  </div>
                </div>
                <div className="flex items-center gap-3">
                  <Shield className="h-5 w-5 text-blue-600" />
                  <div>
                    <p className="font-medium">Garantia de 1 ano</p>
                    <p className="text-sm text-neutral-600">Contra defeitos de fabricação</p>
                  </div>
                </div>
                <div className="flex items-center gap-3">
                  <Ruler className="h-5 w-5 text-purple-600" />
                  <div>
                    <p className="font-medium">Medição Gratuita</p>
                    <p className="text-sm text-neutral-600">Agendamento disponível</p>
                  </div>
                </div>
              </div>
            </Card>
          </div>
        </div>

        {/* Tabs com informações detalhadas */}
        <Tabs defaultValue="description" className="mb-12">
          <TabsList className="grid w-full grid-cols-4">
            <TabsTrigger value="description">Descrição</TabsTrigger>
            <TabsTrigger value="specifications">Especificações</TabsTrigger>
            <TabsTrigger value="reviews">Avaliações</TabsTrigger>
            <TabsTrigger value="installation">Instalação</TabsTrigger>
          </TabsList>

          <TabsContent value="description" className="mt-6">
            <Card>
              <CardContent className="p-6">
                <h3 className="text-xl font-semibold mb-4">Descrição Detalhada</h3>
                <p className="text-neutral-700 leading-relaxed mb-4">{product.description}</p>
                <p className="text-neutral-700 leading-relaxed">
                  Este produto é ideal para {product.room.join(", ")} e combina perfeitamente com o estilo{" "}
                  {product.style}. Fabricado com materiais de alta qualidade, oferece durabilidade e beleza para seu
                  ambiente.
                </p>

                <div className="mt-6">
                  <h4 className="font-semibold mb-2">Ambientes Recomendados:</h4>
                  <div className="flex flex-wrap gap-2">
                    {product.room.map((room) => (
                      <Badge key={room} variant="outline">
                        {room}
                      </Badge>
                    ))}
                  </div>
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="specifications" className="mt-6">
            <Card>
              <CardContent className="p-6">
                <h3 className="text-xl font-semibold mb-4">Especificações Técnicas</h3>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div>
                    <p>
                      <strong>Marca:</strong> {product.brand}
                    </p>
                    <p>
                      <strong>Categoria:</strong> {product.category}
                    </p>
                    <p>
                      <strong>Cor:</strong> {product.color}
                    </p>
                    <p>
                      <strong>Estilo:</strong> {product.style}
                    </p>
                  </div>
                  <div>
                    {product.material && (
                      <p>
                        <strong>Material:</strong> {product.material}
                      </p>
                    )}
                    {product.dimensions && (
                      <p>
                        <strong>Dimensões:</strong> {product.dimensions.width}x{product.dimensions.height}
                        {product.dimensions.depth && `x${product.dimensions.depth}`}cm
                      </p>
                    )}
                    {product.weight && (
                      <p>
                        <strong>Peso:</strong> {product.weight}kg
                      </p>
                    )}
                  </div>
                </div>

                {/* Especificações específicas por categoria */}
                {product.category === "papel-de-parede" && (
                  <div className="mt-6">
                    <h4 className="font-semibold mb-2">Especificações do Papel de Parede:</h4>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                      {product.rollWidth && (
                        <p>
                          <strong>Largura do Rolo:</strong> {product.rollWidth}cm
                        </p>
                      )}
                      {product.rollLength && (
                        <p>
                          <strong>Comprimento:</strong> {product.rollLength}m
                        </p>
                      )}
                      {product.coverage && (
                        <p>
                          <strong>Cobertura:</strong> {product.coverage}m²
                        </p>
                      )}
                      {product.washable !== undefined && (
                        <p>
                          <strong>Lavável:</strong> {product.washable ? "Sim" : "Não"}
                        </p>
                      )}
                      {product.removable !== undefined && (
                        <p>
                          <strong>Removível:</strong> {product.removable ? "Sim" : "Não"}
                        </p>
                      )}
                    </div>
                  </div>
                )}

                {product.category === "cortinas" && (
                  <div className="mt-6">
                    <h4 className="font-semibold mb-2">Especificações da Cortina:</h4>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                      {product.fabricType && (
                        <p>
                          <strong>Tipo de Tecido:</strong> {product.fabricType}
                        </p>
                      )}
                      {product.opacity && (
                        <p>
                          <strong>Opacidade:</strong> {product.opacity}
                        </p>
                      )}
                      {product.installationType && (
                        <p>
                          <strong>Instalação:</strong> {product.installationType}
                        </p>
                      )}
                    </div>
                  </div>
                )}
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="reviews" className="mt-6">
            <Card>
              <CardContent className="p-6">
                <h3 className="text-xl font-semibold mb-4">Avaliações dos Clientes</h3>
                <div className="space-y-6">
                  {/* Resumo das avaliações */}
                  <div className="flex items-center gap-6">
                    <div className="text-center">
                      <div className="text-4xl font-bold text-primary-600">{product.rating}</div>
                      <div className="flex justify-center mb-1">
                        {[...Array(5)].map((_, i) => (
                          <Star
                            key={i}
                            className={`h-4 w-4 ${
                              i < Math.floor(product.rating) ? "text-yellow-400 fill-current" : "text-neutral-300"
                            }`}
                          />
                        ))}
                      </div>
                      <div className="text-sm text-neutral-600">{product.reviews} avaliações</div>
                    </div>
                    <div className="flex-1">
                      {[5, 4, 3, 2, 1].map((stars) => (
                        <div key={stars} className="flex items-center gap-2 mb-1">
                          <span className="text-sm w-8">{stars}★</span>
                          <div className="flex-1 bg-neutral-200 rounded-full h-2">
                            <div
                              className="bg-yellow-400 h-2 rounded-full"
                              style={{ width: `${Math.random() * 80 + 10}%` }}
                            />
                          </div>
                          <span className="text-sm text-neutral-600 w-8">{Math.floor(Math.random() * 50)}</span>
                        </div>
                      ))}
                    </div>
                  </div>

                  <Separator />

                  {/* Avaliações individuais */}
                  <div className="space-y-4">
                    {[1, 2, 3].map((review) => (
                      <div key={review} className="border-b pb-4 last:border-b-0">
                        <div className="flex items-center gap-2 mb-2">
                          <div className="flex">
                            {[...Array(5)].map((_, i) => (
                              <Star
                                key={i}
                                className={`h-4 w-4 ${i < 4 ? "text-yellow-400 fill-current" : "text-neutral-300"}`}
                              />
                            ))}
                          </div>
                          <span className="font-medium">Cliente {review}</span>
                          <span className="text-sm text-neutral-500">há 2 semanas</span>
                        </div>
                        <p className="text-neutral-700">
                          Produto excelente, superou minhas expectativas. A qualidade é muito boa e a instalação foi
                          fácil.
                        </p>
                      </div>
                    ))}
                  </div>
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="installation" className="mt-6">
            <Card>
              <CardContent className="p-6">
                <h3 className="text-xl font-semibold mb-4">Instalação e Cuidados</h3>
                <div className="space-y-6">
                  <div>
                    <h4 className="font-semibold mb-2">Instalação Profissional</h4>
                    <p className="text-neutral-700 mb-4">
                      Recomendamos a instalação profissional para garantir o melhor resultado. Nossa equipe
                      especializada está disponível para agendamento.
                    </p>
                    <Button variant="outline">
                      <Ruler className="h-4 w-4 mr-2" />
                      Agendar Medição Gratuita
                    </Button>
                  </div>

                  <Separator />

                  <div>
                    <h4 className="font-semibold mb-2">Cuidados e Manutenção</h4>
                    <ul className="list-disc list-inside space-y-1 text-neutral-700">
                      <li>Limpe regularmente com pano seco ou levemente úmido</li>
                      <li>Evite produtos químicos abrasivos</li>
                      <li>Mantenha longe de fontes de calor excessivo</li>
                      <li>Em caso de dúvidas, consulte nossa equipe técnica</li>
                    </ul>
                  </div>
                </div>
              </CardContent>
            </Card>
          </TabsContent>
        </Tabs>

        {/* Produtos Relacionados */}
        {relatedProducts.length > 0 && (
          <div>
            <h2 className="text-2xl font-bold text-neutral-800 mb-6">Produtos Relacionados</h2>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
              {relatedProducts.map((relatedProduct) => (
                <Card key={relatedProduct.id} className="group hover:shadow-lg transition-shadow">
                  <CardContent className="p-0">
                    <div className="relative overflow-hidden">
                      <img
                        src={relatedProduct.images[0] || "/placeholder.svg?height=200&width=200"}
                        alt={relatedProduct.name}
                        className="w-full h-48 object-cover group-hover:scale-105 transition-transform duration-300"
                      />
                    </div>
                    <div className="p-4">
                      <h3 className="font-semibold text-sm mb-2 line-clamp-2">{relatedProduct.name}</h3>
                      <div className="text-lg font-bold text-primary-600 mb-3">{formatPrice(relatedProduct.price)}</div>
                      <Link href={`/produto/${relatedProduct.id}`}>
                        <Button size="sm" variant="outline" className="w-full">
                          Ver Produto
                        </Button>
                      </Link>
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>
          </div>
        )}
      </div>

      <Footer />
    </div>
  )
}
