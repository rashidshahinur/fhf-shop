// src/app/contact/page.tsx

export default function ContactPage() {
  return (
    <div className="max-w-2xl mx-auto px-4 py-10">
      <h1 className="text-3xl font-bold mb-6">📞 Contact Us</h1>

      <div className="space-y-4 text-gray-700">
        <p>📍 <strong>Store Address:</strong> [Your address in Japan]</p>
        <p>🕐 <strong>Opening Hours:</strong> Mon–Sat, 10:00–20:00</p>
        <p>📞 <strong>Phone:</strong> [Your phone number]</p>
        <p>📧 <strong>Email:</strong> info@fhf-halal.jp</p>
      </div>

      <div className="mt-6">
        
          href="https://maps.google.com"
          target="_blank"
          rel="noopener noreferrer"
          className="bg-green-700 text-white font-bold px-6 py-2 rounded-lg text-sm hover:bg-green-800 transition"
        >
          Open in Google Maps
        </a>
      </div>

      <div className="mt-8 bg-green-50 border border-green-200 rounded-xl p-6 text-center">
        <h2 className="text-xl font-bold text-green-800 mb-2">Fastest way to reach us:</h2>
        <p className="text-green-700 mb-4">
          Message us directly on LINE for orders, questions, and delivery info.
        </p>
        
          href="https://line.me/R/ti/p/@YOUR_LINE_ID"
          target="_blank"
          rel="noopener noreferrer"
          className="bg-green-500 text-white font-bold px-6 py-3 rounded-full hover:bg-green-400 transition"
        >
          💬 Chat on LINE
        </a>
      </div>
    </div>
  );
}