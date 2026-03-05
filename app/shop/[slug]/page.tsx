import { supabase } from "@/src/lib/supabase"
import { Product, Category } from "@/src/types"
import Link from "next/link"
import AddToCartButton from "@/src/components/shop/AddToCartButton"
import { notFound } from "next/navigation"

async function getProduct(slug: string) {
  const { data } = await supabase
    .from("products")
    .select("*")
    .eq("slug", slug)
    .single()
  return data as Product
}

async function getRelatedProducts(categoryId: string, currentId: string) {
  const { data } = await supabase
    .from("products")
    .select("*")
    .eq("category_id", categoryId)
    .eq("is_active", true)
    .neq("id", currentId)
    .limit(4)
  return data as Product[]
}

async function getCategory(id: string) {
  const { data } = await supabase
    .from("categories")
    .select("*")
    .eq("id", id)
    .single()
  return data as Category
}

export default async function ProductPage({
  params,
}: {
  params: Promise<{ slug: string }>
}) {
  const { slug } = await params
  const product = await getProduct(slug)
  if (!product) notFound()

  const category = await getCategory(product.category_id)
  const related = await getRelatedProducts(product.category_id, product.id)

  return (
    <div className="bg-gray-50 min-h-screen">
      <div className="max-w-6xl mx-auto px-4 py-8">

        {/* BREADCRUMB */}
        <div className="flex items-center gap-2 text-xs text-gray-400 mb-6">
          <Link href="/" className="hover:text-green-700">Home</Link>
          <span>/</span>
          <Link href="/shop" className="hover:text-green-700">Shop</Link>
          <span>/</span>
          {category && (
            <>
              <Link
                href={"/shop?category=" + category.slug}
                className="hover:text-green-700"
              >
                {category.name}
              </Link>
              <span>/</span>
            </>
          )}
          <span className="text-gray-600">{product.name}</span>
        </div>

        {/* PRODUCT MAIN */}
        <div className="bg-white rounded-xl border border-gray-200 overflow-hidden mb-8">
          <div className="grid md:grid-cols-2 gap-0">

            {/* PRODUCT IMAGE */}
            <div className="bg-gray-50 h-80 md:h-auto flex items-center justify-center p-8">
              {product.image_url ? (
                <img
                  src={product.image_url}
                  alt={product.name}
                  className="max-h-72 w-full object-contain"
                />
              ) : (
                <div className="text-9xl">🛍️</div>
              )}
            </div>

            {/* PRODUCT INFO */}
            <div className="p-6 md:p-8">

              {/* BADGES */}
              <div className="flex items-center gap-2 mb-3 flex-wrap">
                <span className="bg-green-700 text-white text-xs font-bold px-3 py-1 rounded-full">
                  Halal Certified
                </span>
                <span className="bg-gray-100 text-gray-600 text-xs font-semibold px-3 py-1 rounded-full">
                  {product.country}
                </span>
                {category && (
                  <span className="bg-gray-100 text-gray-600 text-xs font-semibold px-3 py-1 rounded-full">
                    {category.name}
                  </span>
                )}
              </div>

              {/* NAME */}
              <h1 className="text-2xl font-bold text-gray-800 mb-2 leading-tight">
                {product.name}
              </h1>

              {/* WEIGHT */}
              <p className="text-sm text-gray-400 mb-4">
                Weight / Size:{" "}
                <span className="font-semibold text-gray-600">{product.weight}</span>
              </p>

              {/* PRICE */}
              <div className="flex items-center gap-3 mb-4">
                {product.original_price && (
                  <span className="text-gray-400 line-through text-lg">
                    ¥{product.original_price.toLocaleString()}
                  </span>
                )}
                <span className="text-green-700 font-black text-3xl">
                  ¥{product.price.toLocaleString()}
                </span>
                {product.original_price && (
                  <span className="bg-red-100 text-red-600 text-xs font-bold px-2 py-1 rounded">
                    SALE
                  </span>
                )}
              </div>

              {/* DESCRIPTION */}
              {product.description && (
                <p className="text-sm text-gray-600 mb-6 leading-relaxed">
                  {product.description}
                </p>
              )}

              {/* HALAL INFO */}
              <div className="bg-green-50 border border-green-200 rounded-lg p-3 mb-6">
                <div className="flex items-center gap-2">
                  <span className="text-green-700 font-semibold text-xs">
                    Halal Certifier:
                  </span>
                  <span className="text-green-800 text-xs font-bold">
                    {product.halal_certifier}
                  </span>
                </div>
              </div>

              {/* STOCK */}
              <div className="mb-6">
                {product.stock_count > 0 ? (
                  <span className="text-green-600 text-sm font-semibold">
                    In Stock ({product.stock_count} available)
                  </span>
                ) : (
                  <span className="text-red-500 text-sm font-semibold">
                    Out of Stock
                  </span>
                )}
              </div>

              {/* ADD TO CART */}
              <div className="max-w-xs">
                <AddToCartButton product={product} />
              </div>

              {/* DELIVERY INFO */}
              <div className="mt-6 grid grid-cols-2 gap-3">
                <div className="bg-gray-50 rounded-lg p-3 text-center">
                  <div className="text-lg mb-1">🚚</div>
                  <div className="text-xs font-semibold text-gray-700">Japan Delivery</div>
                  <div className="text-xs text-gray-400">Nationwide</div>
                </div>
                <div className="bg-gray-50 rounded-lg p-3 text-center">
                  <div className="text-lg mb-1">💴</div>
                  <div className="text-xs font-semibold text-gray-700">Cash on Delivery</div>
                  <div className="text-xs text-gray-400">Pay when received</div>
                </div>
              </div>

            </div>
          </div>
        </div>

        {/* RELATED PRODUCTS */}
        {related && related.length > 0 && (
          <div>
            <div className="flex items-center justify-between mb-4 pb-2 border-b-2 border-green-700">
              <h2 className="text-lg font-bold text-gray-800 uppercase tracking-wide">
                Related Products
              </h2>
              <Link
                href={"/shop?category=" + category?.slug}
                className="text-xs font-semibold text-green-700 hover:underline uppercase"
              >
                View All
              </Link>
            </div>
            <div
              className="grid gap-4"
              style={{ gridTemplateColumns: "repeat(auto-fill, minmax(180px, 1fr))" }}
            >
              {related.map((p) => (
                <Link
                  key={p.id}
                  href={"/shop/" + p.slug}
                  className="bg-white border border-gray-200 rounded-lg overflow-hidden hover:shadow-md transition-shadow"
                >
                  <div className="bg-gray-50 h-36 flex items-center justify-center text-5xl">
                    {p.image_url ? (
                      <img src={p.image_url} alt={p.name} className="w-full h-full object-cover" />
                    ) : (
                      <span>🛍️</span>
                    )}
                  </div>
                  <div className="p-3">
                    <div className="text-xs text-gray-400 mb-1">{p.country}</div>
                    <div className="text-sm font-semibold text-gray-800 mb-1 leading-tight">
                      {p.name}
                    </div>
                    <div className="text-green-700 font-bold text-sm">
                      ¥{p.price.toLocaleString()}
                    </div>
                  </div>
                </Link>
              ))}
            </div>
          </div>
        )}

      </div>
    </div>
  )
}