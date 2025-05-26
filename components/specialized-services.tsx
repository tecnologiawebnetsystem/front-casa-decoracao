"use client"

import Link from "next/link"
import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import { Ruler, Scissors, Palette, Clock, Shield, Star, ArrowRight, CheckCircle } from "lucide-react"

export default function SpecializedServices() {
  const services = [
    {
      icon: Ruler,
      title: "Medição Gratuita",
      description: "Nossos especialistas vão até sua casa para medir com precisão",
      features: ["Agendamento flexível", "Técnicos especializados", "Orçamento na hora"],
      color: "from-green-500 to-emerald-600",
      bgColor: "bg-green-50",
      textColor: "text-green-700",
    },
    {
      icon: Scissors,
      title: "Instalação Profissional",
      description: "Instalação perfeita por profissionais certificados",
      features: ["Garantia de 2 anos", "Limpeza incluída", "Acabamento perfeito"],
      color: "from-primary-500 to-primary-600",
      bgColor: "bg-primary-50",
      textColor: "text-primary-700",
    },
    {
      icon: Palette,
      title: "Consultoria de Decoração",
      description: "Consultores especializados para criar o ambiente dos seus sonhos",
      features: ["Projeto 3D", "Paleta de cores", "Lista de compras"],
      color: "from-purple-500 to-pink-600",
      bgColor: "bg-purple-50",
      textColor: "text-purple-700",
    },
  ]

  const benefits = [
    {
      icon: Clock,
      title: "Entrega Rápida",
      description: "Cortinas sob medida em até 48h",
    },
    {
      icon: Shield,
      title: "Garantia Total",
      description: "2 anos de garantia em todos os serviços",
    },
    {
      icon: Star,
      title: "Qualidade Premium",
      description: "Materiais selecionados e acabamento perfeito",
    },
  ]

  return (
    <section className="py-24 bg-gradient-to-br from-neutral-50 via-primary-50/30 to-secondary-50/30">
      <div className="container mx-auto px-4">
        {/* Header */}
        <div className="text-center mb-16 animate-slide-up">
          <div className="flex items-center justify-center gap-2 mb-4">
            <Palette className="h-6 w-6 text-primary-600 animate-spin" />
            <span className="text-primary-600 font-medium tracking-wider uppercase text-sm">
              Serviços Especializados
            </span>
          </div>
          <h2 className="text-4xl lg:text-6xl font-bold text-neutral-800 mb-6">
            Do projeto à
            <span className="block bg-gradient-to-r from-primary-600 via-accent-purple to-secondary-600 bg-clip-text text-transparent">
              Instalação Perfeita
            </span>
          </h2>
          <p className="text-xl text-neutral-600 max-w-3xl mx-auto">
            Oferecemos um serviço completo: desde a consultoria personalizada até a instalação profissional, tudo
            pensado para transformar sua casa
          </p>
        </div>

        {/* Main Services */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 mb-16">
          {services.map((service, index) => (
            <Card
              key={index}
              className="group relative overflow-hidden border-0 shadow-lg hover:shadow-2xl transition-all duration-500 transform hover:scale-105"
            >
              <div
                className={`absolute inset-0 bg-gradient-to-br ${service.color} opacity-5 group-hover:opacity-10 transition-opacity duration-500`}
              />

              <CardContent className="p-8 relative z-10">
                <div
                  className={`w-16 h-16 ${service.bgColor} rounded-2xl flex items-center justify-center mb-6 group-hover:scale-110 transition-transform duration-300`}
                >
                  <service.icon className={`h-8 w-8 ${service.textColor}`} />
                </div>

                <h3 className="text-2xl font-bold text-neutral-800 mb-4 group-hover:text-primary-600 transition-colors">
                  {service.title}
                </h3>

                <p className="text-neutral-600 mb-6 leading-relaxed">{service.description}</p>

                <div className="space-y-3 mb-8">
                  {service.features.map((feature, idx) => (
                    <div key={idx} className="flex items-center gap-3">
                      <CheckCircle className="h-5 w-5 text-green-500" />
                      <span className="text-neutral-700">{feature}</span>
                    </div>
                  ))}
                </div>

                <Button
                  className={`w-full bg-gradient-to-r ${service.color} hover:shadow-lg transform hover:scale-105 transition-all duration-300`}
                >
                  Solicitar Serviço
                  <ArrowRight className="h-4 w-4 ml-2" />
                </Button>
              </CardContent>
            </Card>
          ))}
        </div>

        {/* Benefits */}
        <div className="bg-white/80 backdrop-blur-sm rounded-3xl p-8 shadow-xl">
          <h3 className="text-2xl font-bold text-center text-neutral-800 mb-8">Por que escolher nossos serviços?</h3>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {benefits.map((benefit, index) => (
              <div key={index} className="text-center group">
                <div className="w-16 h-16 bg-gradient-to-r from-primary-100 to-secondary-100 rounded-2xl flex items-center justify-center mx-auto mb-4 group-hover:scale-110 transition-transform duration-300">
                  <benefit.icon className="h-8 w-8 text-primary-600" />
                </div>
                <h4 className="font-bold text-neutral-800 mb-2">{benefit.title}</h4>
                <p className="text-neutral-600">{benefit.description}</p>
              </div>
            ))}
          </div>
        </div>

        {/* CTA */}
        <div className="text-center mt-16">
          <div className="bg-gradient-to-r from-primary-600 to-secondary-600 rounded-3xl p-8 text-white">
            <h3 className="text-3xl font-bold mb-4">Pronto para transformar sua casa?</h3>
            <p className="text-xl mb-8 text-blue-100">
              Agende uma consultoria gratuita e descubra como podemos ajudar você
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Link href="/consultoria">
                <Button size="lg" className="bg-white text-primary-600 hover:bg-neutral-100 px-8 py-4">
                  Agendar Consultoria Grátis
                </Button>
              </Link>
              <Link href="/medicao">
                <Button
                  size="lg"
                  variant="outline"
                  className="border-white text-white hover:bg-white hover:text-primary-600 px-8 py-4"
                >
                  Solicitar Medição
                </Button>
              </Link>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}
