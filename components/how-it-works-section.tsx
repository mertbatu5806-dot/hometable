"use client"

import { MapPin, CalendarCheck, Package, ArrowRight } from "lucide-react"
import { Card, CardContent } from "@/components/ui/card"

const steps = [
  {
    id: 1,
    title: "Discover",
    subtitle: "Find Local Chefs",
    description: "Discover home chefs in your neighborhood. Browse cuisines, read reviews, and find your next favorite meal.",
    icon: MapPin,
    gradient: "from-primary/20 to-primary/5",
    iconColor: "text-primary",
    accentColor: "bg-primary",
  },
  {
    id: 2,
    title: "Pre-order",
    subtitle: "Reserve Your Meal",
    description: "Pre-order authentic homemade dishes from the weekly menu. Secure your portion before they sell out.",
    icon: CalendarCheck,
    gradient: "from-accent/20 to-accent/5",
    iconColor: "text-accent",
    accentColor: "bg-accent",
  },
  {
    id: 3,
    title: "Enjoy",
    subtitle: "Pickup or Delivery",
    description: "Pick up your meal fresh from the chef's kitchen or schedule convenient delivery to your door.",
    icon: Package,
    gradient: "from-primary/20 to-primary/5",
    iconColor: "text-primary",
    accentColor: "bg-primary",
  },
]

export function HowItWorksSection() {
  return (
    <section id="how-it-works" className="py-32 px-6 lg:px-8 bg-gradient-to-b from-background to-card/50 overflow-hidden">
      <div className="mx-auto max-w-7xl">
        <div className="text-center mb-20">
          <span className="inline-flex items-center gap-2 px-4 py-2 bg-primary/10 rounded-full border border-primary/20 text-primary font-semibold text-sm uppercase tracking-wide">
            Simple Process
          </span>
          <h2 className="mt-6 text-4xl font-bold tracking-tight text-foreground sm:text-5xl lg:text-6xl text-balance">
            How It Works
          </h2>
          <p className="mt-6 text-xl text-muted-foreground max-w-2xl mx-auto text-pretty">
            Getting homemade food from local chefs is as easy as 1-2-3.
          </p>
        </div>
        
        <div className="relative">
          {/* Connector line for desktop */}
          <div className="hidden lg:block absolute top-1/2 left-[15%] right-[15%] h-1 bg-gradient-to-r from-primary/30 via-accent/30 to-primary/30 -translate-y-1/2 rounded-full" />
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-10 lg:gap-8">
            {steps.map((step, index) => (
              <Card 
                key={step.id} 
                className={`relative group border-none bg-card shadow-xl hover:shadow-2xl transition-all duration-700 hover:-translate-y-3 overflow-hidden rounded-3xl ${
                  index === 1 ? 'md:-translate-y-4' : ''
                }`}
              >
                {/* Background gradient */}
                <div className={`absolute inset-0 bg-gradient-to-br ${step.gradient} opacity-50`} />
                
                {/* Step number badge */}
                <div className={`absolute top-6 right-6 w-12 h-12 rounded-2xl ${step.accentColor}/10 flex items-center justify-center border border-border/50`}>
                  <span className={`text-xl font-bold ${step.iconColor}`}>
                    {step.id}
                  </span>
                </div>
                
                <CardContent className="relative p-10">
                  {/* Icon */}
                  <div className={`w-20 h-20 rounded-3xl bg-gradient-to-br ${step.gradient} flex items-center justify-center mb-8 group-hover:scale-110 transition-transform duration-500 shadow-lg`}>
                    <step.icon className={`w-10 h-10 ${step.iconColor}`} />
                  </div>
                  
                  {/* Content */}
                  <div className="space-y-4">
                    <div>
                      <h3 className="text-3xl font-bold text-foreground">
                        {step.title}
                      </h3>
                      <p className={`text-base font-semibold ${step.iconColor} mt-1`}>
                        {step.subtitle}
                      </p>
                    </div>
                    <p className="text-muted-foreground text-lg leading-relaxed">
                      {step.description}
                    </p>
                  </div>
                  
                  {/* Bottom accent bar */}
                  <div className={`absolute bottom-0 left-0 right-0 h-1.5 ${step.accentColor} opacity-0 group-hover:opacity-100 transition-opacity duration-500`} />
                </CardContent>
                
                {/* Arrow connector for desktop */}
                {index < steps.length - 1 && (
                  <div className="hidden lg:flex absolute top-1/2 -right-5 w-10 h-10 bg-card rounded-full shadow-lg items-center justify-center z-10 -translate-y-1/2">
                    <ArrowRight className="w-5 h-5 text-muted-foreground" />
                  </div>
                )}
              </Card>
            ))}
          </div>
        </div>
        
        {/* Bottom CTA hint */}
        <div className="mt-16 text-center">
          <div className="inline-flex items-center gap-2 px-6 py-4 bg-muted/50 rounded-2xl">
            <span className="text-lg text-muted-foreground">Ready to taste the difference?</span>
            <a href="#menu" className="inline-flex items-center gap-1 text-primary font-bold hover:underline underline-offset-4 text-lg group">
              Browse this week&apos;s menu
              <ArrowRight className="w-5 h-5 transition-transform group-hover:translate-x-1" />
            </a>
          </div>
        </div>
      </div>
    </section>
  )
}
