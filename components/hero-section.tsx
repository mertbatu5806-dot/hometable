"use client"

import { useState, useRef, useEffect } from "react"
import { Button } from "@/components/ui/button"
import { Search, MapPin, Star, ChefHat, Clock, Navigation } from "lucide-react"

const neighborhoods = [
  { name: "Downtown Toronto", chefs: 85 },
  { name: "The Annex", chefs: 42 },
  { name: "Kensington Market", chefs: 38 },
  { name: "Little Italy", chefs: 56 },
  { name: "Leslieville", chefs: 31 },
  { name: "Queen West", chefs: 47 },
  { name: "Yorkville", chefs: 29 },
  { name: "Parkdale", chefs: 35 },
]

export function HeroSection() {
  const [locationQuery, setLocationQuery] = useState("")
  const [showLocationDropdown, setShowLocationDropdown] = useState(false)
  const locationRef = useRef<HTMLDivElement>(null)

  const filteredNeighborhoods = neighborhoods.filter(n => 
    n.name.toLowerCase().includes(locationQuery.toLowerCase())
  )

  useEffect(() => {
    function handleClickOutside(event: MouseEvent) {
      if (locationRef.current && !locationRef.current.contains(event.target as Node)) {
        setShowLocationDropdown(false)
      }
    }
    document.addEventListener("mousedown", handleClickOutside)
    return () => document.removeEventListener("mousedown", handleClickOutside)
  }, [])

  return (
    <section className="relative pt-24 pb-12 md:pt-32 md:pb-16 bg-background">
      <div className="mx-auto max-w-6xl px-6 lg:px-8">
        <div className="text-center">
          {/* Badge */}
          <div className="inline-flex items-center gap-2 px-4 py-2 bg-primary/10 rounded-full border border-primary/20 mb-6">
            <ChefHat className="h-4 w-4 text-primary" />
            <span className="text-sm font-medium text-primary">Toronto&apos;s #1 Homemade Food Platform</span>
          </div>
          
          <h1 className="text-4xl font-bold tracking-tight text-foreground sm:text-5xl md:text-6xl text-balance">
            Real homemade food
            <span className="block text-primary">from real people.</span>
          </h1>
          
          <p className="mt-6 text-lg leading-relaxed text-muted-foreground sm:text-xl max-w-2xl mx-auto text-pretty">
            Discover talented home chefs in your neighborhood and order authentic meals made with love.
          </p>
          
          {/* Search bar */}
          <div className="mt-8 mx-auto max-w-2xl">
            <div className="flex flex-col sm:flex-row gap-3 p-3 bg-card rounded-2xl shadow-lg border border-border/50">
              {/* Location Input with Dropdown */}
              <div className="relative flex-1" ref={locationRef}>
                <div 
                  className="flex items-center gap-3 px-4 py-3 bg-input/80 rounded-xl hover:bg-input transition-colors cursor-text"
                  onClick={() => setShowLocationDropdown(true)}
                >
                  <MapPin className="h-5 w-5 text-accent shrink-0" />
                  <input
                    type="text"
                    value={locationQuery}
                    onChange={(e) => {
                      setLocationQuery(e.target.value)
                      setShowLocationDropdown(true)
                    }}
                    onFocus={() => setShowLocationDropdown(true)}
                    placeholder="Enter your neighborhood (Toronto)"
                    className="flex-1 bg-transparent outline-none text-foreground placeholder:text-muted-foreground"
                  />
                </div>
                
                {/* Location Dropdown */}
                {showLocationDropdown && (
                  <div className="absolute top-full left-0 right-0 mt-2 bg-card rounded-xl shadow-xl border border-border/50 overflow-hidden z-50">
                    {/* Use Current Location */}
                    <button className="w-full flex items-center gap-3 px-4 py-3 hover:bg-muted/50 transition-colors text-left border-b border-border/30">
                      <div className="w-8 h-8 flex items-center justify-center bg-primary/10 rounded-lg">
                        <Navigation className="h-4 w-4 text-primary" />
                      </div>
                      <div>
                        <p className="text-sm font-medium text-foreground">Use current location</p>
                        <p className="text-xs text-muted-foreground">Find chefs near you</p>
                      </div>
                    </button>
                    
                    {/* Neighborhood Suggestions */}
                    <div className="max-h-64 overflow-y-auto">
                      {filteredNeighborhoods.map((neighborhood) => (
                        <button
                          key={neighborhood.name}
                          onClick={() => {
                            setLocationQuery(neighborhood.name)
                            setShowLocationDropdown(false)
                          }}
                          className="w-full flex items-center justify-between gap-3 px-4 py-3 hover:bg-muted/50 transition-colors text-left"
                        >
                          <div className="flex items-center gap-3">
                            <div className="w-8 h-8 flex items-center justify-center bg-muted rounded-lg">
                              <MapPin className="h-4 w-4 text-muted-foreground" />
                            </div>
                            <span className="text-sm font-medium text-foreground">{neighborhood.name}</span>
                          </div>
                          <span className="text-xs text-muted-foreground">{neighborhood.chefs} chefs</span>
                        </button>
                      ))}
                    </div>
                  </div>
                )}
              </div>
              
              {/* Search Input */}
              <div className="flex items-center gap-3 px-4 py-3 bg-input/80 rounded-xl hover:bg-input transition-colors sm:flex-1">
                <Search className="h-5 w-5 text-primary shrink-0" />
                <input
                  type="text"
                  placeholder="What are you craving?"
                  className="flex-1 bg-transparent outline-none text-foreground placeholder:text-muted-foreground"
                />
              </div>
              
              <Button size="lg" className="rounded-xl px-8 font-semibold">
                Search
              </Button>
            </div>
          </div>
          
          {/* Quick tags */}
          <div className="mt-5 flex flex-wrap items-center justify-center gap-2">
            <span className="text-sm text-muted-foreground">Popular:</span>
            {["Indian Curry", "Italian Pasta", "Korean BBQ", "Mexican Tacos"].map((tag) => (
              <button
                key={tag}
                className="px-3 py-1.5 text-sm font-medium bg-secondary/80 hover:bg-secondary rounded-full transition-colors"
              >
                {tag}
              </button>
            ))}
          </div>
        </div>
        
        {/* Social proof - compact horizontal */}
        <div className="mt-10 flex flex-wrap items-center justify-center gap-6 md:gap-10">
          <div className="flex items-center gap-2">
            <div className="w-10 h-10 flex items-center justify-center bg-primary/10 rounded-xl">
              <ChefHat className="h-5 w-5 text-primary" />
            </div>
            <div>
              <span className="text-xl font-bold text-foreground">500+</span>
              <p className="text-xs text-muted-foreground">Home Chefs</p>
            </div>
          </div>
          
          <div className="flex items-center gap-2">
            <div className="w-10 h-10 flex items-center justify-center bg-accent/10 rounded-xl">
              <Star className="h-5 w-5 text-accent fill-accent" />
            </div>
            <div>
              <span className="text-xl font-bold text-foreground">4.9</span>
              <p className="text-xs text-muted-foreground">Avg Rating</p>
            </div>
          </div>
          
          <div className="flex items-center gap-2">
            <div className="w-10 h-10 flex items-center justify-center bg-primary/10 rounded-xl">
              <Clock className="h-5 w-5 text-primary" />
            </div>
            <div>
              <span className="text-xl font-bold text-foreground">10k+</span>
              <p className="text-xs text-muted-foreground">Meals Delivered</p>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}
