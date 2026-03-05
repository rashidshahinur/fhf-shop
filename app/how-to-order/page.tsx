import Link from "next/link"

export default function HowToOrderPage() {
  return (
    <div className="bg-gray-50 min-h-screen">

      {/* HEADER */}
      <div className="bg-green-800 text-white py-12 px-4">
        <div className="max-w-4xl mx-auto text-center">
          <h1 className="text-3xl md:text-4xl font-bold mb-3">How to Order</h1>
          <p className="text-green-200 text-sm md:text-base">
            Simple steps to get halal groceries delivered to your door in Japan
          </p>
        </div>
      </div>

      <div className="max-w-4xl mx-auto px-4 py-12">

        {/* STEPS */}
        <div className="bg-white rounded-xl border border-gray-200 p-6 md:p-8 mb-6">
          <h2 className="text-xl font-bold text-gray-800 mb-6">Order in 4 Easy Steps</h2>
          <div className="space-y-6">
            {[
              {
                step: "1",
                icon: "🛍️",
                title: "Browse & Add to Cart",
                desc: "Browse our products by category or search for what you need. Click ADD TO CART on any product you want.",
                color: "bg-green-700",
              },
              {
                step: "2",
                icon: "🛒",
                title: "Review Your Cart",
                desc: "Go to your cart to review items, adjust quantities, or remove products. Check the total amount before proceeding.",
                color: "bg-blue-600",
              },
              {
                step: "3",
                icon: "📝",
                title: "Fill in Delivery Details",
                desc: "Enter your name, phone number, and full delivery address in Japan. Adding your LINE ID helps us update you faster.",
                color: "bg-yellow-500",
              },
              {
                step: "4",
                icon: "💴",
                title: "Pay on Delivery",
                desc: "We will confirm your order by phone or LINE. Your order is packed and shipped. Pay cash when it arrives at your door!",
                color: "bg-red-500",
              },
            ].map((item) => (
              <div key={item.step} className="flex gap-4">
                <div className={item.color + " text-white rounded-full w-10 h-10 flex items-center justify-center font-black text-lg flex-shrink-0"}>
                  {item.step}
                </div>
                <div className="flex-1 pb-6 border-b border-gray-100 last:border-0 last:pb-0">
                  <div className="flex items-center gap-2 mb-1">
                    <span className="text-xl">{item.icon}</span>
                    <span className="text-sm font-bold text-gray-800">{item.title}</span>
                  </div>
                  <p className="text-xs text-gray-500 leading-relaxed">{item.desc}</p>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* DELIVERY INFO */}
        <div className="bg-white rounded-xl border border-gray-200 p-6 md:p-8 mb-6">
          <h2 className="text-xl font-bold text-gray-800 mb-4">Delivery Information</h2>
          <div
            className="grid gap-4"
            style={{ gridTemplateColumns: "repeat(auto-fill, minmax(200px, 1fr))" }}
          >
            {[
              { icon: "🗾", title: "Delivery Area", desc: "We deliver to all 47 prefectures in Japan including Tokyo, Osaka, Nagoya, Sapporo and everywhere else." },
              { icon: "📦", title: "Delivery Time", desc: "Usually 2-5 business days after order confirmation. Express delivery available on request." },
              { icon: "💴", title: "Delivery Fee", desc: "¥500 flat rate. FREE delivery for orders over ¥5,000. No hidden charges." },
              { icon: "📞", title: "Order Confirmation", desc: "We will call or message you on LINE to confirm your order before shipping." },
            ].map((item) => (
              <div key={item.title} className="bg-gray-50 rounded-lg p-4">
                <div className="text-2xl mb-2">{item.icon}</div>
                <div className="text-sm font-bold text-gray-800 mb-1">{item.title}</div>
                <div className="text-xs text-gray-500 leading-relaxed">{item.desc}</div>
              </div>
            ))}
          </div>
        </div>

        {/* PAYMENT */}
        <div className="bg-white rounded-xl border border-gray-200 p-6 md:p-8 mb-6">
          <h2 className="text-xl font-bold text-gray-800 mb-4">Payment Methods</h2>
          <div className="flex items-center gap-4 bg-green-50 border border-green-200 rounded-lg p-4 mb-3">
            <div className="text-3xl">💴</div>
            <div>
              <div className="text-sm font-bold text-gray-800">Cash on Delivery</div>
              <div className="text-xs text-gray-500">Pay with cash when your order arrives. No credit card needed.</div>
            </div>
            <div className="ml-auto bg-green-700 text-white text-xs font-bold px-3 py-1 rounded-full">
              Available
            </div>
          </div>
          <p className="text-xs text-gray-400">
            More payment options coming soon. For now cash on delivery is the only method.
          </p>
        </div>

        {/* FAQ */}
        <div className="bg-white rounded-xl border border-gray-200 p-6 md:p-8 mb-6">
          <h2 className="text-xl font-bold text-gray-800 mb-4">Common Questions</h2>
          <div className="space-y-4">
            {[
              {
                q: "Can I order without a LINE account?",
                a: "Yes! LINE ID is optional. We will confirm your order by phone call instead."
              },
              {
                q: "What if a product is out of stock?",
                a: "We will contact you to suggest an alternative or refund that item from your order."
              },
              {
                q: "Can I change my order after placing it?",
                a: "Yes, contact us on LINE or by phone within 1 hour of placing the order."
              },
              {
                q: "Do you deliver to my prefecture?",
                a: "Yes! We deliver to all 47 prefectures in Japan. Contact us if you have any concerns."
              },
              {
                q: "Are all products halal certified?",
                a: "Yes. Every product we sell has halal certification. The certifier is shown on each product page."
              },
              {
                q: "How do I track my order?",
                a: "We send tracking info via LINE or SMS after your order is shipped."
              },
            ].map((item) => (
              <div key={item.q} className="border-b border-gray-100 pb-4 last:border-0 last:pb-0">
                <div className="text-sm font-semibold text-gray-800 mb-1">{item.q}</div>
                <div className="text-xs text-gray-500 leading-relaxed">{item.a}</div>
              </div>
            ))}
          </div>
        </div>

        {/* CTA */}
        <div className="bg-green-800 rounded-xl p-8 text-white text-center">
          <h2 className="text-xl font-bold mb-2">Ready to place your order?</h2>
          <p className="text-green-200 text-sm mb-6">
            Browse our products and get authentic halal groceries delivered to you.
          </p>
          <div className="flex gap-3 justify-center flex-wrap">
            <Link
              href="/shop"
              className="bg-yellow-500 text-white font-bold px-8 py-3 rounded-xl hover:bg-yellow-600 transition-colors"
            >
              Shop Now
            </Link>
            <Link
              href="/contact"
              className="bg-white text-green-800 font-bold px-8 py-3 rounded-xl hover:bg-gray-100 transition-colors"
            >
              Contact Us
            </Link>
          </div>
        </div>

      </div>
    </div>
  )
}