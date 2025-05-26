import Link from "next/link"
import { Button } from "@/components/ui/button"

export default function Promotions() {
  return (
    <section className="py-16 bg-gradient-to-r from-primary-50 to-secondary-50">
      <div className="container mx-auto px-4">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
          {/* Promotion 1 */}
          <div className="relative bg-gradient-to-r from-primary-600 to-primary-700 rounded-lg overflow-hidden text-white">
            <div className="p-8">
              <h3 className="text-2xl font-bold mb-4">Até 50% OFF em Móveis</h3>
              <p className="mb-6 text-primary-100">
                Renove sua casa com nossa seleção especial de móveis com descontos imperdíveis.
              </p>
              <Link href="/ofertas/moveis">
                <Button className="bg-white text-primary-600 hover:bg-neutral-100">Ver Ofertas</Button>
              </Link>
            </div>
            <img
              src="/images/promotion-furniture-sale.png"
              alt="Promoção móveis"
              className="absolute right-0 bottom-0 w-32 h-32 object-cover opacity-20"
            />
          </div>

          {/* Promotion 2 */}
          <div className="relative bg-gradient-to-r from-secondary-600 to-secondary-700 rounded-lg overflow-hidden text-white">
            <div className="p-8">
              <h3 className="text-2xl font-bold mb-4">Frete Grátis</h3>
              <p className="mb-6 text-secondary-100">Em compras acima de R$ 299 para todo o Brasil. Aproveite!</p>
              <Link href="/produtos">
                <Button className="bg-white text-secondary-600 hover:bg-neutral-100">Comprar Agora</Button>
              </Link>
            </div>
            <img
              src="/images/free-shipping-banner.png"
              alt="Frete grátis"
              className="absolute right-0 bottom-0 w-32 h-32 object-cover opacity-20"
            />
          </div>
        </div>
      </div>
    </section>
  )
}
