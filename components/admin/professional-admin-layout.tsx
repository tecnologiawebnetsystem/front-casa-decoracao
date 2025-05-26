"use client"

import type React from "react"

import { useState, useEffect } from "react"
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
  Bell,
  Search,
  ChevronDown,
  Sparkles,
  TrendingUp,
  Calendar,
  MessageSquare,
} from "lucide-react"
import { Input } from "@/components/ui/input"
import { Badge } from "@/components/ui/badge"

const menuItems = [
  {
    icon: LayoutDashboard,
    label: "Dashboard",
    href: "/admin",
    badge: null,
    color: "text-primary-600",
  },
  {
    icon: Package,
    label: "Produtos",
    href: "/admin/produtos",
    badge: "1.2K",
    color: "text-secondary-600",
  },
  {
    icon: Users,
    label: "Clientes",
    href: "/admin/clientes",
    badge: "2.8K",
    color: "text-accent-purple",
  },
  {
    icon: ShoppingCart,
    label: "Pedidos",
    href: "/admin/pedidos",
    badge: "156",
    color: "text-green-600",
  },
  {
    icon: BarChart3,
    label: "Relatórios",
    href: "/admin/relatorios",
    badge: null,
    color: "text-orange-600",
  },
  {
    icon: CreditCard,
    label: "Financeiro",
    href: "/admin/financeiro",
    badge: "12",
    color: "text-emerald-600",
  },
  {
    icon: Truck,
    label: "Estoque",
    href: "/admin/estoque",
    badge: "Low",
    color: "text-red-600",
  },
  {
    icon: Tag,
    label: "Promoções",
    href: "/admin/promocoes",
    badge: "5",
    color: "text-pink-600",
  },
  {
    icon: UserCheck,
    label: "Funcionários",
    href: "/admin/funcionarios",
    badge: null,
    color: "text-blue-600",
  },
  {
    icon: Building,
    label: "Fornecedores",
    href: "/admin/fornecedores",
    badge: null,
    color: "text-indigo-600",
  },
  {
    icon: FileText,
    label: "Conteúdo",
    href: "/admin/conteudo",
    badge: null,
    color: "text-cyan-600",
  },
  {
    icon: Settings,
    label: "Configurações",
    href: "/admin/configuracoes",
    badge: null,
    color: "text-neutral-600",
  },
]

interface ProfessionalAdminLayoutProps {
  children: React.ReactNode
}

export default function ProfessionalAdminLayout({ children }: ProfessionalAdminLayoutProps) {
  const [sidebarOpen, setSidebarOpen] = useState(false)
  const [sidebarCollapsed, setSidebarCollapsed] = useState(false)
  const [searchQuery, setSearchQuery] = useState("")
  const pathname = usePathname()
  const { user, logout } = useAuth()

  useEffect(() => {
    const handleResize = () => {
      if (window.innerWidth < 1024) {
        setSidebarCollapsed(false)
        setSidebarOpen(false)
      }
    }
    window.addEventListener("resize", handleResize)
    return () => window.removeEventListener("resize", handleResize)
  }, [])

  return (
    <div className="min-h-screen bg-gradient-to-br from-neutral-50 via-primary-50/30 to-secondary-50/30">
      {/* Mobile sidebar overlay */}
      {sidebarOpen && (
        <div
          className="fixed inset-0 bg-black/50 backdrop-blur-sm z-40 lg:hidden"
          onClick={() => setSidebarOpen(false)}
        />
      )}

      {/* Sidebar */}
      <div
        className={`fixed inset-y-0 left-0 z-50 bg-white/95 backdrop-blur-xl shadow-2xl border-r border-white/20 transform transition-all duration-300 ease-in-out lg:translate-x-0 ${
          sidebarOpen ? "translate-x-0" : "-translate-x-full"
        } ${sidebarCollapsed ? "lg:w-20" : "lg:w-72"} w-72`}
      >
        {/* Sidebar Header */}
        <div className="flex items-center justify-between p-6 border-b border-neutral-200/50">
          {!sidebarCollapsed && (
            <div className="flex items-center gap-3">
              <div className="relative">
                <div className="absolute inset-0 bg-gradient-to-r from-primary-600 to-secondary-600 rounded-xl blur opacity-75"></div>
                <div className="relative bg-gradient-to-r from-primary-600 via-accent-purple to-secondary-600 text-white p-3 rounded-xl">
                  <Sparkles className="h-6 w-6" />
                </div>
              </div>
              <div>
                <h1 className="font-bold text-lg bg-gradient-to-r from-primary-600 to-secondary-600 bg-clip-text text-transparent">
                  Casa Decoração
                </h1>
                <p className="text-xs text-neutral-500 font-medium">Admin Panel</p>
              </div>
            </div>
          )}

          <div className="flex items-center gap-2">
            <Button
              variant="ghost"
              size="sm"
              className="hidden lg:flex"
              onClick={() => setSidebarCollapsed(!sidebarCollapsed)}
            >
              <Menu className="h-4 w-4" />
            </Button>
            <Button variant="ghost" size="sm" className="lg:hidden" onClick={() => setSidebarOpen(false)}>
              <X className="h-4 w-4" />
            </Button>
          </div>
        </div>

        {/* Navigation */}
        <nav className="p-4 space-y-2 flex-1 overflow-y-auto">
          {menuItems.map((item) => (
            <Link
              key={item.href}
              href={item.href}
              className={`group flex items-center gap-3 px-4 py-3 rounded-xl transition-all duration-300 ${
                pathname === item.href
                  ? "bg-gradient-to-r from-primary-100 to-secondary-100 text-primary-700 shadow-lg"
                  : "text-neutral-700 hover:bg-white/80 hover:shadow-md"
              }`}
              onClick={() => setSidebarOpen(false)}
            >
              <div
                className={`p-2 rounded-lg transition-all duration-300 ${
                  pathname === item.href ? "bg-white shadow-sm" : "group-hover:bg-neutral-100"
                }`}
              >
                <item.icon className={`h-5 w-5 ${pathname === item.href ? item.color : "text-neutral-500"}`} />
              </div>

              {!sidebarCollapsed && (
                <>
                  <span className="font-medium flex-1">{item.label}</span>
                  {item.badge && (
                    <Badge
                      variant={pathname === item.href ? "default" : "secondary"}
                      className="text-xs px-2 py-1 rounded-full"
                    >
                      {item.badge}
                    </Badge>
                  )}
                </>
              )}
            </Link>
          ))}
        </nav>

        {/* Sidebar Footer */}
        <div className="p-4 border-t border-neutral-200/50 space-y-2">
          <Link href="/">
            <Button
              variant="outline"
              className={`${sidebarCollapsed ? "w-12 h-12 p-0" : "w-full justify-start"} border-primary-200 hover:bg-primary-50`}
            >
              <Home className="h-4 w-4" />
              {!sidebarCollapsed && <span className="ml-2">Ver Site</span>}
            </Button>
          </Link>
          <Button
            variant="outline"
            className={`${sidebarCollapsed ? "w-12 h-12 p-0" : "w-full justify-start"} border-red-200 hover:bg-red-50 text-red-600`}
            onClick={logout}
          >
            <LogOut className="h-4 w-4" />
            {!sidebarCollapsed && <span className="ml-2">Sair</span>}
          </Button>
        </div>
      </div>

      {/* Main content */}
      <div className={`transition-all duration-300 ${sidebarCollapsed ? "lg:ml-20" : "lg:ml-72"}`}>
        {/* Top bar */}
        <header className="bg-white/80 backdrop-blur-xl shadow-sm border-b border-white/20 sticky top-0 z-30">
          <div className="px-6 py-4">
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-4">
                <Button variant="ghost" size="sm" className="lg:hidden" onClick={() => setSidebarOpen(true)}>
                  <Menu className="h-5 w-5" />
                </Button>

                {/* Search Bar */}
                <div className="relative hidden md:block">
                  <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-neutral-400 h-4 w-4" />
                  <Input
                    placeholder="Buscar no sistema..."
                    value={searchQuery}
                    onChange={(e) => setSearchQuery(e.target.value)}
                    className="pl-10 w-80 bg-white/50 border-neutral-200 focus:bg-white transition-all duration-300"
                  />
                </div>
              </div>

              <div className="flex items-center gap-4">
                {/* Quick Stats */}
                <div className="hidden lg:flex items-center gap-6">
                  <div className="flex items-center gap-2 text-sm">
                    <TrendingUp className="h-4 w-4 text-green-600" />
                    <span className="text-neutral-600">Vendas:</span>
                    <span className="font-semibold text-green-600">+12%</span>
                  </div>
                  <div className="flex items-center gap-2 text-sm">
                    <Calendar className="h-4 w-4 text-primary-600" />
                    <span className="text-neutral-600">Hoje:</span>
                    <span className="font-semibold text-primary-600">R$ 12.4K</span>
                  </div>
                </div>

                {/* Notifications */}
                <Button variant="ghost" size="sm" className="relative">
                  <Bell className="h-5 w-5" />
                  <span className="absolute -top-1 -right-1 bg-red-500 text-white text-xs rounded-full h-5 w-5 flex items-center justify-center">
                    3
                  </span>
                </Button>

                {/* Messages */}
                <Button variant="ghost" size="sm" className="relative">
                  <MessageSquare className="h-5 w-5" />
                  <span className="absolute -top-1 -right-1 bg-primary-500 text-white text-xs rounded-full h-5 w-5 flex items-center justify-center">
                    7
                  </span>
                </Button>

                {/* User Menu */}
                <div className="flex items-center gap-3 pl-4 border-l border-neutral-200">
                  <div className="text-right hidden sm:block">
                    <p className="text-sm font-medium text-neutral-800">{user?.name}</p>
                    <p className="text-xs text-neutral-500">Administrador</p>
                  </div>
                  <div className="w-10 h-10 bg-gradient-to-r from-primary-600 to-secondary-600 rounded-xl flex items-center justify-center text-white font-bold">
                    {user?.name?.charAt(0)}
                  </div>
                  <ChevronDown className="h-4 w-4 text-neutral-400" />
                </div>
              </div>
            </div>
          </div>
        </header>

        {/* Page content */}
        <main className="p-6">{children}</main>
      </div>
    </div>
  )
}
