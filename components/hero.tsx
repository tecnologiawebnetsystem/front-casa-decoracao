import Link from "next/link"
import { Button } from "@/components/ui/button"

export default function Hero() {
  return (
    <section className="relative bg-gradient-to-r from-primary-600 to-secondary-600 text-white">
      <div className="container mx-auto px-4 py-20">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
          <div>
            <h1 className="text-4xl lg:text-6xl font-bold mb-6">Transforme sua casa em um lar</h1>
            <p className="text-xl mb-8 text-blue-100">
              Móveis e decoração de qualidade com os melhores preços. Frete grátis para todo o Brasil acima de R$ 299.
            </p>
            <div className="flex flex-col sm:flex-row gap-4">
              <Link href="/produtos">
                <Button size="lg" className="bg-white text-primary-600 hover:bg-neutral-100">
                  Ver Produtos
                </Button>
              </Link>
              <Link href="/ofertas">
                <Button
                  size="lg"
                  variant="outline"
                  className="border-white text-white hover:bg-white hover:text-primary-600"
                >
                  Ofertas Especiais
                </Button>
              </Link>
            </div>
          </div>
          <div className="relative">
            <img src="/images/hero-living-room.png" alt="Móveis modernos para sala" className="rounded-lg shadow-2xl" />
          </div>
        </div>
      </div>
    </section>
  )
}
