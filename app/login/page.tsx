"use client"

import { useState } from "react"
import { supabase } from "../../lib/supabase"

export default function LoginPage(){

  const [email,setEmail] = useState("")
  const [loading,setLoading] = useState(false)

  const handleLogin = async ()=>{

    setLoading(true)

    const { error } = await supabase.auth.signInWithOtp({
      email,
      options:{
        emailRedirectTo:"http://localhost:3000"
      }
    })

    setLoading(false)

    if(error){
      alert(error.message)
    }else{
      alert("Check your email for login link")
    }

  }

  return(

    <div className="min-h-screen flex items-center justify-center">

      <div className="w-[400px] space-y-6">

        <h1 className="text-3xl font-bold text-center">
          Login
        </h1>

        <input
          type="email"
          placeholder="Email"
          value={email}
          onChange={(e)=>setEmail(e.target.value)}
          className="w-full border p-3 rounded"
        />

        <button
          onClick={handleLogin}
          className="w-full bg-black text-white p-3 rounded"
        >
          {loading ? "Sending..." : "Login"}
        </button>

      </div>

    </div>

  )

}