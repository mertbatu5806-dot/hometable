"use client"

import Link from "next/link"
import Image from "next/image"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Menu, ChefHat, Search, User, ShoppingCart, Star, X, UtensilsCrossed, MapPin } from "lucide-react"
import { useState, useEffect, useRef, useMemo } from "react"
import {
  Sheet,
  SheetContent,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from "@/components/ui/sheet"

const navLinks = [
  { href: "/", label: "Home" },
  { href: "/dishes", label: "Browse Dishes" },
  { href: "/chefs", label: "Home Chefs" },
  { href: "/#how-it-works", label: "How It Works" },
]

// Sample data for search
const searchableDishes = [
  { id: 1, name: "Bacalhau à Brás", chefName: "Maria Santos", price: 18.99, image: "/images/dish-1.jpg", rating: 4.9, cuisine: "Portuguese" },
  { id: 2, name: "Pastéis de Nata", chefName: "Maria Santos", price: 12.99, image: "/images/dish-2.jpg", rating: 5.0, cuisine: "Portuguese" },
  { id: 3, name: "Butter Chicken", chefName: "Priya Sharma", price: 16.99, image: "/images/dish-3.jpg", rating: 4.8, cuisine: "Indian" },
  { id: 4, name: "Pad Thai", chefName: "Somchai Lee", price: 14.99, image: "/images/dish-4.jpg", rating: 4.9, cuisine: "Thai" },
  { id: 5, name: "Jerk Chicken", chefName: "Marcus Johnson", price: 19.99, image: "/images/dish-5.jpg", rating: 5.0, cuisine: "Caribbean" },
  { id: 6, name: "Tacos al Pastor", chefName: "Elena Rodriguez", price: 13.99, image: "/images/dish-6.jpg", rating: 4.7, cuisine: "Mexican" },
  { id: 7, name: "Nonna's Lasagna", chefName: "Nonna Rosa", price: 22.00, image: "/images/dish-1.jpg", rating: 5.0, cuisine: "Italian" },
  { id: 8, name: "Bibimbap", chefName: "Ji-Yeon Kim", price: 17.00, image: "/images/dish-2.jpg", rating: 4.9, cuisine: "Korean" },
]

const searchableChefs = [
  { id: 1, name: "Maria Santos", specialty: "Portuguese", location: "Downtown", image: "/images/chef-1.jpg", rating: 4.9, dishCount: 8 },
  { id: 2, name: "Priya Sharma", specialty: "Indian", location: "Midtown", image: "/images/chef-2.jpg", rating: 4.8, dishCount: 12 },
  { id: 3, name: "Nonna Rosa", specialty: "Italian", location: "West End", image: "/images/chef-3.jpg", rating: 5.0, dishCount: 6 },
  { id: 4, name: "Ji-Yeon Kim", specialty: "Korean", location: "East Side", image: "/images/chef-4.jpg", rating: 4.9, dishCount: 10 },
  { id: 5, name: "Marcus Johnson", specialty: "Caribbean", location: "Downtown", image: "/images/chef-5.jpg", rating: 5.0, dishCount: 7 },
  { id: 6, name: "Elena Rodriguez", specialty: "Mexican", location: "Midtown", image: "/images/chef-6.jpg", rating: 4.8, dishCount: 9 },
]

const cuisines = ["Portuguese", "Indian", "Italian", "Korean", "Caribbean", "Mexican", "Thai", "Japanese", "Greek", "Vietnamese"]

export function Header() {
  const [scrolled, setScrolled] = useState(false)
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false)
  const [searchOpen, setSearchOpen] = useState(false)
  const [searchQuery, setSearchQuery] = useState("")
  const searchRef = useRef<HTMLDivElement>(null)
  const inputRef = useRef<HTMLInputElement>(null)
  const cartItemCount = 3

  // Search results
  const searchResults = useMemo(() => {
    if (!searchQuery.trim()) return { dishes: [], chefs: [], cuisines: [] }
    
    const query = searchQuery.toLowerCase()
    
    const dishes = searchableDishes
      .filter(d => d.name.toLowerCase().includes(query) || d.chefName.toLowerCase().includes(query) || d.cuisine.toLowerCase().includes(query))
      .slice(0, 4)
    
    const chefs = searchableChefs
      .filter(c => c.name.toLowerCase().includes(query) || c.specialty.toLowerCase().includes(query))
      .slice(0, 3)
    
    const matchedCuisines = cuisines
      .filter(c => c.toLowerCase().includes(query))
      .slice(0, 3)
    
    return { dishes, chefs, cuisines: matchedCuisines }
  }, [searchQuery])

  const hasResults = searchResults.dishes.length > 0 || searchResults.chefs.length > 0 || searchResults.cuisines.length > 0

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 10)
    }
    window.addEventListener("scroll", handleScroll)
    return () => window.removeEventListener("scroll", handleScroll)
  }, [])

  // Close search when clicking outside
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (searchRef.current && !searchRef.current.contains(event.target as Node)) {
        setSearchOpen(false)
      }
    }
    document.addEventListener("mousedown", handleClickOutside)
    return () => document.removeEventListener("mousedown", handleClickOutside)
  }, [])

  // Focus input when search opens
  useEffect(() => {
    if (searchOpen && inputRef.current) {
      inputRef.current.focus()
    }
  }, [searchOpen])

  const handleSearchClose = () => {
    setSearchOpen(false)
    setSearchQuery("")
  }

  return (
    <header 
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
        scrolled 
          ? "bg-card shadow-md" 
          : "bg-card/80 backdrop-blur-md"
      }`}
    >
      <nav className="mx-auto flex max-w-7xl items-center justify-between px-4 py-3 sm:px-6 lg:px-8">
        {/* Logo - Left Side */}
        <div className="flex items-center">
          <Link href="/" className="group flex items-center gap-2">
            <div className="w-9 h-9 rounded-xl bg-primary flex items-center justify-center group-hover:bg-primary/90 transition-colors">
              <ChefHat className="w-5 h-5 text-primary-foreground" />
            </div>
            <span className="text-xl font-bold text-foreground hidden sm:block">
              Home<span className="text-primary">Table</span>
            </span>
          </Link>
        </div>
        
        {/* Desktop Navigation - Center */}
        <div className="hidden lg:flex lg:items-center lg:gap-1">
          {navLinks.map((link) => (
            <Link 
              key={link.href}
              href={link.href} 
              className="relative px-4 py-2 text-sm font-medium text-foreground/80 hover:text-foreground transition-colors rounded-lg hover:bg-muted group"
            >
              {link.label}
              <span className="absolute bottom-0.5 left-1/2 -translate-x-1/2 w-0 h-0.5 bg-primary rounded-full transition-all duration-300 group-hover:w-6" />
            </Link>
          ))}
          <Link 
            href="/cart" 
            className="relative px-4 py-2 text-sm font-medium text-foreground/80 hover:text-foreground transition-colors rounded-lg hover:bg-muted group flex items-center gap-1.5"
          >
            <ShoppingCart className="w-4 h-4" />
            Cart
            {cartItemCount > 0 && (
              <span className="absolute -top-0.5 right-1 min-w-[18px] h-[18px] flex items-center justify-center text-[10px] font-semibold bg-primary text-primary-foreground rounded-full">
                {cartItemCount}
              </span>
            )}
          </Link>
        </div>
        
        {/* Right Side - Search, User, Mobile Menu */}
        <div className="flex items-center gap-1">
          {/* Search */}
          <div ref={searchRef} className="relative">
            {!searchOpen ? (
              <Button 
                variant="ghost" 
                size="icon" 
                className="rounded-lg text-foreground/70 hover:text-foreground hover:bg-muted"
                aria-label="Search"
                onClick={() => setSearchOpen(true)}
              >
                <Search className="w-5 h-5" />
              </Button>
            ) : (
              <div className="flex items-center">
                <div className="relative">
                  <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
                  <Input
                    ref={inputRef}
                    type="text"
                    placeholder="Search dishes, chefs, cuisines..."
                    value={searchQuery}
                    onChange={(e) => setSearchQuery(e.target.value)}
                    className="w-[280px] sm:w-[320px] pl-9 pr-8 h-9 rounded-full border-border bg-muted/50 focus-visible:ring-primary text-sm"
                  />
                  <Button
                    variant="ghost"
                    size="icon"
                    className="absolute right-0 top-1/2 -translate-y-1/2 h-8 w-8 rounded-full text-muted-foreground hover:text-foreground"
                    onClick={handleSearchClose}
                  >
                    <X className="h-4 w-4" />
                  </Button>
                </div>
              </div>
            )}
            
            {/* Search Results Dropdown */}
            {searchOpen && searchQuery && (
              <div className="absolute top-full right-0 mt-2 w-[340px] sm:w-[400px] bg-card rounded-2xl shadow-2xl border border-border overflow-hidden z-50">
                {hasResults ? (
                  <div className="max-h-[70vh] overflow-y-auto">
                    {/* Cuisines Section */}
                    {searchResults.cuisines.length > 0 && (
                      <div className="p-3 border-b border-border">
                        <p className="text-xs font-semibold text-muted-foreground uppercase tracking-wider mb-2">Cuisines</p>
                        <div className="flex flex-wrap gap-2">
                          {searchResults.cuisines.map((cuisine) => (
                            <Link
                              key={cuisine}
                              href={`/dishes?cuisine=${cuisine}`}
                              onClick={handleSearchClose}
                              className="inline-flex items-center gap-1.5 px-3 py-1.5 bg-muted hover:bg-primary/10 hover:text-primary rounded-full text-sm font-medium transition-colors"
                            >
                              <UtensilsCrossed className="h-3.5 w-3.5" />
                              {cuisine}
                            </Link>
                          ))}
                        </div>
                      </div>
                    )}
                    
                    {/* Dishes Section */}
                    {searchResults.dishes.length > 0 && (
                      <div className="p-3 border-b border-border">
                        <div className="flex items-center justify-between mb-2">
                          <p className="text-xs font-semibold text-muted-foreground uppercase tracking-wider">Dishes</p>
                          <Link 
                            href={`/dishes?search=${searchQuery}`} 
                            onClick={handleSearchClose}
                            className="text-xs text-primary hover:underline"
                          >
                            View all
                          </Link>
                        </div>
                        <div className="space-y-1">
                          {searchResults.dishes.map((dish) => (
                            <Link
                              key={dish.id}
                              href={`/dish/${dish.id}`}
                              onClick={handleSearchClose}
                              className="flex items-center gap-3 p-2 rounded-xl hover:bg-muted transition-colors group"
                            >
                              <div className="relative w-12 h-12 rounded-lg overflow-hidden flex-shrink-0">
                                <Image
                                  src={dish.image}
                                  alt={dish.name}
                                  fill
                                  className="object-cover group-hover:scale-110 transition-transform duration-300"
                                />
                              </div>
                              <div className="flex-1 min-w-0">
                                <p className="text-sm font-medium text-foreground truncate group-hover:text-primary transition-colors">
                                  {dish.name}
                                </p>
                                <p className="text-xs text-muted-foreground truncate">
                                  by {dish.chefName}
                                </p>
                              </div>
                              <div className="text-right flex-shrink-0">
                                <p className="text-sm font-semibold text-primary">${dish.price.toFixed(2)}</p>
                                <div className="flex items-center gap-0.5 justify-end">
                                  <Star className="h-3 w-3 fill-amber-400 text-amber-400" />
                                  <span className="text-xs text-muted-foreground">{dish.rating}</span>
                                </div>
                              </div>
                            </Link>
                          ))}
                        </div>
                      </div>
                    )}
                    
                    {/* Chefs Section */}
                    {searchResults.chefs.length > 0 && (
                      <div className="p-3">
                        <div className="flex items-center justify-between mb-2">
                          <p className="text-xs font-semibold text-muted-foreground uppercase tracking-wider">Chefs</p>
                          <Link 
                            href={`/chefs?search=${searchQuery}`} 
                            onClick={handleSearchClose}
                            className="text-xs text-primary hover:underline"
                          >
                            View all
                          </Link>
                        </div>
                        <div className="space-y-1">
                          {searchResults.chefs.map((chef) => (
                            <Link
                              key={chef.id}
                              href={`/chef/${chef.id}`}
                              onClick={handleSearchClose}
                              className="flex items-center gap-3 p-2 rounded-xl hover:bg-muted transition-colors group"
                            >
                              <div className="relative w-12 h-12 rounded-full overflow-hidden flex-shrink-0 ring-2 ring-primary/20">
                                <Image
                                  src={chef.image}
                                  alt={chef.name}
                                  fill
                                  className="object-cover"
                                />
                              </div>
                              <div className="flex-1 min-w-0">
                                <p className="text-sm font-medium text-foreground truncate group-hover:text-primary transition-colors">
                                  {chef.name}
                                </p>
                                <div className="flex items-center gap-2 text-xs text-muted-foreground">
                                  <span>{chef.specialty}</span>
                                  <span className="flex items-center gap-0.5">
                                    <MapPin className="h-3 w-3" />
                                    {chef.location}
                                  </span>
                                </div>
                              </div>
                              <div className="text-right flex-shrink-0">
                                <div className="flex items-center gap-0.5 justify-end">
                                  <Star className="h-3 w-3 fill-amber-400 text-amber-400" />
                                  <span className="text-xs font-medium">{chef.rating}</span>
                                </div>
                                <p className="text-xs text-muted-foreground">{chef.dishCount} dishes</p>
                              </div>
                            </Link>
                          ))}
                        </div>
                      </div>
                    )}
                  </div>
                ) : (
                  <div className="p-6 text-center">
                    <Search className="h-8 w-8 text-muted-foreground mx-auto mb-2" />
                    <p className="text-sm text-muted-foreground">No results found for &quot;{searchQuery}&quot;</p>
                    <p className="text-xs text-muted-foreground mt-1">Try searching for dishes, chefs, or cuisines</p>
                  </div>
                )}
              </div>
            )}
          </div>
          
          {/* User Profile Icon */}
          <Button 
            variant="ghost" 
            size="icon" 
            className="rounded-lg text-foreground/70 hover:text-foreground hover:bg-muted"
            aria-label="User profile"
          >
            <User className="w-5 h-5" />
          </Button>
          
          {/* Cart Icon - Mobile Only */}
          <Link href="/cart" className="lg:hidden">
            <Button 
              variant="ghost" 
              size="icon" 
              className="rounded-lg text-foreground/70 hover:text-foreground hover:bg-muted relative"
              aria-label="Cart"
            >
              <ShoppingCart className="w-5 h-5" />
              {cartItemCount > 0 && (
                <span className="absolute -top-0.5 -right-0.5 min-w-[18px] h-[18px] flex items-center justify-center text-[10px] font-semibold bg-primary text-primary-foreground rounded-full">
                  {cartItemCount}
                </span>
              )}
            </Button>
          </Link>
          
          {/* Mobile Menu Button */}
          <Sheet open={mobileMenuOpen} onOpenChange={setMobileMenuOpen}>
            <SheetTrigger asChild className="lg:hidden">
              <Button 
                variant="ghost" 
                size="icon" 
                className="rounded-lg text-foreground/70 hover:text-foreground hover:bg-muted"
                aria-label="Open menu"
              >
                <Menu className="w-5 h-5" />
              </Button>
            </SheetTrigger>
            <SheetContent side="right" className="w-[280px] p-0">
              <SheetHeader className="border-b border-border p-4">
                <SheetTitle className="flex items-center gap-2">
                  <div className="w-8 h-8 rounded-lg bg-primary flex items-center justify-center">
                    <ChefHat className="w-4 h-4 text-primary-foreground" />
                  </div>
                  <span className="font-bold">
                    Home<span className="text-primary">Table</span>
                  </span>
                </SheetTitle>
              </SheetHeader>
              <div className="flex flex-col py-4">
                {navLinks.map((link) => (
                  <Link
                    key={link.href}
                    href={link.href}
                    onClick={() => setMobileMenuOpen(false)}
                    className="px-4 py-3 text-base font-medium text-foreground hover:bg-muted transition-colors"
                  >
                    {link.label}
                  </Link>
                ))}
                <Link
                  href="/cart"
                  onClick={() => setMobileMenuOpen(false)}
                  className="px-4 py-3 text-base font-medium text-foreground hover:bg-muted transition-colors flex items-center gap-2"
                >
                  <ShoppingCart className="w-4 h-4" />
                  Cart
                  {cartItemCount > 0 && (
                    <span className="min-w-[20px] h-[20px] flex items-center justify-center text-xs font-semibold bg-primary text-primary-foreground rounded-full">
                      {cartItemCount}
                    </span>
                  )}
                </Link>
                <div className="mt-4 mx-4 pt-4 border-t border-border flex flex-col gap-2">
                  <Button variant="outline" className="w-full justify-center rounded-lg">
                    Log in
                  </Button>
                  <Button className="w-full justify-center rounded-lg">
                    Sign up
                  </Button>
                </div>
              </div>
            </SheetContent>
          </Sheet>
        </div>
      </nav>
    </header>
  )
}
