"use client"

import type React from "react"

import { useState } from "react"
import { useRouter } from "next/navigation"
import Link from "next/link"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { useAuth } from "@/contexts/auth-context"
import Header from "@/components/header"
import Footer from "@/components/footer"

export default function LoginPage() {
  const [email, setEmail] = useState("")
  const [password, setPassword] = useState("")
  const [isLoading, setIsLoading] = useState(false)
  const { login } = useAuth()
  const router = useRouter()
  const [error, setError] = useState("")

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setIsLoading(true)
    setError("")

    const success = await login(email, password)
    if (success) {
      if (email === "admin@msdecor.com") {
        router.push("/admin")
      } else {
        router.push("/minha-conta")
      }
    } else {
      setError("Email ou senha incorretos. Verifique as credenciais de teste.")
    }

    setIsLoading(false)
  }

  return (
    <div className="min-h-screen bg-neutral-50">
      <Header />
      <main className="container mx-auto px-4 py-16">
        <div className="max-w-md mx-auto">
          <Card>
            <CardHeader>
              <CardTitle className="text-center">Entrar na sua conta</CardTitle>
            </CardHeader>
            <CardContent>
              <form onSubmit={handleSubmit} className="space-y-4">
                <div>
                  <label htmlFor="email" className="block text-sm font-medium mb-1">
                    E-mail
                  </label>
                  <Input
                    id="email"
                    type="email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    required
                    placeholder="seu@email.com"
                  />
                </div>

                <div>
                  <label htmlFor="password" className="block text-sm font-medium mb-1">
                    Senha
                  </label>
                  <Input
                    id="password"
                    type="password"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    required
                    placeholder="Sua senha"
                  />
                </div>

                <Button type="submit" className="w-full" disabled={isLoading}>
                  {isLoading ? "Entrando..." : "Entrar"}
                </Button>
                {error && (
                  <div className="mt-4 p-3 bg-red-50 border border-red-200 rounded-lg">
                    <p className="text-sm text-red-600">{error}</p>
                  </div>
                )}
              </form>

              <div className="mt-6 text-center space-y-2">
                <Link href="/esqueci-senha" className="text-sm text-primary-600 hover:underline">
                  Esqueci minha senha
                </Link>
                <div className="text-sm text-neutral-600">
                  Não tem conta?{" "}
                  <Link href="/cadastro" className="text-primary-600 hover:underline">
                    Cadastre-se
                  </Link>
                </div>
              </div>

              <div className="mt-6 p-6 bg-gradient-to-r from-purple-50 to-blue-50 rounded-lg border border-purple-200">
                <h3 className="text-lg font-semibold mb-4 text-purple-800">🔐 Credenciais de Acesso</h3>

                <div className="space-y-4">
                  <div className="bg-white p-4 rounded-lg border border-purple-100">
                    <h4 className="font-medium text-purple-700 mb-2">👨‍💼 Administrador</h4>
                    <p className="text-sm text-gray-600 mb-1">
                      <strong>Email:</strong> admin@msdecor.com
                    </p>
                    <p className="text-sm text-gray-600">
                      <strong>Senha:</strong> admin123
                    </p>
                    <button
                      type="button"
                      onClick={() => {
                        setEmail("admin@msdecor.com")
                        setPassword("admin123")
                      }}
                      className="mt-2 text-xs text-purple-600 hover:text-purple-800 underline"
                    >
                      Preencher automaticamente
                    </button>
                  </div>

                  <div className="bg-white p-4 rounded-lg border border-blue-100">
                    <h4 className="font-medium text-blue-700 mb-2">👤 Cliente</h4>
                    <p className="text-sm text-gray-600 mb-1">
                      <strong>Email:</strong> cliente@msdecor.com
                    </p>
                    <p className="text-sm text-gray-600">
                      <strong>Senha:</strong> cliente123
                    </p>
                    <button
                      type="button"
                      onClick={() => {
                        setEmail("cliente@msdecor.com")
                        setPassword("cliente123")
                      }}
                      className="mt-2 text-xs text-blue-600 hover:text-blue-800 underline"
                    >
                      Preencher automaticamente
                    </button>
                  </div>
                </div>

                <div className="mt-4 p-3 bg-yellow-50 rounded-lg border border-yellow-200">
                  <p className="text-xs text-yellow-800">
                    💡 <strong>Dica:</strong> Clique em "Preencher automaticamente" para inserir as credenciais
                    rapidamente!
                  </p>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>
      </main>
      <Footer />
    </div>
  )
}
