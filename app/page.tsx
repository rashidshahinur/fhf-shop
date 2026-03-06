import { supabase } from "@/src/lib/supabase"
import { Product, Category } from "@/src/types"
import Link from "next/link"
import AddToCartButton from "@/src/components/shop/AddToCartButton"

async function getCategories() {
  const { data } = await supabase
    .from("categories")
    .select("*")
    .order("display_order")
  return data as Category[]
}

async function getSpecialOffers() {
  const { data } = await supabase
    .from("products")
    .select("*")
    .eq("is_active", true)
    .not("original_price", "is", null)
    .limit(10)
  return data as Product[]
}

async function getMostSaleProducts() {
  const { data } = await supabase
    .from("products")
    .select("*")
    .eq("is_featured", true)
    .eq("is_active", true)
    .limit(10)
  return data as Product[]
}

async function getLatestProducts() {
  const { data } = await supabase
    .from("products")
    .select("*")
    .eq("is_active", true)
    .order("created_at", { ascending: false })
    .limit(10)
  return data as Product[]
}

function ProductCard({ product }: { product: Product }) {
  return (
    <div className="bg-white border border-gray-200 rounded-xl overflow-hidden hover:shadow-lg transition-all hover:-translate-y-1 group">
      <Link href={"/shop/" + product.slug}>
        <div className="bg-gray-50 h-44 flex items-center justify-center overflow-hidden relative">
          {product.image_url ? (
            <img
              src={product.image_url}
              alt={product.name}
              className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
            />
          ) : (
            <div className="text-6xl">🛍️</div>
          )}
          <div className="absolute top-2 right-2 bg-green-700 text-white text-xs px-2 py-0.5 rounded-full font-semibold">
            Halal
          </div>
          {product.original_price && (
            <div className="absolute top-2 left-2 bg-red-500 text-white text-xs px-2 py-0.5 rounded-full font-bold">
              SALE
            </div>
          )}
        </div>
      </Link>
      <div className="p-3">
        <div className="text-xs text-gray-400 mb-1">{product.country}</div>
        <Link href={"/shop/" + product.slug}>
          <h3 className="text-sm font-semibold text-gray-800 group-hover:text-green-700 transition-colors leading-tight mb-1 line-clamp-2">
            {product.name}
          </h3>
        </Link>
        <p className="text-xs text-gray-400 mb-2">{product.weight}</p>
        <div className="flex items-center gap-2 mb-3">
          {product.original_price && (
            <span className="text-xs text-gray-400 line-through">
              ¥{product.original_price.toLocaleString()}
            </span>
          )}
          <span className="text-green-700 font-bold text-sm">
            ¥{product.price.toLocaleString()}
          </span>
        </div>
        <AddToCartButton product={product} />
      </div>
    </div>
  )
}

function SectionHeader({ title, href, color = "border-green-700" }: { title: string; href: string; color?: string }) {
  return (
    <div className={"flex items-center justify-between mb-4 pb-2 border-b-2 " + color}>
      <h2 className="text-lg font-bold text-gray-800 uppercase tracking-wide">
        {title}
      </h2>
      <Link href={href} className="text-xs font-semibold text-green-700 hover:underline uppercase">
        View All
      </Link>
    </div>
  )
}

export default async function HomePage() {
  const categories = await getCategories()
  const specialOffers = await getSpecialOffers()
  const mostSale = await getMostSaleProducts()
  const latest = await getLatestProducts()

  return (
    <div className="bg-gray-50 min-h-screen">

      {/* HERO BANNER */}
      <div className="relative bg-green-800 overflow-hidden">
        <div
          className="absolute inset-0 opacity-10"
          style={{
            backgroundImage: "radial-gradient(circle, white 1px, transparent 1px)",
            backgroundSize: "40px 40px"
          }}
        />
        <div className="relative max-w-4xl mx-auto px-6 py-20 flex flex-col items-center text-center text-white">

          <div className="inline-flex items-center gap-2 bg-green-700 text-green-200 text-xs font-bold px-4 py-1.5 rounded-full mb-6">
            ✅ 100% HALAL CERTIFIED — JAPAN DELIVERY
          </div>

          <h1 className="text-4xl md:text-6xl font-black leading-tight mb-4">
            Authentic<br />
            <span className="text-yellow-400">Halal Food</span><br />
            <span className="text-3xl md:text-4xl font-bold text-green-200">Delivered in Japan</span>
          </h1>

          <p className="text-green-200 text-sm md:text-lg leading-relaxed mb-8 max-w-xl">
            Groceries from Bangladesh, Indonesia and beyond.
            Shop online and get it delivered anywhere in Japan.
            Cash on Delivery available.
          </p>

          <div className="flex gap-4 justify-center flex-wrap mb-10">
            <Link
              href="/shop"
              className="bg-yellow-500 hover:bg-yellow-400 text-white font-black px-10 py-3.5 rounded-xl transition-colors text-sm shadow-lg"
            >
              🛍️ Shop Now
            </Link>
            <Link
              href="/how-to-order"
              className="bg-white/10 hover:bg-white/20 text-white font-bold px-10 py-3.5 rounded-xl transition-colors text-sm border border-white/30"
            >
              How to Order
            </Link>
          </div>

          <div className="flex gap-6 justify-center flex-wrap">
            {[
              { icon: "🚚", text: "Japan Nationwide Delivery" },
              { icon: "💴", text: "Cash on Delivery" },
              { icon: "💬", text: "LINE Support" },
              { icon: "🏪", text: "Physical Store in Japan" },
            ].map((badge) => (
              <div key={badge.text} className="flex items-center gap-1.5 text-green-300 text-xs font-semibold">
                <span>{badge.icon}</span>
                <span>{badge.text}</span>
              </div>
            ))}
          </div>

        </div>
      </div>

      {/* COMMUNITY FLAGS BAR */}
      <div className="bg-white border-b border-gray-200">
        <div className="max-w-6xl mx-auto px-4 py-3">
          <div className="flex items-center justify-center gap-6 flex-wrap text-xs text-gray-500 font-semibold">
            <span>🇧🇩 Bangladeshi Products</span>
            <span className="text-gray-300">|</span>
            <span>🇮🇩 Indonesian Products</span>
            <span className="text-gray-300">|</span>
            <span>🕌 Halal Certified</span>
            <span className="text-gray-300">|</span>
            <span>🇯🇵 Available in Japan</span>
          </div>
        </div>
      </div>

      <div className="max-w-6xl mx-auto px-4 py-8">

        {/* CATEGORY GRID */}
        <div className="mb-10">
          <SectionHeader title="Shop by Category" href="/shop" />
          <div
            className="grid gap-3"
            style={{ gridTemplateColumns: "repeat(auto-fill, minmax(100px, 1fr))" }}
          >
            {categories && categories.map((cat) => (
              <Link
                key={cat.id}
                href={"/shop?category=" + cat.slug}
                className="bg-white border border-gray-200 rounded-xl p-3 text-center hover:border-green-500 hover:shadow-sm transition-all group"
              >
                <div className="text-3xl mb-2 group-hover:scale-110 transition-transform">
                  {cat.icon}
                </div>
                <div className="text-xs font-semibold text-gray-700 leading-tight">
                  {cat.name}
                </div>
              </Link>
            ))}
          </div>
        </div>

        {/* SPECIAL OFFERS */}
        {specialOffers && specialOffers.length > 0 && (
          <div className="mb-10">
            <SectionHeader title="Special Offer" href="/shop" color="border-red-500" />
            <div
              className="grid gap-4"
              style={{ gridTemplateColumns: "repeat(auto-fill, minmax(180px, 1fr))" }}
            >
              {specialOffers.map((product) => (
                <ProductCard key={product.id} product={product} />
              ))}
            </div>
          </div>
        )}

        {/* MOST SALE PRODUCTS */}
        {mostSale && mostSale.length > 0 && (
          <div className="mb-10">
            <SectionHeader title="Most Sale Products" href="/shop" />
            <div
              className="grid gap-4"
              style={{ gridTemplateColumns: "repeat(auto-fill, minmax(180px, 1fr))" }}
            >
              {mostSale.map((product) => (
                <ProductCard key={product.id} product={product} />
              ))}
            </div>
          </div>
        )}

        {/* LATEST PRODUCTS */}
        {latest && latest.length > 0 && (
          <div className="mb-10">
            <SectionHeader title="Latest Products" href="/shop" />
            <div
              className="grid gap-4"
              style={{ gridTemplateColumns: "repeat(auto-fill, minmax(180px, 1fr))" }}
            >
              {latest.map((product) => (
                <ProductCard key={product.id} product={product} />
              ))}
            </div>
          </div>
        )}

        {/* LINE CTA */}
        <div className="bg-green-700 rounded-xl p-6 text-white flex flex-col md:flex-row items-center justify-between gap-4 mb-8">
          <div>
            <h3 className="font-bold text-lg mb-1">💬 Follow us on LINE</h3>
            <p className="text-green-200 text-sm">
              Get exclusive deals, Ramadan offers and order updates on LINE
            </p>
          </div>
          <Link
            href="/contact"
            className="flex-shrink-0 bg-white text-green-700 font-bold px-6 py-2.5 rounded-lg text-sm hover:bg-gray-100 transition-colors"
          >
            Add on LINE
          </Link>
        </div>

      </div>
    </div>
  )
}