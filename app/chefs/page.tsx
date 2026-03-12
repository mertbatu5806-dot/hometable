import { supabase } from "../../lib/supabase"
import Image from "next/image"
import Link from "next/link"

export default async function ChefsPage() {

  const { data: chefs } = await supabase
    .from("chefs")
    .select("*")
    .order("rating", { ascending: false })

  return (
    <div className="max-w-6xl mx-auto px-6 py-10">

      <h1 className="text-3xl font-bold mb-8">
        Home Chefs
      </h1>

      <div className="grid grid-cols-3 gap-6">

        {chefs?.map((chef: any) => (

          <Link
            key={chef.id}
            href={`/chef/${chef.slug}`}
            className="border rounded-xl overflow-hidden hover:shadow-lg transition"
          >

            <Image
              src={
                chef.avatar_url ||
                "https://images.unsplash.com/photo-1544723795-3fb6469f5b39"
              }
              width={400}
              height={250}
              alt={chef.name}
              className="w-full h-44 object-cover"
            />

            <div className="p-4">

              <h3 className="font-semibold text-lg">
                {chef.name}
              </h3>

              <p className="text-gray-500 text-sm">
                {chef.location}
              </p>

              <div className="flex gap-3 mt-2 text-sm">

                <span>
                  ⭐ {chef.rating || "New"}
                </span>

                {chef.verified && (
                  <span className="text-green-600">
                    ✔ Verified
                  </span>
                )}

              </div>

            </div>

          </Link>

        ))}

      </div>

    </div>
  )
}