'use client'

import { useCartStore } from "@/src/store/cartStore"
import Link from "next/link"

export default function CartPage() {
  const { items, removeItem, updateQuantity, getTotalPrice, clearCart } = useCartStore()

  if (items.length === 0) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center px-4">
        <div className="text-center">
          <div className="text-8xl mb-6">🛒</div>
          <h2 className="text-2xl font-bold text-gray-700 mb-3">Your cart is empty</h2>
          <p className="text-gray-400 mb-8">Add some halal products to get started!</p>
          <Link
            href="/shop"
            className="bg-green-700 text-white font-bold px-8 py-3 rounded-xl hover:bg-green-800 transition-colors"
          >
            Browse Products
          </Link>
        </div>
      </div>
    )
  }

  return (
    <div className="min-h-screen bg-gray-50">
      <div className="max-w-4xl mx-auto px-4 py-8">

        <h1 className="text-2xl font-bold text-gray-800 mb-6">
          Your Cart ({items.length} {items.length === 1 ? "item" : "items"})
        </h1>

        <div className="grid md:grid-cols-3 gap-6">

          {/* CART ITEMS */}
          <div className="md:col-span-2 space-y-4">
            {items.map((item) => (
              <div
                key={item.product.id}
                className="bg-white rounded-xl border border-gray-200 p-4 flex gap-4"
              >
                {/* IMAGE */}
                <div className="bg-gray-50 rounded-lg w-20 h-20 flex items-center justify-center flex-shrink-0">
                  {item.product.image_url ? (
                    <img
                      src={item.product.image_url}
                      alt={item.product.name}
                      className="w-full h-full object-cover rounded-lg"
                    />
                  ) : (
                    <span className="text-3xl">🛍️</span>
                  )}
                </div>

                {/* DETAILS */}
                <div className="flex-1 min-w-0">
                  <h3 className="text-sm font-semibold text-gray-800 leading-tight mb-1">
                    {item.product.name}
                  </h3>
                  <p className="text-xs text-gray-400 mb-2">{item.product.weight}</p>
                  <div className="flex items-center gap-2">
                    <span className="bg-green-700 text-white text-xs px-2 py-0.5 rounded-full font-semibold">
                      Halal
                    </span>
                    <span className="text-xs text-gray-400">{item.product.country}</span>
                  </div>
                </div>

                {/* QUANTITY + PRICE */}
                <div className="flex flex-col items-end gap-2 flex-shrink-0">
                  <span className="text-green-700 font-bold text-sm">
                    ¥{(item.product.price * item.quantity).toLocaleString()}
                  </span>

                  {/* QUANTITY CONTROLS */}
                  <div className="flex items-center border border-gray-200 rounded-lg overflow-hidden">
                    <button
                      onClick={() => updateQuantity(item.product.id, item.quantity - 1)}
                      className="px-3 py-1 text-gray-600 hover:bg-gray-100 transition-colors font-bold text-sm"
                    >
                      −
                    </button>
                    <span className="px-3 py-1 text-sm font-semibold border-x border-gray-200">
                      {item.quantity}
                    </span>
                    <button
                      onClick={() => updateQuantity(item.product.id, item.quantity + 1)}
                      className="px-3 py-1 text-gray-600 hover:bg-gray-100 transition-colors font-bold text-sm"
                    >
                      +
                    </button>
                  </div>

                  <button
                    onClick={() => removeItem(item.product.id)}
                    className="text-xs text-red-400 hover:text-red-600 transition-colors"
                  >
                    Remove
                  </button>
                </div>
              </div>
            ))}

            {/* CLEAR CART */}
            <button
              onClick={clearCart}
              className="text-sm text-gray-400 hover:text-red-500 transition-colors"
            >
              Clear entire cart
            </button>
          </div>

          {/* ORDER SUMMARY */}
          <div className="md:col-span-1">
            <div className="bg-white rounded-xl border border-gray-200 p-5 sticky top-4">
              <h2 className="text-base font-bold text-gray-800 mb-4 pb-3 border-b border-gray-100">
                Order Summary
              </h2>

              <div className="space-y-2 mb-4">
                {items.map((item) => (
                  <div key={item.product.id} className="flex justify-between text-xs text-gray-500">
                    <span className="truncate mr-2">{item.product.name} x{item.quantity}</span>
                    <span className="flex-shrink-0">¥{(item.product.price * item.quantity).toLocaleString()}</span>
                  </div>
                ))}
              </div>

              <div className="border-t border-gray-100 pt-3 mb-4">
                <div className="flex justify-between text-sm text-gray-500 mb-2">
                  <span>Subtotal</span>
                  <span>¥{getTotalPrice().toLocaleString()}</span>
                </div>
                <div className="flex justify-between text-sm text-gray-500 mb-2">
                  <span>Delivery</span>
                  <span className="text-green-600 font-semibold">
                    {getTotalPrice() >= 5000 ? "FREE" : "¥500"}
                  </span>
                </div>
                <div className="flex justify-between font-bold text-gray-800 text-base pt-2 border-t border-gray-100">
                  <span>Total</span>
                  <span className="text-green-700">
                    ¥{(getTotalPrice() >= 5000
                      ? getTotalPrice()
                      : getTotalPrice() + 500
                    ).toLocaleString()}
                  </span>
                </div>
              </div>

              {getTotalPrice() < 5000 && (
                <div className="bg-yellow-50 border border-yellow-200 rounded-lg p-3 mb-4 text-xs text-yellow-700">
                  Add ¥{(5000 - getTotalPrice()).toLocaleString()} more for FREE delivery!
                </div>
              )}

              <Link
                href="/checkout"
                className="block w-full bg-green-700 text-white text-center font-bold py-3 rounded-xl hover:bg-green-800 transition-colors mb-3"
              >
                Proceed to Checkout
              </Link>

              <Link
                href="/shop"
                className="block w-full bg-gray-100 text-gray-600 text-center font-semibold py-3 rounded-xl hover:bg-gray-200 transition-colors text-sm"
              >
                Continue Shopping
              </Link>

              <div className="mt-4 text-center text-xs text-gray-400">
                Cash on Delivery available
              </div>
            </div>
          </div>

        </div>
      </div>
    </div>
  )
}