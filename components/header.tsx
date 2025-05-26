"use client"

import { useState } from "react"
import Link from "next/link"
import { Search, ShoppingCart, User, Menu, Heart, Phone, Bell } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { useAuth } from "@/contexts/auth-context"
import { useCart } from "@/contexts/cart-context"

// Mock categories data
const mockCategories = [
  { id: "1", name: "Papel de Parede", slug: "papel-de-parede" },
  { id: "2", name: "Cortinas", slug: "cortinas" },
  { id: "3", name: "Móveis", slug: "moveis" },
  { id: "4", name: "Decoração", slug: "decoracao" },
  { id: "5", name: "Iluminação", slug: "iluminacao" },
]

export default function Header() {
  const [isMenuOpen, setIsMenuOpen] = useState(false)
  const { user, logout } = useAuth()
  const { itemCount } = useCart()

  return (
    <header className="bg-white shadow-sm border-b sticky top-0 z-50">
      {/* Top Bar */}
      <div className="bg-gradient-to-r from-purple-600 to-blue-600 text-white py-2">
        <div className="container mx-auto px-4 flex justify-between items-center text-sm">
          <div className="flex items-center gap-4">
            <span className="flex items-center gap-1">
              <Phone className="h-4 w-4" />
              (11) 3000-0000
            </span>
            <span>Frete grátis acima de R$ 299</span>
          </div>
          <div className="flex items-center gap-4">
            <Link href="/rastreamento" className="hover:underline">
              Rastrear Pedido
            </Link>
            <Link href="/atendimento" className="hover:underline">
              Atendimento
            </Link>
          </div>
        </div>
      </div>

      {/* Main Header */}
      <div className="container mx-auto px-4 py-4">
        <div className="flex items-center justify-between">
          {/* Logo */}
          <Link href="/" className="flex items-center group">
            <div className="relative">
              <div className="bg-gradient-to-r from-purple-600 to-blue-600 text-white px-6 py-3 rounded-xl font-bold text-xl transform group-hover:scale-105 transition-all duration-300">
                <span className="flex items-center gap-2">
                  <div className="w-8 h-8 bg-white/20 rounded-lg flex items-center justify-center">
                    <span className="text-white font-bold">MS</span>
                  </div>
                  <div className="flex flex-col">
                    <span className="text-lg leading-tight">MS DECOR</span>
                    <span className="text-xs opacity-80 leading-tight">Decoração Inteligente</span>
                  </div>
                </span>
              </div>
            </div>
          </Link>

          {/* Search Bar */}
          <div className="flex-1 max-w-2xl mx-8">
            <div className="relative">
              <Input
                type="text"
                placeholder="Buscar produtos, marcas..."
                className="w-full pl-4 pr-12 py-3 border-2 border-neutral-200 rounded-lg focus:border-purple-500"
              />
              <Button
                size="sm"
                className="absolute right-1 top-1 bg-gradient-to-r from-purple-600 to-blue-600 hover:from-purple-700 hover:to-blue-700"
              >
                <Search className="h-4 w-4" />
              </Button>
            </div>
          </div>

          {/* Actions */}
          <div className="flex items-center gap-4">
            {user ? (
              <div className="flex items-center gap-2">
                {/* Notificações */}
                <Button variant="ghost" size="sm" className="relative">
                  <Bell className="h-4 w-4" />
                  <span className="absolute -top-1 -right-1 bg-red-500 text-white text-xs rounded-full h-4 w-4 flex items-center justify-center">
                    3
                  </span>
                </Button>

                <Link href={user.role === "admin" ? "/admin" : "/minha-conta"}>
                  <Button variant="ghost" size="sm" className="flex items-center gap-2">
                    <User className="h-4 w-4" />
                    {user.name}
                  </Button>
                </Link>
                <Button variant="ghost" size="sm" onClick={logout}>
                  Sair
                </Button>
              </div>
            ) : (
              <Link href="/login">
                <Button variant="ghost" size="sm" className="flex items-center gap-2">
                  <User className="h-4 w-4" />
                  Entrar
                </Button>
              </Link>
            )}

            <Link href="/favoritos">
              <Button variant="ghost" size="sm">
                <Heart className="h-4 w-4" />
              </Button>
            </Link>

            <Link href="/carrinho">
              <Button variant="ghost" size="sm" className="relative">
                <ShoppingCart className="h-4 w-4" />
                {itemCount > 0 && (
                  <span className="absolute -top-1 -right-1 bg-purple-600 text-white text-xs rounded-full h-5 w-5 flex items-center justify-center">
                    {itemCount}
                  </span>
                )}
              </Button>
            </Link>
          </div>
        </div>
      </div>

      {/* Navigation */}
      <nav className="bg-neutral-50 border-t">
        <div className="container mx-auto px-4">
          <div className="flex items-center justify-between">
            <Button
              variant="ghost"
              className="lg:hidden flex items-center gap-2 py-4"
              onClick={() => setIsMenuOpen(!isMenuOpen)}
            >
              <Menu className="h-4 w-4" />
              Menu
            </Button>

            <div className="hidden lg:flex items-center space-x-8 py-4">
              {mockCategories.map((category) => (
                <Link
                  key={category.id}
                  href={`/categoria/${category.slug}`}
                  className="text-neutral-700 hover:text-purple-600 font-medium transition-colors px-3 py-2 rounded-lg hover:bg-purple-50"
                >
                  {category.name}
                </Link>
              ))}
              <Link
                href="/ofertas"
                className="text-red-600 hover:text-red-700 font-medium transition-colors px-3 py-2 rounded-lg hover:bg-red-50"
              >
                🔥 Ofertas
              </Link>
              <Link
                href="/lancamentos"
                className="text-neutral-700 hover:text-purple-600 font-medium transition-colors px-3 py-2 rounded-lg hover:bg-purple-50"
              >
                ✨ Lançamentos
              </Link>
              <Link
                href="/blog"
                className="text-neutral-700 hover:text-purple-600 font-medium transition-colors px-3 py-2 rounded-lg hover:bg-purple-50"
              >
                📝 Blog
              </Link>
            </div>
          </div>

          {/* Mobile Menu */}
          {isMenuOpen && (
            <div className="lg:hidden py-4 border-t bg-white shadow-lg rounded-b-lg">
              <div className="space-y-2">
                {mockCategories.map((category) => (
                  <Link
                    key={category.id}
                    href={`/categoria/${category.slug}`}
                    className="block py-3 px-4 text-neutral-700 hover:text-purple-600 hover:bg-purple-50 rounded-lg transition-colors"
                    onClick={() => setIsMenuOpen(false)}
                  >
                    {category.name}
                  </Link>
                ))}
                <Link
                  href="/ofertas"
                  className="block py-3 px-4 text-red-600 hover:text-red-700 hover:bg-red-50 rounded-lg transition-colors font-medium"
                  onClick={() => setIsMenuOpen(false)}
                >
                  🔥 Ofertas
                </Link>
                <Link
                  href="/lancamentos"
                  className="block py-3 px-4 text-neutral-700 hover:text-purple-600 hover:bg-purple-50 rounded-lg transition-colors"
                  onClick={() => setIsMenuOpen(false)}
                >
                  ✨ Lançamentos
                </Link>
                <Link
                  href="/blog"
                  className="block py-3 px-4 text-neutral-700 hover:text-purple-600 hover:bg-purple-50 rounded-lg transition-colors"
                  onClick={() => setIsMenuOpen(false)}
                >
                  📝 Blog
                </Link>
              </div>
            </div>
          )}
        </div>
      </nav>
    </header>
  )
}
