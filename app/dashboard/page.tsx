import { redirect } from "next/navigation"
import { supabase } from "../../lib/supabase"

export default async function DashboardPage() {

  const { data:{ user } } = await supabase.auth.getUser()

  if(!user){
    redirect("/login")
  }

  async function createDish(formData:FormData){

    "use server"

    const title = formData.get("title")
    const description = formData.get("description")
    const price = formData.get("price")
    const pickup_date = formData.get("pickup_date")
    const image_url = formData.get("image_url")

    await supabase
      .from("dishes")
      .insert([
        {
          title,
          description,
          price,
          pickup_date,
          image_url,
          chef_id:user.id
        }
      ])

  }

  return (

    <main className="max-w-3xl mx-auto p-10 space-y-10">

      <h1 className="text-3xl font-bold">
        Chef Dashboard
      </h1>

      <form action={createDish} className="space-y-6">

        <input
          name="title"
          placeholder="Dish title"
          required
          className="w-full border p-3 rounded"
        />

        <textarea
          name="description"
          placeholder="Description"
          required
          className="w-full border p-3 rounded"
        />

        <input
          name="price"
          type="number"
          placeholder="Price"
          required
          className="w-full border p-3 rounded"
        />

        <input
          name="pickup_date"
          type="datetime-local"
          required
          className="w-full border p-3 rounded"
        />

        <input
          name="image_url"
          placeholder="Image URL"
          required
          className="w-full border p-3 rounded"
        />

        <button
          type="submit"
          className="w-full bg-black text-white p-3 rounded"
        >
          Create Dish
        </button>

      </form>

    </main>

  )

}