import Link from "next/link"

export default function AboutPage() {
  return (
    <div className="bg-gray-50 min-h-screen">

      {/* HEADER */}
      <div className="bg-green-800 text-white py-12 px-4">
        <div className="max-w-4xl mx-auto text-center">
          <h1 className="text-3xl md:text-4xl font-bold mb-3">About Fatihah Halal Food</h1>
          <p className="text-green-200 text-sm md:text-base max-w-xl mx-auto">
            Japan's trusted halal grocery store serving the Muslim community since day one.
          </p>
        </div>
      </div>

      <div className="max-w-4xl mx-auto px-4 py-12">

        {/* OUR STORY */}
        <div className="bg-white rounded-xl border border-gray-200 p-6 md:p-8 mb-6">
          <h2 className="text-xl font-bold text-gray-800 mb-4">Our Story</h2>
          <div className="space-y-3 text-sm text-gray-600 leading-relaxed">
            <p>
              Fatihah Halal Food (FHF) was born from a simple need — Muslim families living in Japan
              struggling to find authentic, certified halal products from back home.
            </p>
            <p>
              We started as a small physical store in Japan, stocking products loved by Bangladeshi,
              Indonesian, and other Muslim communities. Over time, our customers asked for online
              ordering — so here we are!
            </p>
            <p>
              Today FHF is more than a shop. We are a community hub for Muslims in Japan who want
              the taste of home, the assurance of halal certification, and the convenience of
              doorstep delivery anywhere in Japan.
            </p>
          </div>
        </div>

        {/* WHY CHOOSE US */}
        <div className="bg-white rounded-xl border border-gray-200 p-6 md:p-8 mb-6">
          <h2 className="text-xl font-bold text-gray-800 mb-6">Why Choose FHF?</h2>
          <div
            className="grid gap-4"
            style={{ gridTemplateColumns: "repeat(auto-fill, minmax(200px, 1fr))" }}
          >
            {[
              { icon: "✅", title: "100% Halal Certified", desc: "Every product is verified halal. We check certifications from BSTI, MUI, and other trusted bodies." },
              { icon: "🇧🇩", title: "Bangladeshi Products", desc: "Miniket rice, hilsa fish, tea, spices and more. Authentic products straight from Bangladesh." },
              { icon: "🇮🇩", title: "Indonesian Products", desc: "Indomie, coconut milk, sambal and more. Popular Indonesian brands delivered to your door." },
              { icon: "🚚", title: "Japan Nationwide", desc: "We deliver to all 47 prefectures in Japan. Fast and reliable shipping." },
              { icon: "💴", title: "Cash on Delivery", desc: "No online payment needed. Pay cash when your order arrives at your door." },
              { icon: "💬", title: "LINE Support", desc: "Questions? Message us on LINE anytime. We reply in English, Japanese, and Bangla." },
            ].map((item) => (
              <div key={item.title} className="bg-gray-50 rounded-lg p-4">
                <div className="text-2xl mb-2">{item.icon}</div>
                <div className="text-sm font-bold text-gray-800 mb-1">{item.title}</div>
                <div className="text-xs text-gray-500 leading-relaxed">{item.desc}</div>
              </div>
            ))}
          </div>
        </div>

        {/* WHO WE SERVE */}
        <div className="bg-white rounded-xl border border-gray-200 p-6 md:p-8 mb-6">
          <h2 className="text-xl font-bold text-gray-800 mb-4">Who We Serve</h2>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-3">
            {[
              { flag: "🇧🇩", label: "Bangladeshi community in Japan" },
              { flag: "🇮🇩", label: "Indonesian community in Japan" },
              { flag: "🕌", label: "Muslim residents and workers" },
              { flag: "🇯🇵", label: "Japanese halal food seekers" },
            ].map((item) => (
              <div key={item.label} className="bg-green-50 border border-green-100 rounded-lg p-4 text-center">
                <div className="text-3xl mb-2">{item.flag}</div>
                <div className="text-xs font-semibold text-gray-700 leading-tight">{item.label}</div>
              </div>
            ))}
          </div>
        </div>

        {/* PHYSICAL STORE */}
        <div className="bg-white rounded-xl border border-gray-200 p-6 md:p-8 mb-6">
          <h2 className="text-xl font-bold text-gray-800 mb-4">Visit Our Physical Store</h2>
          <div className="grid md:grid-cols-2 gap-6">
            <div className="space-y-3 text-sm text-gray-600">
              <div className="flex gap-3">
                <span className="text-lg">📍</span>
                <div>
                  <div className="font-semibold text-gray-800">Location</div>
                  <div>Japan (contact us for exact address)</div>
                </div>
              </div>
              <div className="flex gap-3">
                <span className="text-lg">🕐</span>
                <div>
                  <div className="font-semibold text-gray-800">Store Hours</div>
                  <div>Mon–Sat: 10:00 AM – 8:00 PM</div>
                  <div>Sunday: 11:00 AM – 6:00 PM</div>
                </div>
              </div>
              <div className="flex gap-3">
                <span className="text-lg">💬</span>
                <div>
                  <div className="font-semibold text-gray-800">Contact</div>
                  <div>LINE, phone or visit in person</div>
                </div>
              </div>
            </div>
            <div className="bg-green-50 border border-green-200 rounded-lg p-5 flex flex-col items-center justify-center text-center">
              <div className="text-4xl mb-3">💬</div>
              <div className="text-sm font-bold text-gray-800 mb-2">Chat with us on LINE</div>
              <div className="text-xs text-gray-500 mb-4">Fastest way to reach us</div>
              <Link
                href="/contact"
                className="bg-green-500 text-white font-bold px-6 py-2 rounded-lg text-sm hover:bg-green-600 transition-colors"
              >
                Contact Us
              </Link>
            </div>
          </div>
        </div>

        {/* CTA */}
        <div className="bg-green-800 rounded-xl p-8 text-white text-center">
          <h2 className="text-xl font-bold mb-2">Ready to Shop?</h2>
          <p className="text-green-200 text-sm mb-6">
            Browse our full range of halal products and get them delivered to your door.
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