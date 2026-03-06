import Link from "next/link"

export default function Footer() {
  return (
    <footer className="bg-gray-900 text-white">

      {/* MAIN FOOTER */}
      <div className="max-w-6xl mx-auto px-4 py-12">
        <div className="grid grid-cols-2 md:grid-cols-4 gap-8">

          {/* BRAND */}
          <div className="col-span-2 md:col-span-1">
            <div className="flex items-center gap-2 mb-4">
              <div className="bg-green-600 text-white font-black text-lg w-9 h-9 rounded-lg flex items-center justify-center">
                F
              </div>
              <div>
                <div className="font-black text-white text-sm leading-tight">Fatihah Halal Food</div>
                <div className="text-yellow-400 text-xs font-semibold">Japan Halal Store</div>
              </div>
            </div>
            <p className="text-gray-400 text-xs leading-relaxed mb-4">
              Japan's trusted halal grocery store. Authentic products from Bangladesh, Indonesia and beyond. Delivered nationwide.
            </p>
            <div className="flex flex-col gap-2">
              <Link
                href="/contact"
                className="flex items-center gap-2 bg-green-500 text-white text-xs font-bold px-4 py-2 rounded-lg hover:bg-green-600 transition-colors w-fit"
              >
                💬 Follow on LINE
              </Link>
            </div>
          </div>

          {/* SHOP */}
          <div>
            <h4 className="font-bold text-white text-sm mb-4 uppercase tracking-wide">Shop</h4>
            <div className="space-y-2">
              {[
                { label: "All Products", href: "/shop" },
                { label: "Rice & Grains", href: "/shop?category=rice-grains" },
                { label: "Halal Meat", href: "/shop?category=halal-meat" },
                { label: "Fish & Seafood", href: "/shop?category=fish-seafood" },
                { label: "Spices & Masala", href: "/shop?category=spices-masala" },
                { label: "Drinks & Juices", href: "/shop?category=drinks-juices" },
              ].map((link) => (
                <Link key={link.label} href={link.href} className="block text-gray-400 text-xs hover:text-green-400 transition-colors">
                  {link.label}
                </Link>
              ))}
            </div>
          </div>

          {/* HELP */}
          <div>
            <h4 className="font-bold text-white text-sm mb-4 uppercase tracking-wide">Help</h4>
            <div className="space-y-2">
              {[
                { label: "How to Order", href: "/how-to-order" },
                { label: "Delivery Info", href: "/how-to-order" },
                { label: "FAQ", href: "/how-to-order" },
                { label: "About Us", href: "/about" },
                { label: "Contact Us", href: "/contact" },
              ].map((link) => (
                <Link key={link.label} href={link.href} className="block text-gray-400 text-xs hover:text-green-400 transition-colors">
                  {link.label}
                </Link>
              ))}
            </div>
          </div>

          {/* CONTACT */}
          <div>
            <h4 className="font-bold text-white text-sm mb-4 uppercase tracking-wide">Contact</h4>
            <div className="space-y-3">
              <div className="flex items-start gap-2">
                <span className="text-base">📍</span>
                  <span className="text-gray-400 text-xs leading-relaxed">
                      1549-1 105, Sakai,<br />Sashima District,<br />Ibaraki 306-0433, Japan
                  </span>
              </div>
              <div className="flex items-start gap-2">
                <span className="text-base">🕐</span>
                <span className="text-gray-400 text-xs leading-relaxed">Mon–Sat: 10AM–8PM<br />Sun: 11AM–6PM</span>
              </div>
              <div className="flex items-start gap-2">
                <span className="text-base">💬</span>
                <span className="text-gray-400 text-xs leading-relaxed">LINE: @fhfhalal</span>
              </div>
              <div className="flex items-start gap-2">
                <span className="text-base">📧</span>
                <span className="text-gray-400 text-xs leading-relaxed break-all">info@fatihahhalalfood.com</span>
              </div>
            </div>
          </div>

        </div>
      </div>

      {/* TRUST BAR */}
      <div className="border-t border-gray-800">
        <div className="max-w-6xl mx-auto px-4 py-4">
          <div className="flex flex-wrap justify-center gap-4 md:gap-8 text-xs text-gray-500">
            <span>✅ 100% Halal Certified</span>
            <span>🚚 Japan Nationwide Delivery</span>
            <span>💴 Cash on Delivery</span>
            <span>💬 LINE Support</span>
            <span>🏪 Physical Store in Japan</span>
          </div>
        </div>
      </div>

      {/* COPYRIGHT */}
      <div className="border-t border-gray-800">
        <div className="max-w-6xl mx-auto px-4 py-4 flex flex-col md:flex-row items-center justify-between gap-2">
          <p className="text-gray-500 text-xs">
            © 2026 Fatihah Halal Food. All rights reserved.
          </p>
          <p className="text-gray-600 text-xs">
            Serving the Muslim community in Japan
          </p>
        </div>
      </div>

    </footer>
  )
}