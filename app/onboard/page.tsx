"use client"

import { useState } from "react"
import { supabase } from "../../lib/supabase"
import { useRouter } from "next/navigation"

export default function Onboard(){

const [name,setName] = useState("")
const [bio,setBio] = useState("")

const router = useRouter()

const createChef = async()=>{

const { data:{ user } } = await supabase.auth.getUser()

await supabase
.from("chefs")
.insert([
{
id:user.id,
name,
slug:name.toLowerCase().replaceAll(" ","-"),
bio
}
])

router.push("/dashboard")

}

return(

<div className="max-w-xl mx-auto p-10 space-y-6">

<h1 className="text-3xl font-bold">
Create Chef Profile
</h1>

<input
placeholder="Chef Name"
value={name}
onChange={(e)=>setName(e.target.value)}
className="w-full border p-3 rounded"
/>

<textarea
placeholder="Chef Story"
value={bio}
onChange={(e)=>setBio(e.target.value)}
className="w-full border p-3 rounded"
/>

<button
onClick={createChef}
className="bg-black text-white p-3 rounded w-full"
>
Create Profile
</button>

</div>

)

}