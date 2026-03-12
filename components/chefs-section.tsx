"use client"

import Image from "next/image"
import Link from "next/link"
import { Card, CardContent } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Star, Quote, ArrowRight, BadgeCheck } from "lucide-react"

const chefs = [
  {
    id: 1,
    name: "Maria Santos",
    story: "I learned to cook from my grandmother in Lisbon. Every dish carries the love and traditions of three generations.",
    featuredDish: {
      name: "Bacalhau à Brás",
      image: "/images/featured-dish-1.jpg",
      price: 18,
    },
    rating: 4.9,
    reviews: 128,
    profileImage: "/images/chef-1.jpg",
    specialty: "Portuguese",
  },
  {
    id: 2,
    name: "Raj Patel",
    story: "My mother's kitchen in Mumbai was my culinary school. I bring those authentic spices and recipes to Toronto.",
    featuredDish: {
      name: "Butter Chicken",
      image: "/images/featured-dish-2.jpg",
      price: 16,
    },
    rating: 4.8,
    reviews: 95,
    profileImage: "/images/chef-2.jpg",
    specialty: "Indian",
  },
  {
    id: 3,
    name: "Nonna Rosa",
    story: "At 72, I still make pasta by hand every morning. My lasagna recipe has been in our family for 100 years.",
    featuredDish: {
      name: "Nonna's Lasagna",
      image: "/images/featured-dish-3.jpg",
      price: 22,
    },
    rating: 5.0,
    reviews: 203,
    profileImage: "/images/chef-3.jpg",
    specialty: "Italian",
  },
  {
    id: 4,
    name: "Ji-Yeon Kim",
    story: "I grew up watching my halmoni prepare banchan. Now I share that warmth with every bowl I serve.",
    featuredDish: {
      name: "Stone Pot Bibimbap",
      image: "/images/featured-dish-4.jpg",
      price: 17,
    },
    rating: 4.9,
    reviews: 156,
    profileImage: "/images/chef-4.jpg",
    specialty: "Korean",
  },
]

export function ChefsSection() {
  return (
    <section id="chefs" className="py-32 px-6 lg:px-8 bg-gradient-to-b from-background via-muted/30 to-background overflow-hidden">
      <div className="mx-auto max-w-7xl">
        <div className="text-center mb-20">
          <span className="inline-flex items-center gap-2 px-4 py-2 bg-primary/10 rounded-full border border-primary/20 text-primary font-semibold text-sm uppercase tracking-wide">
            Meet Our Community
          </span>
          <h2 className="mt-6 text-4xl font-bold tracking-tight text-foreground sm:text-5xl lg:text-6xl text-balance">
            Featured Home Chefs
          </h2>
          <p className="mt-6 text-xl text-muted-foreground max-w-2xl mx-auto text-pretty">
            Passionate home cooks bringing authentic flavors and heartfelt stories from their kitchens to your table.
          </p>
        </div>
        
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-10">
          {chefs.map((chef, index) => (
            <Link href={`/chef/${chef.id}`} key={chef.id} className={index % 2 === 1 ? 'lg:translate-y-8' : ''}>
              <Card 
                className="group border-none shadow-xl hover:shadow-2xl transition-all duration-700 overflow-hidden rounded-3xl bg-card hover:-translate-y-2 cursor-pointer"
              >
              <div className="flex flex-col md:flex-row h-full">
                {/* Featured Dish Image */}
                <div className="relative md:w-1/2 aspect-square md:aspect-auto overflow-hidden">
                  <Image
                    src={chef.featuredDish.image}
                    alt={chef.featuredDish.name}
                    fill
                    className="object-cover transition-transform duration-700 group-hover:scale-110"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-foreground/80 via-foreground/30 to-transparent md:bg-gradient-to-r md:from-transparent md:via-foreground/20 md:to-foreground/80" />
                  
                  {/* View Chef Overlay on Hover */}
                  <div className="absolute inset-0 bg-foreground/50 opacity-0 group-hover:opacity-100 transition-opacity duration-500 flex items-center justify-center">
                    <span className="px-5 py-2.5 bg-card text-foreground font-semibold rounded-full shadow-lg transform translate-y-3 group-hover:translate-y-0 transition-transform duration-500">
                      View Chef
                    </span>
                  </div>
                  
                  {/* Specialty Tag */}
                  <div className="absolute top-4 left-4">
                    <span className="px-3 py-1.5 bg-card/90 backdrop-blur-sm text-foreground text-sm font-semibold rounded-full shadow-lg">
                      {chef.specialty} Cuisine
                    </span>
                  </div>
                  
                  {/* Featured Dish Label - Mobile */}
                  <div className="absolute bottom-4 left-4 right-4 md:hidden">
                    <span className="text-xs font-medium text-card/80 uppercase tracking-wider">
                      Signature Dish
                    </span>
                    <p className="text-xl font-bold text-card mt-1">
                      {chef.featuredDish.name}
                    </p>
                    <p className="text-base text-card/90 font-semibold">
                      from ${chef.featuredDish.price}
                    </p>
                  </div>
                </div>
                
                {/* Chef Info */}
                <CardContent className="flex-1 p-8 flex flex-col justify-between relative">
                  {/* Background accent */}
                  <div className="absolute top-0 right-0 w-32 h-32 bg-primary/5 rounded-full -translate-y-1/2 translate-x-1/2" />
                  
                  <div className="relative">
                    {/* Profile Header */}
                    <div className="flex items-start gap-4 mb-6">
                      <div className="relative h-20 w-20 flex-shrink-0 rounded-2xl overflow-hidden ring-4 ring-primary/20 shadow-lg group-hover:ring-primary/40 transition-all">
                        <Image
                          src={chef.profileImage}
                          alt={chef.name}
                          fill
                          className="object-cover"
                        />
                      </div>
                      <div className="flex-1 min-w-0 pt-1">
                        <div className="flex items-center gap-2">
                          <h3 className="text-2xl font-bold text-foreground">
                            {chef.name}
                          </h3>
                          <span className="inline-flex items-center gap-1 px-2 py-0.5 bg-emerald-50 text-emerald-700 text-xs font-medium rounded-full">
                            <BadgeCheck className="h-3.5 w-3.5 fill-emerald-500 text-white" />
                            Verified
                          </span>
                        </div>
                        <div className="flex items-center gap-2 mt-2">
                          <div className="flex items-center gap-0.5">
                            {[...Array(5)].map((_, i) => (
                              <Star 
                                key={i} 
                                className={`h-4 w-4 ${i < Math.floor(chef.rating) ? 'fill-accent text-accent' : 'fill-muted text-muted'}`}
                              />
                            ))}
                          </div>
                          <span className="text-base font-bold text-foreground">{chef.rating}</span>
                          <span className="text-sm text-muted-foreground">({chef.reviews} reviews)</span>
                        </div>
                      </div>
                    </div>
                    
                    {/* Story */}
                    <div className="relative mb-6">
                      <Quote className="absolute -top-2 -left-2 h-8 w-8 text-primary/15" />
                      <p className="text-muted-foreground text-base leading-relaxed pl-6 italic">
                        &quot;{chef.story}&quot;
                      </p>
                    </div>
                    
                    {/* Featured Dish - Desktop */}
                    <div className="hidden md:block p-4 bg-muted/50 rounded-2xl mb-6">
                      <span className="text-xs font-semibold text-primary uppercase tracking-wider">
                        Signature Dish
                      </span>
                      <div className="flex items-center justify-between mt-2">
                        <p className="text-lg font-bold text-foreground">
                          {chef.featuredDish.name}
                        </p>
                        <span className="text-xl font-bold text-primary">
                          ${chef.featuredDish.price}
                        </span>
                      </div>
                    </div>
                  </div>
                  
                  {/* Action Button */}
                  <span 
                    className="w-full rounded-2xl h-14 text-base font-semibold transition-all duration-500 shadow-lg hover:shadow-xl group/btn inline-flex items-center justify-center bg-primary text-primary-foreground"
                  >
                    View Full Menu
                    <ArrowRight className="ml-2 h-5 w-5 transition-transform group-hover/btn:translate-x-1" />
                  </span>
                </CardContent>
              </div>
            </Card>
          </Link>
          ))}
        </div>
        
        <div className="text-center mt-16">
          <Button 
            variant="outline" 
            size="lg"
            className="rounded-2xl h-14 font-semibold px-10 border-2 hover:bg-primary hover:text-primary-foreground hover:border-primary transition-all duration-500 shadow-lg hover:shadow-xl"
          >
            Discover All 500+ Chefs
            <ArrowRight className="ml-2 h-5 w-5" />
          </Button>
        </div>
      </div>
    </section>
  )
}
