"use client"

import Image from "next/image"
import Link from "next/link"
import { Card } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Flame, Star, ShoppingBag, Eye, Calendar, Clock } from "lucide-react"

const dishes = [
  {
    id: 1,
    name: "Butter Chicken",
    chef: "Raj Patel",
    chefImage: "/images/chef-2.jpg",
    price: 18.99,
    image: "/images/dish-1.jpg",
    remaining: 12,
    rating: 4.9,
    reviews: 127,
    pickupDate: "Tomorrow",
    pickupTime: "5-7 PM",
  },
  {
    id: 2,
    name: "Pappardelle Bolognese",
    chef: "Nonna Rosa",
    chefImage: "/images/chef-3.jpg",
    price: 22.99,
    image: "/images/dish-2.jpg",
    remaining: 8,
    rating: 5.0,
    reviews: 89,
    pickupDate: "Tomorrow",
    pickupTime: "6-8 PM",
  },
  {
    id: 3,
    name: "Korean Bibimbap",
    chef: "Ji-Yeon Kim",
    chefImage: "/images/chef-4.jpg",
    price: 16.99,
    image: "/images/dish-3.jpg",
    remaining: 20,
    rating: 4.8,
    reviews: 156,
    pickupDate: "Wed, Mar 12",
    pickupTime: "12-2 PM",
  },
  {
    id: 4,
    name: "Falafel Platter",
    chef: "Sarah Ahmad",
    chefImage: "/images/chef-1.jpg",
    price: 15.99,
    image: "/images/dish-4.jpg",
    remaining: 15,
    rating: 4.7,
    reviews: 98,
    pickupDate: "Tomorrow",
    pickupTime: "4-6 PM",
  },
  {
    id: 5,
    name: "Tonkotsu Ramen",
    chef: "Kenji Tanaka",
    chefImage: "/images/chef-2.jpg",
    price: 19.99,
    image: "/images/dish-5.jpg",
    remaining: 6,
    rating: 4.9,
    reviews: 203,
    pickupDate: "Thu, Mar 13",
    pickupTime: "6-8 PM",
  },
  {
    id: 6,
    name: "Greek Moussaka",
    chef: "Elena Papadopoulos",
    chefImage: "/images/chef-1.jpg",
    price: 21.99,
    image: "/images/dish-6.jpg",
    remaining: 10,
    rating: 4.8,
    reviews: 67,
    pickupDate: "Tomorrow",
    pickupTime: "5-7 PM",
  },
  {
    id: 7,
    name: "Carne Asada Tacos",
    chef: "Carlos Mendez",
    chefImage: "/images/chef-2.jpg",
    price: 14.99,
    image: "/images/dish-7.jpg",
    remaining: 18,
    rating: 4.9,
    reviews: 145,
    pickupDate: "Wed, Mar 12",
    pickupTime: "6-9 PM",
  },
  {
    id: 8,
    name: "Thai Green Curry",
    chef: "Siri Chaiyasit",
    chefImage: "/images/chef-4.jpg",
    price: 17.99,
    image: "/images/dish-8.jpg",
    remaining: 4,
    rating: 5.0,
    reviews: 112,
    pickupDate: "Tomorrow",
    pickupTime: "5-7 PM",
  },
  {
    id: 9,
    name: "Jerk Chicken",
    chef: "Marcus Brown",
    chefImage: "/images/chef-2.jpg",
    price: 16.99,
    image: "/images/dish-1.jpg",
    remaining: 14,
    rating: 4.8,
    reviews: 78,
    pickupDate: "Fri, Mar 14",
    pickupTime: "5-8 PM",
  },
  {
    id: 10,
    name: "Pierogi Platter",
    chef: "Anna Kowalski",
    chefImage: "/images/chef-3.jpg",
    price: 13.99,
    image: "/images/dish-4.jpg",
    remaining: 22,
    rating: 4.7,
    reviews: 56,
    pickupDate: "Tomorrow",
    pickupTime: "4-6 PM",
  },
  {
    id: 11,
    name: "Lamb Tagine",
    chef: "Fatima Hassan",
    chefImage: "/images/chef-1.jpg",
    price: 24.99,
    image: "/images/dish-6.jpg",
    remaining: 5,
    rating: 4.9,
    reviews: 134,
    pickupDate: "Wed, Mar 12",
    pickupTime: "6-8 PM",
  },
  {
    id: 12,
    name: "Pad Thai",
    chef: "Siri Chaiyasit",
    chefImage: "/images/chef-4.jpg",
    price: 15.99,
    image: "/images/dish-8.jpg",
    remaining: 16,
    rating: 4.8,
    reviews: 189,
    pickupDate: "Tomorrow",
    pickupTime: "5-7 PM",
  },
]

function QuantityBadge({ remaining }: { remaining: number }) {
  const isLow = remaining <= 6
  
  if (!isLow) return null
  
  return (
    <div className="absolute top-2 left-2 z-10 inline-flex items-center gap-1 px-1.5 py-0.5 rounded-md bg-red-500 text-white text-[10px] font-bold shadow-sm">
      <Flame className="h-2.5 w-2.5" />
      <span>{remaining} left</span>
    </div>
  )
}

function RatingStars({ rating }: { rating: number }) {
  return (
    <div className="flex items-center gap-0.5">
      <Star className="h-3 w-3 fill-amber-400 text-amber-400" />
      <span className="text-xs font-medium text-foreground">{rating}</span>
    </div>
  )
}

export function MenuSection() {
  return (
    <section id="menu" className="py-16 md:py-24 px-4 sm:px-6 lg:px-8 bg-background">
      <div className="mx-auto max-w-7xl">
        {/* Section Header */}
        <div className="text-center mb-8 md:mb-12">
          <span className="inline-flex items-center gap-2 px-3 py-1 bg-accent/10 rounded-full border border-accent/20 text-accent font-semibold text-xs uppercase tracking-wide mb-3">
            This Week&apos;s Menu
          </span>
          <h2 className="text-2xl sm:text-3xl lg:text-4xl font-bold tracking-tight text-foreground text-balance">
            Fresh from Toronto&apos;s Kitchens
          </h2>
          <p className="mt-3 text-base text-muted-foreground max-w-xl mx-auto text-pretty">
            Pre-order from our rotating selection of homemade dishes.
          </p>
        </div>
        
        {/* Compact Marketplace Grid - 2 cols mobile, 3 tablet, 4-6 desktop */}
        <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 xl:grid-cols-6 gap-3 md:gap-4">
          {dishes.map((dish) => (
            <Link key={dish.id} href={`/dish/${dish.id}`}>
              <Card 
                className="group cursor-pointer border-0 shadow-sm hover:shadow-lg transition-all duration-300 overflow-hidden rounded-xl bg-card hover:-translate-y-1 h-full"
              >
              {/* Compact Square Food Image with enhanced styling for amateur photos */}
              <div className="relative aspect-square overflow-hidden rounded-t-xl bg-muted">
                <Image
                  src={dish.image}
                  alt={dish.name}
                  fill
                  className="object-cover object-center transition-transform duration-500 ease-out group-hover:scale-110 saturate-[1.1] brightness-[1.02] contrast-[1.02]"
                />
                
                {/* Bottom gradient overlay for text readability */}
                <div className="absolute inset-x-0 bottom-0 h-1/3 bg-gradient-to-t from-black/40 via-black/20 to-transparent pointer-events-none" />
                
                {/* Subtle vignette effect to focus on food */}
                <div className="absolute inset-0 shadow-[inset_0_0_40px_rgba(0,0,0,0.12)] pointer-events-none rounded-t-xl" />
                
                {/* Low Stock Badge */}
                <QuantityBadge remaining={dish.remaining} />
                
                {/* Price Badge */}
                <div className="absolute bottom-2 right-2 z-10 bg-card/95 backdrop-blur-sm px-1.5 py-0.5 rounded-md shadow">
                  <span className="text-xs font-bold text-primary">${dish.price.toFixed(0)}</span>
                </div>
                
                {/* Quick View on Hover */}
                <div className="absolute inset-0 bg-foreground/40 opacity-0 group-hover:opacity-100 transition-all duration-200 flex items-center justify-center">
                  <Button 
                    variant="secondary"
                    size="sm"
                    className="rounded-full h-7 px-3 text-[10px] font-semibold shadow-lg scale-90 opacity-0 group-hover:scale-100 group-hover:opacity-100 transition-all duration-200 bg-card text-foreground"
                  >
                    <Eye className="mr-1 h-3 w-3" />
                    View
                  </Button>
                </div>
              </div>
              
              {/* Minimal Card Content */}
              <div className="p-2.5">
                {/* Dish Name */}
                <h3 className="text-xs font-semibold text-foreground line-clamp-1 mb-1 group-hover:text-primary transition-colors">
                  {dish.name}
                </h3>
                
                {/* Chef Row with improved avatar */}
                <div className="flex items-center gap-1.5 mb-1.5">
                  <div className="relative flex-shrink-0">
                    {/* Circular Chef Avatar */}
                    <div className="h-5 w-5 rounded-full overflow-hidden ring-[1.5px] ring-primary/20 shadow-sm">
                      <Image
                        src={dish.chefImage}
                        alt={dish.chef}
                        width={20}
                        height={20}
                        className="object-cover w-full h-full"
                      />
                    </div>
                    {/* Home Chef Badge */}
                    <div className="absolute -bottom-0.5 -right-0.5 h-2.5 w-2.5 bg-primary rounded-full flex items-center justify-center ring-1 ring-card">
                      <span className="text-[5px] font-bold text-primary-foreground">H</span>
                    </div>
                  </div>
                  <span className="text-[10px] text-muted-foreground truncate flex-1">
                    {dish.chef}
                  </span>
                  <RatingStars rating={dish.rating} />
                </div>
                
                {/* Pickup Info */}
                <div className="flex items-center gap-1 text-[10px] text-muted-foreground mb-2">
                  <Calendar className="h-2.5 w-2.5 text-primary/70" />
                  <span className="truncate">{dish.pickupDate}</span>
                  <Clock className="h-2.5 w-2.5 text-primary/70 ml-1" />
                  <span className="truncate">{dish.pickupTime}</span>
                </div>
                
                {/* Preorder Button */}
                <Button 
                  className="w-full rounded-lg h-7 text-[10px] font-semibold bg-primary text-primary-foreground hover:bg-primary/90"
                  size="sm"
                >
                  <ShoppingBag className="mr-1 h-3 w-3" />
                  Preorder
                </Button>
              </div>
            </Card>
            </Link>
          ))}
        </div>
        
        {/* View More */}
        <div className="text-center mt-8">
          <Button 
            size="default" 
            variant="outline" 
            className="rounded-xl h-10 px-6 text-sm font-semibold border-2 hover:bg-primary hover:text-primary-foreground hover:border-primary transition-all duration-300"
          >
            View Full Menu
          </Button>
        </div>
      </div>
    </section>
  )
}
