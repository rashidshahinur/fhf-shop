'use client'

import Link from "next/link"
import { useCartStore } from "@/src/store/cartStore"
import { useState } from "react"

const categories = [
  { name: "Rice & Grains", slug: "rice-grains", icon: "🍚" },
  { name: "Halal Meat", slug: "halal-meat", icon: "🥩" },
  { name: "Spices & Masala", slug: "spices-masala", icon: "🌶️" },
  { name: "Fish & Seafood", slug: "fish-seafood", icon: "🐟" },
  { name: "Canned & Packaged", slug: "canned-packaged", icon: "🥫" },
  { name: "Drinks & Juices", slug: "drinks-juices", icon: "🧃" },
  { name: "Snacks & Sweets", slug: "snacks-sweets", icon: "🍬" },
  { name: "Oils & Sauces", slug: "oils-sauces", icon: "🫙" },
]

export default function Navbar() {
  const totalItems = useCartStore(state => state.getTotalItems())
  const [mobileOpen, setMobileOpen] = useState(false)
  const [categoryOpen, setCategoryOpen] = useState(false)

  return (
    <nav className="bg-white border-b border-gray-200 sticky top-0 z-50">


      {/* MAIN NAV */}
      <div className="max-w-6xl mx-auto px-4">
        <div className="flex items-center justify-between h-16">

          {/* LOGO */}
          <Link href="/" className="flex items-center gap-2 flex-shrink-0">
            <div className="bg-green-700 text-white font-black text-lg w-9 h-9 rounded-lg flex items-center justify-center">
              F
            </div>
            <div>
              <div className="font-black text-green-800 text-sm leading-tight">Fatihah Halal Food</div>
              <div className="text-yellow-600 text-xs font-semibold leading-tight">Japan Halal Store</div>
            </div>
          </Link>

          {/* DESKTOP NAV */}
          <div className="hidden md:flex items-center gap-1">
            <Link href="/" className="px-3 py-2 text-sm font-semibold text-gray-700 hover:text-green-700 transition-colors">
              Home
            </Link>

            {/* CATEGORIES DROPDOWN */}
            <div
              className="relative"
              onMouseEnter={() => setCategoryOpen(true)}
              onMouseLeave={() => setCategoryOpen(false)}
            >
              <button className="px-3 py-2 text-sm font-semibold text-gray-700 hover:text-green-700 transition-colors flex items-center gap-1">
                Categories
                <svg className={"w-3 h-3 transition-transform " + (categoryOpen ? "rotate-180" : "")} fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                </svg>
              </button>

              {categoryOpen && (
                <div className="absolute top-full left-0 bg-white border border-gray-200 rounded-xl shadow-lg py-2 w-56 z-50">
                  <Link
                    href="/shop"
                    className="flex items-center gap-3 px-4 py-2 text-sm text-gray-700 hover:bg-green-50 hover:text-green-700 font-semibold"
                  >
                    All Products
                  </Link>
                  <div className="border-t border-gray-100 my-1"></div>
                  {categories.map((cat) => (
                    <Link
                      key={cat.slug}
                      href={"/shop?category=" + cat.slug}
                      className="flex items-center gap-3 px-4 py-2 text-sm text-gray-600 hover:bg-green-50 hover:text-green-700 transition-colors"
                    >
                      <span>{cat.icon}</span>
                      <span>{cat.name}</span>
                    </Link>
                  ))}
                </div>
              )}
            </div>

            <Link href="/shop" className="px-3 py-2 text-sm font-semibold text-gray-700 hover:text-green-700 transition-colors">
              Shop
            </Link>
            <Link href="/about" className="px-3 py-2 text-sm font-semibold text-gray-700 hover:text-green-700 transition-colors">
              About
            </Link>
            <Link href="/how-to-order" className="px-3 py-2 text-sm font-semibold text-gray-700 hover:text-green-700 transition-colors">
              How to Order
            </Link>
            <Link href="/contact" className="px-3 py-2 text-sm font-semibold text-gray-700 hover:text-green-700 transition-colors">
              Contact
            </Link>
          </div>

          {/* RIGHT ICONS */}
          <div className="flex items-center gap-2">
            {/* LINE BUTTON */}
            <Link
              href="/contact"
              className="hidden md:flex items-center gap-1.5 bg-green-500 text-white text-xs font-bold px-3 py-1.5 rounded-lg hover:bg-green-600 transition-colors"
            >
              <span className="text-sm">💬</span>
              LINE
            </Link>

            {/* CART */}
            <Link href="/cart" className="relative p-2 text-gray-700 hover:text-green-700 transition-colors">
              <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 3h2l.4 2M7 13h10l4-8H5.4M7 13L5.4 5M7 13l-2.293 2.293c-.63.63-.184 1.707.707 1.707H17m0 0a2 2 0 100 4 2 2 0 000-4zm-8 2a2 2 0 11-4 0 2 2 0 014 0z" />
              </svg>
              {totalItems > 0 && (
                <span className="absolute -top-1 -right-1 bg-red-500 text-white text-xs font-bold w-5 h-5 rounded-full flex items-center justify-center">
                  {totalItems}
                </span>
              )}
            </Link>

            {/* MOBILE MENU BUTTON */}
            <button
              onClick={() => setMobileOpen(!mobileOpen)}
              className="md:hidden p-2 text-gray-700"
            >
              {mobileOpen ? (
                <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                </svg>
              ) : (
                <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
                </svg>
              )}
            </button>
          </div>
        </div>
      </div>

      {/* MOBILE MENU */}
      {mobileOpen && (
        <div className="md:hidden bg-white border-t border-gray-100 px-4 py-3 space-y-1">
          <Link href="/" onClick={() => setMobileOpen(false)} className="block py-2 text-sm font-semibold text-gray-700">Home</Link>
          <Link href="/shop" onClick={() => setMobileOpen(false)} className="block py-2 text-sm font-semibold text-gray-700">All Products</Link>
          <div className="border-t border-gray-100 pt-2 mt-2">
            <div className="text-xs font-bold text-gray-400 uppercase mb-2">Categories</div>
            {categories.map((cat) => (
              <Link
                key={cat.slug}
                href={"/shop?category=" + cat.slug}
                onClick={() => setMobileOpen(false)}
                className="flex items-center gap-2 py-1.5 text-sm text-gray-600"
              >
                <span>{cat.icon}</span>
                <span>{cat.name}</span>
              </Link>
            ))}
          </div>
          <div className="border-t border-gray-100 pt-2 mt-2 space-y-1">
            <Link href="/about" onClick={() => setMobileOpen(false)} className="block py-2 text-sm font-semibold text-gray-700">About</Link>
            <Link href="/how-to-order" onClick={() => setMobileOpen(false)} className="block py-2 text-sm font-semibold text-gray-700">How to Order</Link>
            <Link href="/contact" onClick={() => setMobileOpen(false)} className="block py-2 text-sm font-semibold text-gray-700">Contact</Link>
          </div>
          <div className="border-t border-gray-100 pt-3 mt-2">
            <Link
              href="/contact"
              onClick={() => setMobileOpen(false)}
              className="flex items-center justify-center gap-2 bg-green-500 text-white font-bold py-2.5 rounded-xl text-sm"
            >
              💬 Add us on LINE
            </Link>
          </div>
        </div>
      )}
    </nav>
  )
}