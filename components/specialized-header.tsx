import Link from "next/link"

const SpecializedHeader = () => {
  return (
    <header className="bg-white shadow">
      <div className="max-w-7xl mx-auto py-6 px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center">
          {/* Logo Especializado */}
          <Link href="/" className="group flex items-center">
            <div className="relative transform group-hover:scale-105 transition-all duration-300">
              <img
                src="/images/logo-ms-decor-compact.png"
                alt="MS Decor - Decoração Inteligente"
                className="h-10 w-auto"
              />
            </div>
          </Link>
          <div>{/* Add any other header elements here, like navigation or user info */}</div>
        </div>
      </div>
    </header>
  )
}

export default SpecializedHeader
