"use client"

import { createContext, useContext, useState, useEffect, type ReactNode } from "react"
import type { User } from "@/lib/types"

interface AuthContextType {
  user: User | null
  login: (email: string, password: string) => Promise<boolean>
  logout: () => void
  isLoading: boolean
}

const AuthContext = createContext<AuthContextType | undefined>(undefined)

export function AuthProvider({ children }: { children: ReactNode }) {
  const [user, setUser] = useState<User | null>(null)
  const [isLoading, setIsLoading] = useState(true)

  useEffect(() => {
    // Simular verificação de autenticação
    const savedUser = localStorage.getItem("user")
    if (savedUser) {
      setUser(JSON.parse(savedUser))
    }
    setIsLoading(false)
  }, [])

  const login = async (email: string, password: string): Promise<boolean> => {
    setIsLoading(true)

    // Simular delay de autenticação
    await new Promise((resolve) => setTimeout(resolve, 1000))

    // Credenciais fixas para demonstração
    const validCredentials = [
      {
        email: "admin@msdecor.com",
        password: "admin123",
        user: {
          id: "1",
          name: "Administrador MS Decor",
          email: "admin@msdecor.com",
          role: "admin" as const,
          createdAt: new Date(),
          lastLogin: new Date(),
        },
      },
      {
        email: "cliente@msdecor.com",
        password: "cliente123",
        user: {
          id: "2",
          name: "Cliente MS Decor",
          email: "cliente@msdecor.com",
          role: "customer" as const,
          createdAt: new Date(),
          lastLogin: new Date(),
        },
      },
    ]

    // Verificar credenciais
    const credential = validCredentials.find((cred) => cred.email === email && cred.password === password)

    if (credential) {
      setUser(credential.user)
      localStorage.setItem("user", JSON.stringify(credential.user))
      setIsLoading(false)
      return true
    }

    setIsLoading(false)
    return false
  }

  const logout = () => {
    setUser(null)
    localStorage.removeItem("user")
  }

  return <AuthContext.Provider value={{ user, login, logout, isLoading }}>{children}</AuthContext.Provider>
}

export function useAuth() {
  const context = useContext(AuthContext)
  if (context === undefined) {
    throw new Error("useAuth must be used within an AuthProvider")
  }
  return context
}
