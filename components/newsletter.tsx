"use client"

import type React from "react"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Mail } from "lucide-react"

export default function Newsletter() {
  const [email, setEmail] = useState("")
  const [isSubscribed, setIsSubscribed] = useState(false)

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    // Simular inscrição
    setIsSubscribed(true)
    setEmail("")
  }

  return (
    <section className="py-16 bg-neutral-800 text-white">
      <div className="container mx-auto px-4 text-center">
        <div className="max-w-2xl mx-auto">
          <Mail className="h-12 w-12 mx-auto mb-4 text-primary-400" />
          <h2 className="text-3xl font-bold mb-4">Receba nossas ofertas exclusivas</h2>
          <p className="text-neutral-300 mb-8">
            Cadastre-se em nossa newsletter e seja o primeiro a saber sobre promoções, lançamentos e dicas de decoração.
          </p>

          {isSubscribed ? (
            <div className="bg-green-600 text-white p-4 rounded-lg">
              ✓ Obrigado! Você foi inscrito com sucesso em nossa newsletter.
            </div>
          ) : (
            <form onSubmit={handleSubmit} className="flex flex-col sm:flex-row gap-4 max-w-md mx-auto">
              <Input
                type="email"
                placeholder="Seu melhor e-mail"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                required
                className="flex-1 bg-white text-neutral-800"
              />
              <Button type="submit" className="bg-primary-600 hover:bg-primary-700">
                Inscrever-se
              </Button>
            </form>
          )}
        </div>
      </div>
    </section>
  )
}
