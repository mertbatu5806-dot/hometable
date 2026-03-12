"use client"

import { useEffect,useState } from "react"
import { supabase } from "../../lib/supabase"

export default function OrdersPage(){

  const [orders,setOrders] = useState([])

  useEffect(()=>{

    loadOrders()

  },[])

  const loadOrders = async ()=>{

    const { data } = await supabase
      .from("orders")
      .select(`
        id,
        portions,
        status,
        dishes (
          title,
          price
        )
      `)

    setOrders(data || [])

  }

  return(

    <div className="max-w-4xl mx-auto p-10 space-y-6">

      <h1 className="text-3xl font-bold">
        Your Orders
      </h1>

      {orders.map((order:any)=>(
        <div
          key={order.id}
          className="border p-4 rounded"
        >

          <p className="font-semibold">
            {order.dishes.title}
          </p>

          <p>
            Portions: {order.portions}
          </p>

          <p>
            Status: {order.status}
          </p>

        </div>
      ))}

    </div>

  )

}