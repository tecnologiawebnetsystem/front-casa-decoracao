"use client"

import type React from "react"

import { useState } from "react"
import Link from "next/link"
import { usePathname } from "next/navigation"
import { Button } from "@/components/ui/button"
import { User, ShoppingBag, Heart, MapPin, CreditCard, Settings, Star, Menu, X } from "lucide-react"

const menuItems = [
  { icon: User, label: "Minha Conta", href: "/minha-conta" },
  { icon: ShoppingBag, label: "Meus Pedidos", href: "/minha-conta/pedidos" },
  { icon: Heart, label: "Lista de Desejos", href: "/minha-conta/favoritos" },
  { icon: MapPin, label: "Endereços", href: "/minha-conta/enderecos" },
  { icon: CreditCard, label: "Formas de Pagamento", href: "/minha-conta/pagamento" },
  { icon: Star, label: "Programa de Fidelidade", href: "/minha-conta/fidelidade" },
  { icon: Settings, label: "Configurações", href: "/minha-conta/configuracoes" },
]

interface CustomerLayoutProps {
  children: React.ReactNode
}

export default function CustomerLayout({ children }: CustomerLayoutProps) {
  const [sidebarOpen, setSidebarOpen] = useState(false)
  const pathname = usePathname()

  return (
    <div className="container mx-auto px-4 py-8">
      <div className="flex flex-col lg:flex-row gap-8">
        {/* Mobile menu button */}
        <div className="lg:hidden">
          <Button variant="outline" onClick={() => setSidebarOpen(true)} className="w-full justify-start">
            <Menu className="h-4 w-4 mr-2" />
            Menu da Conta
          </Button>
        </div>

        {/* Mobile sidebar overlay */}
        {sidebarOpen && (
          <div className="fixed inset-0 bg-black bg-opacity-50 z-40 lg:hidden" onClick={() => setSidebarOpen(false)} />
        )}

        {/* Sidebar */}
        <div
          className={`fixed inset-y-0 left-0 z-50 w-64 bg-white shadow-lg transform transition-transform duration-300 ease-in-out lg:relative lg:translate-x-0 lg:shadow-none lg:w-64 ${
            sidebarOpen ? "translate-x-0" : "-translate-x-full"
          }`}
        >
          <div className="p-4 lg:p-0">
            <div className="flex items-center justify-between mb-6 lg:hidden">
              <h2 className="font-semibold">Minha Conta</h2>
              <Button variant="ghost" size="sm" onClick={() => setSidebarOpen(false)}>
                <X className="h-4 w-4" />
              </Button>
            </div>

            <nav className="space-y-2">
              {menuItems.map((item) => (
                <Link
                  key={item.href}
                  href={item.href}
                  className={`flex items-center gap-3 px-3 py-2 rounded-lg transition-colors ${
                    pathname === item.href ? "bg-primary-100 text-primary-700" : "text-neutral-700 hover:bg-neutral-100"
                  }`}
                  onClick={() => setSidebarOpen(false)}
                >
                  <item.icon className="h-5 w-5" />
                  {item.label}
                </Link>
              ))}
            </nav>
          </div>
        </div>

        {/* Main content */}
        <div className="flex-1">{children}</div>
      </div>
    </div>
  )
}
