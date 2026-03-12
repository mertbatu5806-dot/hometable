import { HeroSection } from "@/components/hero-section"
import { CategoryNav } from "@/components/category-nav"
import { TrustSection } from "@/components/trust-section"
import { WeeklyDropSection } from "@/components/weekly-drop-section"
import { TrendingDishesSection } from "@/components/trending-dishes-section"
import { ChefsSection } from "@/components/chefs-section"
import { MenuSection } from "@/components/menu-section"
import { HowItWorksSection } from "@/components/how-it-works-section"
import { TestimonialsSection } from "@/components/testimonials-section"
import { CTASection } from "@/components/cta-section"
import { Footer } from "@/components/footer"

export default function HomePage() {
  return (
    <div className="min-h-screen">
      <HeroSection />
      <CategoryNav />
      <TrustSection />
      <WeeklyDropSection />
      <TrendingDishesSection />
      <ChefsSection />
      <MenuSection />
      <HowItWorksSection />
      <TestimonialsSection />
      <CTASection />
      <Footer />
    </div>
  )
}
