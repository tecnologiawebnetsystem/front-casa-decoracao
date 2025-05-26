import Link from "next/link"
import { Facebook, Instagram, Twitter, Youtube, Mail, Phone, MapPin } from "lucide-react"

export default function Footer() {
  return (
    <footer className="bg-neutral-800 text-white">
      <div className="container mx-auto px-4 py-12">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          {/* Company Info */}
          <div>
            <div className="bg-gradient-to-r from-primary-600 to-secondary-600 text-white px-4 py-2 rounded-lg font-bold text-xl mb-4 inline-block">
              Casa Decoração
            </div>
            <p className="text-neutral-300 mb-4">Transformando casas em lares com móveis e decoração de qualidade.</p>
            <div className="flex space-x-4">
              <Facebook className="h-5 w-5 text-neutral-400 hover:text-white cursor-pointer" />
              <Instagram className="h-5 w-5 text-neutral-400 hover:text-white cursor-pointer" />
              <Twitter className="h-5 w-5 text-neutral-400 hover:text-white cursor-pointer" />
              <Youtube className="h-5 w-5 text-neutral-400 hover:text-white cursor-pointer" />
            </div>
          </div>

          {/* Quick Links */}
          <div>
            <h3 className="font-semibold mb-4">Links Rápidos</h3>
            <ul className="space-y-2">
              <li>
                <Link href="/sobre" className="text-neutral-300 hover:text-white">
                  Sobre Nós
                </Link>
              </li>
              <li>
                <Link href="/contato" className="text-neutral-300 hover:text-white">
                  Contato
                </Link>
              </li>
              <li>
                <Link href="/carreiras" className="text-neutral-300 hover:text-white">
                  Carreiras
                </Link>
              </li>
              <li>
                <Link href="/blog" className="text-neutral-300 hover:text-white">
                  Blog
                </Link>
              </li>
            </ul>
          </div>

          {/* Customer Service */}
          <div>
            <h3 className="font-semibold mb-4">Atendimento</h3>
            <ul className="space-y-2">
              <li>
                <Link href="/faq" className="text-neutral-300 hover:text-white">
                  FAQ
                </Link>
              </li>
              <li>
                <Link href="/trocas-devolucoes" className="text-neutral-300 hover:text-white">
                  Trocas e Devoluções
                </Link>
              </li>
              <li>
                <Link href="/entrega" className="text-neutral-300 hover:text-white">
                  Entrega
                </Link>
              </li>
              <li>
                <Link href="/garantia" className="text-neutral-300 hover:text-white">
                  Garantia
                </Link>
              </li>
            </ul>
          </div>

          {/* Contact */}
          <div>
            <h3 className="font-semibold mb-4">Contato</h3>
            <div className="space-y-3">
              <div className="flex items-center gap-2">
                <Phone className="h-4 w-4" />
                <span className="text-neutral-300">(11) 3000-0000</span>
              </div>
              <div className="flex items-center gap-2">
                <Mail className="h-4 w-4" />
                <span className="text-neutral-300">contato@casadecoração.com</span>
              </div>
              <div className="flex items-center gap-2">
                <MapPin className="h-4 w-4" />
                <span className="text-neutral-300">São Paulo, SP</span>
              </div>
            </div>
          </div>
        </div>

        <div className="border-t border-neutral-700 mt-8 pt-8 text-center text-neutral-400">
          <p>&copy; 2024 Casa Decoração. Todos os direitos reservados.</p>
        </div>
      </div>
    </footer>
  )
}
