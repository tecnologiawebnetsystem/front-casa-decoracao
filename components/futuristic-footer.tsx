import type React from "react"

const FuturisticFooter: React.FC = () => {
  return (
    <footer className="bg-gray-900 text-white py-12">
      <div className="container mx-auto px-4">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          {/* Logo and Company Info */}
          <div>
            <div className="space-y-6">
              <div className="relative group">
                <img
                  src="/images/logo-ms-decor-main.png"
                  alt="MS Decor - Decoração Inteligente"
                  className="h-16 w-auto group-hover:scale-105 transition-all duration-300"
                />
              </div>

              <p className="text-neutral-300 leading-relaxed">
                Transformando casas em lares extraordinários há mais de uma década. Cada peça é cuidadosamente
                selecionada para criar ambientes únicos e inspiradores.
              </p>
            </div>

            {/* Quick Links */}
          </div>

          {/* Quick Links */}
          <div>
            <h4 className="text-lg font-semibold mb-4">Quick Links</h4>
            <ul className="text-gray-400">
              <li className="mb-2">
                <a href="#" className="hover:text-white">
                  Home
                </a>
              </li>
              <li className="mb-2">
                <a href="#" className="hover:text-white">
                  About Us
                </a>
              </li>
              <li className="mb-2">
                <a href="#" className="hover:text-white">
                  Services
                </a>
              </li>
              <li className="mb-2">
                <a href="#" className="hover:text-white">
                  Contact
                </a>
              </li>
            </ul>
          </div>

          {/* Services */}
          <div>
            <h4 className="text-lg font-semibold mb-4">Services</h4>
            <ul className="text-gray-400">
              <li className="mb-2">
                <a href="#" className="hover:text-white">
                  Interior Design
                </a>
              </li>
              <li className="mb-2">
                <a href="#" className="hover:text-white">
                  Space Planning
                </a>
              </li>
              <li className="mb-2">
                <a href="#" className="hover:text-white">
                  Furniture Selection
                </a>
              </li>
              <li className="mb-2">
                <a href="#" className="hover:text-white">
                  Renovation
                </a>
              </li>
            </ul>
          </div>

          {/* Contact Information */}
          <div>
            <h4 className="text-lg font-semibold mb-4">Contact</h4>
            <p className="text-gray-400 mb-2">Address: 123 Main Street, Cityville</p>
            <p className="text-gray-400 mb-2">Email: info@msdecor.com</p>
            <p className="text-gray-400 mb-2">Phone: (123) 456-7890</p>
          </div>
        </div>

        {/* Copyright */}
        <div className="mt-8 text-center text-gray-500">
          <p>&copy; {new Date().getFullYear()} MS Decor. All rights reserved.</p>
        </div>
      </div>
    </footer>
  )
}

export default FuturisticFooter
