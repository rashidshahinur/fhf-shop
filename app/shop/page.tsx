import { supabase } from "@/src/lib/supabase"
import { Product, Category } from "@/src/types"
import Link from "next/link"

async function getCategories() {
  const { data } = await supabase
    .from("categories")
    .select("*")
    .order("display_order")
  return data as Category[]
}

async function getProducts(category?: string, search?: string) {
  let query = supabase
    .from("products")
    .select("*")
    .eq("is_active", true)
    .order("created_at", { ascending: false })

  if (category) {
    const { data: cat } = await supabase
      .from("categories")
      .select("id")
      .eq("slug", category)
      .single()
    if (cat) query = query.eq("category_id", cat.id)
  }

  if (search) {
    query = query.ilike("name", "%" + search + "%")
  }

  const { data } = await query
  return data as Product[]
}

export default async function ShopPage({
  searchParams,
}: {
  searchParams: Promise<{ category?: string; search?: string }>
}) {
  const params = await searchParams
  const categories = await getCategories()
  const products = await getProducts(params.category, params.search)
  const activeCategory = params.category || "all"

  return (
    <div className="min-h-screen bg-gray-50">

      <div className="bg-green-800 text-white py-10 px-4">
        <div className="max-w-6xl mx-auto">
          <h1 className="text-3xl font-bold mb-2">Our Products</h1>
          <p className="text-green-200 text-sm">
            100% Halal Certified — Delivered anywhere in Japan
          </p>
        </div>
      </div>

      <div className="max-w-6xl mx-auto px-4 py-8">

        <div className="mb-6">
          <form method="GET" action="/shop">
            <div className="flex gap-3">
              <input
                type="text"
                name="search"
                defaultValue={params.search || ""}
                placeholder="Search products... (rice, masala, hilsa...)"
                className="flex-1 bg-white border border-gray-200 rounded-xl px-4 py-3 text-sm focus:outline-none focus:border-green-500"
              />
              <button
                type="submit"
                className="bg-green-700 text-white px-6 py-3 rounded-xl font-semibold text-sm hover:bg-green-800 transition-colors"
              >
                Search
              </button>
            </div>
          </form>
        </div>

        <div className="flex gap-2 flex-wrap mb-8">
          <Link
            href="/shop"
            className={"px-4 py-2 rounded-full text-sm font-semibold transition-colors " +
              (activeCategory === "all"
                ? "bg-green-700 text-white"
                : "bg-white text-gray-600 hover:bg-green-50 border border-gray-200")}
          >
            All Products
          </Link>
          {categories && categories.map((cat) => (
            <Link
              key={cat.id}
              href={"/shop?category=" + cat.slug}
              className={"px-4 py-2 rounded-full text-sm font-semibold transition-colors " +
                (activeCategory === cat.slug
                  ? "bg-green-700 text-white"
                  : "bg-white text-gray-600 hover:bg-green-50 border border-gray-200")}
            >
              {cat.icon} {cat.name}
            </Link>
          ))}
        </div>

        <div className="mb-4 text-sm text-gray-500">
          {products ? products.length : 0} products found
          {params.category && (
            <span className="ml-2 text-green-700 font-semibold">
              in {categories?.find(c => c.slug === params.category)?.name}
            </span>
          )}
          {params.search && (
            <span className="ml-2 text-green-700 font-semibold">
              for "{params.search}"
            </span>
          )}
        </div>

        {products && products.length > 0 ? (
          <div
            className="grid gap-5"
            style={{ gridTemplateColumns: "repeat(auto-fill, minmax(180px, 1fr))" }}
          >
            {products.map((product) => (
              <Link
                key={product.id}
                href={"/shop/" + product.slug}
                className="bg-white rounded-2xl overflow-hidden hover:shadow-lg transition-all hover:-translate-y-1 border border-gray-100 group"
              >
                <div className="bg-green-50 h-44 flex items-center justify-center relative">
                  {product.image_url ? (
                    <img
                      src={product.image_url}
                      alt={product.name}
                      className="w-full h-full object-cover"
                    />
                  ) : (
                    <span className="text-5xl">🛍️</span>
                  )}
                  <div className="absolute top-2 right-2 bg-green-700 text-white text-xs px-2 py-0.5 rounded-full font-semibold">
                    Halal
                  </div>
                </div>
                <div className="p-4">
                  <div className="text-xs text-gray-400 mb-1">{product.country}</div>
                  <div className="text-sm font-semibold text-gray-800 mb-1 leading-tight group-hover:text-green-700 transition-colors">
                    {product.name}
                  </div>
                  <div className="text-xs text-gray-400 mb-3">{product.weight}</div>
                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-2">
                      {product.original_price && (
                        <span className="text-xs text-gray-400 line-through">
                          ¥{product.original_price.toLocaleString()}
                        </span>
                      )}
                      <span className="text-green-700 font-bold text-base">
                        ¥{product.price.toLocaleString()}
                      </span>
                    </div>
                    <span className="text-xs text-gray-400">{product.halal_certifier}</span>
                  </div>
                </div>
              </Link>
            ))}
          </div>
        ) : (
          <div className="text-center py-20">
            <div className="text-5xl mb-4">🔍</div>
            <h3 className="text-lg font-semibold text-gray-700 mb-2">No products found</h3>
            <p className="text-gray-400 text-sm mb-6">Try a different search or browse all categories</p>
            <Link href="/shop" className="bg-green-700 text-white px-6 py-2.5 rounded-xl font-semibold text-sm hover:bg-green-800 transition-colors">
              View All Products
            </Link>
          </div>
        )}

      </div>
    </div>
  )
}