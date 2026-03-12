"use client"

import Image from "next/image"
import Link from "next/link"
import { useState, useEffect } from "react"
import { useParams } from "next/navigation"
import { supabase } from "../../../lib/supabase"

import { Button } from "@/components/ui/button"
import { Card } from "@/components/ui/card"

import {
  ArrowLeft,
  Star,
  Minus,
  Plus,
  ShoppingBag
} from "lucide-react"

export default function DishDetailPage() {

  const params = useParams()
  const dishId = params.id

  const [dish, setDish] = useState<any>(null)
  const [quantity, setQuantity] = useState(1)

  useEffect(() => {
    loadDish()
  }, [])

  const loadDish = async () => {

    const { data, error } = await supabase
      .from("dishes")
      .select("*")
      .eq("id", dishId)
      .single()

    if (!error) {
      setDish(data)
    }
  }

  const handlePreorder = async () => {

    const { data: { user } } = await supabase.auth.getUser()

    if (!user) {
      alert("Please login first")
      return
    }

    const { error } = await supabase
      .from("orders")
      .insert([
        {
          user_id: user.id,
          dish_id: dish.id,
          portions: quantity,
          status: "pending"
        }
      ])

    if (error) {
      console.error(error)
      alert("Order failed")
    } else {
      alert("Order placed!")
    }
  }

  if (!dish) {
    return <div className="p-10 text-center">Loading...</div>
  }

  const totalPrice = dish.price * quantity

  return (
    <main className="max-w-5xl mx-auto px-4 py-10">

      <Link
        href="/dishes"
        className="flex items-center gap-2 text-sm mb-6"
      >
        <ArrowLeft size={16} />
        Back
      </Link>

      <div className="grid md:grid-cols-2 gap-10">

        <div className="relative w-full h-[400px] rounded-xl overflow-hidden">
          <Image
            src={dish.image_url}
            alt={dish.title}
            fill
            className="object-cover"
          />
        </div>

        <div className="space-y-6">

          <h1 className="text-3xl font-bold">
            {dish.title}
          </h1>

          <p className="text-muted-foreground">
            {dish.description}
          </p>

          <div className="flex items-center gap-2">
            <Star className="fill-yellow-400 text-yellow-400" size={18} />
            <span>4.9</span>
          </div>

          <div className="text-2xl font-bold">
            ${dish.price}
          </div>

          <Card className="p-4 flex items-center justify-between">

            <Button
              variant="outline"
              size="icon"
              onClick={() => setQuantity(Math.max(1, quantity - 1))}
            >
              <Minus size={16} />
            </Button>

            <span className="text-lg font-semibold">
              {quantity}
            </span>

            <Button
              variant="outline"
              size="icon"
              onClick={() => setQuantity(quantity + 1)}
            >
              <Plus size={16} />
            </Button>

          </Card>

          <Button
            onClick={handlePreorder}
            className="w-full h-12 text-lg"
          >
            <ShoppingBag className="mr-2" size={18} />
            Preorder ${totalPrice}
          </Button>

        </div>

      </div>

    </main>
  )
}