'use client'

import { useCartStore } from "@/src/store/cartStore"
import { useState } from "react"
import Link from "next/link"
import { useRouter } from "next/navigation"

export default function CheckoutPage() {
  const { items, getTotalPrice, clearCart } = useCartStore()
  const router = useRouter()
  const [loading, setLoading] = useState(false)
  const [form, setForm] = useState({
    customer_name: "",
    phone: "",
    address: "",
    line_id: "",
    notes: "",
  })

  const deliveryFee = getTotalPrice() >= 5000 ? 0 : 500
  const totalAmount = getTotalPrice() + deliveryFee

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    setForm({ ...form, [e.target.name]: e.target.value })
  }

  const handleSubmit = async () => {
    if (!form.customer_name || !form.phone || !form.address) {
      alert("Please fill in your name, phone and address!")
      return
    }
    if (items.length === 0) {
      alert("Your cart is empty!")
      return
    }

    setLoading(true)

    try {
      const { createClient } = await import("@supabase/supabase-js")
      const supabase = createClient(
        process.env.NEXT_PUBLIC_SUPABASE_URL!,
        process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!
      )

      // Create order
      const { data: order, error: orderError } = await supabase
        .from("orders")
        .insert({
          customer_name: form.customer_name,
          phone: form.phone,
          address: form.address,
          line_id: form.line_id,
          notes: form.notes,
          total_amount: totalAmount,
          status: "pending",
        })
        .select()
        .single()

      if (orderError) throw orderError

      // Create order items
      const orderItems = items.map((item) => ({
        order_id: order.id,
        product_id: item.product.id,
        quantity: item.quantity,
        unit_price: item.product.price,
      }))

      const { error: itemsError } = await supabase
        .from("order_items")
        .insert(orderItems)

      if (itemsError) throw itemsError

      clearCart()
      router.push("/order-confirmed?id=" + order.id)

    } catch (error) {
      console.error(error)
      alert("Something went wrong. Please try again or contact us on LINE.")
    } finally {
      setLoading(false)
    }
  }

  if (items.length === 0) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center px-4">
        <div className="text-center">
          <div className="text-8xl mb-6">🛒</div>
          <h2 className="text-2xl font-bold text-gray-700 mb-3">Your cart is empty</h2>
          <Link href="/shop" className="bg-green-700 text-white font-bold px-8 py-3 rounded-xl hover:bg-green-800 transition-colors">
            Browse Products
          </Link>
        </div>
      </div>
    )
  }

  return (
    <div className="min-h-screen bg-gray-50">
      <div className="max-w-4xl mx-auto px-4 py-8">

        <h1 className="text-2xl font-bold text-gray-800 mb-6">Checkout</h1>

        <div className="grid md:grid-cols-3 gap-6">

          {/* CHECKOUT FORM */}
          <div className="md:col-span-2 space-y-4">

            {/* DELIVERY DETAILS */}
            <div className="bg-white rounded-xl border border-gray-200 p-6">
              <h2 className="text-base font-bold text-gray-800 mb-4">
                Delivery Details
              </h2>

              <div className="space-y-4">
                <div>
                  <label className="block text-xs font-semibold text-gray-600 mb-1">
                    Full Name *
                  </label>
                  <input
                    type="text"
                    name="customer_name"
                    value={form.customer_name}
                    onChange={handleChange}
                    placeholder="Your full name"
                    className="w-full border border-gray-200 rounded-lg px-4 py-2.5 text-sm focus:outline-none focus:border-green-500"
                  />
                </div>

                <div>
                  <label className="block text-xs font-semibold text-gray-600 mb-1">
                    Phone Number *
                  </label>
                  <input
                    type="tel"
                    name="phone"
                    value={form.phone}
                    onChange={handleChange}
                    placeholder="090-XXXX-XXXX"
                    className="w-full border border-gray-200 rounded-lg px-4 py-2.5 text-sm focus:outline-none focus:border-green-500"
                  />
                </div>

                <div>
                  <label className="block text-xs font-semibold text-gray-600 mb-1">
                    Delivery Address *
                  </label>
                  <textarea
                    name="address"
                    value={form.address}
                    onChange={handleChange}
                    placeholder="Full address including postal code, city, street"
                    rows={3}
                    className="w-full border border-gray-200 rounded-lg px-4 py-2.5 text-sm focus:outline-none focus:border-green-500 resize-none"
                  />
                </div>

                <div>
                  <label className="block text-xs font-semibold text-gray-600 mb-1">
                    LINE ID <span className="text-gray-400 font-normal">(optional but recommended)</span>
                  </label>
                  <input
                    type="text"
                    name="line_id"
                    value={form.line_id}
                    onChange={handleChange}
                    placeholder="Your LINE ID"
                    className="w-full border border-gray-200 rounded-lg px-4 py-2.5 text-sm focus:outline-none focus:border-green-500"
                  />
                  <p className="text-xs text-gray-400 mt-1">
                    We use LINE to send order updates and delivery info
                  </p>
                </div>

                <div>
                  <label className="block text-xs font-semibold text-gray-600 mb-1">
                    Notes <span className="text-gray-400 font-normal">(optional)</span>
                  </label>
                  <textarea
                    name="notes"
                    value={form.notes}
                    onChange={handleChange}
                    placeholder="Any special requests or delivery instructions"
                    rows={2}
                    className="w-full border border-gray-200 rounded-lg px-4 py-2.5 text-sm focus:outline-none focus:border-green-500 resize-none"
                  />
                </div>
              </div>
            </div>

            {/* PAYMENT METHOD */}
            <div className="bg-white rounded-xl border border-gray-200 p-6">
              <h2 className="text-base font-bold text-gray-800 mb-4">
                Payment Method
              </h2>
              <div className="flex items-center gap-3 bg-green-50 border border-green-200 rounded-lg p-4">
                <div className="text-2xl">💴</div>
                <div>
                  <div className="text-sm font-bold text-gray-800">Cash on Delivery</div>
                  <div className="text-xs text-gray-500">Pay when your order arrives</div>
                </div>
                <div className="ml-auto">
                  <div className="w-4 h-4 rounded-full bg-green-700 border-2 border-green-700"></div>
                </div>
              </div>
            </div>

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

              <div className="border-t border-gray-100 pt-3 mb-4 space-y-2">
                <div className="flex justify-between text-sm text-gray-500">
                  <span>Subtotal</span>
                  <span>¥{getTotalPrice().toLocaleString()}</span>
                </div>
                <div className="flex justify-between text-sm text-gray-500">
                  <span>Delivery</span>
                  <span className="text-green-600 font-semibold">
                    {deliveryFee === 0 ? "FREE" : "¥500"}
                  </span>
                </div>
                <div className="flex justify-between font-bold text-gray-800 text-base pt-2 border-t border-gray-100">
                  <span>Total</span>
                  <span className="text-green-700">¥{totalAmount.toLocaleString()}</span>
                </div>
              </div>

              <div className="bg-yellow-50 border border-yellow-200 rounded-lg p-3 mb-4 text-xs text-yellow-700">
                Cash on Delivery — pay when your order arrives!
              </div>

              <button
                onClick={handleSubmit}
                disabled={loading}
                className="w-full bg-green-700 text-white font-bold py-3 rounded-xl hover:bg-green-800 transition-colors disabled:opacity-60 disabled:cursor-not-allowed mb-3"
              >
                {loading ? "Placing Order..." : "Place Order"}
              </button>

              <Link
                href="/cart"
                className="block w-full bg-gray-100 text-gray-600 text-center font-semibold py-3 rounded-xl hover:bg-gray-200 transition-colors text-sm"
              >
                Back to Cart
              </Link>
            </div>
          </div>

        </div>
      </div>
    </div>
  )
}