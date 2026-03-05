import Link from "next/link"

export default function Footer() {
  return (
    <footer className="bg-gray-900 text-gray-400 pt-12 pb-6">
      <div className="max-w-6xl mx-auto px-4">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8 mb-10">

          <div className="md:col-span-1">
            <div className="flex items-center gap-2 mb-3">
              <div className="w-9 h-9 bg-green-700 rounded-lg flex items-center justify-center text-white font-bold text-lg">F</div>
              <div className="text-white font-bold text-sm">Fatihah Halal Food</div>
            </div>
            <p className="text-sm leading-relaxed mb-4">
              Your trusted halal grocery store in Japan. Serving Muslim communities with authentic products.
            </p>
            <div className="inline-flex items-center gap-2 bg-green-900 text-green-400 text-xs px-3 py-1.5 rounded-full">
              100% Halal Certified
            </div>
          </div>

          <div>
            <h4 className="text-white font-semibold text-sm mb-4">Shop</h4>
            <div className="flex flex-col gap-2">
              <Link href="/shop" className="text-sm hover:text-green-400 transition-colors">All Products</Link>
              <Link href="/shop" className="text-sm hover:text-green-400 transition-colors">Rice and Grains</Link>
              <Link href="/shop" className="text-sm hover:text-green-400 transition-colors">Spices and Masala</Link>
              <Link href="/shop" className="text-sm hover:text-green-400 transition-colors">Halal Meat</Link>
              <Link href="/shop" className="text-sm hover:text-green-400 transition-colors">Fish and Seafood</Link>
            </div>
          </div>

          <div>
            <h4 className="text-white font-semibold text-sm mb-4">Help</h4>
            <div className="flex flex-col gap-2">
              <Link href="/how-to-order" className="text-sm hover:text-green-400 transition-colors">How to Order</Link>
              <Link href="/how-to-order" className="text-sm hover:text-green-400 transition-colors">Delivery Info</Link>
              <Link href="/contact" className="text-sm hover:text-green-400 transition-colors">Contact Us</Link>
              <Link href="/contact" className="text-sm hover:text-green-400 transition-colors">FAQ</Link>
            </div>
          </div>

          <div>
            <h4 className="text-white font-semibold text-sm mb-4">Connect</h4>
            <div className="flex flex-col gap-3 text-sm">
              <Link href="/contact" className="flex items-center gap-2 bg-green-500 text-white px-3 py-2 rounded-lg font-semibold">
                Follow on LINE
              </Link>
              <p>Based in Japan</p>
              <p>Serving Muslim Communities</p>
              <p>Nationwide Delivery</p>
            </div>
          </div>

        </div>
        <div className="border-t border-gray-800 pt-6 flex flex-col md:flex-row justify-between items-center gap-3 text-xs">
          <p>2025 Fatihah Halal Food Japan. All rights reserved.</p>
          <p>Serving Muslim communities in Japan</p>
        </div>
      </div>
    </footer>
  )
}
