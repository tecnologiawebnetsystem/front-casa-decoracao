"use client"

import { useState } from "react"
import Link from "next/link"
import { ArrowRight, Sparkles } from "lucide-react"
import { mockCategories } from "@/lib/mock-data"

export default function ImmersiveCategories() {
  const [hoveredCategory, setHoveredCategory] = useState<string | null>(null)

  return (
    <section className="py-24 bg-gradient-to-br from-neutral-50 via-primary-50/30 to-secondary-50/30 relative overflow-hidden">
      {/* Background Pattern */}
      <div className="absolute inset-0 opacity-5">
        <div
          className="absolute inset-0"
          style={{
            backgroundImage: `url("data:image/svg+xml,%3Csvg width='60' height='60' viewBox='0 0 60 60' xmlns='http://www.w3.org/2000/svg'%3E%3Cg fill='none' fillRule='evenodd'%3E%3Cg fill='%23000000' fillOpacity='0.1'%3E%3Ccircle cx='30' cy='30' r='2'/%3E%3C/g%3E%3C/g%3E%3C/svg%3E")`,
          }}
        />
      </div>

      <div className="container mx-auto px-4 relative z-10">
        {/* Section Header */}
        <div className="text-center mb-16 animate-slide-up">
          <div className="flex items-center justify-center gap-2 mb-4">
            <Sparkles className="h-6 w-6 text-primary-600 animate-spin" />
            <span className="text-primary-600 font-medium tracking-wider uppercase text-sm">
              Explore Nossos Universos
            </span>
          </div>
          <h2 className="text-4xl lg:text-6xl font-bold text-neutral-800 mb-6">
            Categorias que
            <span className="block bg-gradient-to-r from-primary-600 via-accent-purple to-secondary-600 bg-clip-text text-transparent">
              Inspiram Sonhos
            </span>
          </h2>
          <p className="text-xl text-neutral-600 max-w-2xl mx-auto">
            Cada categoria é uma jornada única para transformar sua casa em um lar extraordinário
          </p>
        </div>

        {/* Categories Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {mockCategories.map((category, index) => (
            <div
              key={category.id}
              className="group relative animate-scale-in"
              style={{ animationDelay: `${index * 0.2}s` }}
              onMouseEnter={() => setHoveredCategory(category.id)}
              onMouseLeave={() => setHoveredCategory(null)}
            >
              <Link href={`/categoria/${category.slug}`}>
                <div className="relative overflow-hidden rounded-3xl h-96 transform group-hover:scale-105 transition-all duration-700">
                  {/* Background Image */}
                  <img
                    src={category.image || "/placeholder.svg"}
                    alt={category.name}
                    className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
                  />

                  {/* Gradient Overlay */}
                  <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent group-hover:from-black/60 transition-all duration-500" />

                  {/* Glow Effect */}
                  <div className="absolute inset-0 bg-gradient-to-r from-primary-600/20 to-secondary-600/20 opacity-0 group-hover:opacity-100 transition-opacity duration-500" />

                  {/* Content */}
                  <div className="absolute bottom-0 left-0 right-0 p-8 text-white transform translate-y-4 group-hover:translate-y-0 transition-transform duration-500">
                    <div className="flex items-center gap-2 mb-3">
                      <div className="w-2 h-2 bg-primary-400 rounded-full animate-pulse" />
                      <span className="text-primary-300 text-sm font-medium tracking-wider uppercase">
                        {category.name}
                      </span>
                    </div>

                    <h3 className="text-2xl lg:text-3xl font-bold mb-3 group-hover:text-primary-300 transition-colors duration-300">
                      {category.name}
                    </h3>

                    <p className="text-neutral-200 mb-4 opacity-0 group-hover:opacity-100 transition-all duration-500 delay-100">
                      {category.description}
                    </p>

                    <div className="flex items-center gap-2 text-primary-300 font-medium opacity-0 group-hover:opacity-100 transition-all duration-500 delay-200">
                      <span>Explorar Coleção</span>
                      <ArrowRight className="h-4 w-4 transform group-hover:translate-x-2 transition-transform duration-300" />
                    </div>
                  </div>

                  {/* Floating Icon */}
                  <div className="absolute top-6 right-6 w-12 h-12 bg-white/20 backdrop-blur-sm rounded-2xl flex items-center justify-center opacity-0 group-hover:opacity-100 transition-all duration-500 transform scale-75 group-hover:scale-100">
                    <span className="text-white font-bold text-lg">{category.name.charAt(0)}</span>
                  </div>

                  {/* Shimmer Effect */}
                  {hoveredCategory === category.id && (
                    <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/20 to-transparent transform -skew-x-12 animate-shimmer" />
                  )}
                </div>
              </Link>

              {/* Subcategories Preview */}
              {hoveredCategory === category.id && category.subcategories && (
                <div className="absolute top-full left-0 right-0 mt-4 bg-white/95 backdrop-blur-xl rounded-2xl shadow-2xl border border-white/20 p-6 animate-slide-down z-20">
                  <h4 className="font-bold text-neutral-800 mb-4">Subcategorias</h4>
                  <div className="grid grid-cols-1 gap-3">
                    {category.subcategories.slice(0, 3).map((sub) => (
                      <Link
                        key={sub.id}
                        href={`/categoria/${sub.slug}`}
                        className="flex items-center gap-3 p-3 hover:bg-primary-50 rounded-xl transition-all duration-300 group"
                      >
                        <div className="w-8 h-8 bg-gradient-to-r from-primary-100 to-secondary-100 rounded-lg flex items-center justify-center group-hover:from-primary-200 group-hover:to-secondary-200 transition-all duration-300">
                          <span className="text-primary-600 font-bold text-xs">{sub.name.charAt(0)}</span>
                        </div>
                        <div>
                          <h5 className="font-medium text-neutral-800 group-hover:text-primary-600 transition-colors">
                            {sub.name}
                          </h5>
                          <p className="text-xs text-neutral-500">{sub.description}</p>
                        </div>
                      </Link>
                    ))}
                  </div>
                </div>
              )}
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}
