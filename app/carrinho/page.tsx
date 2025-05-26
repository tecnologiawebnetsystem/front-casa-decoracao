"use client"

import { useState } from "react"
import { Minus, Plus, Trash2, ShoppingBag, ArrowLeft, Truck, CreditCard, Shield, Gift } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Separator } from "@/components/ui/separator"
import { Badge } from "@/components/ui/badge"
import Header from "@/components/header"
import Footer from "@/components/footer"
import { useCart } from "@/contexts/cart-context"
import Link from "next/link"

export default function CarrinhoPage() {
  const { items, updateQuantity, removeItem, total, clearCart } = useCart()
  const [couponCode, setCouponCode] = useState("")
  const [appliedCoupon, setAppliedCoupon] = useState<{ code: string; discount: number } | null>(null)

  const formatPrice = (price: number) => {
    return new Intl.NumberFormat("pt-BR", {
      style: "currency",
      currency: "BRL",
    }).format(price)
  }

  const applyCoupon = () => {
    // Simulação de cupons
    const coupons = {
      PRIMEIRA10: 0.1,
      FRETE20: 0.2,
      CASA15: 0.15,
    }

    const discount = coupons[couponCode as keyof typeof coupons]
    if (discount) {
      setAppliedCoupon({ code: couponCode, discount })
      setCouponCode("")
    }
  }

  const removeCoupon = () => {
    setAppliedCoupon(null)
  }

  const subtotal = total
  const couponDiscount = appliedCoupon ? subtotal * appliedCoupon.discount : 0
  const shipping = subtotal > 299 ? 0 : 29.9
  const finalTotal = subtotal - couponDiscount + shipping

  if (items.length === 0) {
    return (
      <div className="min-h-screen bg-neutral-50">
        <Header />
        <div className="container mx-auto px-4 py-16">
          <div className="max-w-md mx-auto text-center">
            <div className="mb-8">
              <ShoppingBag className="h-24 w-24 mx-auto text-neutral-300 mb-4" />
              <h1 className="text-2xl font-bold text-neutral-800 mb-2">Seu carrinho está vazio</h1>
              <p className="text-neutral-600">Que tal dar uma olhada em nossos produtos?</p>
            </div>
            <Link href="/produtos">
              <Button className="bg-primary-600 hover:bg-primary-700">Continuar Comprando</Button>
            </Link>
          </div>
        </div>
        <Footer />
      </div>
    )
  }

  return (
    <div className="min-h-screen bg-neutral-50">
      <Header />

      <div className="container mx-auto px-4 py-8">
        {/* Header da página */}
        <div className="flex items-center gap-4 mb-8">
          <Link href="/produtos">
            <Button variant="ghost" size="sm">
              <ArrowLeft className="h-4 w-4 mr-2" />
              Continuar Comprando
            </Button>
          </Link>
          <div>
            <h1 className="text-3xl font-bold text-neutral-800">Carrinho de Compras</h1>
            <p className="text-neutral-600">
              {items.length} {items.length === 1 ? "item" : "itens"} no carrinho
            </p>
          </div>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Lista de produtos */}
          <div className="lg:col-span-2 space-y-4">
            {items.map((item) => (
              <Card key={item.product.id}>
                <CardContent className="p-6">
                  <div className="flex gap-4">
                    <div className="w-24 h-24 flex-shrink-0">
                      <img
                        src={item.product.images[0] || "/placeholder.svg?height=96&width=96"}
                        alt={item.product.name}
                        className="w-full h-full object-cover rounded-lg"
                      />
                    </div>

                    <div className="flex-1">
                      <div className="flex justify-between items-start mb-2">
                        <div>
                          <h3 className="font-semibold text-lg">{item.product.name}</h3>
                          <p className="text-sm text-neutral-600">{item.product.brand}</p>
                          <div className="flex items-center gap-2 mt-1">
                            <Badge variant="outline">{item.product.color}</Badge>
                            <Badge variant="outline">{item.product.category}</Badge>
                          </div>
                        </div>
                        <Button
                          variant="ghost"
                          size="sm"
                          onClick={() => removeItem(item.product.id)}
                          className="text-red-600 hover:text-red-700 hover:bg-red-50"
                        >
                          <Trash2 className="h-4 w-4" />
                        </Button>
                      </div>

                      <div className="flex items-center justify-between">
                        <div className="flex items-center gap-3">
                          <Button
                            variant="outline"
                            size="sm"
                            onClick={() => updateQuantity(item.product.id, item.quantity - 1)}
                            disabled={item.quantity <= 1}
                          >
                            <Minus className="h-4 w-4" />
                          </Button>
                          <span className="w-12 text-center font-medium">{item.quantity}</span>
                          <Button
                            variant="outline"
                            size="sm"
                            onClick={() => updateQuantity(item.product.id, item.quantity + 1)}
                          >
                            <Plus className="h-4 w-4" />
                          </Button>
                        </div>

                        <div className="text-right">
                          <div className="text-lg font-bold text-primary-600">
                            {formatPrice(item.product.price * item.quantity)}
                          </div>
                          <div className="text-sm text-neutral-600">{formatPrice(item.product.price)} cada</div>
                        </div>
                      </div>
                    </div>
                  </div>
                </CardContent>
              </Card>
            ))}

            {/* Botão limpar carrinho */}
            <div className="flex justify-end">
              <Button variant="outline" onClick={clearCart} className="text-red-600 hover:text-red-700">
                <Trash2 className="h-4 w-4 mr-2" />
                Limpar Carrinho
              </Button>
            </div>
          </div>

          {/* Resumo do pedido */}
          <div className="space-y-6">
            {/* Cupom de desconto */}
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Gift className="h-5 w-5" />
                  Cupom de Desconto
                </CardTitle>
              </CardHeader>
              <CardContent>
                {appliedCoupon ? (
                  <div className="flex items-center justify-between p-3 bg-green-50 rounded-lg">
                    <div>
                      <p className="font-medium text-green-800">{appliedCoupon.code}</p>
                      <p className="text-sm text-green-600">{(appliedCoupon.discount * 100).toFixed(0)}% de desconto</p>
                    </div>
                    <Button variant="ghost" size="sm" onClick={removeCoupon}>
                      <Trash2 className="h-4 w-4" />
                    </Button>
                  </div>
                ) : (
                  <div className="space-y-3">
                    <div>
                      <Label htmlFor="coupon">Código do cupom</Label>
                      <Input
                        id="coupon"
                        value={couponCode}
                        onChange={(e) => setCouponCode(e.target.value.toUpperCase())}
                        placeholder="Ex: PRIMEIRA10"
                      />
                    </div>
                    <Button onClick={applyCoupon} variant="outline" className="w-full">
                      Aplicar Cupom
                    </Button>
                    <div className="text-xs text-neutral-600">
                      <p>Cupons disponíveis:</p>
                      <p>• PRIMEIRA10 - 10% off primeira compra</p>
                      <p>• FRETE20 - 20% off</p>
                      <p>• CASA15 - 15% off</p>
                    </div>
                  </div>
                )}
              </CardContent>
            </Card>

            {/* Resumo de valores */}
            <Card>
              <CardHeader>
                <CardTitle>Resumo do Pedido</CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="flex justify-between">
                  <span>Subtotal</span>
                  <span>{formatPrice(subtotal)}</span>
                </div>

                {appliedCoupon && (
                  <div className="flex justify-between text-green-600">
                    <span>Desconto ({appliedCoupon.code})</span>
                    <span>-{formatPrice(couponDiscount)}</span>
                  </div>
                )}

                <div className="flex justify-between">
                  <span className="flex items-center gap-2">
                    Frete
                    {shipping === 0 && (
                      <Badge variant="secondary" className="text-xs">
                        Grátis
                      </Badge>
                    )}
                  </span>
                  <span>{shipping === 0 ? "Grátis" : formatPrice(shipping)}</span>
                </div>

                <Separator />

                <div className="flex justify-between text-lg font-bold">
                  <span>Total</span>
                  <span className="text-primary-600">{formatPrice(finalTotal)}</span>
                </div>

                <div className="text-sm text-neutral-600">
                  <p>ou 12x de {formatPrice(finalTotal / 12)} sem juros</p>
                </div>
              </CardContent>
            </Card>

            {/* Informações de entrega */}
            <Card>
              <CardContent className="p-4">
                <div className="space-y-3">
                  <div className="flex items-center gap-3">
                    <Truck className="h-5 w-5 text-green-600" />
                    <div>
                      <p className="font-medium text-sm">Entrega Rápida</p>
                      <p className="text-xs text-neutral-600">5-7 dias úteis</p>
                    </div>
                  </div>
                  <div className="flex items-center gap-3">
                    <CreditCard className="h-5 w-5 text-blue-600" />
                    <div>
                      <p className="font-medium text-sm">Pagamento Seguro</p>
                      <p className="text-xs text-neutral-600">SSL 256 bits</p>
                    </div>
                  </div>
                  <div className="flex items-center gap-3">
                    <Shield className="h-5 w-5 text-purple-600" />
                    <div>
                      <p className="font-medium text-sm">Garantia</p>
                      <p className="text-xs text-neutral-600">30 dias para troca</p>
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>

            {/* Botão finalizar compra */}
            <Link href="/checkout">
              <Button className="w-full bg-primary-600 hover:bg-primary-700 text-lg py-6">Finalizar Compra</Button>
            </Link>
          </div>
        </div>
      </div>

      <Footer />
    </div>
  )
}
