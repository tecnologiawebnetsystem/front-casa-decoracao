import Header from "@/components/header"
import Hero from "@/components/hero"
import Categories from "@/components/categories"
import FeaturedProducts from "@/components/featured-products"
import Promotions from "@/components/promotions"
import Newsletter from "@/components/newsletter"
import Footer from "@/components/footer"
import Chatbot from "@/components/chatbot"

export default function Home() {
  return (
    <div className="min-h-screen bg-white">
      <Header />
      <main>
        <Hero />
        <Categories />
        <FeaturedProducts />
        <Promotions />
        <Newsletter />
      </main>
      <Footer />
      <Chatbot />
    </div>
  )
}
