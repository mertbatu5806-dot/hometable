"use client"

import Image from "next/image"
import { Card, CardContent } from "@/components/ui/card"
import { Star, Quote } from "lucide-react"

const testimonials = [
  {
    id: 1,
    name: "Sarah Chen",
    location: "Downtown Toronto",
    content: "I've been ordering from Nonna Rosa every week for the past 3 months. Her pasta is better than any Italian restaurant I've been to. It's like being invited to dinner at an Italian grandmother's house!",
    rating: 5,
    image: "/images/chef-4.jpg",
    dish: "Homemade Lasagna",
  },
  {
    id: 2,
    name: "Michael Thompson",
    location: "North York",
    content: "As a busy professional, HomeTable has been a game-changer. I get restaurant-quality homemade meals without the restaurant prices. The butter chicken from Raj is absolutely incredible.",
    rating: 5,
    image: "/images/chef-2.jpg",
    dish: "Butter Chicken",
  },
  {
    id: 3,
    name: "Emily Park",
    location: "Scarborough",
    content: "Finally, authentic Korean food that reminds me of my grandmother's cooking! Ji-Yeon's kimchi jjigae brought tears to my eyes. This platform is connecting communities through food.",
    rating: 5,
    image: "/images/chef-1.jpg",
    dish: "Kimchi Jjigae",
  },
]

export function TestimonialsSection() {
  return (
    <section id="testimonials" className="py-32 px-6 lg:px-8 bg-gradient-to-b from-background via-secondary/20 to-background overflow-hidden">
      <div className="mx-auto max-w-7xl">
        <div className="text-center mb-20">
          <span className="inline-flex items-center gap-2 px-4 py-2 bg-accent/10 rounded-full border border-accent/20 text-accent font-semibold text-sm uppercase tracking-wide">
            Testimonials
          </span>
          <h2 className="mt-6 text-4xl font-bold tracking-tight text-foreground sm:text-5xl lg:text-6xl text-balance">
            What Our Community Says
          </h2>
          <p className="mt-6 text-xl text-muted-foreground max-w-2xl mx-auto text-pretty">
            Real stories from food lovers who discovered the joy of homemade.
          </p>
        </div>
        
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {testimonials.map((testimonial, index) => (
            <Card 
              key={testimonial.id} 
              className={`group border-none shadow-lg hover:shadow-2xl transition-all duration-500 rounded-3xl overflow-hidden bg-card/80 backdrop-blur-sm hover:-translate-y-2 ${
                index === 1 ? 'lg:-translate-y-4' : ''
              }`}
            >
              <CardContent className="p-0">
                {/* Food image header */}
                <div className="relative h-48 overflow-hidden">
                  <Image
                    src={testimonial.image}
                    alt={testimonial.dish}
                    fill
                    className="object-cover transition-transform duration-700 group-hover:scale-110"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-card via-card/50 to-transparent" />
                  <div className="absolute bottom-4 left-6 right-6">
                    <span className="inline-block px-3 py-1 bg-accent/90 text-accent-foreground text-sm font-medium rounded-full">
                      Ordered: {testimonial.dish}
                    </span>
                  </div>
                </div>
                
                <div className="p-8">
                  <Quote className="h-10 w-10 text-primary/20 mb-4" />
                  
                  <div className="flex gap-1 mb-4">
                    {Array.from({ length: testimonial.rating }).map((_, i) => (
                      <Star key={i} className="h-5 w-5 fill-accent text-accent" />
                    ))}
                  </div>
                  
                  <p className="text-foreground leading-relaxed text-lg mb-8">
                    &quot;{testimonial.content}&quot;
                  </p>
                  
                  <div className="flex items-center gap-4 pt-6 border-t border-border/50">
                    <div className="w-14 h-14 rounded-full bg-gradient-to-br from-primary to-accent flex items-center justify-center text-primary-foreground font-bold text-lg shadow-lg">
                      {testimonial.name.split(' ').map(n => n[0]).join('')}
                    </div>
                    <div>
                      <p className="font-semibold text-foreground text-lg">{testimonial.name}</p>
                      <p className="text-muted-foreground">{testimonial.location}</p>
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>
        
        {/* Trust indicators */}
        <div className="mt-20 flex flex-wrap items-center justify-center gap-8 text-muted-foreground">
          <div className="flex items-center gap-2">
            <div className="flex -space-x-3">
              {[1, 2, 3, 4].map((i) => (
                <div key={i} className="w-10 h-10 rounded-full bg-gradient-to-br from-primary/80 to-accent/80 border-2 border-card flex items-center justify-center text-xs font-bold text-primary-foreground">
                  {String.fromCharCode(64 + i)}
                </div>
              ))}
            </div>
            <span className="ml-2 font-medium">Join 10,000+ happy customers</span>
          </div>
        </div>
      </div>
    </section>
  )
}
