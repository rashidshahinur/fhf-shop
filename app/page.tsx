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

async function getFeaturedProducts() {
  const { data } = await supabase
    .from("products")
    .select("*")
    .eq("is_featured", true)
    .eq("is_active", true)
    .limit(8)
  return data as Product[]
}

async function getLatestProducts() {
  const { data } = await supabase
    .from("products")
    .select("*")
    .eq("is_active", true)
    .order("created_at", { ascending: false })
    .limit(4)
  return data as Product[]
}

export default async function HomePage() {
  const categories = await getCategories()
  const featuredProducts = await getFeaturedProducts()
  const latestProducts = await getLatestProducts()

  return (
    <div>

      <section className="bg-green-800 text-white py-16 px-4">
        <div className="max-w-6xl mx-auto text-center">
          <div className="inline-block bg-yellow-500 bg-opacity-20 border border-yellow-400 text-yellow-300 text-xs font-semibold px-4 py-1.5 rounded-full mb-6 uppercase tracking-wider">
            Halal Certified — Japan Delivery Available
          </div>
          <h1 className="text-4xl md:text-6xl font-bold mb-6 leading-tight">
            Your Trusted Halal Store in Japan
          </h1>
          <p className="text-lg text-green-200 max-w-xl mx-auto mb-8">
            Authentic halal products from Bangladesh, Indonesia, and beyond.
            Delivered to your door anywhere in Japan.
          </p>
          <div className="flex gap-4 justify-center flex-wrap">
            <Link href="/shop" className="bg-yellow-500 text-white font-bold px-8 py-3 rounded-xl hover:bg-yellow-600 transition-colors">
              Shop Now
            </Link>
            <Link href="/how-to-order" className="border-2 border-white text-white font-bold px-8 py-3 rounded-xl hover:bg-white hover:text-green-800 transition-colors">
              How to Order
            </Link>
          </div>
        </div>
      </section>

      <div className="bg-green-700 text-white">
        <div className="max-w-6xl mx-auto px-4 py-3 flex flex-wrap justify-center gap-6 text-sm font-medium">
          <span>100% Halal Certified</span>
          <span>|</span>
          <span>Nationwide Japan Delivery</span>
          <span>|</span>
          <span>Physical Store in Japan</span>
          <span>|</span>
          <span>LINE Support Available</span>
          <span>|</span>
          <span>Cash on Delivery</span>
        </div>
      </div>

      <section className="py-14 px-4">
        <div className="max-w-6xl mx-auto">
          <div className="flex items-end justify-between mb-8">
            <h2 className="text-2xl md:text-3xl font-bold text-gray-800">
              Shop by Category
            </h2>
            <Link href="/shop" className="text-green-700 font-semibold text-sm hover:underline">
              View All
            </Link>
          </div>
          <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-4">
            {categories && categories.map((cat) => (
              <Link
                key={cat.id}
                href={"/shop?category=" + cat.slug}
                className="bg-white rounded-2xl p-5 text-center shadow-sm hover:shadow-md transition-all hover:-translate-y-1 border border-gray-100"
              >
                <div className="text-4xl mb-3">{cat.icon}</div>
                <div className="text-sm font-semibold text-gray-800">{cat.name}</div>
              </Link>
            ))}
          </div>
        </div>
      </section>

      <section className="px-4 mb-14">
        <div className="max-w-6xl mx-auto">
          <div className="bg-yellow-500 rounded-2xl p-8 md:p-12 flex flex-col md:flex-row items-center justify-between gap-6">
            <div>
              <h2 className="text-2xl md:text-3xl font-bold text-white mb-2">
                Ramadan Special Offer
              </h2>
              <p className="text-yellow-100 text-sm md:text-base max-w-md">
                Stock up for Ramadan! Special bundles on dates, rice, spices and more.
              </p>
              <Link href="/shop" className="inline-block mt-4 bg-white text-yellow-600 font-bold px-6 py-2.5 rounded-xl hover:bg-yellow-50 transition-colors">
                See Ramadan Deals
              </Link>
            </div>
            <div className="bg-white rounded-2xl px-8 py-4 text-center flex-shrink-0">
              <div className="text-yellow-500 font-black text-4xl">20%</div>
              <div className="text-gray-500 text-sm font-semibold">OFF</div>
            </div>
          </div>
        </div>
      </section>

      <section className="py-14 px-4 bg-white">
        <div className="max-w-6xl mx-auto">
          <div className="flex items-end justify-between mb-8">
            <h2 className="text-2xl md:text-3xl font-bold text-gray-800">
              Most Popular
            </h2>
            <Link href="/shop" className="text-green-700 font-semibold text-sm hover:underline">
              View All
            </Link>
          </div>
          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-5">
            {featuredProducts && featuredProducts.map((product) => (
              <Link
                key={product.id}
                href={"/shop/" + product.slug}
                className="bg-gray-50 rounded-2xl overflow-hidden hover:shadow-lg transition-all hover:-translate-y-1 border border-gray-100"
              >
                <div className="bg-green-50 h-40 flex items-center justify-center text-5xl">
                  <span>🛍️</span>
                </div>
                <div className="p-4">
                  <div className="text-xs text-gray-400 mb-1">{product.country}</div>
                  <div className="text-sm font-semibold text-gray-800 mb-1 leading-tight">{product.name}</div>
                  <div className="text-xs text-gray-400 mb-3">{product.weight}</div>
                  <div className="flex items-center justify-between">
                    <span className="text-green-700 font-bold text-base">
                      ¥{product.price.toLocaleString()}
                    </span>
                    <span className="bg-green-700 text-white text-xs px-2 py-1 rounded-lg font-semibold">
                      Halal
                    </span>
                  </div>
                </div>
              </Link>
            ))}
          </div>
        </div>
      </section>

      <section className="py-14 px-4">
        <div className="max-w-6xl mx-auto">
          <div className="flex items-end justify-between mb-8">
            <h2 className="text-2xl md:text-3xl font-bold text-gray-800">
              Latest Arrivals
            </h2>
            <Link href="/shop" className="text-green-700 font-semibold text-sm hover:underline">
              View All
            </Link>
          </div>
          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-5">
            {latestProducts && latestProducts.map((product) => (
              <Link
                key={product.id}
                href={"/shop/" + product.slug}
                className="bg-white rounded-2xl overflow-hidden hover:shadow-lg transition-all hover:-translate-y-1 border border-gray-100"
              >
                <div className="bg-green-50 h-40 flex items-center justify-center text-5xl">
                  <span>🆕</span>
                </div>
                <div className="p-4">
                  <div className="text-xs text-green-600 font-semibold mb-1">New Arrival</div>
                  <div className="text-sm font-semibold text-gray-800 mb-1 leading-tight">{product.name}</div>
                  <div className="text-xs text-gray-400 mb-3">{product.weight}</div>
                  <div className="flex items-center justify-between">
                    <span className="text-green-700 font-bold text-base">
                      ¥{product.price.toLocaleString()}
                    </span>
                    <span className="bg-green-700 text-white text-xs px-2 py-1 rounded-lg font-semibold">
                      Halal
                    </span>
                  </div>
                </div>
              </Link>
            ))}
          </div>
        </div>
      </section>

      <section className="py-14 px-4 bg-white">
        <div className="max-w-6xl mx-auto">
          <div className="bg-gray-50 rounded-2xl p-8 border-l-4 border-green-500 flex flex-col md:flex-row items-start md:items-center justify-between gap-6">
            <div>
              <h3 className="text-xl font-bold text-gray-800 mb-2">Follow Us on LINE</h3>
              <p className="text-gray-500 text-sm max-w-md mb-4">
                Get the latest offers, Ramadan deals, and halal news on LINE. Our team replies fast.
              </p>
              <div className="flex flex-col gap-1 text-sm text-gray-600">
                <span>Exclusive LINE-only discount coupons</span>
                <span>Ramadan and Eid special offers first</span>
                <span>New product alerts and restocks</span>
              </div>
            </div>
            <Link href="/contact" className="flex-shrink-0 bg-green-500 text-white font-bold px-8 py-3 rounded-xl hover:bg-green-600 transition-colors">
              Add FHF on LINE
            </Link>
          </div>
        </div>
      </section>

    </div>
  )
}
