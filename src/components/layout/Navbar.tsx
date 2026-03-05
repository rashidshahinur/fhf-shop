'use client'

import Link from "next/link"
import { ShoppingCart, Menu, X, Search } from "lucide-react"
import { useState } from "react"
import { useCartStore } from "@/src/store/cartStore"

export default function Navbar() {
  const [mobileOpen, setMobileOpen] = useState(false)
  const totalItems = useCartStore(state => state.getTotalItems())

  return (
    <nav className="bg-white border-b-2 border-green-100 sticky top-0 z-50 shadow-sm">
      <div className="max-w-6xl mx-auto px-4 h-16 flex items-center justify-between">

        <Link href="/" className="flex items-center gap-2">
          <div className="w-9 h-9 bg-green-700 rounded-lg flex items-center justify-center text-white font-bold text-lg">
            F
          </div>
          <div>
            <div className="font-bold text-green-800 text-sm leading-tight">
              Fatihah Halal Food
            </div>
            <div className="text-yellow-600 text-xs font-medium">
              Japan Halal Store
            </div>
          </div>
        </Link>

        <ul className="hidden md:flex items-center gap-6">
          <li><Link href="/" className="text-sm font-medium text-gray-700 hover:text-green-700 transition-colors">Home</Link></li>
          <li><Link href="/shop" className="text-sm font-medium text-gray-700 hover:text-green-700 transition-colors">Shop</Link></li>
          <li><Link href="/about" className="text-sm font-medium text-gray-700 hover:text-green-700 transition-colors">About</Link></li>
          <li><Link href="/how-to-order" className="text-sm font-medium text-gray-700 hover:text-green-700 transition-colors">How to Order</Link></li>
          <li><Link href="/contact" className="text-sm font-medium text-gray-700 hover:text-green-700 transition-colors">Contact</Link></li>
        </ul>

        <div className="flex items-center gap-3">

          <Link
            href="/contact"
            className="hidden md:flex items-center gap-1.5 bg-green-500 text-white text-xs font-bold px-3 py-2 rounded-lg hover:bg-green-600 transition-colors"
          >
            LINE
          </Link>

          <button className="p-2 rounded-lg bg-green-50 hover:bg-green-100 transition-colors">
            <Search size={18} className="text-green-700" />
          </button>

          <Link
            href="/cart"
            className="relative p-2 rounded-lg bg-green-50 hover:bg-green-100 transition-colors"
          >
            <ShoppingCart size={18} className="text-green-700" />
            {totalItems > 0 && (
              <span className="absolute -top-1 -right-1 bg-yellow-500 text-white text-xs w-5 h-5 rounded-full flex items-center justify-center font-bold">
                {totalItems}
              </span>
            )}
          </Link>

          <button
            className="md:hidden p-2 rounded-lg bg-green-50"
            onClick={() => setMobileOpen(!mobileOpen)}
          >
            {mobileOpen ? <X size={18} /> : <Menu size={18} />}
          </button>
        </div>
      </div>

      {mobileOpen && (
        <div className="md:hidden bg-white border-t border-green-100 px-4 py-4 flex flex-col gap-4">
          <Link href="/" className="text-sm font-medium text-gray-700" onClick={() => setMobileOpen(false)}>Home</Link>
          <Link href="/shop" className="text-sm font-medium text-gray-700" onClick={() => setMobileOpen(false)}>Shop</Link>
          <Link href="/about" className="text-sm font-medium text-gray-700" onClick={() => setMobileOpen(false)}>About</Link>
          <Link href="/how-to-order" className="text-sm font-medium text-gray-700" onClick={() => setMobileOpen(false)}>How to Order</Link>
          <Link href="/contact" className="text-sm font-medium text-gray-700" onClick={() => setMobileOpen(false)}>Contact</Link>
          <Link href="/contact" className="bg-green-500 text-white text-sm font-bold px-4 py-2 rounded-lg text-center">Follow on LINE</Link>
        </div>
      )}
    </nav>
  )
}
