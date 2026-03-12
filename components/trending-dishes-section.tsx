"use client"

import { useState } from "react"
import Image from "next/image"
import Link from "next/link"
import { Card } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Star, ShoppingBag, Flame, Calendar, MapPin } from "lucide-react"

const cuisineFilters = [
  { id: "all", label: "All" },
  { id: "turkish", label: "Turkish" },
  { id: "mediterranean", label: "Mediterranean" },
  { id: "desserts", label: "Desserts" },
  { id: "baked", label: "Baked Goods" },
  { id: "vegetarian", label: "Vegetarian" },
]

const trendingDishes = [
  {
    id: 1,
    name: "Butter Chicken",
    chef: "Raj Patel",
    chefAvatar: "/images/chef-2.jpg",
    price: 18.99,
    image: "/images/dish-1.jpg",
    remaining: 4,
    rating: 4.9,
    cuisine: "turkish",
    pickupDay: "Saturday",
    location: "The Annex",
  },
  {
    id: 2,
    name: "Pappardelle Bolognese",
    chef: "Nonna Rosa",
    chefAvatar: "/images/chef-3.jpg",
    price: 22.99,
    image: "/images/dish-2.jpg",
    remaining: 8,
    rating: 5.0,
    cuisine: "mediterranean",
    pickupDay: "Sunday",
    location: "Little Italy",
  },
  {
    id: 3,
    name: "Korean Bibimbap",
    chef: "Ji-Yeon Kim",
    chefAvatar: "/images/chef-4.jpg",
    price: 16.99,
    image: "/images/dish-3.jpg",
    remaining: 3,
    rating: 4.8,
    cuisine: "vegetarian",
    pickupDay: "Saturday",
    location: "Koreatown",
  },
  {
    id: 4,
    name: "Falafel Platter",
    chef: "Sarah Ahmad",
    chefAvatar: "/images/chef-1.jpg",
    price: 15.99,
    image: "/images/dish-4.jpg",
    remaining: 12,
    rating: 4.7,
    cuisine: "mediterranean",
    pickupDay: "Friday",
    location: "Kensington",
  },
  {
    id: 5,
    name: "Tonkotsu Ramen",
    chef: "Kenji Tanaka",
    chefAvatar: "/images/chef-2.jpg",
    price: 19.99,
    image: "/images/dish-5.jpg",
    remaining: 6,
    rating: 4.9,
    cuisine: "turkish",
    pickupDay: "Saturday",
    location: "Queen West",
  },
  {
    id: 6,
    name: "Greek Moussaka",
    chef: "Elena Papadopoulos",
    chefAvatar: "/images/chef-1.jpg",
    price: 21.99,
    image: "/images/dish-6.jpg",
    remaining: 5,
    rating: 4.8,
    cuisine: "mediterranean",
    pickupDay: "Sunday",
    location: "Danforth",
  },
  {
    id: 7,
    name: "Baklava Assortment",
    chef: "Carlos Mendez",
    chefAvatar: "/images/chef-2.jpg",
    price: 14.99,
    image: "/images/dish-7.jpg",
    remaining: 9,
    rating: 4.9,
    cuisine: "desserts",
    pickupDay: "Saturday",
    location: "Parkdale",
  },
  {
    id: 8,
    name: "Sourdough Bread",
    chef: "Siri Chaiyasit",
    chefAvatar: "/images/chef-4.jpg",
    price: 17.99,
    image: "/images/dish-8.jpg",
    remaining: 2,
    rating: 5.0,
    cuisine: "baked",
    pickupDay: "Sunday",
    location: "Leslieville",
  },
]

export function TrendingDishesSection() {
  const [activeFilter, setActiveFilter] = useState("all")

  const filteredDishes = activeFilter === "all" 
    ? trendingDishes 
    : trendingDishes.filter(dish => dish.cuisine === activeFilter)

  return (
    <section className="py-12 md:py-16 px-4 sm:px-6 lg:px-8 bg-muted/30">
      <div className="mx-auto max-w-7xl">
        {/* Section Header */}
        <div className="text-center mb-8">
          <span className="inline-flex items-center gap-2 px-3 py-1 bg-accent/10 rounded-full border border-accent/20 text-accent font-semibold text-xs uppercase tracking-wide mb-3">
            <Flame className="h-3 w-3" />
            Trending Now
          </span>
          <h2 className="text-2xl sm:text-3xl font-bold tracking-tight text-foreground text-balance">
            Trending Dishes This Week
          </h2>
          <p className="mt-2 text-base text-muted-foreground max-w-xl mx-auto text-pretty">
            Fresh homemade dishes available for preorder.
          </p>
          
          {/* Cuisine Filter Bar */}
          <div className="flex flex-wrap items-center justify-center gap-2 mt-6">
            {cuisineFilters.map((filter) => (
              <button
                key={filter.id}
                onClick={() => setActiveFilter(filter.id)}
                className={`
                  px-4 py-2 rounded-full text-sm font-medium transition-all duration-200
                  ${activeFilter === filter.id 
                    ? "bg-primary text-primary-foreground shadow-md scale-105" 
                    : "bg-card text-muted-foreground border border-border/50 hover:bg-muted hover:text-foreground hover:border-border hover:scale-105"
                  }
                `}
              >
                {filter.label}
              </button>
            ))}
          </div>
        </div>
        
        {/* Marketplace Grid - 1 col mobile, 2 tablet, 4 desktop */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 mt-8">
          {filteredDishes.map((dish) => (
            <Link key={dish.id} href={`/dish/${dish.id}`}>
              <Card 
                className="group cursor-pointer border border-border/50 shadow-sm hover:shadow-lg transition-all duration-300 overflow-hidden rounded-2xl bg-card hover:-translate-y-1 h-full"
              >
              {/* Square Food Image with enhanced styling for amateur photos */}
              <div className="relative aspect-square overflow-hidden rounded-t-2xl bg-muted">
                <Image
                  src={dish.image}
                  alt={dish.name}
                  fill
                  className="object-cover object-center transition-transform duration-500 ease-out group-hover:scale-110 saturate-[1.1] brightness-[1.02] contrast-[1.02]"
                />
                
                {/* Bottom gradient overlay for text readability */}
                <div className="absolute inset-x-0 bottom-0 h-1/3 bg-gradient-to-t from-black/40 via-black/20 to-transparent pointer-events-none" />
                
                {/* Subtle vignette effect to focus on food */}
                <div className="absolute inset-0 shadow-[inset_0_0_60px_rgba(0,0,0,0.15)] pointer-events-none rounded-t-2xl" />
                
                {/* Low Stock Badge */}
                {dish.remaining <= 6 && (
                  <div className="absolute top-3 left-3 z-10 inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full bg-red-500 text-white text-xs font-semibold shadow-md backdrop-blur-sm">
                    <Flame className="h-3 w-3" />
                    <span>Only {dish.remaining} left</span>
                  </div>
                )}
              </div>
              
              {/* Card Content */}
              <div className="p-4">
                {/* Dish Name */}
                <h3 className="text-base font-semibold text-foreground line-clamp-1 group-hover:text-primary transition-colors">
                  {dish.name}
                </h3>
                
                {/* Chef Row */}
                <div className="flex items-center gap-2 mt-1.5">
                  {/* Circular Chef Avatar */}
                  <div className="relative">
                    <div className="h-6 w-6 rounded-full overflow-hidden ring-2 ring-primary/20 shadow-sm">
                      <Image
                        src={dish.chefAvatar}
                        alt={dish.chef}
                        width={24}
                        height={24}
                        className="object-cover w-full h-full"
                      />
                    </div>
                    {/* Home Chef Badge */}
                    <div className="absolute -bottom-0.5 -right-0.5 h-2.5 w-2.5 bg-primary rounded-full flex items-center justify-center ring-1 ring-card">
                      <span className="text-[5px] font-bold text-primary-foreground">H</span>
                    </div>
                  </div>
                  <span className="text-sm text-muted-foreground">
                    {dish.chef}
                  </span>
                </div>
                
                {/* Pickup Info Row */}
                <div className="flex items-center gap-3 mt-3 text-xs text-muted-foreground">
                  <div className="flex items-center gap-1">
                    <Calendar className="h-3 w-3" />
                    <span>{dish.pickupDay} pickup</span>
                  </div>
                  <div className="flex items-center gap-1">
                    <MapPin className="h-3 w-3" />
                    <span>{dish.location}</span>
                  </div>
                </div>
                
                {/* Remaining & Price Row */}
                <div className="flex items-center justify-between mt-3 pt-3 border-t border-border/50">
                  <span className="text-xs font-medium text-accent">
                    Only {dish.remaining} left
                  </span>
                  <span className="text-base font-bold text-primary">
                    ${dish.price.toFixed(0)}
                  </span>
                </div>
                
                {/* Preorder Button */}
                <Button 
                  className="w-full rounded-xl h-9 text-sm font-semibold mt-3"
                  size="sm"
                >
                  <ShoppingBag className="mr-1.5 h-4 w-4" />
                  Preorder
                </Button>
              </div>
            </Card>
            </Link>
          ))}
        </div>
      </div>
    </section>
  )
}
