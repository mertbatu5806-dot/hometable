import { supabase } from "../../../lib/supabase"
import Image from "next/image"
import Link from "next/link"

export default async function ChefPage(props: any) {

  const params = await props.params
  const slug = params.slug

  const { data: chef } = await supabase
    .from("chefs")
    .select("*")
    .eq("slug", slug)
    .single()

  if (!chef) {
    return (
      <div className="text-center py-20">
        <h1 className="text-2xl font-bold">Chef not found</h1>
      </div>
    )
  }

  const { data: dishes } = await supabase
    .from("dishes")
    .select("*")
    .eq("chef_id", chef.id)

  return (
    <div className="max-w-6xl mx-auto px-6 py-10">

      {/* Chef Header */}

      <div className="flex items-center gap-6 mb-10">

        <Image
          src={chef.avatar_url || "https://images.unsplash.com/photo-1544723795-3fb6469f5b39"}
          width={120}
          height={120}
          alt="chef"
          className="rounded-full object-cover"
        />

        <div>

          <h1 className="text-3xl font-bold">
            {chef.name}
          </h1>

          <p className="text-gray-500">
            {chef.location}
          </p>

          <div className="flex gap-4 mt-3 text-sm">

            <span>
              ⭐ {chef.rating || "New"}
            </span>

            <span>
              🍽 {dishes?.length || 0} dishes
            </span>

            {chef.verified && (
              <span className="text-green-600 font-medium">
                ✔ Verified Chef
              </span>
            )}

          </div>

        </div>

      </div>

      {/* Bio */}

      <div className="mb-10">

        <h2 className="text-xl font-semibold mb-3">
          About the Chef
        </h2>

        <p className="text-gray-700">
          {chef.bio}
        </p>

      </div>

      {/* Dishes */}

      <h2 className="text-xl font-semibold mb-6">
        Dishes by {chef.name}
      </h2>

      <div className="grid grid-cols-3 gap-6">

        {dishes?.map((dish:any) => (

          <Link
            key={dish.id}
            href={`/dish/${dish.id}`}
            className="border rounded-xl overflow-hidden hover:shadow-lg transition"
          >

            <Image
              src={dish.image_url}
              width={400}
              height={250}
              alt={dish.title}
              className="w-full h-44 object-cover"
            />

            <div className="p-4">

              <h3 className="font-semibold">
                {dish.title}
              </h3>

              <p className="text-gray-500 text-sm">
                {dish.description}
              </p>

              <p className="font-semibold mt-2">
                ${dish.price}
              </p>

            </div>

          </Link>

        ))}

      </div>

    </div>
  )
}