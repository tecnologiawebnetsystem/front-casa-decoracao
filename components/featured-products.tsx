"use client"

import Link from "next/link"
import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import { Star, Heart, ShoppingCart } from "lucide-react"
import { mockProducts } from "@/lib/mock-data"
import { useCart } from "@/contexts/cart-context"

export default function FeaturedProducts() {
  const { addItem } = useCart()
  const featuredProducts = mockProducts.filter((product) => product.featured)

  const formatPrice = (price: number) => {
    return new Intl.NumberFormat("pt-BR", {
      style: "currency",
      currency: "BRL",
    }).format(price)
  }

  return (
    <section className="py-16">
      <div className="container mx-auto px-4">
        <div className="flex justify-between items-center mb-12">
          <h2 className="text-3xl font-bold text-neutral-800">Produtos em Destaque</h2>
          <Link href="/produtos">
            <Button variant="outline">Ver Todos</Button>
          </Link>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {featuredProducts.map((product) => (
            <Card key={product.id} className="group hover:shadow-lg transition-shadow">
              <CardContent className="p-0">
                <div className="relative overflow-hidden">
                  <img
                    src={
                      product.id === "1"
                        ? "/images/sofa-retratil-premium.png"
                        : product.id === "2"
                          ? "/images/mesa-centro-vidro.png"
                          : product.id === "3"
                            ? "/images/cama-box-queen.png"
                            : product.id === "4"
                              ? "/images/luminaria-pendente-industrial.png"
                              : product.id === "5"
                                ? "/images/quadro-abstrato-colorido.png"
                                : "/placeholder.svg"
                    }
                    alt={product.name}
                    className="w-full h-48 object-cover group-hover:scale-105 transition-transform duration-300"
                  />
                  {product.originalPrice && (
                    <div className="absolute top-2 left-2 bg-red-500 text-white px-2 py-1 rounded text-xs font-bold">
                      {Math.round((1 - product.price / product.originalPrice) * 100)}% OFF
                    </div>
                  )}
                  <Button size="sm" variant="ghost" className="absolute top-2 right-2 bg-white/80 hover:bg-white">
                    <Heart className="h-4 w-4" />
                  </Button>
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
                    <Button size="sm" onClick={() => addItem(product)} className="bg-primary-600 hover:bg-primary-700">
                      <ShoppingCart className="h-4 w-4" />
                    </Button>
                  </div>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>
      </div>
    </section>
  )
}
