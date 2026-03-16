import Navbar from '@/components/Navbar'
import Hero from '@/components/Hero'
import ValueProps from '@/components/ValueProps'
import ProductGrid from '@/components/ProductGrid'
import B2BSection from '@/components/B2BSection'
import HORECASection from '@/components/HORECASection'
import ContactForm from '@/components/ContactForm'
import Footer from '@/components/Footer'

export default function Home() {
  return (
    <>
      <Navbar />
      <main className="pt-20"> {/* pt compensa el navbar fijo */}
        <Hero />
        <ValueProps />
        <ProductGrid />
        <B2BSection />
        <HORECASection />
        <ContactForm />
      </main>
      <Footer />
    </>
  )
}
