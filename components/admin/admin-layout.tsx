"use client"

import type React from "react"

import { useState } from "react"
import Link from "next/link"
import { usePathname } from "next/navigation"
import { Button } from "@/components/ui/button"
import { useAuth } from "@/contexts/auth-context"
import {
  LayoutDashboard,
  Package,
  Users,
  ShoppingCart,
  BarChart3,
  Settings,
  FileText,
  CreditCard,
  Truck,
  Tag,
  UserCheck,
  Building,
  Menu,
  X,
  LogOut,
  Home,
  Edit,
  ImageIcon,
  Palette,
  PenTool,
} from "lucide-react"

const menuItems = [
  { icon: LayoutDashboard, label: "Dashboard", href: "/admin" },
  { icon: Package, label: "Produtos", href: "/admin/produtos" },
  { icon: Users, label: "Clientes", href: "/admin/clientes" },
  { icon: ShoppingCart, label: "Pedidos", href: "/admin/pedidos" },
  { icon: BarChart3, label: "Relatórios", href: "/admin/relatorios" },
  { icon: CreditCard, label: "Financeiro", href: "/admin/financeiro" },
  { icon: Truck, label: "Estoque", href: "/admin/estoque" },
  { icon: Tag, label: "Promoções", href: "/admin/promocoes" },
  { icon: UserCheck, label: "Funcionários", href: "/admin/funcionarios" },
  { icon: Building, label: "Fornecedores", href: "/admin/fornecedores" },
  { icon: FileText, label: "Conteúdo", href: "/admin/conteudo" },
  // CMS
  { icon: Edit, label: "Editor Visual", href: "/admin/editor-visual" },
  { icon: ImageIcon, label: "Mídia", href: "/admin/midia" },
  { icon: Palette, label: "Personalização", href: "/admin/personalizacao" },
  // Blog
  { icon: PenTool, label: "Blog", href: "/admin/blog" },
  { icon: Settings, label: "Configurações", href: "/admin/configuracoes" },
]

interface AdminLayoutProps {
  children: React.ReactNode
}

export default function AdminLayout({ children }: AdminLayoutProps) {
  const [sidebarOpen, setSidebarOpen] = useState(false)
  const pathname = usePathname()
  const { user, logout } = useAuth()

  return (
    <div className="min-h-screen bg-neutral-50">
      {/* Mobile sidebar overlay */}
      {sidebarOpen && (
        <div className="fixed inset-0 bg-black bg-opacity-50 z-40 lg:hidden" onClick={() => setSidebarOpen(false)} />
      )}

      {/* Sidebar */}
      <div
        className={`fixed inset-y-0 left-0 z-50 w-64 bg-white shadow-lg transform transition-transform duration-300 ease-in-out lg:translate-x-0 ${
          sidebarOpen ? "translate-x-0" : "-translate-x-full"
        }`}
      >
        <div className="flex items-center justify-between p-4 border-b">
          <div className="bg-gradient-to-r from-primary-600 to-secondary-600 text-white px-3 py-2 rounded font-bold">
            Admin Panel
          </div>
          <Button variant="ghost" size="sm" className="lg:hidden" onClick={() => setSidebarOpen(false)}>
            <X className="h-4 w-4" />
          </Button>
        </div>

        <nav className="p-4 space-y-2 max-h-[calc(100vh-200px)] overflow-y-auto">
          {menuItems.map((item) => (
            <Link
              key={item.href}
              href={item.href}
              className={`flex items-center gap-3 px-3 py-2 rounded-lg transition-colors ${
                pathname === item.href || pathname.startsWith(item.href + "/")
                  ? "bg-primary-100 text-primary-700"
                  : "text-neutral-700 hover:bg-neutral-100"
              }`}
              onClick={() => setSidebarOpen(false)}
            >
              <item.icon className="h-5 w-5" />
              {item.label}
            </Link>
          ))}
        </nav>

        <div className="absolute bottom-4 left-4 right-4 space-y-2">
          <Link href="/">
            <Button variant="outline" className="w-full justify-start">
              <Home className="h-4 w-4 mr-2" />
              Ver Site
            </Button>
          </Link>
          <Button variant="outline" className="w-full justify-start" onClick={logout}>
            <LogOut className="h-4 w-4 mr-2" />
            Sair
          </Button>
        </div>
      </div>

      {/* Main content */}
      <div className="lg:ml-64">
        {/* Top bar */}
        <header className="bg-white shadow-sm border-b px-4 py-3">
          <div className="flex items-center justify-between">
            <Button variant="ghost" size="sm" className="lg:hidden" onClick={() => setSidebarOpen(true)}>
              <Menu className="h-5 w-5" />
            </Button>

            <div className="flex items-center gap-4">
              <span className="text-sm text-neutral-600">Bem-vindo, {user?.name}</span>
            </div>
          </div>
        </header>

        {/* Page content */}
        <main className="p-6">{children}</main>
      </div>
    </div>
  )
}
