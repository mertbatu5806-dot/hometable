"use client"

import { useState } from "react"
import Link from "next/link"
import { cn } from "@/lib/utils"

const categories = [
  { id: "all", label: "All", href: "/dishes" },
  { id: "turkish", label: "Turkish", href: "/dishes?cuisine=Turkish" },
  { id: "desserts", label: "Desserts", href: "/dishes?cuisine=Desserts" },
  { id: "baked-goods", label: "Baked Goods", href: "/dishes?cuisine=Baked%20Goods" },
  { id: "vegetarian", label: "Vegetarian", href: "/dishes?cuisine=Vegetarian" },
  { id: "mediterranean", label: "Mediterranean", href: "/dishes?cuisine=Mediterranean" },
]

export function CategoryNav() {
  const [activeCategory, setActiveCategory] = useState("all")

  return (
    <section className="py-6 bg-background border-b border-border/50">
      <div className="mx-auto max-w-6xl px-6 lg:px-8">
        <div className="flex items-center gap-2 overflow-x-auto scrollbar-hide pb-1 -mb-1">
          {categories.map((category) => (
            <Link
              key={category.id}
              href={category.href}
              onClick={() => setActiveCategory(category.id)}
              className={cn(
                "flex-shrink-0 px-5 py-2.5 rounded-full text-sm font-medium transition-all duration-300",
                "hover:bg-primary/10 hover:text-primary hover:scale-105",
                "focus:outline-none focus-visible:ring-2 focus-visible:ring-primary focus-visible:ring-offset-2",
                activeCategory === category.id
                  ? "bg-primary text-primary-foreground shadow-md hover:bg-primary hover:text-primary-foreground"
                  : "bg-muted/60 text-foreground/80"
              )}
            >
              {category.label}
            </Link>
          ))}
        </div>
      </div>
    </section>
  )
}
