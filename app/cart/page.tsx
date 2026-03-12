"use client"

import Image from "next/image"
import Link from "next/link"
import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Card } from "@/components/ui/card"
import { 
  ArrowLeft, 
  Minus, 
  Plus, 
  Trash2,
  ShoppingBag,
  Calendar,
  MapPin
} from "lucide-react"

// Sample cart data - in production this would come from state/context
const initialCartItems = [
  {
    id: 1,
    name: "Butter Chicken",
    chef: "Raj Patel",
    chefAvatar: "/images/chef-1.jpg",
    price: 18.99,
    image: "/images/dish-1.jpg",
    quantity: 2,
    maxQuantity: 12,
    pickupDate: "Saturday, March 8th",
    pickupTime: "5:00 PM - 7:00 PM",
    pickupLocation: "North York, Toronto"
  },
  {
    id: 2,
    name: "Pappardelle Bolognese",
    chef: "Nonna Rosa",
    chefAvatar: "/images/chef-3.jpg",
    price: 22.99,
    image: "/images/dish-2.jpg",
    quantity: 1,
    maxQuantity: 8,
    pickupDate: "Saturday, March 8th",
    pickupTime: "4:00 PM - 6:00 PM",
    pickupLocation: "Little Italy, Toronto"
  },
  {
    id: 3,
    name: "Korean Bibimbap",
    chef: "Ji-Yeon Kim",
    chefAvatar: "/images/chef-4.jpg",
    price: 16.99,
    image: "/images/dish-3.jpg",
    quantity: 1,
    maxQuantity: 3,
    pickupDate: "Saturday, March 8th",
    pickupTime: "5:00 PM - 7:00 PM",
    pickupLocation: "Koreatown, Toronto"
  }
]

export default function CartPage() {
  const [cartItems, setCartItems] = useState(initialCartItems)

  const updateQuantity = (id: number, delta: number) => {
    setCartItems(items => 
      items.map(item => {
        if (item.id === id) {
          const newQuantity = Math.max(1, Math.min(item.maxQuantity, item.quantity + delta))
          return { ...item, quantity: newQuantity }
        }
        return item
      })
    )
  }

  const removeItem = (id: number) => {
    setCartItems(items => items.filter(item => item.id !== id))
  }

  const subtotal = cartItems.reduce((sum, item) => sum + (item.price * item.quantity), 0)
  const serviceFee = 2.99
  const total = subtotal + serviceFee

  return (
    <main className="min-h-screen bg-background">
      {/* Header */}
      <header className="sticky top-0 z-50 bg-background/95 backdrop-blur-sm border-b border-border">
        <div className="mx-auto max-w-4xl px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between h-16">
            <Link 
              href="/" 
              className="flex items-center gap-2 text-muted-foreground hover:text-foreground transition-colors"
            >
              <ArrowLeft className="h-5 w-5" />
              <span className="text-sm font-medium">Continue shopping</span>
            </Link>
            <div className="flex items-center gap-2">
              <ShoppingBag className="h-5 w-5 text-primary" />
              <span className="font-semibold text-foreground">Your Cart</span>
            </div>
          </div>
        </div>
      </header>

      <div className="mx-auto max-w-4xl px-4 sm:px-6 lg:px-8 py-8">
        {cartItems.length === 0 ? (
          /* Empty Cart State */
          <div className="text-center py-16">
            <div className="w-20 h-20 mx-auto mb-6 flex items-center justify-center bg-muted rounded-full">
              <ShoppingBag className="h-10 w-10 text-muted-foreground" />
            </div>
            <h2 className="text-2xl font-bold text-foreground mb-2">Your cart is empty</h2>
            <p className="text-muted-foreground mb-6">Discover delicious homemade meals from local chefs</p>
            <Link href="/">
              <Button size="lg" className="rounded-2xl px-8">
                Browse Menu
              </Button>
            </Link>
          </div>
        ) : (
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
            {/* Cart Items */}
            <div className="lg:col-span-2 space-y-4">
              <h1 className="text-2xl font-bold text-foreground mb-6">
                Cart ({cartItems.length} {cartItems.length === 1 ? 'item' : 'items'})
              </h1>
              
              {cartItems.map((item) => (
                <Card key={item.id} className="p-4 bg-card border border-border/50 rounded-2xl">
                  <div className="flex gap-4">
                    {/* Food Image */}
                    <div className="relative w-24 h-24 sm:w-28 sm:h-28 rounded-xl overflow-hidden shrink-0 bg-muted">
                      <Image
                        src={item.image}
                        alt={item.name}
                        fill
                        className="object-cover"
                      />
                    </div>
                    
                    {/* Item Details */}
                    <div className="flex-1 min-w-0">
                      <div className="flex items-start justify-between gap-2">
                        <div>
                          <h3 className="font-semibold text-foreground text-lg">{item.name}</h3>
                          <div className="flex items-center gap-2 mt-1">
                            <div className="relative w-5 h-5 rounded-full overflow-hidden ring-1 ring-primary/20">
                              <Image
                                src={item.chefAvatar}
                                alt={item.chef}
                                fill
                                className="object-cover"
                              />
                            </div>
                            <span className="text-sm text-muted-foreground">{item.chef}</span>
                          </div>
                        </div>
                        <Button 
                          variant="ghost" 
                          size="icon"
                          onClick={() => removeItem(item.id)}
                          className="text-muted-foreground hover:text-destructive shrink-0 h-8 w-8"
                        >
                          <Trash2 className="h-4 w-4" />
                        </Button>
                      </div>
                      
                      {/* Pickup Info */}
                      <div className="flex flex-wrap items-center gap-x-4 gap-y-1 mt-3 text-xs text-muted-foreground">
                        <div className="flex items-center gap-1">
                          <Calendar className="h-3 w-3" />
                          <span>{item.pickupDate}</span>
                        </div>
                        <div className="flex items-center gap-1">
                          <MapPin className="h-3 w-3" />
                          <span>{item.pickupLocation}</span>
                        </div>
                      </div>
                      
                      {/* Price & Quantity */}
                      <div className="flex items-center justify-between mt-4">
                        {/* Quantity Selector */}
                        <div className="flex items-center gap-1 bg-muted rounded-full p-0.5">
                          <Button 
                            variant="ghost" 
                            size="icon"
                            onClick={() => updateQuantity(item.id, -1)}
                            disabled={item.quantity <= 1}
                            className="rounded-full h-8 w-8 hover:bg-background disabled:opacity-40"
                          >
                            <Minus className="h-3 w-3" />
                          </Button>
                          <div className="flex items-center justify-center min-w-[60px] px-1">
                            <span className="text-sm font-semibold text-foreground">{item.quantity}</span>
                            <span className="text-xs text-muted-foreground ml-1">
                              {item.quantity === 1 ? 'portion' : 'portions'}
                            </span>
                          </div>
                          <Button 
                            variant="ghost" 
                            size="icon"
                            onClick={() => updateQuantity(item.id, 1)}
                            disabled={item.quantity >= item.maxQuantity}
                            className="rounded-full h-8 w-8 hover:bg-background disabled:opacity-40"
                          >
                            <Plus className="h-3 w-3" />
                          </Button>
                        </div>
                        
                        {/* Price */}
                        <div className="text-right">
                          <span className="text-lg font-bold text-primary">
                            ${(item.price * item.quantity).toFixed(2)}
                          </span>
                          {item.quantity > 1 && (
                            <p className="text-xs text-muted-foreground">
                              ${item.price.toFixed(2)} each
                            </p>
                          )}
                        </div>
                      </div>
                    </div>
                  </div>
                </Card>
              ))}
            </div>

            {/* Order Summary */}
            <div className="lg:col-span-1">
              <div className="sticky top-24">
                <Card className="p-6 bg-card border border-border/50 rounded-2xl">
                  <h2 className="text-lg font-semibold text-foreground mb-4">Order Summary</h2>
                  
                  <div className="space-y-3">
                    <div className="flex items-center justify-between text-sm">
                      <span className="text-muted-foreground">Subtotal</span>
                      <span className="font-medium text-foreground">${subtotal.toFixed(2)}</span>
                    </div>
                    <div className="flex items-center justify-between text-sm">
                      <span className="text-muted-foreground">Service fee</span>
                      <span className="font-medium text-foreground">${serviceFee.toFixed(2)}</span>
                    </div>
                    <div className="border-t border-border pt-3 mt-3">
                      <div className="flex items-center justify-between">
                        <span className="font-semibold text-foreground">Total</span>
                        <span className="text-2xl font-bold text-primary">${total.toFixed(2)}</span>
                      </div>
                    </div>
                  </div>
                  
                  <Button 
                    size="lg" 
                    className="w-full rounded-2xl h-12 text-base font-semibold mt-6"
                  >
                    Checkout
                  </Button>
                  
                  <p className="text-xs text-center text-muted-foreground mt-4">
                    You will pay when picking up your order
                  </p>
                </Card>
                
                {/* Pickup Notice */}
                <Card className="p-4 bg-accent/10 border border-accent/20 rounded-2xl mt-4">
                  <div className="flex items-start gap-3">
                    <Calendar className="h-5 w-5 text-accent shrink-0 mt-0.5" />
                    <div>
                      <p className="text-sm font-medium text-foreground">Multiple pickup locations</p>
                      <p className="text-xs text-muted-foreground mt-1">
                        Your items are from {new Set(cartItems.map(i => i.chef)).size} different chefs. 
                        You will need to pick up from each location.
                      </p>
                    </div>
                  </div>
                </Card>
              </div>
            </div>
          </div>
        )}
      </div>
    </main>
  )
}
