import { ShieldCheck, CalendarClock, Package } from "lucide-react"

const trustBadges = [
  {
    icon: ShieldCheck,
    title: "Home chefs verified",
    description: "Community trusted chefs with verified reviews and ratings you can count on.",
  },
  {
    icon: CalendarClock,
    title: "Fresh weekly cooking",
    description: "Meals prepared only after preorder, ensuring maximum freshness every time.",
  },
  {
    icon: Package,
    title: "Limited small batches",
    description: "Homemade meals with limited portions, crafted with care just like family cooking.",
  },
]

export function TrustSection() {
  return (
    <section className="py-16 md:py-20 bg-muted/30">
      <div className="mx-auto max-w-6xl px-6 lg:px-8">
        {/* Section Header */}
        <div className="text-center mb-12">
          <h2 className="text-2xl font-bold text-foreground sm:text-3xl lg:text-4xl text-balance">
            Why order from HomeTable?
          </h2>
          <p className="mt-3 text-muted-foreground max-w-xl mx-auto">
            Experience the difference of truly homemade meals from passionate local chefs.
          </p>
        </div>

        {/* Trust Badges Grid */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 lg:gap-8">
          {trustBadges.map((badge, index) => (
            <div
              key={index}
              className="group flex flex-col items-center text-center p-8 bg-card rounded-3xl border border-border/50 shadow-sm hover:shadow-xl hover:-translate-y-1 transition-all duration-300"
            >
              {/* Icon Container */}
              <div className="h-16 w-16 flex items-center justify-center bg-primary/10 rounded-2xl mb-5 group-hover:bg-primary/20 group-hover:scale-110 transition-all duration-300">
                <badge.icon className="h-8 w-8 text-primary" />
              </div>

              {/* Title */}
              <h3 className="text-xl font-semibold text-foreground mb-3">
                {badge.title}
              </h3>

              {/* Description */}
              <p className="text-sm text-muted-foreground leading-relaxed">
                {badge.description}
              </p>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}
