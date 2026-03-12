"use client"

import { useState, useEffect } from "react"
import Image from "next/image"
import Link from "next/link"
import { Card } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { ShoppingBag, Flame, Calendar, Clock, Sparkles } from "lucide-react"

const weeklyDropDishes = [
  {
    id: 1,
    name: "Lamb Shank Tagine",
    chef: "Fatima El-Amin",
    chefAvatar: "/images/chef-1.jpg",
    price: 26.99,
    image: "/images/dish-1.jpg",
    remaining: 6,
    pickupDay: "Saturday",
  },
  {
    id: 2,
    name: "Handmade Pierogi",
    chef: "Anna Kowalski",
    chefAvatar: "/images/chef-2.jpg",
    price: 18.99,
    image: "/images/dish-2.jpg",
    remaining: 12,
    pickupDay: "Sunday",
  },
  {
    id: 3,
    name: "Jollof Rice Platter",
    chef: "Amara Okonkwo",
    chefAvatar: "/images/chef-3.jpg",
    price: 19.99,
    image: "/images/dish-3.jpg",
    remaining: 4,
    pickupDay: "Saturday",
  },
  {
    id: 4,
    name: "Vietnamese Pho",
    chef: "Mai Nguyen",
    chefAvatar: "/images/chef-4.jpg",
    price: 16.99,
    image: "/images/dish-4.jpg",
    remaining: 8,
    pickupDay: "Sunday",
  },
  {
    id: 5,
    name: "Empanadas Trio",
    chef: "Sofia Martinez",
    chefAvatar: "/images/chef-5.jpg",
    price: 14.99,
    image: "/images/dish-5.jpg",
    remaining: 10,
    pickupDay: "Saturday",
  },
  {
    id: 6,
    name: "Chicken Tikka Masala",
    chef: "Priya Sharma",
    chefAvatar: "/images/chef-6.jpg",
    price: 21.99,
    image: "/images/dish-6.jpg",
    remaining: 3,
    pickupDay: "Sunday",
  },
]

// Calculate time until Thursday 6pm (order close time)
function getTimeUntilClose() {
  const now = new Date()
  const target = new Date()
  
  // Set target to this Thursday at 6pm
  const dayOfWeek = now.getDay()
  const daysUntilThursday = (4 - dayOfWeek + 7) % 7 || 7 // Thursday is day 4
  
  target.setDate(now.getDate() + daysUntilThursday)
  target.setHours(18, 0, 0, 0)
  
  // If it's past Thursday 6pm, set to next Thursday
  if (target <= now) {
    target.setDate(target.getDate() + 7)
  }
  
  const diff = target.getTime() - now.getTime()
  
  const days = Math.floor(diff / (1000 * 60 * 60 * 24))
  const hours = Math.floor((diff % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60))
  const minutes = Math.floor((diff % (1000 * 60 * 60)) / (1000 * 60))
  
  return { days, hours, minutes }
}

export function WeeklyDropSection() {
  // Initialize with stable default values to avoid hydration mismatch
  const [timeLeft, setTimeLeft] = useState({ days: 0, hours: 0, minutes: 0 })
  const [mounted, setMounted] = useState(false)

  useEffect(() => {
    // Set mounted and calculate initial time on client only
    setMounted(true)
    setTimeLeft(getTimeUntilClose())
    
    const timer = setInterval(() => {
      setTimeLeft(getTimeUntilClose())
    }, 60000) // Update every minute

    return () => clearInterval(timer)
  }, [])

  return (
    <section className="py-12 md:py-16 px-4 sm:px-6 lg:px-8 bg-background">
      <div className="mx-auto max-w-7xl">
        {/* Section Header */}
        <div className="flex flex-col lg:flex-row lg:items-end lg:justify-between gap-6 mb-8">
          <div>
            <span className="inline-flex items-center gap-2 px-3 py-1 bg-primary/10 rounded-full border border-primary/20 text-primary font-semibold text-xs uppercase tracking-wide mb-3">
              <Sparkles className="h-3 w-3" />
              Limited Weekly Drop
            </span>
            <h2 className="text-2xl sm:text-3xl font-bold tracking-tight text-foreground text-balance">
              This Week&apos;s Homemade Specials
            </h2>
            <p className="mt-2 text-base text-muted-foreground max-w-xl text-pretty">
              Exclusive dishes from our top home chefs, available for one week only.
            </p>
          </div>
          
          {/* Countdown Timer */}
          <div className="flex items-center gap-3 px-5 py-3 bg-card rounded-2xl border border-border shadow-sm">
            <div className="flex items-center gap-2 text-accent">
              <Clock className="h-5 w-5" />
              <span className="text-sm font-medium text-foreground">Orders close in:</span>
            </div>
            <div className="flex items-center gap-2">
              <div className="flex flex-col items-center px-3 py-1.5 bg-primary/10 rounded-lg min-w-[52px]">
                <span className="text-xl font-bold text-primary">{mounted ? timeLeft.days : "-"}</span>
                <span className="text-[10px] uppercase tracking-wide text-muted-foreground">days</span>
              </div>
              <div className="flex flex-col items-center px-3 py-1.5 bg-primary/10 rounded-lg min-w-[52px]">
                <span className="text-xl font-bold text-primary">{mounted ? timeLeft.hours : "-"}</span>
                <span className="text-[10px] uppercase tracking-wide text-muted-foreground">hours</span>
              </div>
              <div className="flex flex-col items-center px-3 py-1.5 bg-primary/10 rounded-lg min-w-[52px]">
                <span className="text-xl font-bold text-primary">{mounted ? timeLeft.minutes : "-"}</span>
                <span className="text-[10px] uppercase tracking-wide text-muted-foreground">mins</span>
              </div>
            </div>
          </div>
        </div>
        
        {/* Dishes Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5">
          {weeklyDropDishes.map((dish) => (
            <Link key={dish.id} href={`/dish/${dish.id}`}>
              <Card 
                className="group cursor-pointer border border-border/50 shadow-sm hover:shadow-xl transition-all duration-300 overflow-hidden rounded-2xl bg-card hover:-translate-y-2 h-full"
              >
                {/* Food Image */}
                <div className="relative aspect-[4/3] overflow-hidden rounded-t-2xl bg-muted">
                  <Image
                    src={dish.image}
                    alt={dish.name}
                    fill
                    className="object-cover object-center transition-transform duration-500 ease-out group-hover:scale-110 saturate-[1.1] brightness-[1.02] contrast-[1.02]"
                  />
                  
                  {/* Bottom gradient overlay */}
                  <div className="absolute inset-x-0 bottom-0 h-1/3 bg-gradient-to-t from-black/40 via-black/20 to-transparent pointer-events-none" />
                  
                  {/* Vignette effect */}
                  <div className="absolute inset-0 shadow-[inset_0_0_60px_rgba(0,0,0,0.15)] pointer-events-none rounded-t-2xl" />
                  
                  {/* View Dish Overlay on Hover */}
                  <div className="absolute inset-0 bg-foreground/60 opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-center justify-center">
                    <span className="px-4 py-2 bg-card text-foreground font-semibold rounded-full shadow-lg transform translate-y-2 group-hover:translate-y-0 transition-transform duration-300">
                      View Dish
                    </span>
                  </div>
                  
                  {/* Limited Weekly Drop Badge */}
                  <div className="absolute top-3 left-3 z-10 inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full bg-primary text-primary-foreground text-xs font-semibold shadow-md">
                    <Sparkles className="h-3 w-3" />
                    <span>Weekly Drop</span>
                  </div>
                  
                  {/* Low Stock Badge */}
                  {dish.remaining <= 6 && (
                    <div className="absolute top-3 right-3 z-10 inline-flex items-center gap-1 px-2 py-1 rounded-full bg-red-500 text-white text-xs font-semibold shadow-md">
                      <Flame className="h-3 w-3" />
                      <span>{dish.remaining} left</span>
                    </div>
                  )}
                  
                  {/* Price Badge */}
                  <div className="absolute bottom-3 right-3 z-10 bg-card/95 backdrop-blur-sm px-2.5 py-1 rounded-lg shadow">
                    <span className="text-sm font-bold text-primary">${dish.price.toFixed(2)}</span>
                  </div>
                </div>
                
                {/* Card Content */}
                <div className="p-4">
                  {/* Dish Name */}
                  <h3 className="text-lg font-semibold text-foreground line-clamp-1 group-hover:text-primary transition-colors">
                    {dish.name}
                  </h3>
                  
                  {/* Chef Row */}
                  <div className="flex items-center gap-2 mt-2">
                    <div className="relative">
                      <div className="h-7 w-7 rounded-full overflow-hidden ring-2 ring-primary/20 shadow-sm">
                        <Image
                          src={dish.chefAvatar}
                          alt={dish.chef}
                          width={28}
                          height={28}
                          className="object-cover w-full h-full"
                        />
                      </div>
                      <div className="absolute -bottom-0.5 -right-0.5 h-2.5 w-2.5 bg-primary rounded-full flex items-center justify-center ring-1 ring-card">
                        <span className="text-[5px] font-bold text-primary-foreground">H</span>
                      </div>
                    </div>
                    <span className="text-sm text-muted-foreground">
                      by {dish.chef}
                    </span>
                  </div>
                  
                  {/* Info Row */}
                  <div className="flex items-center justify-between mt-3 pt-3 border-t border-border/50">
                    <div className="flex items-center gap-1.5 text-sm text-muted-foreground">
                      <Calendar className="h-4 w-4" />
                      <span>{dish.pickupDay} pickup</span>
                    </div>
                    <span className="text-xs font-medium text-accent">
                      {dish.remaining} portions left
                    </span>
                  </div>
                  
                  {/* Preorder Button */}
                  <Button 
                    className="w-full rounded-xl h-10 text-sm font-semibold mt-4"
                    size="sm"
                  >
                    <ShoppingBag className="mr-1.5 h-4 w-4" />
                    Preorder Now
                  </Button>
                </div>
              </Card>
            </Link>
          ))}
        </div>
        
        {/* View All Link */}
        <div className="text-center mt-8">
          <Link href="/dishes">
            <Button variant="outline" size="lg" className="rounded-xl px-8">
              View All Weekly Specials
            </Button>
          </Link>
        </div>
      </div>
    </section>
  )
}
