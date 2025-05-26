"use client"

import { useState } from "react"
import { Check, Package, Truck, Calendar, Phone, Mail, Download, Share2 } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Separator } from "@/components/ui/separator"
import Header from "@/components/header"
import Footer from "@/components/footer"
import Link from "next/link"

export default function PedidoConfirmadoPage() {
  const [orderNumber] = useState(() => `#${Math.floor(Math.random() * 100000) + 10000}`)
  const [estimatedDelivery] = useState(() => {
    const date = new Date()
    date.setDate(date.getDate() + 7)
    return date.toLocaleDateString("pt-BR")
  })

  const formatPrice = (price: number) => {
    return new Intl.NumberFormat("pt-BR", {
      style: "currency",
      currency: "BRL",
    }).format(price)
  }

  // Dados simulados do pedido
  const orderData = {
    number: orderNumber,
    total: 2599.9,
    paymentMethod: "Cartão de Crédito",
    deliveryAddress: "Rua das Flores, 123 - Centro, São Paulo - SP",
    estimatedDelivery,
    items: [
      { name: "Papel de Parede Floral Premium", quantity: 2, price: 899.9 },
      { name: "Cortina Blackout Elegante", quantity: 1, price: 1200.0 },
      { name: "Instalação Profissional", quantity: 1, price: 150.0 },
    ],
  }

  return (
    <div className="min-h-screen bg-neutral-50">
      <Header />

      <div className="container mx-auto px-4 py-16">
        <div className="max-w-4xl mx-auto">
          {/* Header de confirmação */}
          <div className="text-center mb-12">
            <div className="w-20 h-20 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-6">
              <Check className="h-10 w-10 text-green-600" />
            </div>
            <h1 className="text-4xl font-bold text-neutral-800 mb-4">Pedido Confirmado!</h1>
            <p className="text-xl text-neutral-600 mb-2">
              Obrigado pela sua compra! Seu pedido foi recebido com sucesso.
            </p>
            <p className="text-lg">
              Número do pedido: <span className="font-bold text-primary-600">{orderData.number}</span>
            </p>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
            {/* Detalhes do pedido */}
            <div className="lg:col-span-2 space-y-6">
              {/* Status do pedido */}
              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center gap-2">
                    <Package className="h-5 w-5" />
                    Status do Pedido
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="space-y-4">
                    <div className="flex items-center gap-4">
                      <div className="w-8 h-8 bg-green-100 rounded-full flex items-center justify-center">
                        <Check className="h-4 w-4 text-green-600" />
                      </div>
                      <div>
                        <p className="font-medium">Pedido Confirmado</p>
                        <p className="text-sm text-neutral-600">
                          Hoje, {new Date().toLocaleTimeString("pt-BR", { hour: "2-digit", minute: "2-digit" })}
                        </p>
                      </div>
                    </div>

                    <div className="flex items-center gap-4">
                      <div className="w-8 h-8 bg-neutral-200 rounded-full flex items-center justify-center">
                        <Package className="h-4 w-4 text-neutral-400" />
                      </div>
                      <div>
                        <p className="font-medium text-neutral-400">Preparando Pedido</p>
                        <p className="text-sm text-neutral-400">Em breve</p>
                      </div>
                    </div>

                    <div className="flex items-center gap-4">
                      <div className="w-8 h-8 bg-neutral-200 rounded-full flex items-center justify-center">
                        <Truck className="h-4 w-4 text-neutral-400" />
                      </div>
                      <div>
                        <p className="font-medium text-neutral-400">Em Trânsito</p>
                        <p className="text-sm text-neutral-400">Previsão: {orderData.estimatedDelivery}</p>
                      </div>
                    </div>
                  </div>
                </CardContent>
              </Card>

              {/* Produtos do pedido */}
              <Card>
                <CardHeader>
                  <CardTitle>Itens do Pedido</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="space-y-4">
                    {orderData.items.map((item, index) => (
                      <div key={index} className="flex justify-between items-center py-3 border-b last:border-b-0">
                        <div>
                          <p className="font-medium">{item.name}</p>
                          <p className="text-sm text-neutral-600">Quantidade: {item.quantity}</p>
                        </div>
                        <p className="font-medium">{formatPrice(item.price)}</p>
                      </div>
                    ))}

                    <Separator />

                    <div className="flex justify-between items-center text-lg font-bold">
                      <span>Total</span>
                      <span className="text-primary-600">{formatPrice(orderData.total)}</span>
                    </div>
                  </div>
                </CardContent>
              </Card>

              {/* Informações de entrega */}
              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center gap-2">
                    <Truck className="h-5 w-5" />
                    Informações de Entrega
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="space-y-3">
                    <div>
                      <p className="font-medium">Endereço de Entrega</p>
                      <p className="text-neutral-600">{orderData.deliveryAddress}</p>
                    </div>
                    <div>
                      <p className="font-medium">Previsão de Entrega</p>
                      <p className="text-neutral-600">{orderData.estimatedDelivery}</p>
                    </div>
                    <div>
                      <p className="font-medium">Forma de Pagamento</p>
                      <p className="text-neutral-600">{orderData.paymentMethod}</p>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </div>

            {/* Ações e próximos passos */}
            <div className="space-y-6">
              {/* Próximos passos */}
              <Card>
                <CardHeader>
                  <CardTitle>Próximos Passos</CardTitle>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div className="flex items-start gap-3">
                    <Mail className="h-5 w-5 text-blue-600 mt-0.5" />
                    <div>
                      <p className="font-medium text-sm">Confirmação por E-mail</p>
                      <p className="text-xs text-neutral-600">
                        Você receberá um e-mail com todos os detalhes do pedido
                      </p>
                    </div>
                  </div>

                  <div className="flex items-start gap-3">
                    <Calendar className="h-5 w-5 text-green-600 mt-0.5" />
                    <div>
                      <p className="font-medium text-sm">Agendamento de Medição</p>
                      <p className="text-xs text-neutral-600">Nossa equipe entrará em contato para agendar a medição</p>
                    </div>
                  </div>

                  <div className="flex items-start gap-3">
                    <Package className="h-5 w-5 text-purple-600 mt-0.5" />
                    <div>
                      <p className="font-medium text-sm">Preparação do Pedido</p>
                      <p className="text-xs text-neutral-600">Seus produtos serão preparados com cuidado</p>
                    </div>
                  </div>

                  <div className="flex items-start gap-3">
                    <Truck className="h-5 w-5 text-orange-600 mt-0.5" />
                    <div>
                      <p className="font-medium text-sm">Entrega e Instalação</p>
                      <p className="text-xs text-neutral-600">Entrega e instalação profissional no prazo</p>
                    </div>
                  </div>
                </CardContent>
              </Card>

              {/* Ações rápidas */}
              <Card>
                <CardHeader>
                  <CardTitle>Ações</CardTitle>
                </CardHeader>
                <CardContent className="space-y-3">
                  <Button className="w-full" variant="outline">
                    <Download className="h-4 w-4 mr-2" />
                    Baixar Comprovante
                  </Button>

                  <Button className="w-full" variant="outline">
                    <Share2 className="h-4 w-4 mr-2" />
                    Compartilhar Pedido
                  </Button>

                  <Link href="/minha-conta/pedidos" className="block">
                    <Button className="w-full" variant="outline">
                      <Package className="h-4 w-4 mr-2" />
                      Acompanhar Pedido
                    </Button>
                  </Link>

                  <Link href="/produtos" className="block">
                    <Button className="w-full bg-primary-600 hover:bg-primary-700">Continuar Comprando</Button>
                  </Link>
                </CardContent>
              </Card>

              {/* Contato */}
              <Card>
                <CardHeader>
                  <CardTitle>Precisa de Ajuda?</CardTitle>
                </CardHeader>
                <CardContent className="space-y-3">
                  <div className="flex items-center gap-3">
                    <Phone className="h-4 w-4 text-green-600" />
                    <div>
                      <p className="font-medium text-sm">WhatsApp</p>
                      <p className="text-xs text-neutral-600">(11) 99999-9999</p>
                    </div>
                  </div>

                  <div className="flex items-center gap-3">
                    <Mail className="h-4 w-4 text-blue-600" />
                    <div>
                      <p className="font-medium text-sm">E-mail</p>
                      <p className="text-xs text-neutral-600">atendimento@casadecoração.com</p>
                    </div>
                  </div>

                  <Button className="w-full mt-4" variant="outline" size="sm">
                    Falar com Atendimento
                  </Button>
                </CardContent>
              </Card>
            </div>
          </div>

          {/* Avaliação e feedback */}
          <Card className="mt-8">
            <CardContent className="p-8 text-center">
              <h3 className="text-xl font-semibold mb-4">Sua opinião é muito importante!</h3>
              <p className="text-neutral-600 mb-6">
                Após receber seus produtos, não esqueça de avaliar sua experiência. Isso nos ajuda a melhorar nossos
                serviços.
              </p>
              <div className="flex justify-center gap-4">
                <Button variant="outline">Avaliar Produtos</Button>
                <Button variant="outline">Avaliar Atendimento</Button>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>

      <Footer />
    </div>
  )
}
