"use client"

import { useAuth } from "@/contexts/auth-context"
import { useRouter } from "next/navigation"
import { useEffect } from "react"
import Header from "@/components/header"
import Footer from "@/components/footer"
import CustomerLayout from "@/components/customer/customer-layout"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { ShoppingBag, Heart, MapPin, CreditCard, Star, Package } from "lucide-react"

export default function MinhaContaPage() {
  const { user } = useAuth()
  const router = useRouter()

  useEffect(() => {
    if (!user || user.role !== "customer") {
      router.push("/login")
    }
  }, [user, router])

  if (!user || user.role !== "customer") {
    return null
  }

  const mockCustomerData = {
    totalOrders: 12,
    totalSpent: 5670.8,
    loyaltyPoints: 1250,
    wishlistItems: 8,
    recentOrders: [
      { id: "#1234", date: "2024-01-15", total: 1299.9, status: "Entregue" },
      { id: "#1235", date: "2024-01-10", total: 899.9, status: "Em trânsito" },
      { id: "#1236", date: "2024-01-05", total: 2199.9, status: "Entregue" },
    ],
  }

  const formatCurrency = (value: number) => {
    return new Intl.NumberFormat("pt-BR", {
      style: "currency",
      currency: "BRL",
    }).format(value)
  }

  return (
    <div className="min-h-screen bg-neutral-50">
      <Header />
      <CustomerLayout>
        <div className="space-y-6">
          <div>
            <h1 className="text-3xl font-bold text-neutral-800">Minha Conta</h1>
            <p className="text-neutral-600">Bem-vindo de volta, {user.name}!</p>
          </div>

          {/* Stats Cards */}
          <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
            <Card>
              <CardContent className="p-6 text-center">
                <ShoppingBag className="h-8 w-8 mx-auto mb-2 text-primary-600" />
                <p className="text-2xl font-bold text-neutral-800">{mockCustomerData.totalOrders}</p>
                <p className="text-sm text-neutral-600">Pedidos Realizados</p>
              </CardContent>
            </Card>

            <Card>
              <CardContent className="p-6 text-center">
                <CreditCard className="h-8 w-8 mx-auto mb-2 text-green-600" />
                <p className="text-2xl font-bold text-neutral-800">{formatCurrency(mockCustomerData.totalSpent)}</p>
                <p className="text-sm text-neutral-600">Total Gasto</p>
              </CardContent>
            </Card>

            <Card>
              <CardContent className="p-6 text-center">
                <Star className="h-8 w-8 mx-auto mb-2 text-yellow-500" />
                <p className="text-2xl font-bold text-neutral-800">{mockCustomerData.loyaltyPoints}</p>
                <p className="text-sm text-neutral-600">Pontos de Fidelidade</p>
              </CardContent>
            </Card>

            <Card>
              <CardContent className="p-6 text-center">
                <Heart className="h-8 w-8 mx-auto mb-2 text-red-500" />
                <p className="text-2xl font-bold text-neutral-800">{mockCustomerData.wishlistItems}</p>
                <p className="text-sm text-neutral-600">Lista de Desejos</p>
              </CardContent>
            </Card>
          </div>

          {/* Recent Orders */}
          <Card>
            <CardHeader>
              <CardTitle>Pedidos Recentes</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {mockCustomerData.recentOrders.map((order) => (
                  <div key={order.id} className="flex items-center justify-between p-4 border rounded-lg">
                    <div className="flex items-center gap-4">
                      <Package className="h-8 w-8 text-neutral-400" />
                      <div>
                        <p className="font-medium">Pedido {order.id}</p>
                        <p className="text-sm text-neutral-600">{order.date}</p>
                      </div>
                    </div>
                    <div className="text-right">
                      <p className="font-medium">{formatCurrency(order.total)}</p>
                      <Badge
                        variant={
                          order.status === "Entregue"
                            ? "default"
                            : order.status === "Em trânsito"
                              ? "secondary"
                              : "outline"
                        }
                      >
                        {order.status}
                      </Badge>
                    </div>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>

          {/* Quick Actions */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <Card className="hover:shadow-lg transition-shadow cursor-pointer">
              <CardContent className="p-6 text-center">
                <MapPin className="h-12 w-12 mx-auto mb-4 text-primary-600" />
                <h3 className="font-semibold mb-2">Meus Endereços</h3>
                <p className="text-sm text-neutral-600">Gerencie seus endereços de entrega</p>
              </CardContent>
            </Card>

            <Card className="hover:shadow-lg transition-shadow cursor-pointer">
              <CardContent className="p-6 text-center">
                <Heart className="h-12 w-12 mx-auto mb-4 text-red-500" />
                <h3 className="font-semibold mb-2">Lista de Desejos</h3>
                <p className="text-sm text-neutral-600">Produtos que você salvou</p>
              </CardContent>
            </Card>

            <Card className="hover:shadow-lg transition-shadow cursor-pointer">
              <CardContent className="p-6 text-center">
                <Star className="h-12 w-12 mx-auto mb-4 text-yellow-500" />
                <h3 className="font-semibold mb-2">Programa de Fidelidade</h3>
                <p className="text-sm text-neutral-600">Troque pontos por descontos</p>
              </CardContent>
            </Card>
          </div>
        </div>
      </CustomerLayout>
      <Footer />
    </div>
  )
}
