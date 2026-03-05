import Link from "next/link"

export default function ContactPage() {
  return (
    <div className="bg-gray-50 min-h-screen">

      {/* HEADER */}
      <div className="bg-green-800 text-white py-12 px-4">
        <div className="max-w-4xl mx-auto text-center">
          <h1 className="text-3xl md:text-4xl font-bold mb-3">Contact Us</h1>
          <p className="text-green-200 text-sm md:text-base">
            We are here to help — reach us on LINE, phone, or visit our store
          </p>
        </div>
      </div>

      <div className="max-w-4xl mx-auto px-4 py-12">

        {/* LINE CTA — MOST IMPORTANT */}
        <div className="bg-green-500 rounded-xl p-6 md:p-8 mb-6 text-white text-center">
          <div className="text-5xl mb-4">💬</div>
          <h2 className="text-xl font-bold mb-2">Add Us on LINE</h2>
          <p className="text-green-100 text-sm mb-6 max-w-md mx-auto">
            LINE is our main communication channel. Add us for order updates,
            exclusive deals, Ramadan offers, and fast customer support.
          </p>
          <div className="bg-white rounded-xl p-6 inline-block mb-4">
            <div className="w-32 h-32 bg-gray-200 rounded-lg flex items-center justify-center mx-auto mb-2">
              <span className="text-gray-400 text-xs text-center">LINE QR Code<br/>Coming Soon</span>
            </div>
            <div className="text-green-700 font-bold text-sm">Scan to add on LINE</div>
          </div>
          <div className="text-green-100 text-xs">
            Or search LINE ID: <span className="font-bold text-white">@fhfhalal</span>
          </div>
        </div>

        {/* CONTACT OPTIONS */}
        <div
          className="grid gap-4 mb-6"
          style={{ gridTemplateColumns: "repeat(auto-fill, minmax(200px, 1fr))" }}
        >
          {[
            {
              icon: "💬",
              title: "LINE",
              value: "@fhfhalal",
              desc: "Fastest response. Open daily.",
              bg: "bg-green-50 border-green-200",
            },
            {
              icon: "📞",
              title: "Phone",
              value: "+81-XX-XXXX-XXXX",
              desc: "Mon–Sat 10AM–8PM",
              bg: "bg-blue-50 border-blue-200",
            },
            {
              icon: "📧",
              title: "Email",
              value: "info@fatihahhalalfood.com",
              desc: "Reply within 24 hours",
              bg: "bg-yellow-50 border-yellow-200",
            },
            {
              icon: "📍",
              title: "Store",
              value: "Visit us in Japan",
              desc: "Contact us for address",
              bg: "bg-red-50 border-red-200",
            },
          ].map((item) => (
            <div key={item.title} className={"border rounded-xl p-4 " + item.bg}>
              <div className="text-2xl mb-2">{item.icon}</div>
              <div className="text-sm font-bold text-gray-800 mb-0.5">{item.title}</div>
              <div className="text-xs font-semibold text-gray-700 mb-1">{item.value}</div>
              <div className="text-xs text-gray-400">{item.desc}</div>
            </div>
          ))}
        </div>

        {/* STORE HOURS */}
        <div className="bg-white rounded-xl border border-gray-200 p-6 md:p-8 mb-6">
          <h2 className="text-xl font-bold text-gray-800 mb-4">Store Hours</h2>
          <div className="space-y-2">
            {[
              { day: "Monday – Friday", hours: "10:00 AM – 8:00 PM" },
              { day: "Saturday", hours: "10:00 AM – 8:00 PM" },
              { day: "Sunday", hours: "11:00 AM – 6:00 PM" },
              { day: "Public Holidays", hours: "Closed (online orders still accepted)" },
            ].map((item) => (
              <div key={item.day} className="flex justify-between text-sm py-2 border-b border-gray-50 last:border-0">
                <span className="text-gray-600 font-medium">{item.day}</span>
                <span className="text-gray-800 font-semibold">{item.hours}</span>
              </div>
            ))}
          </div>
        </div>

        {/* LINE BENEFITS */}
        <div className="bg-white rounded-xl border border-gray-200 p-6 md:p-8 mb-6">
          <h2 className="text-xl font-bold text-gray-800 mb-4">Why Follow Us on LINE?</h2>
          <div className="space-y-3">
            {[
              { icon: "🎁", text: "Exclusive LINE-only discount coupons" },
              { icon: "🌙", text: "Ramadan and Eid special offers — first to know" },
              { icon: "📦", text: "New product alerts and restocks" },
              { icon: "🚚", text: "Real-time order and delivery updates" },
              { icon: "💬", text: "Ask questions in English, Japanese, or Bangla" },
              { icon: "⚡", text: "Fastest customer support — we reply quickly" },
            ].map((item) => (
              <div key={item.text} className="flex items-center gap-3">
                <span className="text-lg">{item.icon}</span>
                <span className="text-sm text-gray-600">{item.text}</span>
              </div>
            ))}
          </div>
        </div>

        {/* SHOP CTA */}
        <div className="bg-green-800 rounded-xl p-8 text-white text-center">
          <h2 className="text-xl font-bold mb-2">Ready to order?</h2>
          <p className="text-green-200 text-sm mb-6">
            Browse our halal products and get them delivered anywhere in Japan.
          </p>
          <Link
            href="/shop"
            className="inline-block bg-yellow-500 text-white font-bold px-8 py-3 rounded-xl hover:bg-yellow-600 transition-colors"
          >
            Shop Now
          </Link>
        </div>

      </div>
    </div>
  )
}