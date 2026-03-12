"use client"

import Image from "next/image"
import { Button } from "@/components/ui/button"
import { ChefHat, ArrowRight, Sparkles } from "lucide-react"

export function CTASection() {
  return (
    <section className="py-32 px-6 lg:px-8">
      <div className="mx-auto max-w-6xl">
        <div className="relative overflow-hidden rounded-[2.5rem] shadow-2xl">
          {/* Background image */}
          <div className="absolute inset-0 z-0">
            <Image
              src="/images/hero-food.jpg"
              alt="Delicious homemade food"
              fill
              className="object-cover"
            />
            <div className="absolute inset-0 bg-gradient-to-br from-primary/95 via-primary/90 to-primary/95" />
          </div>
          
          {/* Decorative elements */}
          <div className="absolute top-0 left-0 w-96 h-96 bg-primary-foreground/10 rounded-full -translate-x-1/2 -translate-y-1/2 blur-3xl" />
          <div className="absolute bottom-0 right-0 w-[500px] h-[500px] bg-accent/20 rounded-full translate-x-1/3 translate-y-1/3 blur-3xl" />
          <div className="absolute top-1/2 left-1/4 w-64 h-64 bg-primary-foreground/5 rounded-full blur-2xl animate-float" />
          
          <div className="relative z-10 px-8 py-20 sm:px-16 sm:py-28 lg:py-32">
            <div className="max-w-3xl mx-auto text-center">
              {/* Badge */}
              <div className="inline-flex items-center gap-2 px-4 py-2 bg-primary-foreground/10 rounded-full border border-primary-foreground/20 mb-8">
                <Sparkles className="h-4 w-4 text-accent" />
                <span className="text-sm font-medium text-primary-foreground">New chefs joining weekly</span>
              </div>
              
              <div className="mx-auto w-20 h-20 flex items-center justify-center bg-primary-foreground/10 rounded-3xl mb-10 backdrop-blur-sm border border-primary-foreground/20 shadow-lg">
                <ChefHat className="w-10 h-10 text-primary-foreground" />
              </div>
              
              <h2 className="text-4xl font-bold tracking-tight text-primary-foreground sm:text-5xl lg:text-6xl text-balance">
                Ready to taste the difference?
              </h2>
              <p className="mt-8 text-xl leading-relaxed text-primary-foreground/80 max-w-2xl mx-auto text-pretty">
                Join thousands of Toronto food lovers who&apos;ve discovered the joy of authentic homemade meals from talented home chefs in their community.
              </p>
              
              <div className="mt-12 flex flex-col sm:flex-row items-center justify-center gap-5">
                <Button 
                  size="lg" 
                  className="bg-primary-foreground text-primary hover:bg-primary-foreground/90 rounded-2xl px-10 py-7 font-semibold text-lg group shadow-xl hover:shadow-2xl transition-all hover:scale-[1.02]"
                >
                  Explore Meals
                  <ArrowRight className="ml-2 h-5 w-5 transition-transform group-hover:translate-x-1" />
                </Button>
                <Button 
                  size="lg" 
                  variant="outline" 
                  className="rounded-2xl px-10 py-7 font-semibold text-lg border-2 border-primary-foreground/30 text-primary-foreground hover:bg-primary-foreground/10 hover:text-primary-foreground hover:border-primary-foreground/50 transition-all"
                >
                  Become a Chef
                </Button>
              </div>
              
              {/* Trust badges */}
              <div className="mt-14 flex flex-wrap items-center justify-center gap-8 text-primary-foreground/70">
                <div className="flex items-center gap-2">
                  <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 20 20">
                    <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
                  </svg>
                  <span className="text-sm font-medium">Free to join</span>
                </div>
                <div className="flex items-center gap-2">
                  <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 20 20">
                    <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
                  </svg>
                  <span className="text-sm font-medium">No subscription required</span>
                </div>
                <div className="flex items-center gap-2">
                  <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 20 20">
                    <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
                  </svg>
                  <span className="text-sm font-medium">Order anytime</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}
