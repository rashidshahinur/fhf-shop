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
    <div className="bg-white border border-gray-200 rounded-lg overflow-hidden hover:shadow-md transition-shadow">
      <Link href={"/shop/" + product.slug}>
        <div className="bg-gray-50 h-44 flex items-center justify-center overflow-hidden relative">
          {product.image_url ? (
            <img
              src={product.image_url}
              alt={product.name}
              className="w-full h-full object-cover hover:scale-105 transition-transform"
            />
          ) : (
            <div className="text-6xl">🛍️</div>
          )}
        </div>
      </Link>
      <div className="p-3">
        <Link href={"/shop/" + product.slug}>
          <h3 className="text-sm font-semibold text-gray-800 hover:text-green-700 transition-colors leading-tight mb-1 line-clamp-2">
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

function SectionHeader({ title, href }: { title: string; href: string }) {
  return (
    <div className="flex items-center justify-between mb-4 pb-2 border-b-2 border-green-700">
      <h2 className="text-lg font-bold text-gray-800 uppercase tracking-wide">
        {title}
      </h2>
      <Link
        href={href}
        className="text-xs font-semibold text-green-700 hover:underline uppercase"
      >
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
      <div className="bg-green-800 text-white">
        <div className="max-w-6xl mx-auto px-4 py-12 text-center">
          <p className="text-green-300 text-sm font-semibold uppercase tracking-widest mb-3">
            100% Halal Certified — Japan Delivery
          </p>
          <h1 className="text-3xl md:text-5xl font-black mb-4">
            Fatihah Halal Food
          </h1>
          <p className="text-green-200 mb-6 max-w-lg mx-auto text-sm md:text-base">
            Authentic halal groceries from Bangladesh, Indonesia and beyond.
            Delivered anywhere in Japan. Cash on Delivery available.
          </p>
          <div className="flex gap-3 justify-center flex-wrap">
            <Link
              href="/shop"
              className="bg-yellow-500 text-white font-bold px-6 py-2.5 rounded-lg text-sm hover:bg-yellow-600 transition-colors"
            >
              SHOP NOW
            </Link>
            <Link
              href="/how-to-order"
              className="bg-white text-green-800 font-bold px-6 py-2.5 rounded-lg text-sm hover:bg-gray-100 transition-colors"
            >
              HOW TO ORDER
            </Link>
          </div>
        </div>
      </div>

      {/* ANNOUNCEMENT BAR */}
      <div className="bg-yellow-500 text-white text-center text-xs font-semibold py-2 px-4">
        Free delivery on orders over ¥5,000 — Cash on Delivery available nationwide Japan
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
                className="bg-white border border-gray-200 rounded-lg p-3 text-center hover:border-green-500 hover:shadow-sm transition-all group"
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
            <div className="flex items-center justify-between mb-4 pb-2 border-b-2 border-red-500">
              <h2 className="text-lg font-bold text-gray-800 uppercase tracking-wide">
                Special Offer
              </h2>
              <Link
                href="/shop"
                className="text-xs font-semibold text-red-500 hover:underline uppercase"
              >
                View All
              </Link>
            </div>
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
            <h3 className="font-bold text-lg mb-1">Follow us on LINE</h3>
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