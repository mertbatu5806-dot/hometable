"use client"

import Image from "next/image"
import Link from "next/link"
import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Card } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Textarea } from "@/components/ui/textarea"
import { 
  ArrowLeft, 
  Calendar,
  MapPin,
  Clock,
  User,
  Phone,
  Mail,
  FileText,
  CreditCard,
  Check,
  Shield
} from "lucide-react"

// Sample order data - in production this would come from cart state/context
const orderItems = [
  {
    id: 1,
    name: "Butter Chicken",
    chef: "Raj Patel",
    chefAvatar: "/images/chef-1.jpg",
    price: 18.99,
    image: "/images/dish-1.jpg",
    quantity: 2,
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
    pickupDate: "Saturday, March 8th",
    pickupTime: "4:00 PM - 6:00 PM",
    pickupLocation: "Little Italy, Toronto"
  }
]

export default function CheckoutPage() {
  const [formData, setFormData] = useState({
    name: "",
    phone: "",
    email: "",
    pickupNotes: ""
  })

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target
    setFormData(prev => ({ ...prev, [name]: value }))
  }

  const subtotal = orderItems.reduce((sum, item) => sum + (item.price * item.quantity), 0)
  const serviceFee = 2.99
  const total = subtotal + serviceFee

  // Group items by pickup location
  const pickupLocations = orderItems.reduce((acc, item) => {
    const key = `${item.pickupLocation}-${item.pickupTime}`
    if (!acc[key]) {
      acc[key] = {
        location: item.pickupLocation,
        date: item.pickupDate,
        time: item.pickupTime,
        items: []
      }
    }
    acc[key].items.push(item)
    return acc
  }, {} as Record<string, { location: string; date: string; time: string; items: typeof orderItems }>)

  return (
    <main className="min-h-screen bg-background">
      {/* Header */}
      <header className="sticky top-0 z-50 bg-background/95 backdrop-blur-sm border-b border-border">
        <div className="mx-auto max-w-5xl px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between h-16">
            <Link 
              href="/cart" 
              className="flex items-center gap-2 text-muted-foreground hover:text-foreground transition-colors"
            >
              <ArrowLeft className="h-5 w-5" />
              <span className="text-sm font-medium">Back to cart</span>
            </Link>
            <div className="flex items-center gap-2">
              <Shield className="h-5 w-5 text-primary" />
              <span className="font-semibold text-foreground">Secure Checkout</span>
            </div>
          </div>
        </div>
      </header>

      <div className="mx-auto max-w-5xl px-4 sm:px-6 lg:px-8 py-8">
        <div className="grid grid-cols-1 lg:grid-cols-5 gap-8">
          {/* Main Checkout Form */}
          <div className="lg:col-span-3 space-y-6">
            <h1 className="text-2xl font-bold text-foreground">Complete your preorder</h1>

            {/* Step 1: Order Summary */}
            <Card className="p-6 bg-card border border-border/50 rounded-2xl">
              <div className="flex items-center gap-3 mb-5">
                <div className="w-8 h-8 flex items-center justify-center bg-primary text-primary-foreground rounded-full text-sm font-semibold">
                  1
                </div>
                <h2 className="text-lg font-semibold text-foreground">Order Summary</h2>
              </div>
              
              <div className="space-y-4">
                {orderItems.map((item) => (
                  <div key={item.id} className="flex gap-4 pb-4 border-b border-border/50 last:border-0 last:pb-0">
                    <div className="relative w-16 h-16 rounded-xl overflow-hidden shrink-0 bg-muted">
                      <Image
                        src={item.image}
                        alt={item.name}
                        fill
                        className="object-cover"
                      />
                    </div>
                    <div className="flex-1 min-w-0">
                      <div className="flex items-start justify-between">
                        <div>
                          <h3 className="font-medium text-foreground">{item.name}</h3>
                          <p className="text-sm text-muted-foreground">by {item.chef}</p>
                        </div>
                        <span className="font-semibold text-foreground">
                          ${(item.price * item.quantity).toFixed(2)}
                        </span>
                      </div>
                      <p className="text-sm text-muted-foreground mt-1">
                        {item.quantity} {item.quantity === 1 ? 'portion' : 'portions'} x ${item.price.toFixed(2)}
                      </p>
                    </div>
                  </div>
                ))}
              </div>
            </Card>

            {/* Step 2: Pickup Confirmation */}
            <Card className="p-6 bg-card border border-border/50 rounded-2xl">
              <div className="flex items-center gap-3 mb-5">
                <div className="w-8 h-8 flex items-center justify-center bg-primary text-primary-foreground rounded-full text-sm font-semibold">
                  2
                </div>
                <h2 className="text-lg font-semibold text-foreground">Pickup Details</h2>
              </div>
              
              <div className="space-y-4">
                {Object.values(pickupLocations).map((pickup, index) => (
                  <div 
                    key={index} 
                    className="p-4 bg-muted/50 rounded-xl border border-border/30"
                  >
                    <div className="flex items-start gap-3 mb-3">
                      <div className="w-10 h-10 flex items-center justify-center bg-primary/10 rounded-xl shrink-0">
                        <MapPin className="h-5 w-5 text-primary" />
                      </div>
                      <div>
                        <p className="font-semibold text-foreground">{pickup.location}</p>
                        <div className="flex items-center gap-4 mt-1 text-sm text-muted-foreground">
                          <div className="flex items-center gap-1">
                            <Calendar className="h-3.5 w-3.5" />
                            <span>{pickup.date}</span>
                          </div>
                          <div className="flex items-center gap-1">
                            <Clock className="h-3.5 w-3.5" />
                            <span>{pickup.time}</span>
                          </div>
                        </div>
                      </div>
                    </div>
                    <div className="flex flex-wrap gap-2 mt-3 pt-3 border-t border-border/30">
                      {pickup.items.map((item) => (
                        <span 
                          key={item.id}
                          className="px-3 py-1 bg-background rounded-full text-xs font-medium text-foreground"
                        >
                          {item.quantity}x {item.name}
                        </span>
                      ))}
                    </div>
                  </div>
                ))}
              </div>
            </Card>

            {/* Step 3: Customer Information */}
            <Card className="p-6 bg-card border border-border/50 rounded-2xl">
              <div className="flex items-center gap-3 mb-5">
                <div className="w-8 h-8 flex items-center justify-center bg-primary text-primary-foreground rounded-full text-sm font-semibold">
                  3
                </div>
                <h2 className="text-lg font-semibold text-foreground">Your Information</h2>
              </div>
              
              <div className="space-y-4">
                {/* Name */}
                <div>
                  <label className="flex items-center gap-2 text-sm font-medium text-foreground mb-2">
                    <User className="h-4 w-4 text-muted-foreground" />
                    Full Name
                  </label>
                  <Input
                    type="text"
                    name="name"
                    value={formData.name}
                    onChange={handleInputChange}
                    placeholder="Enter your full name"
                    className="rounded-xl h-12"
                  />
                </div>

                {/* Phone */}
                <div>
                  <label className="flex items-center gap-2 text-sm font-medium text-foreground mb-2">
                    <Phone className="h-4 w-4 text-muted-foreground" />
                    Phone Number
                  </label>
                  <Input
                    type="tel"
                    name="phone"
                    value={formData.phone}
                    onChange={handleInputChange}
                    placeholder="(416) 555-0123"
                    className="rounded-xl h-12"
                  />
                </div>

                {/* Email */}
                <div>
                  <label className="flex items-center gap-2 text-sm font-medium text-foreground mb-2">
                    <Mail className="h-4 w-4 text-muted-foreground" />
                    Email Address
                  </label>
                  <Input
                    type="email"
                    name="email"
                    value={formData.email}
                    onChange={handleInputChange}
                    placeholder="you@example.com"
                    className="rounded-xl h-12"
                  />
                </div>

                {/* Pickup Notes */}
                <div>
                  <label className="flex items-center gap-2 text-sm font-medium text-foreground mb-2">
                    <FileText className="h-4 w-4 text-muted-foreground" />
                    Pickup Notes <span className="text-muted-foreground font-normal">(optional)</span>
                  </label>
                  <Textarea
                    name="pickupNotes"
                    value={formData.pickupNotes}
                    onChange={handleInputChange}
                    placeholder="Any special instructions for pickup? (e.g., call when arriving, preferred container type)"
                    className="rounded-xl min-h-[100px] resize-none"
                  />
                </div>
              </div>
            </Card>

            {/* Step 4: Payment */}
            <Card className="p-6 bg-card border border-border/50 rounded-2xl">
              <div className="flex items-center gap-3 mb-5">
                <div className="w-8 h-8 flex items-center justify-center bg-primary text-primary-foreground rounded-full text-sm font-semibold">
                  4
                </div>
                <h2 className="text-lg font-semibold text-foreground">Payment</h2>
              </div>
              
              <div className="p-4 bg-accent/10 border border-accent/20 rounded-xl">
                <div className="flex items-start gap-3">
                  <div className="w-10 h-10 flex items-center justify-center bg-accent/20 rounded-xl shrink-0">
                    <CreditCard className="h-5 w-5 text-accent" />
                  </div>
                  <div>
                    <p className="font-semibold text-foreground">Pay on Pickup</p>
                    <p className="text-sm text-muted-foreground mt-1">
                      You will pay directly to the chef when you pick up your order. 
                      Cash, e-transfer, or card accepted (varies by chef).
                    </p>
                  </div>
                </div>
              </div>

              <div className="mt-4 flex items-center gap-2 text-sm text-muted-foreground">
                <Shield className="h-4 w-4 text-primary" />
                <span>Your information is secure and will only be shared with the chefs</span>
              </div>
            </Card>
          </div>

          {/* Order Summary Sidebar */}
          <div className="lg:col-span-2">
            <div className="sticky top-24">
              <Card className="p-6 bg-card border border-border/50 rounded-2xl">
                <h2 className="text-lg font-semibold text-foreground mb-4">Order Total</h2>
                
                <div className="space-y-3">
                  {orderItems.map((item) => (
                    <div key={item.id} className="flex items-center justify-between text-sm">
                      <span className="text-muted-foreground">
                        {item.quantity}x {item.name}
                      </span>
                      <span className="font-medium text-foreground">
                        ${(item.price * item.quantity).toFixed(2)}
                      </span>
                    </div>
                  ))}
                  
                  <div className="border-t border-border pt-3 mt-3">
                    <div className="flex items-center justify-between text-sm">
                      <span className="text-muted-foreground">Subtotal</span>
                      <span className="font-medium text-foreground">${subtotal.toFixed(2)}</span>
                    </div>
                    <div className="flex items-center justify-between text-sm mt-2">
                      <span className="text-muted-foreground">Service fee</span>
                      <span className="font-medium text-foreground">${serviceFee.toFixed(2)}</span>
                    </div>
                  </div>
                  
                  <div className="border-t border-border pt-3 mt-3">
                    <div className="flex items-center justify-between">
                      <span className="font-semibold text-foreground">Total</span>
                      <span className="text-2xl font-bold text-primary">${total.toFixed(2)}</span>
                    </div>
                    <p className="text-xs text-muted-foreground mt-1">Due at pickup</p>
                  </div>
                </div>
                
                {/* Confirm Button */}
                <Button 
                  size="lg" 
                  className="w-full rounded-2xl h-14 text-base font-semibold mt-6"
                >
                  <Check className="mr-2 h-5 w-5" />
                  Confirm Preorder
                </Button>
                
                <p className="text-xs text-center text-muted-foreground mt-4">
                  By confirming, you agree to pick up your order at the specified times and locations
                </p>
              </Card>

              {/* Trust Badges */}
              <div className="mt-4 flex items-center justify-center gap-4 text-xs text-muted-foreground">
                <div className="flex items-center gap-1">
                  <Shield className="h-3.5 w-3.5" />
                  <span>Secure</span>
                </div>
                <div className="flex items-center gap-1">
                  <Check className="h-3.5 w-3.5" />
                  <span>Verified Chefs</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </main>
  )
}
