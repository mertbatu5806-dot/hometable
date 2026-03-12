import { MenuSection } from "@/components/menu-section"
import { Footer } from "@/components/footer"

export default function BrowseDishesPage() {
  return (
    <div className="min-h-screen">
      {/* Hero Banner */}
      <section className="bg-gradient-to-b from-primary/5 to-background py-16 sm:py-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h1 className="text-4xl sm:text-5xl font-bold text-foreground mb-4 text-balance">
            Browse Dishes
          </h1>
          <p className="text-lg text-muted-foreground max-w-2xl mx-auto text-pretty">
            Discover delicious homemade meals from talented home chefs in your area. 
            Fresh, authentic, and made with love.
          </p>
        </div>
      </section>
      
      {/* Menu Section */}
      <MenuSection />
      
      <Footer />
    </div>
  )
}
