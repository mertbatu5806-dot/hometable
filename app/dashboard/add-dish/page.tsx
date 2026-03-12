"use client"

import { useState } from "react"
import { supabase } from "../../../lib/supabase"
import { useRouter } from "next/navigation"

export default function AddDishPage(){

  const router = useRouter()

  const [title,setTitle] = useState("")
  const [description,setDescription] = useState("")
  const [price,setPrice] = useState("")
  const [file,setFile] = useState<File | null>(null)

  async function handleSubmit(){

    if(!file){
      alert("select image")
      return
    }

    const fileName = Date.now() + "-" + file.name

    const { error: uploadError } = await supabase
      .storage
      .from("dishes")
      .upload(fileName,file)

    if(uploadError){
      alert(uploadError.message)
      return
    }

    const { data } = supabase
      .storage
      .from("dishes")
      .getPublicUrl(fileName)

    const imageUrl = data.publicUrl

    const { error } = await supabase
      .from("dishes")
      .insert({
        title,
        description,
        price,
        image_url:imageUrl
      })

    if(error){
      alert(error.message)
      return
    }

    router.push("/")

  }

  return(

    <div className="max-w-xl mx-auto py-20">

      <h1 className="text-3xl font-bold mb-6">
        Add Dish
      </h1>

      <input
        className="border p-3 w-full mb-3"
        placeholder="Dish title"
        onChange={(e)=>setTitle(e.target.value)}
      />

      <textarea
        className="border p-3 w-full mb-3"
        placeholder="Description"
        onChange={(e)=>setDescription(e.target.value)}
      />

      <input
        className="border p-3 w-full mb-3"
        placeholder="Price"
        type="number"
        onChange={(e)=>setPrice(e.target.value)}
      />

      <input
        type="file"
        className="mb-4"
        onChange={(e)=>setFile(e.target.files?.[0] || null)}
      />

      <button
        onClick={handleSubmit}
        className="bg-black text-white px-6 py-3 w-full"
      >
        Add Dish
      </button>

    </div>

  )

}