"use client"

import { useState, useEffect } from "react"
import Link from "next/link"
import { Button } from "@/components/ui/button"
import { Play, ArrowRight, Sparkles, Star, Zap } from "lucide-react"

export default function RevolutionaryHero() {
  const [currentSlide, setCurrentSlide] = useState(0)
  const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 })

  const slides = [
    {
      title: "Transforme sua casa em um",
      highlight: "Santuário de Elegância",
      subtitle: "Móveis e decoração que contam histórias únicas",
      image: "/images/hero-living-room.png",
      color: "from-primary-600 to-secondary-600",
    },
    {
      title: "Desperte o designer",
      highlight: "Que existe em você",
      subtitle: "Peças exclusivas para ambientes extraordinários",
      image: "/images/category-moveis.png",
      color: "from-accent-purple to-accent-pink",
    },
    {
      title: "Crie memórias em",
      highlight: "Espaços Inspiradores",
      subtitle: "Cada detalhe pensado para sua felicidade",
      image: "/images/category-decoracao.png",
      color: "from-secondary-600 to-accent-cyan",
    },
  ]

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentSlide((prev) => (prev + 1) % slides.length)
    }, 5000)
    return () => clearInterval(interval)
  }, [slides.length])

  useEffect(() => {
    const handleMouseMove = (e: MouseEvent) => {
      setMousePosition({ x: e.clientX, y: e.clientY })
    }
    window.addEventListener("mousemove", handleMouseMove)
    return () => window.removeEventListener("mousemove", handleMouseMove)
  }, [])

  return (
    <section className="relative min-h-screen overflow-hidden">
      {/* Animated Background */}
      <div className="absolute inset-0">
        <div
          className={`absolute inset-0 bg-gradient-to-br ${slides[currentSlide].color} animate-gradient bg-[length:400%_400%]`}
        />
        <div className="absolute inset-0 bg-black/20" />

        {/* Floating Particles */}
        <div className="absolute inset-0">
          {[...Array(20)].map((_, i) => (
            <div
              key={i}
              className="absolute w-2 h-2 bg-white/30 rounded-full animate-float"
              style={{
                left: `${Math.random() * 100}%`,
                top: `${Math.random() * 100}%`,
                animationDelay: `${Math.random() * 6}s`,
                animationDuration: `${6 + Math.random() * 4}s`,
              }}
            />
          ))}
        </div>

        {/* Mouse Follower Effect */}
        <div
          className="absolute w-96 h-96 bg-white/10 rounded-full blur-3xl pointer-events-none transition-all duration-1000"
          style={{
            left: mousePosition.x - 192,
            top: mousePosition.y - 192,
          }}
        />
      </div>

      {/* Content */}
      <div className="relative z-10 container mx-auto px-4 py-20">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center min-h-[80vh]">
          {/* Text Content */}
          <div className="text-white animate-slide-up">
            <div className="flex items-center gap-2 mb-6">
              <Sparkles className="h-6 w-6 text-yellow-300 animate-spin" />
              <span className="text-yellow-300 font-medium tracking-wider uppercase text-sm">Exclusivo Online</span>
            </div>

            <h1 className="text-5xl lg:text-7xl font-bold mb-6 leading-tight">
              {slides[currentSlide].title}
              <span className="block bg-gradient-to-r from-yellow-300 via-pink-300 to-cyan-300 bg-clip-text text-transparent animate-gradient bg-[length:400%_400%]">
                {slides[currentSlide].highlight}
              </span>
            </h1>

            <p className="text-xl lg:text-2xl mb-8 text-blue-100 leading-relaxed">{slides[currentSlide].subtitle}</p>

            {/* Action Buttons */}
            <div className="flex flex-col sm:flex-row gap-6 mb-12">
              <Link href="/produtos">
                <Button
                  size="lg"
                  className="group bg-white text-primary-600 hover:bg-yellow-300 hover:text-primary-800 px-8 py-4 text-lg font-semibold rounded-2xl transform hover:scale-105 transition-all duration-300 shadow-2xl"
                >
                  <span className="flex items-center gap-3">
                    Explorar Coleção
                    <ArrowRight className="h-5 w-5 group-hover:translate-x-1 transition-transform" />
                  </span>
                </Button>
              </Link>

              <Button
                size="lg"
                variant="outline"
                className="group border-2 border-white text-white hover:bg-white hover:text-primary-600 px-8 py-4 text-lg font-semibold rounded-2xl transform hover:scale-105 transition-all duration-300 backdrop-blur-sm"
              >
                <span className="flex items-center gap-3">
                  <Play className="h-5 w-5 group-hover:scale-110 transition-transform" />
                  Ver Showroom Virtual
                </span>
              </Button>
            </div>

            {/* Stats */}
            <div className="grid grid-cols-3 gap-6">
              <div className="text-center">
                <div className="text-3xl font-bold text-yellow-300 mb-1">10K+</div>
                <div className="text-sm text-blue-200">Clientes Felizes</div>
              </div>
              <div className="text-center">
                <div className="text-3xl font-bold text-pink-300 mb-1">500+</div>
                <div className="text-sm text-blue-200">Produtos Únicos</div>
              </div>
              <div className="text-center">
                <div className="text-3xl font-bold text-cyan-300 mb-1">98%</div>
                <div className="text-sm text-blue-200">Satisfação</div>
              </div>
            </div>
          </div>

          {/* Image Content */}
          <div className="relative animate-scale-in">
            <div className="relative group">
              {/* Glow Effect */}
              <div className="absolute inset-0 bg-gradient-to-r from-yellow-400/50 to-pink-400/50 rounded-3xl blur-2xl group-hover:blur-3xl transition-all duration-500 animate-pulse-slow" />

              {/* Main Image */}
              <div className="relative bg-white/10 backdrop-blur-sm rounded-3xl p-6 transform group-hover:scale-105 transition-all duration-500">
                <img
                  src={slides[currentSlide].image || "/placeholder.svg"}
                  alt="Ambiente decorado"
                  className="w-full h-96 object-cover rounded-2xl shadow-2xl"
                />

                {/* Floating Elements */}
                <div className="absolute -top-4 -right-4 bg-gradient-to-r from-yellow-400 to-orange-400 text-white p-3 rounded-2xl shadow-xl animate-bounce-slow">
                  <Star className="h-6 w-6" />
                </div>

                <div className="absolute -bottom-4 -left-4 bg-gradient-to-r from-pink-400 to-purple-400 text-white p-3 rounded-2xl shadow-xl animate-float">
                  <Zap className="h-6 w-6" />
                </div>
              </div>
            </div>

            {/* Slide Indicators */}
            <div className="flex justify-center gap-3 mt-8">
              {slides.map((_, index) => (
                <button
                  key={index}
                  onClick={() => setCurrentSlide(index)}
                  className={`w-3 h-3 rounded-full transition-all duration-300 ${
                    index === currentSlide ? "bg-white scale-125" : "bg-white/50 hover:bg-white/75"
                  }`}
                />
              ))}
            </div>
          </div>
        </div>
      </div>

      {/* Scroll Indicator */}
      <div className="absolute bottom-8 left-1/2 transform -translate-x-1/2 text-white animate-bounce">
        <div className="flex flex-col items-center gap-2">
          <span className="text-sm">Descubra mais</span>
          <div className="w-6 h-10 border-2 border-white rounded-full flex justify-center">
            <div className="w-1 h-3 bg-white rounded-full mt-2 animate-pulse" />
          </div>
        </div>
      </div>
    </section>
  )
}
