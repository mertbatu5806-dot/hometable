"use client"

import { supabase } from "../../lib/supabase"
import Image from "next/image"
import Link from "next/link"
import { useState, useMemo, useEffect } from "react"

import { Card } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"

import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select"

import { Slider } from "@/components/ui/slider"
import { Footer } from "@/components/footer"

import {
  Search,
  Star,
  Flame,
  ShoppingBag,
  Clock,
  Package,
  SlidersHorizontal,
  X,
  BadgeCheck
} from "lucide-react"

const cuisines = [
  "All",
  "Turkish",
  "Indian",
  "Thai",
  "Mexican",
  "Japanese",
  "Korean",
]

const pickupDays = ["All", "Friday", "Saturday", "Sunday"]

export default function DishesPage() {

  const [allDishes, setAllDishes] = useState<any[]>([])
  const [searchQuery, setSearchQuery] = useState("")
  const [selectedCuisine, setSelectedCuisine] = useState("All")
  const [selectedDay, setSelectedDay] = useState("All")
  const [priceRange, setPriceRange] = useState([0, 50])
  const [showFilters, setShowFilters] = useState(false)

  useEffect(() => {
    async function fetchDishes() {

      const { data, error } = await supabase
        .from("dishes")
        .select("*")

      if (error) {
        console.error("Supabase error:", error)
      } else {
        setAllDishes(data || [])
      }

    }

    fetchDishes()
  }, [])

  const filteredDishes = useMemo(() => {

    return allDishes.filter((dish) => {

      const matchesSearch =
        dish.title?.toLowerCase().includes(searchQuery.toLowerCase())

      const matchesCuisine =
        selectedCuisine === "All" || dish.cuisine === selectedCuisine

      const pickupDay = dish.pickup_date
        ? new Date(dish.pickup_date).toLocaleDateString("en-US", {
            weekday: "long"
          })
        : ""

      const matchesDay =
        selectedDay === "All" || pickupDay === selectedDay

      const matchesPrice =
        dish.price >= priceRange[0] && dish.price <= priceRange[1]

      return matchesSearch && matchesCuisine && matchesDay && matchesPrice
    })

  }, [allDishes, searchQuery, selectedCuisine, selectedDay, priceRange])

  const activeFiltersCount = [
    selectedCuisine !== "All",
    selectedDay !== "All",
    priceRange[0] > 0 || priceRange[1] < 50
  ].filter(Boolean).length

  const clearFilters = () => {
    setSelectedCuisine("All")
    setSelectedDay("All")
    setPriceRange([0, 50])
    setSearchQuery("")
  }

  return (
    <div className="min-h-screen bg-background">

      {/* HERO */}

      <section className="bg-gradient-to-b from-primary/5 via-primary/3 to-background py-12">

        <div className="max-w-7xl mx-auto px-4">

          <div className="text-center mb-8">

            <h1 className="text-4xl font-bold mb-3">
              Browse Dishes
            </h1>

            <p className="text-muted-foreground">
              Discover homemade meals from local chefs
            </p>

          </div>

          <div className="max-w-xl mx-auto">

            <div className="relative">

              <Search className="absolute left-4 top-1/2 -translate-y-1/2 h-5 w-5 text-muted-foreground" />

              <Input
                type="text"
                placeholder="Search dishes..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="pl-12 h-12 rounded-xl"
              />

            </div>

          </div>

        </div>

      </section>

      {/* FILTERS */}

      <section className="border-b py-4">

        <div className="max-w-7xl mx-auto px-4 flex gap-4 items-center flex-wrap">

          <Select
            value={selectedCuisine}
            onValueChange={setSelectedCuisine}
          >
            <SelectTrigger className="w-[160px]">
              <SelectValue placeholder="Cuisine" />
            </SelectTrigger>
            <SelectContent>
              {cuisines.map((c) => (
                <SelectItem key={c} value={c}>
                  {c}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>

          <Select
            value={selectedDay}
            onValueChange={setSelectedDay}
          >
            <SelectTrigger className="w-[160px]">
              <SelectValue placeholder="Pickup day" />
            </SelectTrigger>
            <SelectContent>
              {pickupDays.map((d) => (
                <SelectItem key={d} value={d}>
                  {d}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>

          {activeFiltersCount > 0 && (
            <Button
              variant="ghost"
              onClick={clearFilters}
            >
              <X className="h-4 w-4 mr-2"/>
              Clear
            </Button>
          )}

          <div className="ml-auto text-sm text-muted-foreground">
            {filteredDishes.length} dishes
          </div>

        </div>

      </section>

      {/* GRID */}

      <section className="py-10">

        <div className="max-w-7xl mx-auto px-4">

          {filteredDishes.length === 0 && (
            <p>No dishes found</p>
          )}

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">

            {filteredDishes.map((dish) => {

              const pickupDay = dish.pickup_date
                ? new Date(dish.pickup_date).toLocaleDateString("en-US", {
                    weekday: "long"
                  })
                : ""

              return (

                <Link
                  key={dish.id}
                  href={`/dish/${dish.id}`}
                >

                  <Card className="group cursor-pointer overflow-hidden rounded-2xl hover:shadow-xl transition">

                    <div className="relative aspect-square">

                      <Image
                        src={dish.image_url}
                        alt={dish.title}
                        fill
                        className="object-cover group-hover:scale-105 transition"
                      />

                      {dish.remaining_portions <= 6 && (
                        <div className="absolute top-3 left-3 bg-red-500 text-white text-xs px-2 py-1 rounded">
                          Only {dish.remaining_portions} left
                        </div>
                      )}

                      <div className="absolute bottom-3 right-3 bg-white px-2 py-1 rounded text-sm font-bold">
                        ${dish.price}
                      </div>

                    </div>

                    <div className="p-4">

                      <h3 className="font-semibold mb-2">
                        {dish.title}
                      </h3>

                      <div className="flex items-center justify-between text-sm text-muted-foreground">

                        <div className="flex items-center gap-1">
                          <Clock className="h-4 w-4"/>
                          {pickupDay}
                        </div>

                        <div className="flex items-center gap-1">
                          <Package className="h-4 w-4"/>
                          {dish.remaining_portions} left
                        </div>

                      </div>

                      <Button className="w-full mt-4">
                        <ShoppingBag className="h-4 w-4 mr-2"/>
                        Preorder
                      </Button>

                    </div>

                  </Card>

                </Link>

              )
            })}

          </div>

        </div>

      </section>

      <Footer />

    </div>
  )
}