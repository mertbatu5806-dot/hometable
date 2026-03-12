"use client"

import { useState } from "react"
import { supabase } from "../../lib/supabase"
import { useRouter } from "next/navigation"

export default function BecomeChef() {

  const router = useRouter()

  const [name,setName] = useState("")
  const [bio,setBio] = useState("")
  const [location,setLocation] = useState("")
  const [avatar,setAvatar] = useState("")
  const [slug,setSlug] = useState("")

  async function createChef(){

    const { error } = await supabase
      .from("chefs")
      .insert({
        name,
        bio,
        location,
        avatar_url: avatar,
        slug
      })

    if(error){
      alert(error.message)
      return
    }

    router.push(`/chef/${slug}`)
  }

  return (
    <div className="max-w-xl mx-auto py-20">

      <h1 className="text-3xl font-bold mb-6">
        Become a Home Chef
      </h1>

      <input
        placeholder="Name"
        className="border p-3 w-full mb-3"
        onChange={(e)=>setName(e.target.value)}
      />

      <input
        placeholder="Location"
        className="border p-3 w-full mb-3"
        onChange={(e)=>setLocation(e.target.value)}
      />

      <input
        placeholder="Avatar URL"
        className="border p-3 w-full mb-3"
        onChange={(e)=>setAvatar(e.target.value)}
      />

      <input
        placeholder="Slug (ex: mert)"
        className="border p-3 w-full mb-3"
        onChange={(e)=>setSlug(e.target.value)}
      />

      <textarea
        placeholder="Bio"
        className="border p-3 w-full mb-4"
        onChange={(e)=>setBio(e.target.value)}
      />

      <button
        onClick={createChef}
        className="bg-black text-white px-6 py-3 w-full"
      >
        Create Chef Profile
      </button>

    </div>
  )
}