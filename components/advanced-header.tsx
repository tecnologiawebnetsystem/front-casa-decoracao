"use client"

import { useState, useEffect } from "react"
import Link from "next/link"
import { Search, ShoppingCart, User, Menu, Heart, Phone, ChevronDown, Sparkles, Zap, Star } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { useAuth } from "@/contexts/auth-context"
import { useCart } from "@/contexts/cart-context"
import { mockCategories } from "@/lib/mock-data"

export default function AdvancedHeader() {
  const [isMenuOpen, setIsMenuOpen] = useState(false)
  const [isScrolled, setIsScrolled] = useState(false)
  const [activeCategory, setActiveCategory] = useState<string | null>(null)
  const { user, logout } = useAuth()
  const { itemCount } = useCart()

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 50)
    }
    window.addEventListener("scroll", handleScroll)
    return () => window.removeEventListener("scroll", handleScroll)
  }, [])

  return (
    <>
      {/* Floating Top Bar */}
      <div className="fixed top-0 left-0 right-0 z-50">
        <div className="bg-gradient-to-r from-primary-600 via-accent-purple to-secondary-600 text-white py-2 animate-gradient bg-[length:400%_400%]">
          <div className="container mx-auto px-4 flex justify-between items-center text-sm">
            <div className="flex items-center gap-6">
              <div className="flex items-center gap-2 animate-pulse-slow">
                <Sparkles className="h-4 w-4" />
                <span>Ofertas Exclusivas Online</span>
              </div>
              <div className="flex items-center gap-2">
                <Phone className="h-4 w-4" />
                <span>(11) 3000-0000</span>
              </div>
            </div>
            <div className="flex items-center gap-6">
              <div className="flex items-center gap-2 animate-glow">
                <Zap className="h-4 w-4" />
                <span>Frete grátis acima de R$ 299</span>
              </div>
              <Link href="/rastreamento" className="hover:underline transition-all duration-300 hover:scale-105">
                Rastrear Pedido
              </Link>
            </div>
          </div>
        </div>

        {/* Main Header with Glass Effect */}
        <header
          className={`backdrop-blur-xl bg-white/80 border-b border-white/20 transition-all duration-500 ${
            isScrolled ? "shadow-2xl bg-white/95" : ""
          }`}
        >
          <div className="container mx-auto px-4 py-4">
            <div className="flex items-center justify-between">
              {/* Animated Logo */}
              <Link href="/" className="group flex items-center">
                <div className="relative">
                  <div className="absolute inset-0 bg-gradient-to-r from-primary-600 to-secondary-600 rounded-xl blur opacity-75 group-hover:opacity-100 transition-opacity duration-300"></div>
                  <div className="relative bg-gradient-to-r from-primary-600 via-accent-purple to-secondary-600 text-white px-6 py-3 rounded-xl font-bold text-xl transform group-hover:scale-105 transition-all duration-300 animate-gradient bg-[length:400%_400%]">
                    <span className="flex items-center gap-2">
                      <Star className="h-5 w-5 animate-spin" />
                      Casa Decoração
                    </span>
                  </div>
                </div>
              </Link>

              {/* Futuristic Search Bar */}
              <div className="flex-1 max-w-2xl mx-8">
                <div className="relative group">
                  <div className="absolute inset-0 bg-gradient-to-r from-primary-200 to-secondary-200 rounded-2xl blur opacity-25 group-hover:opacity-50 transition-opacity duration-300"></div>
                  <div className="relative">
                    <Input
                      type="text"
                      placeholder="Buscar produtos, marcas, inspirações..."
                      className="w-full pl-6 pr-16 py-4 border-2 border-transparent bg-white/50 backdrop-blur-sm rounded-2xl focus:border-primary-500 focus:bg-white/80 transition-all duration-300 text-lg placeholder:text-neutral-500"
                    />
                    <Button
                      size="sm"
                      className="absolute right-2 top-2 bg-gradient-to-r from-primary-600 to-secondary-600 hover:from-primary-700 hover:to-secondary-700 rounded-xl px-4 py-2 transform hover:scale-105 transition-all duration-300"
                    >
                      <Search className="h-4 w-4" />
                    </Button>
                  </div>
                </div>
              </div>

              {/* Animated Action Buttons */}
              <div className="flex items-center gap-4">
                {user ? (
                  <div className="flex items-center gap-3">
                    <Link href={user.role === "admin" ? "/admin" : "/minha-conta"}>
                      <Button
                        variant="ghost"
                        size="sm"
                        className="flex items-center gap-2 hover:bg-primary-50 hover:text-primary-700 transition-all duration-300 transform hover:scale-105"
                      >
                        <div className="w-8 h-8 bg-gradient-to-r from-primary-600 to-secondary-600 rounded-full flex items-center justify-center text-white text-xs font-bold">
                          {user.name.charAt(0)}
                        </div>
                        {user.name}
                      </Button>
                    </Link>
                    <Button
                      variant="ghost"
                      size="sm"
                      onClick={logout}
                      className="hover:bg-red-50 hover:text-red-700 transition-all duration-300"
                    >
                      Sair
                    </Button>
                  </div>
                ) : (
                  <Link href="/login">
                    <Button
                      variant="ghost"
                      size="sm"
                      className="flex items-center gap-2 hover:bg-primary-50 hover:text-primary-700 transition-all duration-300 transform hover:scale-105"
                    >
                      <User className="h-4 w-4" />
                      Entrar
                    </Button>
                  </Link>
                )}

                <Link href="/favoritos">
                  <Button
                    variant="ghost"
                    size="sm"
                    className="relative hover:bg-red-50 hover:text-red-600 transition-all duration-300 transform hover:scale-105"
                  >
                    <Heart className="h-5 w-5" />
                  </Button>
                </Link>

                <Link href="/carrinho">
                  <Button
                    variant="ghost"
                    size="sm"
                    className="relative hover:bg-primary-50 hover:text-primary-700 transition-all duration-300 transform hover:scale-105"
                  >
                    <ShoppingCart className="h-5 w-5" />
                    {itemCount > 0 && (
                      <span className="absolute -top-1 -right-1 bg-gradient-to-r from-red-500 to-pink-500 text-white text-xs rounded-full h-6 w-6 flex items-center justify-center animate-bounce font-bold">
                        {itemCount}
                      </span>
                    )}
                  </Button>
                </Link>
              </div>
            </div>
          </div>

          {/* Mega Menu Navigation */}
          <nav className="border-t border-white/20 bg-white/30 backdrop-blur-sm">
            <div className="container mx-auto px-4">
              <div className="flex items-center justify-between">
                <Button
                  variant="ghost"
                  className="lg:hidden flex items-center gap-2 py-4"
                  onClick={() => setIsMenuOpen(!isMenuOpen)}
                >
                  <Menu className="h-4 w-4" />
                  Categorias
                </Button>

                <div className="hidden lg:flex items-center space-x-1 py-2">
                  {mockCategories.map((category) => (
                    <div
                      key={category.id}
                      className="relative group"
                      onMouseEnter={() => setActiveCategory(category.id)}
                      onMouseLeave={() => setActiveCategory(null)}
                    >
                      <Link
                        href={`/categoria/${category.slug}`}
                        className="flex items-center gap-2 px-6 py-3 text-neutral-700 hover:text-primary-600 font-medium transition-all duration-300 transform hover:scale-105 hover:bg-white/50 rounded-xl group"
                      >
                        {category.name}
                        <ChevronDown className="h-3 w-3 group-hover:rotate-180 transition-transform duration-300" />
                      </Link>

                      {/* Mega Menu Dropdown */}
                      {activeCategory === category.id && category.subcategories && (
                        <div className="absolute top-full left-0 w-80 bg-white/95 backdrop-blur-xl rounded-2xl shadow-2xl border border-white/20 p-6 animate-slide-down z-50">
                          <div className="grid grid-cols-1 gap-4">
                            {category.subcategories.map((sub) => (
                              <Link
                                key={sub.id}
                                href={`/categoria/${sub.slug}`}
                                className="flex items-center gap-4 p-3 hover:bg-primary-50 rounded-xl transition-all duration-300 transform hover:scale-105 group"
                              >
                                <div className="w-12 h-12 bg-gradient-to-r from-primary-100 to-secondary-100 rounded-xl flex items-center justify-center group-hover:from-primary-200 group-hover:to-secondary-200 transition-all duration-300">
                                  <span className="text-primary-600 font-bold text-sm">{sub.name.charAt(0)}</span>
                                </div>
                                <div>
                                  <h4 className="font-semibold text-neutral-800 group-hover:text-primary-600 transition-colors">
                                    {sub.name}
                                  </h4>
                                  <p className="text-xs text-neutral-500">{sub.description}</p>
                                </div>
                              </Link>
                            ))}
                          </div>
                        </div>
                      )}
                    </div>
                  ))}

                  <Link
                    href="/ofertas"
                    className="px-6 py-3 bg-gradient-to-r from-red-500 to-pink-500 text-white font-medium rounded-xl hover:from-red-600 hover:to-pink-600 transition-all duration-300 transform hover:scale-105 animate-pulse-slow"
                  >
                    🔥 Ofertas
                  </Link>

                  <Link
                    href="/lancamentos"
                    className="px-6 py-3 bg-gradient-to-r from-green-500 to-emerald-500 text-white font-medium rounded-xl hover:from-green-600 hover:to-emerald-600 transition-all duration-300 transform hover:scale-105"
                  >
                    ✨ Lançamentos
                  </Link>
                </div>
              </div>

              {/* Mobile Menu */}
              {isMenuOpen && (
                <div className="lg:hidden py-4 border-t border-white/20 animate-slide-down">
                  <div className="grid grid-cols-1 gap-2">
                    {mockCategories.map((category) => (
                      <Link
                        key={category.id}
                        href={`/categoria/${category.slug}`}
                        className="flex items-center gap-3 p-3 text-neutral-700 hover:text-primary-600 hover:bg-white/50 rounded-xl transition-all duration-300"
                        onClick={() => setIsMenuOpen(false)}
                      >
                        <div className="w-8 h-8 bg-gradient-to-r from-primary-100 to-secondary-100 rounded-lg flex items-center justify-center">
                          <span className="text-primary-600 font-bold text-xs">{category.name.charAt(0)}</span>
                        </div>
                        {category.name}
                      </Link>
                    ))}
                  </div>
                </div>
              )}
            </div>
          </nav>
        </header>
      </div>

      {/* Spacer for fixed header */}
      <div className="h-32"></div>
    </>
  )
}
