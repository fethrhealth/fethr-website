import { HeroSection } from '@/components/composite/hero'
import ProductTabs from '@/components/composite/product-tabs'
import Footer from '@/components/composite/footer'

export default function HomePage() {
  return (
    <>
      <HeroSection />
      <ProductTabs />
      <Footer />
    </>
  )
}