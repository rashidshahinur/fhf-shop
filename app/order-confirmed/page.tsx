'use client'

import Link from "next/link"
import { useSearchParams } from "next/navigation"
import { Suspense } from "react"

function OrderConfirmedContent() {
  const searchParams = useSearchParams()
  const orderId = searchParams.get("id")

  return (
    <div className="min-h-screen bg-gray-50 flex items-center justify-center px-4">
      <div className="bg-white rounded-2xl border border-gray-200 p-8 max-w-md w-full text-center">

        <div className="text-6xl mb-4">🎉</div>
        <h1 className="text-2xl font-bold text-gray-800 mb-2">Order Placed!</h1>
        <p className="text-gray-500 text-sm mb-6">
          Thank you for your order. We will contact you soon to confirm delivery details.
        </p>

        {orderId && (
          <div className="bg-gray-50 rounded-lg p-3 mb-6">
            <div className="text-xs text-gray-400 mb-1">Order ID</div>
            <div className="text-xs font-mono text-gray-600 break-all">{orderId}</div>
          </div>
        )}

        <div className="bg-green-50 border border-green-200 rounded-lg p-4 mb-6 text-left">
          <div className="text-sm font-bold text-gray-800 mb-2">What happens next?</div>
          <div className="space-y-1 text-xs text-gray-600">
            <div>We will call or message you to confirm your order</div>
            <div>Your order will be packed and shipped</div>
            <div>Pay cash when delivery arrives</div>
          </div>
        </div>

        <div className="bg-gray-50 border border-gray-200 rounded-lg p-4 mb-6">
          <div className="text-sm font-bold text-gray-800 mb-1">Follow us on LINE</div>
          <div className="text-xs text-gray-500">
            Get order updates and exclusive deals on LINE
          </div>
        </div>

        <Link
          href="/shop"
          className="block w-full bg-green-700 text-white font-bold py-3 rounded-xl hover:bg-green-800 transition-colors"
        >
          Continue Shopping
        </Link>
      </div>
    </div>
  )
}

export default function OrderConfirmedPage() {
  return (
    <Suspense>
      <OrderConfirmedContent />
    </Suspense>
  )
}
